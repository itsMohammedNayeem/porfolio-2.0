import { type SchemaTypeDefinition } from 'sanity'

import experience from './schemas/experience'
import pageInfo from './schemas/pageInfo'
import project from './schemas/project'
import skill from './schemas/skill'
import social from './schemas/social'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [skill, pageInfo, experience, social, project]
}
