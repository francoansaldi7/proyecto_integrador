/* eslint-disable react/prop-types */
function Card({img, title, description}) {
  return (
    <div className="flex h-[370px] w-[450px] flex-col gap-5 bg-secondary rounded-md shadow-lg shadow-secondary">
      <img src={img} alt="" className="service-profile h-[230px] rounded" />
      <h4 className="text-white font font-semibold ml-2 mt-[-15px]">{title}</h4>
      <p className='ml-2 mt-[-15px]'>{description} ... <button className='text-sm italic'>show more</button></p>
    </div>
  )
}

export default Card