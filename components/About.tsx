'use client'

import { motion } from 'framer-motion'
import React from 'react'

import { urlFor } from '@/sanity'
import { PageInfo } from '@/typings'

type Props = { pageInfo: PageInfo }

const About = ({ pageInfo }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className='relative mx-auto flex h-screen max-w-7xl flex-col items-center justify-evenly px-10 text-center md:flex-row md:text-left'>
      <h3 className='absolute top-24 text-2xl uppercase tracking-[20px] text-gray-500'>About</h3>

      <motion.img
        // src="https://scontent.flcj1-1.fna.fbcdn.net/v/t39.30808-6/406340275_7042559135801737_4998715202098811515_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=TIYq2Hsj8tEAX_6q1ak&_nc_oc=AQn-bQUKSMrdxxFI50wRxqf202KyY7F2YzFbGQUbbYjg4QQsQxwKDUziJSmyHw8wK1Y&_nc_ht=scontent.flcj1-1.fna&oh=00_AfCbmbPfZv5VdXnIiDUg1Ua5WoQ_hfwd430QH46B6ocMwA&oe=656C9049"
        src={urlFor(pageInfo?.profilePic).url()}
        initial={{ x: -200, opacity: 0 }}
        transition={{ duration: 1.2 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        className='-mb-20 h-56 w-56 flex-shrink-0 rounded-full object-cover md:mb-0 md:h-96 md:w-64 md:rounded-lg xl:h-[600px] xl:w-[500px]'
      />

      <div className='space-y-10 px-0 md:px-10'>
        <h4 className='text-4xl font-semibold'>
          Here is a <span className='underline decoration-sun'>little</span> background
        </h4>

        <p className='text-sm'>
          {/* With 4 years of expertise in React JS, JavaScript, Tailwind, Redux,
          Typescript, and ShadCn, coupled with a comprehensive 12-year
          background in Software Development. */}
          {pageInfo?.backgroundInformation}
        </p>
      </div>
    </motion.div>
  )
}

export default About
