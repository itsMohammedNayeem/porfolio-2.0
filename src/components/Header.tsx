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
          // Drop the stale "Resume" entry (a defunct Google+ glyph linking to an
          // old Google Drive file) — the dedicated résumé download replaces it.
          ?.filter(social => !social.url?.includes('drive.google.com'))
          .sort((a, b) => a.socialId - b.socialId)
          .map(social => (
            <SocialIcon
              key={social.socialId}
              url={social.url}
              fgColor='currentColor'
              bgColor='transparent'
              className='text-gray-500 transition duration-200 hover:text-sun motion-safe:hover:scale-110'
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

        {/* Same react-social-icons component as the left row, so it renders
            identically. The label is a separate sibling link (not a wrapper)
            to keep it a single, valid anchor. */}
        <div className='flex flex-row items-center'>
          <SocialIcon
            network='email'
            url='#contact'
            fgColor='currentColor'
            bgColor='transparent'
            aria-label='Get in touch'
            className='text-gray-500 transition duration-200 hover:text-sun motion-safe:hover:scale-110'
          />
          <a
            href='#contact'
            className='hidden text-sm uppercase text-gray-400 transition-colors duration-200 hover:text-sun md:inline-flex'>
            Get in touch
          </a>
        </div>
      </motion.div>
    </header>
  )
}

export default Header
