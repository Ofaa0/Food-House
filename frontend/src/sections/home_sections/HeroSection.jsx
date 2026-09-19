import React from 'react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <div className="w-full h-[calc(100dvh-75px)] bg-[url('./home-images/hero.jpg')] bg-cover bg-center relative flex-center">
      <div className='absolute inset-0 bg-black/40 z-10' />
      <div className="container relative z-20 px-4 lg:px-0">
        <h1 className='font-bold text-5xl lg:text-8xl leading-24 pb-3 lg:pb-8'>Where every meal  <br className='hidden lg:block' /> becomes a memory</h1>
        <p className='font-pop text-[14px] lg:text-[16px] pb-10 lg:pb-13'>Discover a menu full of fresh flavors, unforgettable recipes, <br className='hidden lg:block' /> and meals you'll keep coming back for.</p>
        <div className='flex-center lg:static lg:w-fit'>
        <Link to="/menu" className='cursor-pointer hover:bg-main-dark-red/90 duration-200 rounded-full bg-main-dark-red text-white py-4 px-6 font-bold text-xl'>Discover Menu</Link>
        </div>
      </div>
    </div>
  )
}

export default HeroSection