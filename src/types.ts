interface SanityBody {
  _createdAt: string
  _id: string
  _rev: string
  _updatedAt: string
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export interface PageInfo extends SanityBody {
  _type: 'pageInfo'
  address: string
  backgroundInformation: string
  email: string
  role: string
  heroImage: SanityImage
  name: string
  phoneNumber: string
  profilePic: SanityImage
}

export interface Technology extends SanityBody {
  _type: 'skill'
  image: SanityImage
  progress: number
  title: string
}

export interface Skill extends SanityBody {
  _type: 'skill'
  image: SanityImage
  progress: number
  title: string
}

export interface Experience extends SanityBody {
  _type: 'experience'
  jobId: number
  company: string
  companyImage: SanityImage
  dateStarted: string
  dateEnded: string
  isCurrentlyWorkingHere: boolean
  jobTitle: string
  points: string[]
  technologies: Technology[]
}

export interface Project extends SanityBody {
  _type: 'project'
  projectId: number
  title: string
  image: SanityImage
  linkToBuild: string
  summary: string
  technologies: Technology[]
}

export interface Social extends SanityBody {
  _type: 'social'
  socialId: number
  title: string
  url: string
}

export interface SiteContent {
  pageInfo: PageInfo
  experiences: Experience[]
  skills: Skill[]
  projects: Project[]
  socials: Social[]
}
