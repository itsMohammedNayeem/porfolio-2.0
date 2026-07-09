import { motion } from 'motion/react'
import { useRef, useState } from 'react'

import { imageSrc } from '../lib/sanity'
import type { Project } from '../types'

type Props = { projects: Project[] }

const Projects = ({ projects }: Props) => {
  const sorted = [...(projects ?? [])].sort((a, b) => a.projectId - b.projectId)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const onScroll = () => {
    const el = scrollRef.current
    if (el) setActive(Math.round(el.scrollLeft / el.clientWidth))
  }

  const goTo = (i: number) => {
    const el = scrollRef.current
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className='relative z-0 mx-auto flex h-screen max-w-full flex-col items-center justify-evenly overflow-hidden text-left md:flex-row'>
      <h2 className='sectionLabel absolute top-20 md:top-24'>Projects</h2>

      <div
        ref={scrollRef}
        onScroll={onScroll}
        className='relative z-20 flex w-full snap-x snap-mandatory overflow-y-hidden overflow-x-auto scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-sun'>
        {sorted.map(project => (
          <div
            key={project.projectId}
            className='flex h-screen w-screen shrink-0 snap-center flex-col items-center justify-center space-y-5 p-20 md:p-44'>
            <motion.img
              initial={{ opacity: 0, y: -300 }}
              transition={{ duration: 1.2 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              src={project?.image && imageSrc(project.image, 800)}
              className='h-[250px] w-[350px] cursor-pointer rounded-xl object-cover shadow-xl transition-shadow hover:shadow-2xl hover:shadow-sun/20 md:h-[350px] md:w-[500px]'
              alt={project.title}
              loading='lazy'
              decoding='async'
            />

            <div className='max-w-6xl space-y-3 px-0 md:space-y-5 md:px-10'>
              <h3 className='text-1xl text-center font-semibold'>
                <span className='underline decoration-sun underline-offset-4'>
                  Project {project.projectId} of {projects.length}:
                </span>{' '}
                {project.title}
              </h3>

              {project?.technologies?.length > 0 && (
                <div className='flex items-center justify-center space-x-2'>
                  {project.technologies.map(technology => (
                    <img
                      key={technology._id}
                      className='h-6 w-6 rounded-full object-cover md:h-10 md:w-10'
                      src={imageSrc(technology.image, 80)}
                      alt={technology.title}
                      loading='lazy'
                      decoding='async'
                    />
                  ))}
                </div>
              )}

              <p className='text-center text-sm md:text-left'>{project.summary}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Swipe indicator — shows position across the horizontal project carousel */}
      <div className='absolute bottom-16 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 md:bottom-10'>
        {sorted.map((project, i) => (
          <button
            key={project.projectId}
            type='button'
            onClick={() => goTo(i)}
            aria-label={`Go to project ${i + 1} of ${sorted.length}`}
            aria-current={active === i}
            className={`h-2 rounded-full transition-all duration-300 ${
              active === i ? 'w-6 bg-sun' : 'w-2 bg-gray-500 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      <div className='absolute left-0 top-[30%] h-[500px] w-full -skew-y-12 bg-sun/10' />
    </motion.div>
  )
}

export default Projects
