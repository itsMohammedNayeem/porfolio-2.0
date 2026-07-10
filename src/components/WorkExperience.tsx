import { motion } from 'motion/react'
import { useState } from 'react'

import type { Experience } from '../types'
import ExperienceCard from './ExperienceCard'

type Props = { experiences: Experience[] }

const WorkExperience = ({ experiences }: Props) => {
  const sorted = [...(experiences ?? [])].sort((a, b) => b.jobId - a.jobId)
  const [active, setActive] = useState(0)
  const current = sorted[active]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className='relative mx-auto flex h-screen w-full max-w-5xl flex-col items-center justify-center gap-10 px-gutter'>
      <h2 className='sectionLabel absolute top-20 md:top-24'>Experience</h2>

      <div className='mt-16 flex w-full flex-col gap-6 md:mt-0 md:flex-row md:gap-10'>
        {/* Company tabs — horizontal strip on mobile, vertical rail on desktop */}
        <div
          role='tablist'
          aria-label='Companies'
          className='-mx-gutter flex gap-1 overflow-x-auto px-gutter pb-1 scrollbar-none md:mx-0 md:w-52 md:shrink-0 md:flex-col md:gap-0 md:overflow-visible md:px-0'>
          {sorted.map((experience, i) => (
            <button
              key={experience.jobId}
              type='button'
              role='tab'
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={`shrink-0 whitespace-nowrap px-4 py-3 text-left text-sm font-medium transition-colors duration-200 md:border-l-2 ${
                active === i
                  ? 'border-b-2 border-sun text-sun md:border-b-0 md:border-l-2 md:bg-sun/5'
                  : 'border-b-2 border-transparent text-gray-400 hover:text-white md:border-l-2 md:hover:bg-gray-16'
              }`}>
              {experience.company}
            </button>
          ))}
        </div>

        {/* Detail panel for the selected role */}
        <div className='min-h-[22rem] flex-1'>
          <ExperienceCard key={current?._id} experience={current} />
        </div>
      </div>
    </motion.div>
  )
}

export default WorkExperience
