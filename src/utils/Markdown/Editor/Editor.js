import React, { useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';
import useAxiosPublic from '@/hooks/useAxiosPublic';

const apiKey = "bcc91618311b97a1be1dd7020d5af85f";
const apiURL = `https://api.imgbb.com/1/upload?key=${apiKey}`;

// Dynamically load ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Editor = ({ value, onChange }) => {
    const quillRef = useRef();
    const axiosPublic = useAxiosPublic();

    // Upload image to imgbb
    const uploadImageToImgbb = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('key', apiKey);

        try {
            const response = await axiosPublic.post(apiURL, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (response.data?.data?.url) {
                return response.data.data.url;
            } else {
                toast.error('Failed to get image URL from response.');
            }
        } catch (error) {
            toast.error(`Upload failed: ${error.response?.data?.error?.message || error.message}`);
        }
        return null;
    };

    // Image handler for Quill
    const imageHandler = async () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files ? input.files[0] : null;
            if (file) {
                const url = await uploadImageToImgbb(file);
                console.log("Image URL:", url);  // Confirm URL is correct

                if (url && quillRef.current) {
                    const quill = quillRef.current.getEditor();
                    let range = quill.getSelection();

                    // Fallback to insert at the end of content if no range is selected
                    if (!range) {
                        range = { index: quill.getLength(), length: 0 };
                    }

                    // Insert the image and move cursor after it
                    quill.insertEmbed(range.index, 'image', url);
                    quill.setSelection(range.index + 1); // Move cursor to end of image
                }
            }
        };
    };

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                ['bold', 'italic', 'underline'],
                [{ align: [] }],
                [{ color: [] }, { background: [] }],
                [{ list: 'bullet' }],
                ['link', 'image'],  // Ensure 'image' button exists in toolbar
            ],
            handlers: {
                image: imageHandler,
            },
        },
    }), []);

    return (
        <ReactQuill
            ref={quillRef}
            value={value}
            onChange={onChange}
            modules={modules}
            className="custom-editor"
        />
    );
};

export default Editor;