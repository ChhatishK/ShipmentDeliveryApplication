import React from 'react'
import HomePageImage from '../Images/shiping-cargo.jpg'

const Home = () => {
  return (
    <div className='flex flex-row w-full h-full justify-evenly items-center'>
        <h1 className='text-5xl leading-tight text-white font-bold'>Welcome to Shipment <br></br>Delivery Application</h1>
        <img src={HomePageImage} width={500} height={300} alt='' className='rounded-lg shadow-lg'/>
    </div>
  )
}

export default Home