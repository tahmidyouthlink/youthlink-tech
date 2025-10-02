import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import default styles

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const OurWorkTitleEditor = ({ value, onChange }) => {

  const modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline'],
      ],
    },
  };

  const formats = ['bold', 'italic', 'underline',];

  return (
    <div className="custom-editor-our-work-title">
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder='Enter work title...'
      />
    </div>
  );
};

export default OurWorkTitleEditor;