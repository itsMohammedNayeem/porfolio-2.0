import { motion } from 'framer-motion'
import React from 'react'

import { urlFor } from '@/sanity'
import { Experience } from '@/typings'

type Props = { experience: Experience }

const ExperienceCard = ({ experience }: Props) => {
  return (
    <article className='flex w-[500px] flex-shrink-0 cursor-pointer snap-center flex-col items-center space-y-7 overflow-hidden rounded-lg bg-[#292929] p-10 opacity-40 transition-opacity duration-200 hover:opacity-100 md:w-[600px] xl:w-[900px]'>
      <motion.img
        initial={{
          y: -100,
          opacity: 0
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        src={urlFor(experience.companyImage).url()}
        className='h-32 w-32 rounded-full object-cover object-center xl:h-[200px] xl:w-[200px]'
      />

      <div className='px-0 md:px-10'>
        <h4 className='text-4xl font-light'>{experience.jobTitle}</h4>
        <p className='mt-1 text-2xl font-bold'>{experience.company}</p>
        <p className='py-5 uppercase text-gray-300'>
          {new Date(experience.dateStarted).toDateString()} -{' '}
          {experience.isCurrentlyWorkingHere ? 'Present' : new Date(experience.dateEnded).toDateString()}
        </p>

        <div className='my-4 flex space-x-2'>
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
              className='h-10 w-10 rounded-full'
              src={urlFor(technology.image).url()}
              alt={technology.title}
            />
          ))}
        </div>

        <ul className='scrollbar-track-black ml-5 h-[280px] list-disc space-y-4 overflow-y-scroll text-lg scrollbar-thin scrollbar-thumb-sun'>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>

          {experience?.points?.map((point, i) => <li key={i}>{point}</li>)}
        </ul>
      </div>
    </article>
  )
}

export default ExperienceCard
