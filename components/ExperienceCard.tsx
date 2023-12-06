import { motion } from 'framer-motion'
import React from 'react'

import { urlFor } from '@/sanity'
import { Experience } from '@/typings'

type Props = { experience: Experience }

const ExperienceCard = ({ experience }: Props) => {
  return (
    <article className='flex h-[510px] w-[320px] flex-shrink-0 cursor-pointer snap-center flex-col items-center space-y-7 overflow-hidden rounded-lg bg-gray-16 p-5 opacity-40 transition-opacity duration-200 hover:opacity-100 md:w-[600px] xl:w-[900px] xl:p-10'>
      <div className='px-0 md:px-10'>
        <div className='flex flex-row items-center justify-center gap-2 md:gap-4'>
          <motion.img
            initial={{
              y: -100,
              opacity: 0
            }}
            transition={{ duration: 1.2 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            src={urlFor(experience.companyImage).url()}
            className='h-20 w-20 rounded-full object-cover object-center md:h-32 md:w-32 xl:h-[150px] xl:w-[150px]'
          />
          <div>
            <h4 className='text-xs font-light md:text-2xl'>{experience.jobTitle}</h4>
            <p className='mt-1 text-base font-bold md:text-3xl'>{experience.company}</p>
            <p className='py-2 text-xs uppercase text-gray-300 md:py-3 xl:py-5'>
              {new Date(experience.dateStarted).toDateString()} -{' '}
              {experience.isCurrentlyWorkingHere ? 'Present' : new Date(experience.dateEnded).toDateString()}
            </p>
          </div>
        </div>

        <div className='my-2 flex flex-wrap gap-y-2 space-x-1 md:my-3 md:space-x-2'>
          {/* <img
            src="https://live.staticflickr.com/8065/8220185645_dd4c773717.jpg"
            className="w-10 h-10 rounded-full "
            alt="React"
          />
          <img
            src="https://live.staticflickr.com/8065/8220185645_dd4c773717.jpg"
            className="w-10 h-10 rounded-full "
            alt="React"
          />
          <img
            src="https://live.staticflickr.com/8065/8220185645_dd4c773717.jpg"
            className="w-10 h-10 rounded-full "
            alt="React"
          /> */}

          {experience.technologies.map(technology => (
            <img
              key={technology._id}
              className='h-4 w-4 rounded-full md:h-8 md:w-8'
              src={urlFor(technology.image).url()}
              alt={technology.title}
            />
          ))}
        </div>

        <ul className='scrollbar-track-black ml-5 h-[320px] list-disc space-y-2 overflow-y-scroll text-xs scrollbar-thin scrollbar-thumb-sun md:text-lg lg:space-y-4'>
          {experience?.points?.map((point, i) => <li key={i}>{point}</li>)}
        </ul>
      </div>
    </article>
  )
}

export default ExperienceCard
