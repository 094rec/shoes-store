import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Props = {
  imgs: string[],
  setImg: (img: string) => void,
};

export const Slider = ({ imgs, setImg }: Props) => {
  return (
      <div className="h-[150px] w-[200px] flex -mt-6 xx:-mt-4 xs:mt-0">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          // navigation={true}
          pagination={{ clickable: true }}
          loop={true}
        >
          {imgs.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="flex justify-center items-center h-full opacity-90">
                <img
                  onClick={() => setImg(img)}
                  src={img}
                  alt={`${i}/slider-img`}
                  className="object-contain w-8/12 xx:w-9/12 xs:w-11/12 rounded-xl btn-ah"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
  );
};
