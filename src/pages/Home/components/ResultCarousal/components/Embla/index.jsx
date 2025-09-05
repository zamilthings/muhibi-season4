import React from 'react'
import ReactDOM from 'react-dom/client'
import EmblaCarousel from './Carousal'
import '../../../../../../assets/styles/embla/index.css'
import { Link } from 'react-router-dom'

const OPTIONS = { loop: true }

const Carousel = ({ slides }) => (
    <>
        <EmblaCarousel slides={slides} options={OPTIONS} />
        <Link to='/results' className='text-center block  w-fit rounded-lg text-sm px-4 py-1.5 mx-auto text-white bg-sky-700 '>Other Results</Link>
    </>
)

export default Carousel;

