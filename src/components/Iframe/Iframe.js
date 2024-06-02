import React from 'react';

const Iframe = ({ iframeData }) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: iframeData }} />
    );
};

export default Iframe;
