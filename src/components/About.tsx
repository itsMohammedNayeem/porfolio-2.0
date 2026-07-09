import { motion } from 'motion/react'

import { imageSrc } from '../lib/sanity'
import type { PageInfo } from '../types'

type Props = { pageInfo: PageInfo }

const About = ({ pageInfo }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className='relative mx-auto flex h-screen max-w-7xl flex-col items-center justify-start px-gutter pt-32 text-center md:flex-row md:justify-evenly md:pt-0 md:text-left'>
      <h2 className='sectionLabel absolute top-20 md:top-24'>About</h2>

      <motion.img
        src={pageInfo?.profilePic && imageSrc(pageInfo.profilePic, 640)}
        initial={{ x: -200, opacity: 0 }}
        transition={{ duration: 1.2 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        alt='Profile picture'
        loading='lazy'
        decoding='async'
        className='mb-3 h-44 w-44 shrink-0 rounded-full object-cover md:mb-0 md:h-96 md:w-64 md:rounded-lg xl:h-[600px] xl:w-[500px]'
      />

      <div className='max-sm:max-h-[500px] space-y-4 px-0 text-left md:space-y-10 md:px-10 md:text-left'>
        <h3 className='text-center text-4xl font-semibold md:text-left'>
          Here is a <span className='underline decoration-sun underline-offset-4'>little</span> background
        </h3>

        <p className='max-sm:max-h-[450px] overflow-y-auto text-sm leading-relaxed scrollbar-thin scrollbar-thumb-sun/80 md:text-base'>
          {pageInfo?.backgroundInformation}
        </p>
      </div>
    </motion.div>
  )
}

export default About
