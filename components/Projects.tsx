'use client'

import { motion } from 'framer-motion'
import React from 'react'

import { urlFor } from '@/sanity'
import { Project } from '@/typings'

type Props = { projects: Project[] }

const Projects = ({ projects }: Props) => {
  const test = console.log(projects)
  console.log(test)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className='relative z-0 mx-auto flex h-screen max-w-full flex-col items-center justify-evenly overflow-hidden text-left md:flex-row'>
      <h3 className='absolute top-24 text-2xl uppercase tracking-[20px] text-gray-500'>Projects</h3>

      <div className='relative z-20 flex w-full snap-x snap-mandatory overflow-y-hidden overflow-x-scroll scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-sun'>
        {projects?.map((project, i) => (
          <div
            key={i}
            className='flex h-screen w-screen flex-shrink-0 snap-center flex-col items-center justify-center space-y-5 p-20 md:p-44'>
            <motion.img
              initial={{ opacity: 0, y: -300 }}
              transition={{ duration: 1.2 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              src={urlFor(project?.image).url()}
              alt=''
            />

            <div className='max-w-6xl space-y-10 px-0 md:px-10'>
              <h4 className='text-center text-4xl font-semibold'>
                <span className='underline underline-offset-4 decoration-sun'>
                  Case study {i + 1} of {projects.length}:
                </span>{' '}
                {project.title}
              </h4>

              {project?.technologies?.length > 0 && (
                <div className='flex items-center justify-center space-x-2'>
                  {project.technologies.map(technology => (
                    <img
                      key={technology._id}
                      className='h-10 w-10 rounded-full'
                      src={urlFor(technology.image).url()}
                      alt={technology.title}
                    />
                  ))}
                </div>
              )}

              <p className='text-center text-lg md:text-left'>{project.summary}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='absolute left-0 top-[30%] h-[500px] w-full -skew-y-12 bg-sun/10' />
    </motion.div>
  )
}

export default Projects
