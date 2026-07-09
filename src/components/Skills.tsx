import { motion } from 'motion/react'

import type { Skill as SkillType } from '../types'
import Skill from './Skill'

type Props = { skills: SkillType[] }

const Skills = ({ skills }: Props) => {
  const sorted = [...(skills ?? [])].sort((a, b) => b.progress - a.progress)
  const half = Math.ceil(sorted.length / 2)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className='relative mx-auto flex min-h-screen max-w-[2000px] flex-col items-center justify-center gap-8 px-gutter py-24 text-center'>
      <div className='flex flex-col items-center gap-2'>
        <h2 className='sectionLabel'>Skills</h2>
        <h3 className='text-sm uppercase tracking-[3px] text-gray-400'>Hover or tap a skill for proficiency</h3>
      </div>

      <div className='grid grid-cols-4 place-items-center gap-3 sm:gap-4 lg:grid-cols-8 md:gap-5'>
        {sorted.slice(0, half).map(skill => (
          <Skill key={skill._id} skill={skill} />
        ))}
        {/* Second half slides in from the opposite direction */}
        {sorted.slice(half).map(skill => (
          <Skill key={skill._id} skill={skill} directionLeft />
        ))}
      </div>
    </motion.div>
  )
}

export default Skills
