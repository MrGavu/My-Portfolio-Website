import React, { useEffect } from 'react'
import Header from '../../components/header/Header';


import josh_1 from '../../assets/images/josh_1.jpg';
import josh_2 from '../../assets/images/josh_2.jpg';
import josh_3 from '../../assets/images/josh_3.jpg';
import { PROJECTS } from '../../data/projects.data';
import ProjectsItem from '../../components/projects/ProjectsItem';
import { Link } from 'react-router-dom';
import { paths } from '../../constants/paths.constants';
import Footer from '../../components/footer/Footer';
import classes from './home.module.css';

//aos
import AOS from 'aos';
import 'aos/dist/aos.css';
import { COMPANIES } from '../../data/companies.data';

function Home() {

    useEffect(() => {
        AOS.init()
    }, [])

    return (
        <div className='w-full bg-white font-inter overflow-x-hidden'>
            <Header />
            <div className='w-full'>
                <div className='px-[20px] text-center'>
                    <p className='text-[#707070] text-xl md:text-2xl' data-aos="fade-up" data-aos-duration="700">Hello There 😁</p>
                    <h1 className='font-bold max-w-[950px] text-4xl md:text-7xl md:leading-[85px] mx-auto mt-2 md:mt-5' data-aos="fade-up" data-aos-delay="200" data-aos-duration="700">I’m Joshua. 5+ years in Product Design & Founder of Dooinngs.</h1>
                    <p className='max-w-[700px] mx-auto text-xl md:text-2xl mt-2 md:mt-5 text-[#707070]' data-aos="fade-up" data-aos-delay="400" data-aos-duration="700">I’m passionate about designing user-friendly products that make life easier, working with companies across 🇬🇭Ghana, 🇳🇬Nigeria, 🇺🇸United States, 🇨🇦Canada and 🇨🇳China.</p>
                </div>
                <div className='mt-10' data-aos="fade-up" data-aos-delay="600" data-aos-duration="700">
                    <p className='text-xl md:text-2xl text-[#1e1e1e] px-[20px] text-center'>Companies I’ve worked with</p>
                    <div className='h-[100px]'>
                        <div className={`${classes.scroll_container} w-full flex items-center gap-10 lg:gap-20 mt-5 mx-auto`}>
                            {COMPANIES.map((i, idx) => (
                                <img src={i.image} key={idx} alt={i.alt} className='max-w-[100px] md:max-w-[150px] mx-auto' />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={`${classes.pictures} max-w-[1200px] overflow-x-scroll mx-auto flex items-center gap-3 px-[20px] md:gap-10 mt-10 md:mt-20`} data-aos="fade-up" data-aos-delay="800" data-aos-duration="700">
                    <img src={josh_1} className='flex-1 h-[450px] rounded-3xl bg-[#f5f5f5] object-cover' alt='Joshua Gavu' />
                    <img src={josh_2} className='flex-1 h-[450px] rounded-3xl bg-[#f5f5f5] object-cover' alt='Joshua Gavu' />
                    <img src={josh_3} className='flex-1 h-[450px] rounded-3xl bg-[#f5f5f5] object-cover' alt='Joshua Gavu' />
                </div>
            </div>
            <div>
                <div className='mt-20'>
                    <h1 className='max-w-[1200px] mx-auto text-3xl md:text-6xl px-[20px]'>Featured Projects</h1>
                    {PROJECTS.slice(0, 4).map((i, idx) => (
                        <ProjectsItem
                            title={i.title}
                            detials={i.details}
                            link={i.link}
                            image={i.image}
                            key={idx}
                            alternate={((idx + 1) % 2) === 0}
                        />
                    ))}
                    <div className='text-center py-5'>
                        <Link to={paths.PROJECTS} className='w-fit px-5 text-lg md:text-2xl text-[#473BF0] text-center'>View all projects</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
 
export default Home