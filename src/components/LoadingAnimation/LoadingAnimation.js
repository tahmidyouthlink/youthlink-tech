"use client"
import Lottie from "lottie-react";
import animation from "../../assets/lottie/loading.json"

const LoadingAnimation = () => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
     <div className="w-[150px]">
      <Lottie animationData={animation}/>
     </div>
    </div>
  );
};

export default LoadingAnimation;