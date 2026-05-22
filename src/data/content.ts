export const SITE = {
  name:      'Aditya Shah',
  tagline:   'M.E · VT',
  year:      '2026',
  coords:    'Blacksburg, VA · 37.2°N 80.4°W',
  email:     'adishah23101@gmail.com',
  phone:     '+1 (540) 605-0114',
  linkedin:  'https://www.linkedin.com/in/adityashah2301/',
  resume:    'https://drive.google.com/file/d/1XF93CUTnHvQB1NRuI2cHRShFHKdPlyWK/view?usp=drive_link',
};

export const HOME = {
  sheets: [
    { number: '01', title: 'General Arrangement', rev: 'C' },
    { number: '02', title: 'Detail A — Prepreg Layup', rev: 'B' },
    { number: '03', title: 'Active Project Brief', rev: 'A' },
    { number: '04', title: 'Selected Work · Exploded View', rev: 'D' },
    { number: '05', title: 'General Notes', rev: 'A' },
    { number: '06', title: 'Title Block · Contact', rev: 'C' },
  ],
  headline:  ['Composites,', 'Additive Mfg.,', 'Design'],
  bio:       'Graduate Mechanical Engineer from Virginia Tech with hands-on experience in composites, additive manufacturing, aerodynamics, and mechanical design. Solving complex engineering problems through research and design.',
  bom: [
    { id: '01', label: 'Based',  value: 'Blacksburg, VA' },
    { id: '02', label: 'Role',   value: 'Grad Researcher' },
    { id: '03', label: 'Lab',    value: 'Mfg & Tribology · VT' },
    { id: '04', label: 'Focus',  value: 'DSA · VAT · Composites' },
    { id: '05', label: 'Prev',   value: 'JSM Composites' },
    { id: '06', label: 'Team',   value: 'Orion Racing FSAE' },
  ],
  research: {
    body: 'Graduate research on ultrasound-directed self-assembly of microparticles in VAT photopolymerization — manufacturing functional materials with tailored conductivity, strength, and volatility.',
    since: 'Aug 2024',
    specs: [
      { label: 'Frequency',  value: '2.25 MHz' },
      { label: 'Resolution', value: '≤ 50 µm' },
      { label: 'Resin',      value: 'UV photopolymer' },
    ],
  },
  quote: {
    normal: 'It all works out in the end —',
    ember:  "if it isn't working, it's not the end.",
    attr:   'Aditya Shah · DWG. AS-001',
  },
};

export const PROJECTS = [
  {
    fig:        '01',
    number:     '01 / 04',
    badge:      '-13% drag',
    discipline: 'Aerodynamics · Mechatronics',
    title:      'Drag Reduction System — FSAE Rear Wing',
    image:      '/assets/project-drs.jpg',
    alt:        'Drag Reduction System — FSAE rear wing',
    tags:       ['FSAE', 'PWM', 'Servo', 'Wing Design'],
    bullets: [
      'Implemented a driver-induced SERVO-controlled DRS using PWM, reducing overall drag by 13%.',
      'Simulated multiple pivot points to identify the position that minimised the torque required to operate the DRS.',
      'Integrated the servo inside the wing for direct actuation in place of a conventional 4-bar mechanism — reducing play and complexity.',
    ],
  },
  {
    fig:        '02',
    number:     '02 / 04',
    badge:      'NX · FEA',
    discipline: 'Additive Manufacturing · DFAM',
    title:      'Metal LPBF Golf Club Head',
    image:      '/assets/project-golf.jpg',
    alt:        'Metal LPBF golf club head',
    tags:       ['LPBF', 'NX', 'FEA', 'Build Simulation'],
    bullets: [
      'Designed a golf club head to withstand impact load conditions using DFAM principles through an iterative process.',
      'Ran FEA and build simulations in NX to model heat dissipation and reduce print failures.',
      'Printed the club head using metal Laser Powder Bed Fusion and conducted on-field testing for contact time.',
    ],
  },
  {
    fig:        '03',
    number:     '03 / 04',
    badge:      '+5° stall',
    discipline: 'CFD · Aerodynamics',
    title:      'Passive Vortex Generators — Stall Delay Study',
    image:      '/assets/project-cfd.jpg',
    alt:        'Passive vortex generators — stall delay',
    tags:       ['SimScale', 'S1223', 'Vortex Generators'],
    bullets: [
      'Detailed study of the correlation between angle of attack, vortex formation, and flow separation over an airfoil.',
      'Simulated five different vortex generator designs in SimScale.',
      'Delta-wing-shaped vortex generators increased the separation angle of a standard S1223 airfoil by 5 degrees.',
    ],
  },
  {
    fig:        '04',
    number:     '04 / 04',
    badge:      'Prusa Mini',
    discipline: 'Product Design · Ergonomics',
    title:      'Gaming Phone Holder',
    image:      null,
    alt:        'Gaming phone holder ergonomic prototype',
    tags:       ['SolidWorks', 'FDM', 'Ergonomics'],
    bullets: [
      'Prototype of an ergonomic phone holder designed to reduce pressure on the pinky finger while holding a smartphone horizontally for gaming.',
      'Provides extra support and a more natural hand posture during prolonged use.',
      'Designed in SolidWorks and fabricated on a Prusa Mini 3D printer — pairing functional ergonomics with a clean, minimal aesthetic.',
    ],
  },
];

export const EXPERIENCE = [
  {
    period:   'Aug 2024 → Present',
    location: 'Blacksburg, VA',
    role:     'Graduate Research Assistant',
    org:      'Manufacturing & Tribology Lab — Virginia Tech',
    tags:     ['VAT Photopolymerization', 'DSA', 'Functional Materials'],
    bullets: [
      'Conducting research on Ultrasound-Directed Self-Assembly (DSA) of microparticles in VAT photopolymerization to manufacture functional materials with tailored conductivity, strength, and volatility.',
    ],
  },
  {
    period:   'Aug 2023 → Jul 2024',
    location: 'Mumbai, IN',
    role:     'Design Engineer — R&D',
    org:      'JSM Composites',
    tags:     ['SolidWorks', 'Filament Winding', 'Prosthetics', 'Composites'],
    bullets: [
      'Led development of custom filament winding machinery to manufacture high-strength carbon fiber tubes, addressing the cost and flexibility limits of commercial systems.',
      'Designed and manufactured a composite prosthetic leg in SolidWorks and owned its full lifecycle — prototype through production validation — ensuring structural performance, manufacturability, and repeatability.',
    ],
  },
  {
    period:   'Jul 2022 → Jun 2023',
    location: 'Mumbai, IN',
    role:     'Aerodynamics Lead',
    org:      'Orion Racing India · FSAE',
    tags:     ['CFD', 'Prepreg', 'Autoclave', 'Team Lead'],
    bullets: [
      'Led a 9-member team in the end-to-end development of the 2023 Aerodynamics Package — design, CFD analysis, and manufacturing with carbon fiber prepreg using autoclave curing.',
      'Designed and manufactured tooling and fixtures for the composite elements.',
      'Designed and 3D-printed complex aero components using DFAM principles.',
    ],
  },
  {
    period:   'Aug 2019 → Jun 2022',
    location: 'Mumbai, IN',
    role:     'Aerodynamics Engineer',
    org:      'Orion Racing India · FSAE',
    tags:     ['SimScale', 'Carbon Fiber', 'Track Testing'],
    bullets: [
      'Collaborated with a 70-person team on designing, fabricating, and testing the car\'s aerodynamics package.',
      'Hands-on with CFD analysis (SimScale), carbon and glass fiber fabrication, and track testing.',
      'Presented the Aerodynamics Design Report at Formula Bharat 2022 — 2nd place overall.',
    ],
  },
];

export const SKILLS = [
  {
    number: '01',
    discipline: 'CAD & Design',
    tools: [
      { name: 'SolidWorks',  detail: '3D CAD · Surface · Mold tools · Sheet metal · Mfg drawings · Assemblies · Motion' },
      { name: 'Fusion 360',  detail: '3D CAD · Generative Design · Toolpath generation' },
      { name: 'Siemens NX',  detail: 'Explicit modelling · Thermal simulations · 3D print build sim' },
      { name: 'CATIA',       detail: '3D CAD · Surface modelling' },
    ],
  },
  {
    number: '02',
    discipline: 'Simulation & Analysis',
    tools: [
      { name: 'Ansys',    detail: 'FEA · Structural optimisation' },
      { name: 'SimScale', detail: 'CFD · FEA · Thermal' },
      { name: 'ESAComp',  detail: 'Composite layup optimisation' },
    ],
  },
  {
    number: '03',
    discipline: 'Prototyping & Manufacturing',
    tools: [
      { name: 'DFAM',              detail: 'Design for 3D printing · Casting · CNC · Compression molding' },
      { name: 'Composite Molding', detail: 'Tooling tolerances · Resin runoffs · Vacuum infusion' },
      { name: 'CNC Machining',     detail: 'Carbon fiber · MDF · Plywood · Aluminum · Toolpaths · Tooling' },
      { name: '3D Printing',       detail: 'FDM · SLA · DLP · Printer settings · Materials' },
      { name: 'Shop Tools',        detail: 'CNC · Diamond cutters · Drills · Saws · Grinders · Laser cutters' },
    ],
  },
  {
    number: '04',
    discipline: 'Programming & Tools',
    tools: [
      { name: 'MATLAB', detail: 'Data interpretation · Image processing · Thresholding · Composite modelling' },
      { name: 'Python', detail: 'Data interpretation' },
    ],
  },
];

export const ABOUT = {
  quote: "It all works out in the end — if it isn't working, it's not the end.",
  info: [
    { label: 'Name',      value: 'Aditya Shah' },
    { label: 'Born',      value: 'Mumbai, IN' },
    { label: 'Based',     value: 'Blacksburg, VA' },
    { label: 'School',    value: 'Virginia Tech — M.S. ME' },
    { label: 'Undergrad', value: 'K.J. Somaiya — B.Tech ME' },
  ],
  sections: [
    {
      number: '01',
      eyebrow: 'Academic & Research',
      heading: "A researcher's lens",
      body: "I'm pursuing my Master's in Mechanical Engineering at Virginia Tech, where my research explores how ultrasound can direct microparticle self-assembly in 3D printing. This intersection of materials science and manufacturing reflects my broader goal: engineering high-performance systems by understanding the physics behind them.",
    },
    {
      number: '02',
      eyebrow: 'Drive',
      heading: "A builder's hands",
      body: "What drives me is curiosity and the thrill of making things that work better, faster, smarter. Whether it's simulating composite layups, designing custom tooling, or experimenting with new materials — I'm chasing the moment when ideas turn tangible. Real-world impact: reducing drag in a racecar wing, sharpening structural performance in advanced composites.",
    },
    {
      number: '03',
      eyebrow: 'Unique',
      heading: 'Between researcher and shop',
      body: 'My experience spans competitive motorsports, academic research, and industrial prototyping. That mix taught me to be analytical and hands-on — to think like a researcher and act like a builder. Leading an FSAE aerodynamics team and shipping production-ready composite tooling have honed my ability to balance performance, manufacturability, and cost.',
    },
    {
      number: '04',
      eyebrow: 'Ahead',
      heading: "Where I'm headed",
      body: "I'm excited by sustainable, smart manufacturing and the role mechanical engineers will play in shaping it — advanced composites, digital design workflows, and functional additive manufacturing. Always looking to join teams building meaningful, well-engineered solutions.",
    },
  ],
  closingQuote: {
    text: 'Scientists investigate that which already is; engineers create that which has never been.',
    attr: 'Albert Einstein',
  },
};

export const CONTACT = {
  methods: [
    { label: 'Email',    value: 'adishah23101@gmail.com', href: 'mailto:adishah23101@gmail.com' },
    { label: 'Phone',    value: '+1 (540) 605-0114',       href: 'tel:+15406050114' },
    { label: 'LinkedIn', value: 'adityashah2301',           href: 'https://www.linkedin.com/in/adityashah2301/' },
    { label: 'Resume',   value: 'View PDF',                 href: 'https://drive.google.com/file/d/1XF93CUTnHvQB1NRuI2cHRShFHKdPlyWK/view?usp=drive_link' },
  ],
  info: [
    { label: 'Status',    value: 'Available — Summer 2026' },
    { label: 'Location',  value: 'Blacksburg, VA' },
    { label: 'Timezone',  value: 'UTC −05:00 (ET)' },
    { label: 'Open to',   value: 'Full-time · R&D · Internships' },
    { label: 'Sectors',   value: 'Composites · AM · Aerospace' },
  ],
};
