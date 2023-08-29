import React from 'react'
import './Head.css'

export const Head = () => {
  return (
    <>
      <section className='head'>
        <div className='container d_flex'>
          <div className='left row'>
            <div className='contact-info'>
              <i className='fas fa-phone' />
              <label>
                <svg className='h-6 w-6 text-white inline-block' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                  <path stroke='none' d='M0 0h24v24H0z' />
                  <path d='M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2' />
                </svg>
                +549-1165269434
              </label>
            </div>
            <div className='contact-info'>
              <i className='fas fa-envelope' />
              <label>
                <svg className='h-6 w-6 text-white inline-block' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                  <path stroke='none' d='M0 0h24v24H0z' />
                  <rect x='3' y='5' width='18' height='14' rx='2' />
                  <polyline points='3 7 12 13 21 7' />
                </svg>
                info@vetly.com.ar
              </label>
            </div>
          </div>
          <div className='rigth row RText'>
            <label className='theme'>Theme FAQ's</label>
          </div>
          <div>
            <label className='need'>Need Helps</label>
            <span />
          </div>
        </div>
      </section>
    </>
  )
}
