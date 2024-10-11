import { emptybag } from '../../data/initData';

export const CartEmpty = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <img
          src={emptybag}
          alt="emptycart/img"
          className="mb-24 w-[6.5rem] lg:w-[9rem] h-auto transition-all duration-300 hover:scale-110"
        />
      </div>
    </>
  );
};
