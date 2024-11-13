import React from 'react';

const ResponsiveIframe = ({ iframeData, className }) => {
  return (
    <div className={`relative w-full h-72 custom-scrollbar overflow-auto ${className}`}>
      <div
        dangerouslySetInnerHTML={{ __html: iframeData }}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};

export default ResponsiveIframe;
