import { emptybag } from '../../data/data';

export const CartEmpty = () => {
  
  return (
    <>
      <div className="flex justify-center items-center">
        <img src={emptybag} alt="emptycart/img" className="mt-24 lg:mt-32 w-[7rem] lg:w-[9rem] h-auto transition-all duration-300 hover:scale-110" />
      </div>
      
    </>
  )
}
