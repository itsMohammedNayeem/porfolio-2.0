import { type SchemaTypeDefinition } from "sanity";

import pageInfo from "./schemas/pageInfo";
import experience from "./schemas/experience";
import skill from "./schemas/skill";
import project from "./schemas/project";
import social from "./schemas/social";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [skill, pageInfo, experience, social, project],
};
