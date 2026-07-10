import { motion } from 'motion/react'

import { imageSrc } from '../lib/sanity'
import type { Experience } from '../types'

type Props = { experience: Experience }

const fmt = (date: string) => new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

/**
 * Detail panel for the currently selected role in the Experience tab layout.
 * Keyed on the experience id by the parent so it re-animates on tab change.
 */
const ExperienceCard = ({ experience }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className='flex flex-col gap-5'>
      <div className='flex items-center gap-4'>
        <img
          src={imageSrc(experience.companyImage, 200)}
          alt={experience.company}
          loading='lazy'
          decoding='async'
          className='h-14 w-14 shrink-0 rounded-full object-cover object-center md:h-16 md:w-16'
        />
        <div className='min-w-0'>
          <h3 className='text-lg font-bold leading-tight md:text-2xl'>
            {experience.jobTitle} <span className='text-sun'>@ {experience.company}</span>
          </h3>
          <p className='mt-1 flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-gray-400'>
            <span>
              {fmt(experience.dateStarted)} – {experience.isCurrentlyWorkingHere ? 'Present' : fmt(experience.dateEnded)}
            </span>
            {experience.isCurrentlyWorkingHere && (
              <span className='rounded-full bg-sun/15 px-2 py-0.5 font-semibold text-sun'>Current</span>
            )}
          </p>
        </div>
      </div>

      {experience.technologies?.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {experience.technologies.map(technology => (
            <img
              key={technology._id}
              src={imageSrc(technology.image, 64)}
              alt={technology.title}
              title={technology.title}
              loading='lazy'
              decoding='async'
              className='h-7 w-7 rounded-full object-cover'
            />
          ))}
        </div>
      )}

      <ul className='max-h-[42vh] space-y-3 overflow-y-auto pr-2 text-sm leading-relaxed text-gray-300 scrollbar-thin scrollbar-thumb-sun/60 md:text-base'>
        {experience?.points?.map((point, i) => (
          <li key={i} className='flex gap-3'>
            <span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sun' />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default ExperienceCard
