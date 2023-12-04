import Link from 'next/link'

import About from '@/components/About'
import ContactMe from '@/components/ContactMe'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import WorkExperience from '@/components/WorkExperience'
import { Experience, PageInfo, Project, Skill, Social } from '@/typings'
import { fetchExperiences } from '@/utils/fetchExperiences'
import { fetchPageInfo } from '@/utils/fetchPageInfo'
import { fetchProjects } from '@/utils/fetchProjects'
import { fetchSkills } from '@/utils/fetchSkills'
import { fetchSocial } from '@/utils/fetchSocials'
import { ChevronDoubleUpIcon } from '@heroicons/react/24/solid'

export default async function Home() {
  const pageInfo: PageInfo = await fetchPageInfo()
  const experiences: Experience[] = await fetchExperiences()
  const skills: Skill[] = await fetchSkills()
  const projects: Project[] = await fetchProjects()
  const socials: Social[] = await fetchSocial()

  return (
    <main className='overscroll-x-hidden z-0 h-screen snap-y snap-mandatory overflow-y-scroll bg-[rgb(36,36,36)] text-white scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-sun lg:scrollbar'>
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

      <Link href='#hero'>
        <footer className='sticky bottom-5 w-full cursor-pointer'>
          <div className='flex items-center justify-center'>
            {/* <img
              src="http://www.w3.org/2000/svg"
              alt="arrow-up"
              className="h-10 w-10 rounded-full filter grayscale hover:grayscale-0 cursor-pointer"
            /> */}

            <ChevronDoubleUpIcon className='h-10 w-10 cursor-pointer rounded-full text-gray-500 transition-colors duration-200 hover:text-sun' />
          </div>
        </footer>
      </Link>
    </main>
  )
}

// export const getStaticProps: GetStaticProps<Props> = async () => {
//   const pageInfo: PageInfo = await fetchPageInfo();
//   const experiences: Experience[] = await fetchExperiences();
//   const skills: Skill[] = await fetchSkills();
//   const projects: Project[] = await fetchProjects();
//   const socials: Social[] = await fetchSocial();

//   return {
//     props: {
//       pageInfo,
//       experiences,
//       skills,
//       projects,
//       socials,
//     },
//     revalidate: 10,
//   };
// };
