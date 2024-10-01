import React from "react";
import { CiPlay1 } from "react-icons/ci";

type Props = {
  imgsrc: string;
  clip: string;
};

export const Clip = ({ imgsrc, clip }: Props) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <>
      <div
        className="relative h-16 w-20 xx:h-20 xx:w-24 xs:h-24 xs:w-28 sm:h-20 sm:w-24 md:h-24 md:w-28 lg:h-28 lg:w-32 overflow-hidden rounded-xl group cursor-pointer transition-all duration-300 "
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={imgsrc}
          alt="clip/img"
          className="absolute inset-0 left-0 right-0 top-0 object-cover flex rounded-xl h-full w-full z-10 opacity-100 transition-opacity duration-500"
        />
        {hovered && (
          <video
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline={true}
            className="absolute top-0 left-0 right-0 flex h-full w-full z-0 object-cover opacity-0 group-hover:opacity-100 group-hover:z-20"
          >
            <source type="video/mp4" src={clip} />
          </video>
        )}
        {!hovered && (
          <CiPlay1 className="absolute inset-0 m-auto h-[30%] w-[30%] text-white opacity-30 flex justify-center items-center z-40" />
        )}
      </div>
    </>
  );
};
