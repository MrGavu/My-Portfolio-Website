import React from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import { PROJECTS } from '../../data/projects.data'
import ProjectsItem from '../../components/projects/ProjectsItem'

function Projects() {
    return (
        <div className='w-full bg-white font-inter overflow-x-hidden'>
            <Header selected={'projects'} />
            <div className='mt-10 md:mt-20'>
                <h1 className='max-w-[1200px] mx-auto px-[20px] text-3xl md:text-6xl pb-10'>My Projects</h1>
                {PROJECTS.map((i, idx) => (
                    <ProjectsItem
                        title={i.title}
                        detials={i.details}
                        link={i.link}
                        image={i.image}
                        key={idx}
                        alternate={((idx + 1) % 2) === 0}
                    />
                ))}
            </div>
            <Footer />
        </div>
    )
}

export default Projects