import React from 'react';

import { FiArrowRight } from 'react-icons/fi';

function ProjectsItem({image, title, detials, link, alternate}) {
    if(alternate)
    return (
        <div className='w-full bg-[#F4F4F4] py-10 md:py-20 px-[20px]'>
            <div className='max-w-[1000px] mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-20'>
                <div className='max-w-[420px]'>
                    <h3 className='text-2xl font-bold'>{title}</h3>
                    <p className='text-lg opacity-75 mt-3 mb-5 text-[#161C2D]'>{detials}</p>
                    <a href={link} target='_blank' rel="noreferrer">
                        <div className='flex items-center gap-2 text-[#473BF0] font-bold cursor-pointer'>Take a look <FiArrowRight /> </div>
                    </a>
                </div>
                <div className='flex-1 flex items-center justify-center'>
                    <img src={image} alt='title' className='max-h-[400px]' data-aos-delay="200" data-aos="fade-up" data-aos-duration="700" />
                </div>
            </div>
        </div>
    )

    return (
        <div className='w-full bg-white py-10 md:py-20 px-[20px]'>
            <div className='max-w-[1000px] mx-auto flex flex-col-reverse md:flex-row items-center gap-10 md:gap-20'>
                <div className='flex-1 flex items-center justify-center'>
                    <img src={image} alt='title' className='max-h-[100%]' data-aos-delay="200" data-aos="fade-up" data-aos-duration="700" />
                </div>
                <div className='max-w-[420px]'>
                    <h3 className='text-2xl font-bold'>{title}</h3>
                    <p className='text-lg opacity-75 mt-3 mb-5 text-[#161C2D]'>{detials}</p>
                    <a href={link} target='_blank' rel="noreferrer">
                        <div className='flex items-center gap-2 text-[#473BF0] font-bold cursor-pointer'>Take a look <FiArrowRight /> </div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ProjectsItem