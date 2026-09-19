import { useRef, useState } from "react";
import SectionHeader from "../../components/SectionHeader";
import { GrPlayFill } from "react-icons/gr";

const TheReasons = () => {
  const videoRef = useRef(null);
  const [showBtn, setShowBtn] = useState(false);
  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setShowBtn(true);
      }
    }
  };
  const handlePauseVideo = () => {
    if (videoRef.current) {
      if (!videoRef.current.paused) {
        videoRef.current.pause();
        setShowBtn(false);
      }
    }
  };

  return (
    <div className="set-section py-20 text-black">
      <div className="container px-4 lg:px-0 h-full">
        <SectionHeader title="The reasons" subtitle="Why Choose Us?" />
        <div className="relative w-full h-100 lg:h-150">
          <video loop onClick={handlePauseVideo} ref={videoRef} className="w-full h-full object-cover rounded-[20px] mt-10">
            <source src="/home-images/whyUs.mp4" type="video/mp4" />
          </video>
          {!showBtn && (
            <div
              onClick={() => {
                handlePlayVideo();
              }}
              className="absolute cursor-pointer w-20 h-20 z-20 rounded-full overflow-hidden top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-center bg-gray-200"
            >
              <GrPlayFill className="text-3xl" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TheReasons;
