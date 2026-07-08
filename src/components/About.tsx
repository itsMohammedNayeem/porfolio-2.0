import { motion } from 'motion/react'

import { urlFor } from '../lib/sanity'
import type { PageInfo } from '../types'

type Props = { pageInfo: PageInfo }

const About = ({ pageInfo }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className='relative mx-auto flex h-screen max-w-7xl flex-col items-center justify-center px-10 text-center md:flex-row md:justify-evenly md:text-left'>
      <h2 className='absolute top-20 text-2xl uppercase tracking-[20px] text-gray-500 md:top-24'>About</h2>

      <motion.img
        src={urlFor(pageInfo?.profilePic).url()}
        initial={{ x: -200, opacity: 0 }}
        transition={{ duration: 1.2 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        alt='Profile picture'
        className='mb-3 h-44 w-44 shrink-0 rounded-full object-cover md:mb-0 md:h-96 md:w-64 md:rounded-lg xl:h-[600px] xl:w-[500px]'
      />

      <div className='max-sm:max-h-[500px] space-y-4 px-0 md:space-y-10 md:px-10'>
        <h3 className='text-4xl font-semibold'>
          Here is a <span className='underline decoration-sun underline-offset-4'>little</span> background
        </h3>

        <p className='text-balance overflow-y-scrollbar-track-gray-400/20 max-sm:max-h-[450px] overflow-y-auto text-sm scrollbar-thin scrollbar-thumb-sun/80'>
          {pageInfo?.backgroundInformation}
        </p>
      </div>
    </motion.div>
  )
}

export default About
