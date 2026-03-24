import React from 'react'
import { Link } from 'react-router-dom'
import { SOCIALS } from '../../data/socials.data'
import { paths } from '../../constants/paths.constants'

function Footer() {

    const LinkItem = ({icon, name, link_to}) => {
        return(
            <Link to={link_to} target='_blank' className='w-fit rounded-lg bg-[#FAFAFA] px-3 py-2 flex items-center gap-2 text-lg md:text-xl text-[#707070]'>
                <img className='max-w-[30px] md:max-w-[50px]' src={icon} alt='name' /> <p>{name}</p>
            </Link>
        )
    }

    return (
        <div className='w-full px-[20px] mt-20 md:mt-40 font-inter pb-10' id='footer'>
            <div className='max-w-[1200px] mx-auto'>
                <h1 className='text-center font-bold text-4xl md:text-6xl'>Let's connect ⚡️</h1>
                <div className='w-full flex flex-wrap py-10 items-center justify-center gap-x-10 md:gap-x-20 gap-y-10'>
                    {SOCIALS.map((i, idx) => (
                        <LinkItem
                            name={i.name}
                            icon={i.img}
                            link_to={i.link_to}
                            key={idx}
                        />
                    ))}
                </div>
                <div className='bg-[#F4F4F4] rounded-full w-fit mx-auto text-[#707070] px-5 py-2 mt-20'>
                    Designed by <Link to={paths.HOME} className='text-[#473BF0] font-bold'>Josh ⚡</Link> & Built by <Link to={'https://ifeanyicodes.com'} target='_blank' className='text-[#473BF0] font-bold'>Ifeanyi 🚀</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer