import testImg from '../assets/testPhoto.jpg'

function Card() {
  return (
    <div className="flex h-[200px] w-[300px] flex-col gap-5 bg-secondary rounded-md shadow-lg shadow-secondary">
      <img src={testImg} alt="" className="service-profile h-[130px] rounded" />
      <h4 className="text-white font font-semibold ml-2 mt-[-15px]">Service Name</h4>
      <p className='ml-2 mt-[-15px]'>Service description ... <button className='text-sm italic'>show more</button></p>
    </div>
  )
}

export default Card