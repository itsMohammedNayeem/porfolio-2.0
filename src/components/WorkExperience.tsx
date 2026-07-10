import { motion } from 'motion/react'
import { useRef, useState } from 'react'

import type { Experience } from '../types'
import ExperienceCard from './ExperienceCard'

type Props = { experiences: Experience[] }

const WorkExperience = ({ experiences }: Props) => {
  const sorted = [...(experiences ?? [])].sort((a, b) => b.jobId - a.jobId)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const onScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const center = el.scrollLeft + el.clientWidth / 2
    let best = 0
    let bestDist = Infinity
    Array.from(el.children).forEach((c, i) => {
      const card = c as HTMLElement
      const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center)
      if (dist < bestDist) {
        bestDist = dist
        best = i
      }
    })
    setActive(best)
  }

  const goTo = (i: number) => {
    const el = scrollRef.current
    if (!el) return
    const card = el.children[i] as HTMLElement
    // Jump to the card. Native smooth scrollTo is cancelled by
    // scroll-snap-type: mandatory here, so set scrollLeft directly.
    el.scrollLeft = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className='relative mx-auto flex h-screen w-full flex-col items-center justify-center overflow-hidden'>
      <h2 className='sectionLabel absolute top-20 md:top-24'>Experience</h2>

      <div
        ref={scrollRef}
        onScroll={onScroll}
        className='flex w-full snap-x snap-mandatory items-center gap-6 overflow-x-auto px-[max(1.5rem,calc((100vw_-_42rem)/2))] py-10 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-sun/80 md:gap-8'>
        {sorted.map(experience => (
          <ExperienceCard key={experience.jobId} experience={experience} />
        ))}
      </div>

      {/* Swipe indicator across the horizontal experience carousel */}
      <div className='absolute bottom-16 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 md:bottom-10'>
        {sorted.map((experience, i) => (
          <button
            key={experience.jobId}
            type='button'
            onClick={() => goTo(i)}
            aria-label={`Go to experience ${i + 1} of ${sorted.length}`}
            aria-current={active === i}
            className={`h-2 rounded-full transition-all duration-300 ${
              active === i ? 'w-6 bg-sun' : 'w-2 bg-gray-500 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default WorkExperience
