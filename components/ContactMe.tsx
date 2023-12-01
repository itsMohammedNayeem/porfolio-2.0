'use client'

import { motion } from 'framer-motion'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { PageInfo } from '@/typings'
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/solid'

type Props = { pageInfo: PageInfo }
type Inputs = {
  name: string
  email: string
  subject: string
  message: string
}

const ContactMe = ({ pageInfo }: Props) => {
  const { register, handleSubmit } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = formData => {
    window.location.href = `mailto:${pageInfo.email}?subject=${formData.subject}&body=Hi, my name is ${formData.name}. ${formData.message}`
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className='relative z-0 mx-auto flex h-screen max-w-7xl flex-col items-center justify-evenly px-10 text-center md:flex-row md:text-left'>
      <h3 className='absolute top-24 text-2xl uppercase tracking-[20px] text-gray-500'>Contact Me</h3>

      <div className='flex flex-col space-y-10'>
        <h4 className='text-center text-4xl font-semibold'>
          I have got just the right skills to help you with your project.{' '}
          <span className='underline underline-offset-4 decoration-sun/50'>Let&apos;s talk!</span>
        </h4>

        <div className='space-y-10'>
          <div className='flex items-center justify-center space-x-5'>
            <PhoneIcon className='h-7 w-7 animate-pulse text-sun' />
            <p className='text-2xl'>{pageInfo.phoneNumber}</p>
          </div>

          <div className='flex items-center justify-center space-x-5'>
            <EnvelopeIcon className='h-7 w-7 animate-pulse text-sun' />
            <a className='text-2xl' href={`mailto:${pageInfo.email}`}>
              {pageInfo.email}
            </a>
          </div>

          <div className='flex items-center justify-center space-x-5'>
            <MapPinIcon className='h-7 w-7 animate-pulse text-sun' />
            <p className='text-2xl'>{pageInfo.address}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='mx-auto flex w-fit flex-col space-y-2'>
          <div className='flex space-x-2'>
            <input {...register('name')} className='contactInput' type='text' placeholder='Name' />
            <input {...register('email')} className='contactInput' type='email' placeholder='Email' />
          </div>

          <input {...register('subject')} className='contactInput' type='text' placeholder='Subject' />

          <textarea {...register('message')} className='contactInput' placeholder='Message' />

          <button className='text-black rounded-md bg-sun px-10 py-5 text-lg font-bold' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </motion.div>
  )
}

export default ContactMe
