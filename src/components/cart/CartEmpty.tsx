import { emptybag } from '../../data/data';

export const CartEmpty = () => {
  
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <img src={emptybag} alt="emptycart/img" className="mb-10 w-[6.5rem] lg:w-[9rem] h-auto transition-all duration-300 hover:scale-110" />
      </div>
      
    </>
  )
}
