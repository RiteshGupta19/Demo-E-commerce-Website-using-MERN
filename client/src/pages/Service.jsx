import React from 'react'
import './Register.css'
import { useAuth } from '../store/auth'

export default function  Services() {
  const {services}=useAuth();
  return (
    <>
    <section className='services'>
      <div className='ser-container'>
        <h1>Our Services</h1>
      </div>

      <div className='card-container'>
        {services.map((ele,i)=>{
          return <>
          <div className='card' key={i}>
          <div className='img'> 
            <img src='/vite.svg' alt='image' height={100} width={100}/>
          </div>
          <div>
            <div className='provider'>
              <p>{ele.provider}</p>
              <p>{ele.price}</p>
            </div> 
            <h3>{ele.services}</h3>
            <p>{ele.description}</p>
          </div>
        </div>
          </>
        })}
        
      </div>
    </section>
    </>
  )
}
