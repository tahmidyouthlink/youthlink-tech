import dynamic from 'next/dynamic';
import React, { useRef, useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(
    async () => {
        const { default: RQ } = await import('react-quill');
        return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
    },
    {
        ssr: false,
    }
);

export default function Editor({ value, onChange }) {
    const quillRef = useRef();

    // imgbb API key
    const imgbbApiKey = 'bcc91618311b97a1be1dd7020d5af85f';
    const imgbbApiUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();
            formData.append('image', file);

            // Save current cursor position
            const range = quillRef.current.editor.getSelection(true);

            // Insert temporary loading image (optional)
            quillRef.current.editor.insertEmbed(range.index, 'image', `${window.location.origin}/images/loaders/placeholder.gif`);
            quillRef.current.editor.setSelection(range.index + 1);

            try {
                // Upload image to imgbb
                const response = await fetch(imgbbApiUrl, {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();

                if (data.success) {
                    const imageUrl = data.data.url;

                    // Remove placeholder and insert the actual image
                    quillRef.current.editor.deleteText(range.index, 1);
                    quillRef.current.editor.insertEmbed(range.index, 'image', imageUrl);
                    quillRef.current.editor.setSelection(range.index + 1); // Move cursor to right of the image
                } else {
                    console.error("Failed to upload image:", data);
                }
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        };
    };

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                ['link', 'image'],
                [{ align: [] }],
                ['clean'],
            ],
            handlers: {
                image: imageHandler,
            },
        },
    }), []);

    return (
        <div className='custom-editor'>
            <ReactQuill
                forwardedRef={quillRef}
                modules={modules}
                value={value}
                onChange={onChange} // Use the provided onChange from props
            />
        </div>
    );
};