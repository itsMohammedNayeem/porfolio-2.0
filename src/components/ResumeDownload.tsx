import { ArrowDownTrayIcon } from '@heroicons/react/24/solid'
import { useEffect, useRef } from 'react'

const PDF = '/MohammedNayeem_SeniorReactDeveloper.pdf'
const DOCX = '/MohammedNayeem_SeniorReactDeveloper.docx'

/**
 * Résumé download control. Native <details>/<summary> for built-in keyboard
 * and screen-reader support; closes on outside click / Escape / selection.
 */
const ResumeDownload = () => {
  const ref = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onPointerDown = (e: MouseEvent) => {
      if (el.open && !el.contains(e.target as Node)) el.open = false
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && el.open) el.open = false
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const close = () => {
    if (ref.current) ref.current.open = false
  }

  return (
    <details ref={ref} className='group relative'>
      <summary
        className='flex min-h-6 cursor-pointer list-none items-center gap-1.5 text-sm uppercase text-gray-400 transition-colors duration-200 hover:text-sun [&::-webkit-details-marker]:hidden'
        aria-label='Download résumé'>
        <ArrowDownTrayIcon className='h-9 w-9 sm:h-11 sm:w-11' />
        <span className='hidden md:inline'>Résumé</span>
      </summary>

      <div
        role='menu'
        className='absolute right-0 z-30 mt-3 flex w-40 flex-col overflow-hidden rounded-md border border-gray-20 bg-gray-16 shadow-xl'>
        <a
          role='menuitem'
          href={PDF}
          download
          onClick={close}
          className='px-4 py-2.5 text-left text-sm text-gray-300 transition-colors duration-200 hover:bg-gray-20 hover:text-sun'>
          Download PDF
        </a>
        <a
          role='menuitem'
          href={DOCX}
          download
          onClick={close}
          className='border-t border-gray-20 px-4 py-2.5 text-left text-sm text-gray-300 transition-colors duration-200 hover:bg-gray-20 hover:text-sun'>
          Download Word
        </a>
      </div>
    </details>
  )
}

export default ResumeDownload
