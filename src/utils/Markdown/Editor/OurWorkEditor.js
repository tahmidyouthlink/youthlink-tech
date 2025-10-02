import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import default styles

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const OurWorkEditor = ({ value, onChange }) => {

  const modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline'],
        ['link'],
      ],
    },
  };

  const formats = [
    'bold', 'italic', 'underline', 'link'
  ];

  return (
    <div className="custom-editor-our-work">
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder='Enter work details...'
      />
    </div>
  );
};

export default OurWorkEditor;