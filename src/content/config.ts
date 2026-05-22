import { defineCollection, z } from 'astro:content';

const site = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    year: z.string(),
    coords: z.string(),
    email: z.string().email(),
    phone: z.string(),
    linkedin: z.string().url(),
    resume: z.string().url(),
    description: z.string(),
  }),
});

const home = defineCollection({
  type: 'content',
  schema: z.object({
    sheets: z.array(z.object({
      number: z.string(),
      title: z.string(),
      rev: z.string(),
    })),
    headline: z.array(z.string()).length(3),
    bio: z.string(),
    bom: z.array(z.object({
      id: z.string(),
      label: z.string(),
      value: z.string(),
    })),
    research: z.object({
      body: z.string(),
      since: z.string(),
      specs: z.array(z.object({
        label: z.string(),
        value: z.string(),
      })),
    }),
    processNotes: z.array(z.string()),
    processSpecs: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })),
    projectDisciplineTable: z.array(z.object({
      no: z.string(),
      discipline: z.string(),
      tooling: z.string(),
    })),
    quote: z.object({
      normal: z.string(),
      ember: z.string(),
      attr: z.string(),
    }),
    contactTitleRows: z.array(z.object({
      left: z.string(),
      value: z.string(),
    })),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number(),
    fig: z.string(),
    number: z.string(),
    badge: z.string(),
    discipline: z.string(),
    title: z.string(),
    image: z.string().nullable(),
    alt: z.string(),
    tags: z.array(z.string()),
    bullets: z.array(z.string()),
  }),
});

const experience = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number(),
    period: z.string(),
    location: z.string(),
    role: z.string(),
    org: z.string(),
    tags: z.array(z.string()),
    bullets: z.array(z.string()),
  }),
});

const skills = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number(),
    number: z.string(),
    discipline: z.string(),
    tools: z.array(z.object({
      name: z.string(),
      detail: z.string(),
    })),
  }),
});

const about = defineCollection({
  type: 'content',
  schema: z.object({
    quote: z.string(),
    info: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })),
    sections: z.array(z.object({
      number: z.string(),
      eyebrow: z.string(),
      heading: z.string(),
      body: z.string(),
    })),
    closingQuote: z.object({
      text: z.string(),
      attr: z.string(),
    }),
  }),
});

const contact = defineCollection({
  type: 'content',
  schema: z.object({
    intro: z.string(),
    methods: z.array(z.object({
      label: z.string(),
      value: z.string(),
      href: z.string(),
    })),
    info: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })),
  }),
});

export const collections = {
  site,
  home,
  projects,
  experience,
  skills,
  about,
  contact,
};
