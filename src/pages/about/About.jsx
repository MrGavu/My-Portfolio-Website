import React, { useEffect } from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

import joshua_about from '../../assets/images/joshua_about.jpg';
import josh_wireframe from '../../assets/images/josh_wireframe.jpg';
import check_icon from '../../assets/icons/check_icon.svg';
import gallery_images from '../../assets/images/gallery_images.png';
import {FiArrowRight} from 'react-icons/fi'

//aos
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

const resume = 'https://www.figma.com/proto/z531mQMmyk59E75JrL8Xr8/Joshua-Gavu---Resume%2FCV?type=design&node-id=2-5&t=qIEkFYva051LsPkM-0&scaling=scale-down&page-id=0%3A1'

function About() {

    useEffect(() => {
        AOS.init()
    }, [])

    const DesignProcessItem = ({name, details}) => {
        return(
            <div className='flex gap-3'>
                <img src={check_icon} alt='' className='h-[28px]' />
                <div>
                    <h3 className='text-xl font-bold'>{name}</h3>
                    <p className='opacity-70 mt-3 md:max-w-[380px]'>{details}</p>
                </div>
            </div>
        )
    }

    return (
        <div className='w-full bg-white font-inter'>
            <Header selected={'about'} />
            <div className='px-[20px] w-full py-20'>
                <div className='max-w-[1100px] mx-auto grid md:grid-cols-[1fr_500px] gap-10 md:gap-10'>
                    <div className='w-full'  data-aos="fade-up" data-aos-duration="700">
                        <h1 className='text-6xl'>About me😁</h1>
                        <p className='text-2xl text-[#707070] mt-8'>I’m Joshua Gavu but you can call me Josh, a product designer with over four(4) years of experience passionate about creating delightful and engaging user experiences that make the lives of humans easier.</p>
                        <p className='text-2xl text-[#707070] mt-8'>When I am off the clock, you will find me sharing resources and templates in the Figma community to help fellow designers speed up their workflows.</p>
                        <p className='text-2xl text-[#707070] mt-8'>I enjoy traveling and photography as they help to fuel my creativity and rejuvenation when burn out sets in.</p>
                    </div>
                    <img className='w-full h-full object-cover rounded-2xl bg-[#f5f5f5]' src={joshua_about} alt='Joshua Gavu'  data-aos="fade-up" data-aos-delay="200" data-aos-duration="700" />
                </div>
            </div>
            <div className='w-full py-10 md:py-20 bg-[#232323] px-[20px]'>
                <div className='max-w-[1200px] mx-auto flex flex-col md:flex-row gap-10'>
                    <div className='flex-1 text-white'  data-aos="fade-right" data-aos-duration="700">
                        <h1 className='text-6xl leading-[120%]'>My design process</h1>
                        <div className='flex flex-col mt-10 gap-10'>
                            <DesignProcessItem
                                name={'Empathize with users'}
                                details={'Identify and empathize with the targeted users and discover their needs'}
                            />
                            <DesignProcessItem
                                name={'Define learnings '}
                                details={'Uncover the problem statement and create user personas to maintain human focus results'}
                            />
                            <DesignProcessItem
                                name={'Discover ideas'}
                                details={`Brainstorming ideas and challenging assumption to create a solution for the problem`}
                            />
                            <DesignProcessItem
                                name={'Create prototype'}
                                details={'Design low and high fidelity designs and test with users'}
                            />
                            <DesignProcessItem
                                name={'Iteration of design'}
                                details={'Document feedback from users after testing and make adjustments until users are satisfied '}
                            />
                        </div>
                    </div>
                    <img className='max-w-[850px] object-cover rounded-2xl' src={josh_wireframe} alt='Joshua Gavu design process'  data-aos="fade-left" data-aos-delay="200" data-aos-duration="700" />
                </div>
            </div>
            <div className='px-[20px] w-full py-20'>
                <div className='max-w-[1200px] mx-auto'>
                    <h1 className='text-6xl'>Gallery</h1>
                    <img src={gallery_images} alt='' className='w-full object-contain' data-aos="zoom-in-up" data-aos-duration="700" />
                </div>
            </div>
            <div className='px-[20px] w-full pt-20'>
                <div className='max-w-[1000px] mx-auto'>
                    <h1 className='text-6xl'>My Resume/CV</h1>
                    <Link to={resume} target='_blank' className='w-full mt-10 bg-[#F4F4F4] rounded-xl py-3 px-8 flex items-center cursor-pointer'>
                        <p className='flex-1 text-xl text-[#676767]'>View my resume/CV by clicking here</p> <FiArrowRight className='text-[#473BF0] text-2xl' />
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default About