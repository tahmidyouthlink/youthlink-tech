import React from 'react';

const MarkdownRenderer = ({ content }) => {
    return (
        <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />
    );
};

export default MarkdownRenderer;