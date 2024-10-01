import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Props = {
  imgs: string[];
};

export const Slider = ({ imgs }: Props) => {
  return (
    <div className="relative h-full w-full flex max-w-lg">
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
            <div className="relative flex justify-center items-center h-full">
              <img
                src={img}
                alt={`${i}/slider-img`}
                className="object-contain w-11/12 h-full rounded-xl btn-ah"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
