import { motion } from 'framer-motion'
import React from 'react'

import { urlFor } from '@/sanity'
import { Experience } from '@/typings'

type Props = { experience: Experience }

const ExperienceCard = ({ experience }: Props) => {
  return (
    <article className='flex w-[320px] h-[510px] flex-shrink-0 cursor-pointer snap-center flex-col items-center space-y-7 overflow-hidden rounded-lg bg-gray-16 p-5 xl:p-10 opacity-40 transition-opacity duration-200 hover:opacity-100 md:w-[600px] xl:w-[900px]'>
      <motion.img
        initial={{
          y: -100,
          opacity: 0
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        src={urlFor(experience.companyImage).url()}
        className='h-20 w-20 md:h-32 md:w-32 rounded-full object-cover object-center xl:h-[200px] xl:w-[200px]'
      />

      <div className='px-0 md:px-10'>
        <h4 className='md:text-2xl text-xs font-light'>{experience.jobTitle}</h4>
        <p className='mt-1 text-base md:text-3xl font-bold'>{experience.company}</p>
        <p className='py-2 md:py-3 xl:py-5 text-xs uppercase text-gray-300'>
          {new Date(experience.dateStarted).toDateString()} -{' '}
          {experience.isCurrentlyWorkingHere ? 'Present' : new Date(experience.dateEnded).toDateString()}
        </p>

        <div className='my-2 md:my-3 lg:my-4 flex flex-wrap gap-y-2 space-x-1 md:space-x-2 lg:space-x-4'>
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
              className='h-5 w-5 md:h-10 md:w-10 rounded-full'
              src={urlFor(technology.image).url()}
              alt={technology.title}
            />
          ))}
        </div>

        <ul className='scrollbar-track-black ml-5 h-[320px] list-disc space-y-2 lg:space-y-4 overflow-y-scroll text-xs md:text-lg scrollbar-thin scrollbar-thumb-sun'>
          {experience?.points?.map((point, i) => <li key={i}>{point}</li>)}
        </ul>
      </div>
    </article>
  )
}

export default ExperienceCard
