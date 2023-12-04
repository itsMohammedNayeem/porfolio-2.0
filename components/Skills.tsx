'use client'

import { motion } from 'framer-motion'
import React from 'react'

import { Skill as SkillType } from '@/typings'

import Skill from './Skill'

type Props = { skills: SkillType[] }

const Skills = ({ skills }: Props) => {
  skills?.sort((a, b) => b.progress - a.progress)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className='relative mx-auto flex min-h-screen max-w-[2000px] flex-col items-center justify-center text-center md:text-left xl:flex-row xl:space-y-0 xl:px-10'>
      <h3 className='absolute top-24 text-2xl uppercase tracking-[20px] text-gray-500'>Skills</h3>

      <h3 className='absolute top-36 uppercase tracking-[3px]'>Hover over a skill for current proficiency</h3>

      <div className='grid grid-cols-4 gap-5'>
        {skills?.slice(0, skills.length / 2).map(skill => <Skill key={skill._id} skill={skill} />)}

        {/* Get second half of skills and map with direction left */}
        {skills
          ?.slice(skills.length / 2, skills.length)
          .map(skill => <Skill key={skill._id} skill={skill} directionLeft />)}
      </div>
    </motion.div>
  )
}

export default Skills
