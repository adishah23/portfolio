import { getCollection, getEntry } from 'astro:content';

function byOrder<T extends { data: { order: number } }>(a: T, b: T) {
  return a.data.order - b.data.order;
}

export async function getSite() {
  const entry = await getEntry('site', 'settings');
  if (!entry) throw new Error('Missing site/settings.md');
  return entry.data;
}

export async function getHome() {
  const entry = await getEntry('home', 'index');
  if (!entry) throw new Error('Missing home/index.md');
  return entry.data;
}

export async function getAbout() {
  const entry = await getEntry('about', 'index');
  if (!entry) throw new Error('Missing about/index.md');
  return entry.data;
}

export async function getContact() {
  const entry = await getEntry('contact', 'index');
  if (!entry) throw new Error('Missing contact/index.md');
  return entry.data;
}

export async function getProjects() {
  const entries = await getCollection('projects');
  return entries.sort(byOrder).map((entry) => entry.data);
}

export async function getExperience() {
  const entries = await getCollection('experience');
  return entries.sort(byOrder).map((entry) => entry.data);
}

export async function getSkills() {
  const entries = await getCollection('skills');
  return entries.sort(byOrder).map((entry) => entry.data);
}
