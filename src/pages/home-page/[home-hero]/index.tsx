import React from 'react';
import { useSearchContext } from '../../../hooks/useSearchContext';
import { Clip } from './Clip';

type Props = {
  title: string;
  subtitle: string;
  img: string;
  btntext: string;
  videos: {
    imgsrc: string;
    clip: string;
  }[];
  sociallinks: {
    icon: string;
  }[];
};

export const Hero = React.memo(({ title, subtitle, img, btntext, videos, sociallinks }: Props) => {
  const { searchVal: val } = useSearchContext();
  return (
    <>
      <div
        className={`transition-all duration-300 ${!val ? 'relative opacity-100 visible translate-x-0' : 'absolute opacity-0 invisible translate-x-8'} flex flex-col mb-10 xx:mb-18 sm:mb-28 -mt-2`}
      >
        <div className="bg-theme clip-path absolute left-0 right-0 top-0 z-10 h-[55vh] sm:h-[65vh] md:h-[75vh] lg:h-[85vh]"></div>
        <div className="nike-container relative z-20 flex flex-col items-center justify-center gap-4">
          <div className="mt-24 flex flex-col items-center justify-center md:mt-28">
            <h1 className="text-2xl xx:text-3xl font-extrabold text-white/90 sm:text-4xl md:text-5xl lg:text-6xl filter drop-shadow-md">
              {title}
            </h1>
            <h2 className="text-2xl xx:text-3xl font-extrabold text-white/70 sm:text-4xl md:text-5xl lg:text-6xl filter drop-shadow-md">
              {subtitle}
            </h2>
            <button className="btn-theme mt-3 bg-slate-200 text-slate-900 shadow-slate-300 md:mt-4 md:text-base">
              {btntext}
            </button>
          </div>
          <div className="flex flex-col gap-14 xx:gap-16 items-center">
            <img
              src={img}
              alt="hero/img"
              className="h-[19vh] xx:h-[24vh] xs:h-[28vh] sm:h-[31vh] md:h-[35vh] lg:h-[38vh] transitions-theme -rotate-[24deg] hover:-rotate-[16deg] {object-fill}"
            />
            <div className="sm:absolute left-[2%] top-[35vh] flex sm:flex-col gap-2 xx:gap-3 xs:gap-4 sm:gap-3 md:gap-4">
              {videos?.map((video) => <Clip key={video.imgsrc} {...video} />)}
            </div>
            <div className="relative sm:absolute hidden right-[2%] top-[35vh] sm:flex sm:flex-col gap-3 md:gap-4 lg:gap-5">
              {sociallinks?.map(({ icon }) => (
                <div key={icon} className="h-5 w-6 md:h-6 md:w-7 lg:h-7 lg:w-8 cursor-pointer drop-shadow-lg  transition-all duration-300 hover:scale-110 active:scale-95 active:bg-gray-200 rounded-full">
                  <img src={icon} alt="smedia/img" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
