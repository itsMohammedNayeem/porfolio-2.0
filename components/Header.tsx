'use client'

import cx from 'classnames'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import { SocialIcon } from 'react-social-icons'

import { Social } from '@/typings'

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
        {/* social icons */}
        {/* <SocialIcon
          fgColor="gray"
          bgColor="transparent"
          url="https://www.linkedin.com/in/itsmohammednayeem/"
        />
        <SocialIcon
          fgColor="gray"
          bgColor="transparent"
          url="https://twitter.com/fmaker123"
        />
        <SocialIcon
          fgColor="gray"
          bgColor="transparent"
          url="https://www.instagram.com/itsmohammednayeem/"
        />
        <SocialIcon
          fgColor="gray"
          bgColor="transparent"
          url="https://github.com/itsMohammedNayeem/"
        />
        <SocialIcon
          fgColor="gray"
          bgColor="transparent"
          url="https://www.facebook.com/iammohammednayeem/"
        /> */}

        {socials?.map(social => (
          <SocialIcon
            key={social._id}
            url={social.url}
            fgColor='currentColor'
            bgColor='transparent'
            className='text-gray-500 transition-colors duration-200 hover:text-sun'
          />
        ))}
      </motion.div>

      <Link href='#contact'>
        <motion.div
          initial={{
            x: 500,
            opacity: 0,
            scale: 0.5
          }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className='flex flex-row items-center'>
          <SocialIcon network='email' fgColor='gray' bgColor='transparent' url='' />
          <p className='hidden cursor-pointer text-sm uppercase text-gray-400 md:inline-flex'>Get in touch</p>
        </motion.div>
      </Link>
    </header>
  )
}

export default Header
