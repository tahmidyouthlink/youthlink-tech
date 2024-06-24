import React from 'react';

const Loading = () => {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className="w-20 h-20 flex gap-1 items-center justify-center"><div className="w-20 h-20 animate-[bounce_.6s_linear_.2s_infinite] bg-[#EAB308] rounded-full"></div><div className="w-20 h-20 animate-[bounce_.6s_linear_.3s_infinite] bg-[#EAB308] rounded-full"></div><div className="w-20 h-20 animate-[bounce_.6s_linear_.4s_infinite] bg-[#EAB308] rounded-full"></div></div>
        </div>
    );
};

export default Loading;