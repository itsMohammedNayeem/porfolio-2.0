/**
 * One-off content seed: updates Sanity documents to match the July 2026
 * resume (Senior React.js Developer). Source of truth: resume.md (local).
 *
 * Run:  node --env-file=.env.local scripts/seed-resume-content.mjs
 * Requires SANITY_API_WRITE_TOKEN (Editor) in .env.local.
 *
 * Idempotent: creates use createOrReplace with deterministic _ids,
 * updates are patch.set operations.
 *
 * Image assets were uploaded beforehand (asset _ids below):
 * WPP Open logo provided by Nayeem; skill icons from Devicon/Simple Icons/
 * GitHub org avatars.
 */
import { createClient } from '@sanity/client'

const token = process.env.SANITY_API_WRITE_TOKEN
if (!token) {
  console.error('✗ SANITY_API_WRITE_TOKEN missing — run with: node --env-file=.env.local scripts/seed-resume-content.mjs')
  process.exit(1)
}

const client = createClient({
  projectId: '79vh6zyc',
  dataset: 'production',
  apiVersion: '2023-11-30',
  token,
  useCdn: false
})

const imageRef = ref => ({ _type: 'image', asset: { _type: 'reference', _ref: ref } })
const skillRef = id => ({ _type: 'reference', _ref: id, _key: `k-${id.slice(0, 12)}` })

// ---------------------------------------------------------------- new skills
const newSkills = [
  { _id: 'skill-stenciljs', title: 'StencilJS', progress: 50, asset: 'image-dc51f48670b949b9d2a743ec8fd9a83eff2f9173-24x24-svg' },
  { _id: 'skill-storybook', title: 'Storybook', progress: 50, asset: 'image-d0ca32b76cc723b78fdd4b429b7e797ed3561276-24x24-svg' },
  { _id: 'skill-playwright', title: 'Playwright', progress: 45, asset: 'image-f6430a83fc9990d711ed927ffeef0a51a63f00e6-128x128-svg' },
  { _id: 'skill-axe-core', title: 'axe-core', progress: 45, asset: 'image-7ed43bb55b81e849d4bc8eec0fddb3716e5a3d19-200x200-png' },
  { _id: 'skill-scss', title: 'SCSS', progress: 55, asset: 'image-eab315098699440d235d2851513ff6b57a5de81a-128x128-svg' },
  { _id: 'skill-github-actions', title: 'GitHub Actions', progress: 40, asset: 'image-3b6c32b275f29e488047db0de512729f625bf7a8-128x128-svg' },
  { _id: 'skill-webpack', title: 'Webpack', progress: 40, asset: 'image-86aac2a3bac7b201fb6791af0161231f3ce6ee3e-128x128-svg' },
  { _id: 'skill-ag-grid', title: 'AG Grid', progress: 35, asset: 'image-64ea4dada74cef102541b2008d2e1f9b68dbf766-200x200-png' }
]

// existing skill _ids referenced by the WPP experience
const EXISTING = {
  reactJs: '188e9d55-15ad-40b7-872a-1b6be1b24410',
  typescript: 'c04fc355-3b3a-46b3-8b65-c370e337ccac',
  jest: 'd6c43ddf-0518-441c-b7b0-5df4476f6954'
}

// ------------------------------------------------------------ WPP experience
const wppExperience = {
  _id: 'experience-wpp-2024',
  _type: 'experience',
  jobId: 9,
  jobTitle: 'Senior Frontend Engineer',
  company: 'WPP',
  companyImage: imageRef('image-9c0b59a6d8ba2ba8edb825ffdbf0e7e81c5e27ad-800x800-png'),
  dateStarted: '2024-03-01',
  isCurrentlyWorkingHere: true,
  technologies: [
    skillRef('skill-stenciljs'),
    skillRef(EXISTING.reactJs),
    skillRef(EXISTING.typescript),
    skillRef('skill-scss'),
    skillRef('skill-storybook'),
    skillRef(EXISTING.jest),
    skillRef('skill-playwright'),
    skillRef('skill-axe-core'),
    skillRef('skill-github-actions')
  ],
  points: [
    "Core contributor to WPP Open's design system — a monorepo of 76+ reusable web components with React, Vue, and Angular bindings, used by product teams across the company.",
    "Own the design system's WCAG 2.1 AA accessibility programme: built an automated audit pipeline (Playwright + axe-core) scanning 165 Storybook stories across 76 components against 50 WCAG criteria, and produced conformance evidence used in a UK Government preliminary assessment.",
    'Remediated key components (datepicker, time-picker, search, breadcrumb, chat) to zero serious/critical accessibility violations, implementing W3C ARIA APG keyboard patterns (combobox, treeview, tabs, menu).',
    'Led the rich-text editor migration from Quill.js to Tiptap v3 — the library’s largest single feature — including full migration guides and backward-compatible APIs.',
    'Drove major-version (v4) release preparation: removed 17+ deprecated APIs, resolved npm security vulnerabilities to a clean audit state, and kept 1,700+ unit tests green across 109 suites.',
    'Conduct regular code reviews and mentor the team through reusable engineering playbooks and coding standards; support consuming teams as a design-system point of contact.'
  ]
}

// --------------------------------------------------------------- patches
const patches = [
  {
    id: '9c6b7c47-d81b-4f4d-a81e-1e357a1479e3', // pageInfo
    set: {
      role: 'Senior React.js Developer',
      backgroundInformation:
        "Senior front-end engineer with 15 years in software development, the last 8+ focused on React.js. Currently a core contributor to WPP's enterprise design system, where I build and maintain a library of 76+ reusable, high-performance UI components consumed by React, Vue, and Angular applications company-wide. I define front-end architecture and coding standards, lead accessibility (WCAG 2.1 AA) and performance programmes, conduct rigorous code reviews, and mentor engineers through review feedback and reusable playbooks. Strong track record of shipping complex migrations (rich-text editor, major-version API cleanups) and building automated testing infrastructure (Jest, Playwright, axe-core)."
    }
  },
  {
    id: '0587916a-edfe-427c-af06-d064216cc505', // Planet
    set: {
      company: 'Planet Payment',
      dateStarted: '2023-03-01',
      dateEnded: '2023-12-31',
      isCurrentlyWorkingHere: false,
      points: [
        'Built data-driven business applications for a global integrated payments platform (acquiring, processing, digital wallets, VAT refund, currency conversion).',
        'Wrote high-quality, cross-platform TypeScript/HTML/CSS with a focus on fluid navigation and accessibility optimisation.',
        'Reviewed product requirements to provide development estimates and product feedback.'
      ]
    }
  },
  {
    id: '190d3cf0-460b-464e-970d-efa831ee0cd4', // Preqin
    set: {
      points: [
        'Designed and implemented user-facing features on pro.preqin.com — investor and fund-manager profile contacts data transformation, plus subscription-package restrictions across all users.',
        'Built reusable components and front-end libraries; reviewed code and provided feedback to raise codebase quality.'
      ]
    }
  },
  {
    id: '3775834b-ac4d-4f1a-82d5-1c9f7ff82f16', // Wipro
    set: {
      points: [
        'Led front-end delivery for Santander Bank US — a consumer web application for banking products.',
        'Translated Figma designs into reusable, efficient UI components; coordinated across QA, server, design, and product teams.'
      ]
    }
  },
  {
    id: '1e98c9ec-c284-47e8-bc4f-e6a4b349fb8a', // ITC Infotech
    set: {
      points: [
        'Developed end-user insurance applications for RSA (Royal Sun & Alliance, UK) — requirement study, planning, and development.'
      ]
    }
  },
  {
    id: 'e4fb3f32-d859-4594-af7c-f0d229b6e6f6', // Meredith
    set: {
      points: [
        'Front-end development for digital media properties; began the transition into the React ecosystem.'
      ]
    }
  },
  {
    id: '37d588d8-5abf-48e2-b8c2-96b5c98e753a', // Infosys — fix bad end date (was 2017, overlapping later roles)
    set: { dateEnded: '2014-07-18' }
  }
]

// ----------------------------------------------------------------- execute
let tx = client.transaction()
for (const s of newSkills) {
  tx = tx.createOrReplace({ _id: s._id, _type: 'skill', title: s.title, progress: s.progress, image: imageRef(s.asset) })
}
tx = tx.createOrReplace(wppExperience)
for (const p of patches) {
  tx = tx.patch(p.id, patch => patch.set(p.set))
}

const result = await tx.commit()
console.log(`✓ committed transaction ${result.transactionId}: ${newSkills.length} skills + WPP experience upserted, ${patches.length} documents patched`)
