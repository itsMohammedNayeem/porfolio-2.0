import { motion } from 'motion/react'
import { useState } from 'react'

import { imageSrc } from '../lib/sanity'
import type { Skill as SkillType } from '../types'

type Props = {
  skill: SkillType
  directionLeft?: boolean
}

const Skill = ({ skill, directionLeft }: Props) => {
  // Desktop reveals the proficiency on hover; touch flips it on tap. The % is
  // always in the aria-label so screen readers get it without any interaction.
  const [active, setActive] = useState(false)

  return (
    <button
      type='button'
      onClick={() => setActive(a => !a)}
      aria-label={`${skill.title}: ${skill.progress}% proficiency`}
      className='group relative flex rounded-full bg-transparent p-0'>
      <motion.img
        className={`h-14 w-14 rounded-full object-cover transition duration-300 ease-in-out group-hover:grayscale md:h-18 md:w-18 lg:h-20 lg:w-20 xl:h-24 xl:w-24 ${active ? 'grayscale' : ''}`}
        src={imageSrc(skill.image, 200)}
        alt=''
        loading='lazy'
        decoding='async'
        // Keep the offset small: a large x pushes edge-column icons fully
        // off-screen on mobile, so whileInView never fires and they stay stuck.
        initial={{ x: directionLeft ? -50 : 50, opacity: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      />

      <div
        className={`absolute z-0 flex h-14 w-14 items-center justify-center rounded-full transition duration-300 ease-in-out group-hover:bg-white group-hover:opacity-80 md:h-18 md:w-18 lg:h-20 lg:w-20 xl:h-24 xl:w-24 ${active ? 'bg-white opacity-80' : 'opacity-0'}`}>
        <p className='text-sm font-bold text-black lg:text-3xl'>{skill.progress}%</p>
      </div>
    </button>
  )
}

export default Skill
