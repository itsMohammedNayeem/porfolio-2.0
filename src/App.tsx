import { ChevronDoubleUpIcon } from '@heroicons/react/24/solid'

import About from './components/About'
import ContactMe from './components/ContactMe'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import WorkExperience from './components/WorkExperience'
import { content } from './lib/content'

export default function App() {
  const { pageInfo, experiences, skills, projects, socials } = content

  return (
    <main className='overscroll-x-hidden z-0 h-screen snap-y snap-mandatory overflow-y-auto bg-[rgb(36,36,36)] text-white scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-sun lg:scrollbar'>
      <Header socials={socials} />

      <section id='hero' className='snap-start'>
        <Hero pageInfo={pageInfo} />
      </section>

      <section id='about' className='snap-center'>
        <About pageInfo={pageInfo} />
      </section>

      <section id='experience' className='snap-center'>
        <WorkExperience experiences={experiences} />
      </section>

      <section id='skills' className='snap-start'>
        <Skills skills={skills} />
      </section>

      <section id='projects' className='snap-start'>
        <Projects projects={projects} />
      </section>

      <section id='contact' className='snap-start'>
        <ContactMe pageInfo={pageInfo} />
      </section>

      <a href='#hero'>
        <footer className='sticky bottom-[1px] w-full cursor-pointer md:bottom-5'>
          <div className='flex items-center justify-center'>
            <ChevronDoubleUpIcon className='h-7 w-7 cursor-pointer rounded-full text-gray-500 transition-colors duration-200 hover:text-sun md:h-10 md:w-10' />
          </div>
        </footer>
      </a>
    </main>
  )
}
