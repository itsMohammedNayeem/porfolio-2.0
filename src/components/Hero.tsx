import { Cursor, useTypewriter } from 'react-simple-typewriter'

import { imageSrc } from '../lib/sanity'
import type { PageInfo } from '../types'
import BackgroundCircles from './BackgroundCircles'

type Props = { pageInfo: PageInfo }

const Hero = ({ pageInfo }: Props) => {
  const [text] = useTypewriter({
    words: [`Hi, I am ${pageInfo?.name}`, 'Guy-who-loves-Coffee.tsx', '<ButLovesToCodeMore />'],
    loop: true,
    delaySpeed: 2000
  })

  return (
    <div className='flex h-screen flex-col items-center justify-center space-y-8 overflow-hidden text-center'>
      <BackgroundCircles />

      <img
        src={pageInfo?.heroImage && imageSrc(pageInfo.heroImage, 256)}
        className='relative mx-auto h-32 w-32 rounded-full object-cover'
        alt='Profile picture'
        width={128}
        height={128}
        fetchPriority='high'
      />

      <div className='z-20 flex flex-col items-center px-4'>
        <p className='text-xs uppercase leading-relaxed tracking-[8px] text-gray-500 sm:tracking-[12px] md:text-sm md:tracking-[15px]'>
          {pageInfo?.role}
        </p>

        <h1 className='flex min-h-24 items-center justify-center py-6 text-2xl font-semibold text-white md:min-h-20 md:text-5xl lg:text-6xl'>
          <span className='mr-3 font-mono'>{text}</span>
          <Cursor cursorColor='#D92815' />
        </h1>

        <nav className='mt-6 flex flex-wrap items-center justify-center gap-3 md:mt-10'>
          <a href='#about' className='heroButton'>
            About
          </a>
          <a href='#experience' className='heroButton'>
            Experience
          </a>
          <a href='#skills' className='heroButton'>
            Skills
          </a>
          <a href='#projects' className='heroButton'>
            Projects
          </a>
        </nav>
      </div>
    </div>
  )
}

export default Hero
