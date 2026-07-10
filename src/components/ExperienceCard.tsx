import { motion } from 'motion/react'

import { imageSrc } from '../lib/sanity'
import type { Experience } from '../types'

type Props = { experience: Experience }

const fmt = (date: string) => new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

const ExperienceCard = ({ experience }: Props) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className='relative flex h-[520px] w-[85vw] max-w-xl shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-gray-20 bg-gray-16 md:max-w-2xl'>
      {/* sun accent bar */}
      <span className='h-1 w-full shrink-0 bg-sun/80' />

      <div className='flex min-h-0 flex-1 flex-col p-6 md:p-8'>
        {/* header */}
        <header className='flex items-center gap-4 border-b border-gray-20 pb-5'>
          <img
            src={imageSrc(experience.companyImage, 200)}
            alt={experience.company}
            loading='lazy'
            decoding='async'
            className='h-16 w-16 shrink-0 rounded-full object-cover object-center md:h-20 md:w-20'
          />
          <div className='min-w-0'>
            <h3 className='text-lg font-bold leading-tight md:text-2xl'>{experience.jobTitle}</h3>
            <p className='font-semibold text-sun md:text-lg'>{experience.company}</p>
            <p className='mt-1.5 flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-gray-400'>
              <span>
                {fmt(experience.dateStarted)} – {experience.isCurrentlyWorkingHere ? 'Present' : fmt(experience.dateEnded)}
              </span>
              {experience.isCurrentlyWorkingHere && (
                <span className='rounded-full bg-sun/15 px-2 py-0.5 font-semibold text-sun'>Current</span>
              )}
            </p>
          </div>
        </header>

        {/* technologies */}
        {experience.technologies?.length > 0 && (
          <div className='flex flex-wrap gap-2 py-4'>
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

        {/* highlights */}
        <ul className='min-h-0 flex-1 space-y-3 overflow-y-auto pr-2 text-sm leading-relaxed text-gray-300 scrollbar-thin scrollbar-thumb-sun/60 md:text-base'>
          {experience?.points?.map((point, i) => (
            <li key={i} className='flex gap-3'>
              <span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sun' />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}

export default ExperienceCard
