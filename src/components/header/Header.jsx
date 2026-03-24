import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { paths } from '../../constants/paths.constants'
import { motion, AnimatePresence } from "framer-motion"
import { FiArrowRight, FiMenu, FiX } from 'react-icons/fi';

function Header({selected}) {
    const navigate = useNavigate();
    const [showNavBar, setShowNavBar] = useState(false);

    const handleScroll = (scrollTo) => {
        const element = document.getElementById(scrollTo);
        if (element) {
            //Will scroll smoothly to the top of the next section
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleNavBar = () => {
        setShowNavBar(true)
    }

    const handleMobileLinkClick = (name) => {
        setShowNavBar(false)
        setTimeout(() => {
            navigate(name)
        }, [500])
    }

    const MobileLinkItem = ({displayName, link}) => {
        return(
            <div className='w-full bg-[#F4F4F4] rounded-xl py-3 px-8 flex items-center cursor-pointer' onClick={() => handleMobileLinkClick(link)}>
                <p className='flex-1 text-xl text-[#676767]'>{displayName}</p> <FiArrowRight className='text-[#473BF0] text-2xl' />
            </div>
        )
    }

    return (
        <>
            <div className='w-full flex items-center gap-5 max-w-[1200px] px-[20px] mx-auto py-7'>
                <Link to={paths.HOME} ><h3 className='text-[27px]'>josh.the.designer</h3></Link>
                <div className='flex-1 hidden md:flex items-center gap-[30px] justify-end'>
                    <Link to={paths.ABOUT}><p className={`${selected === 'about' ? 'text-[#985AFD] font-semibold' : 'text-[#707070]'}  hover:text-[#985AFD] text-xl`}>About</p></Link>
                    <Link to={paths.PROJECTS}><p className={`${selected === 'projects' ? 'text-[#985AFD] font-semibold' : 'text-[#707070]'}  hover:text-[#985AFD] text-xl`}>My Projects</p></Link>
                    <p className='text-[#707070] hover:text-black text-xl cursor-pointer' onClick={() => handleScroll('footer')}>Contact me</p>
                </div>
                <div className='flex-1 flex justify-end md:hidden'>
                    <div className='bg-[#eee] h-[45px] w-[45px] rounded-full flex items-center justify-center cursor-pointer text-black' onClick={handleNavBar}> <FiMenu /> </div>
                </div>
            </div>
            <AnimatePresence>
                {showNavBar && (
                    <motion.div 
                        initial={{ height: '0px' }}
                        animate={{ height: '100vh' }}
                        exit={{ height: '0px' }}
                        transition={{duration: 0.5}}
                        className='w-full bg-[#fff] overflow-hidden dark:bg-dark-bg z-[10001] fixed top-0 px-[20px] flex flex-col font-inter'
                    >
                        <div className='flex-1'>
                            <div className='w-full flex justify-end py-7'>
                                <div className='bg-[#ddd] h-[45px] w-[45px] rounded-full flex items-center justify-center cursor-pointer text-black' onClick={() => setShowNavBar(false)}> <FiX size={20} /> </div>
                            </div>
                            <div className='flex flex-col mt-10 gap-3'>
                                <MobileLinkItem displayName={'Home'} link={paths.HOME} />
                                <MobileLinkItem displayName={'About'} link={paths.ABOUT} />
                                <MobileLinkItem displayName={'Projects'} link={paths.PROJECTS} />
                            </div>
                        </div>
                        <div className='py-10'>
                            <div className='bg-[#F4F4F4] rounded-full w-fit mx-auto text-[#707070] px-5 py-2 mt-20'>
                                Designed by <Link className='text-[#473BF0] font-bold'>Josh⚡</Link> & Built by <Link className='text-[#473BF0] font-bold'>Fvture🚀</Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Header