'use client'

import { motion } from 'framer-motion'
import React from 'react'

import { Experience } from '@/typings'

import ExperienceCard from './ExperienceCard'

type Props = { experiences: Experience[] }

const WorkExperience = ({ experiences }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className='relative mx-auto flex h-screen max-w-full flex-col items-center justify-evenly overflow-hidden md:px-10 text-left md:flex-row'>
      <h3 className='absolute top-20 text-2xl uppercase tracking-[20px] text-gray-500 md:top-24'>Experience</h3>
      <div className='flex w-full snap-x snap-mandatory space-x-5 overflow-x-scroll p-10 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-sun/80'>
        {experiences
          ?.sort((a, b) => b.jobId - a.jobId)
          .map(experience => <ExperienceCard key={experience.jobId} experience={experience} />)}
      </div>
    </motion.div>
  )
}

export default WorkExperience
