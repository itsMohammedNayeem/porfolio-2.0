import { motion } from 'motion/react'
import { SocialIcon } from 'react-social-icons'

import type { Social } from '../types'
import ResumeDownload from './ResumeDownload'

type Props = { socials: Social[] }

const Header = ({ socials }: Props) => {
  return (
    <header className='sticky top-0 z-20 mx-auto flex max-w-7xl items-start justify-between p-5 xl:items-center'>
      <motion.div
        initial={{
          x: -500,
          opacity: 0,
          scale: 0.5
        }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className='flex flex-row items-center'>
        {socials
          ?.sort((a, b) => a.socialId - b.socialId)
          .map(social => (
            <SocialIcon
              key={social.socialId}
              url={social.url}
              fgColor='currentColor'
              bgColor='transparent'
              className='text-gray-500 transition-colors duration-200 hover:text-sun'
            />
          ))}
      </motion.div>

      <motion.div
        initial={{
          x: 500,
          opacity: 0,
          scale: 0.5
        }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className='flex flex-row items-center gap-3 md:gap-4'>
        <ResumeDownload />

        <a href='#contact' className='flex flex-row items-center'>
          <SocialIcon
            network='email'
            fgColor='currentColor'
            bgColor='transparent'
            className='text-gray-500 transition-colors duration-200 hover:text-sun'
            url=''
          />
          <p className='hidden cursor-pointer text-sm uppercase text-gray-400 md:inline-flex'>Get in touch</p>
        </a>
      </motion.div>
    </header>
  )
}

export default Header
