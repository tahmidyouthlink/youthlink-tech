import React from 'react';

const Loading = () => {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className="w-20 h-20 flex gap-1 items-center justify-center"><div className="w-20 h-20 animate-[bounce_.6s_linear_.2s_infinite] bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.orange.600),theme(colors.yellow.500),theme(colors.yellow.500))] bg-[length:300%_100%] bg-[200%_100%] transition-[opacity,transform,background-position] delay-75 duration-700 ease-in-out hover:bg-[50%_100%] rounded-full"></div><div className="w-20 h-20 animate-[bounce_.6s_linear_.3s_infinite] bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.orange.600),theme(colors.yellow.500),theme(colors.yellow.500))] bg-[length:300%_100%] bg-[200%_100%] transition-[opacity,transform,background-position] delay-75 duration-700 ease-in-out hover:bg-[50%_100%] rounded-full"></div><div className="w-20 h-20 animate-[bounce_.6s_linear_.4s_infinite] bg-[linear-gradient(to_right,theme(colors.orange.600),theme(colors.orange.600),theme(colors.yellow.500),theme(colors.yellow.500))] bg-[length:300%_100%] bg-[200%_100%] transition-[opacity,transform,background-position] delay-75 duration-700 ease-in-out hover:bg-[50%_100%] rounded-full"></div></div>
        </div>
    );
};

export default Loading;