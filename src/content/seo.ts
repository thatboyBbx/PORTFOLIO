import { projectsData } from './projects';

// Set VITE_SITE_URL in .env.local or the hosting provider before a public build.
const configuredUrl = import.meta.env.VITE_SITE_URL?.trim() ?? '';
export const siteUrl = (() => {
  if (!configuredUrl) return '';
  const url = new URL(configuredUrl);
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
    throw new Error('VITE_SITE_URL must be an HTTPS origin without a path, query, or credentials.');
  }
  return url.origin;
})();

const pages: Record<string, { title: string; description: string }> = {
  '/': { title: 'Software Systems & AI/ML', description: 'Panashe Bobojani is an AI & Machine Learning graduate and software engineer in Harare, Zimbabwe, building applications, workflow automation and document intelligence systems.' },
  '/work': { title: 'Selected Work', description: 'Explore software engineering and AI/ML case studies: insurance document intelligence, freight workflows, local OCR and offline-first spare-parts operations.' },
  '/about': { title: 'About', description: 'Meet Panashe Bobojani, a University of Zimbabwe AI & Machine Learning graduate focused on application development, workflow automation and practical software systems.' },
  '/experience': { title: 'Experience', description: 'Education and software engineering experience of Panashe Bobojani, an AI & Machine Learning graduate based in Harare, Zimbabwe.' },
  '/contact': { title: 'Contact', description: 'Contact Panashe Bobojani about graduate and junior software engineering or AI/ML roles, and project collaborations.' },
};

export const publicRoutes = [...Object.keys(pages), ...projectsData.map(project => `/work/${project.slug}`)];

export function getMetadata(pathname: string) {
  const path = pathname.replace(/\/+$/, '') || '/';
  const canonicalPath = path.replace(/^\/projects(?=\/|$)/, '/work');
  const project = projectsData.find(item => canonicalPath === `/work/${item.slug}`);
  const page = pages[canonicalPath];
  const known = Boolean(page || project);
  const title = `${project?.title ?? page?.title ?? (path === '/offline' ? 'Offline' : 'Page Not Found')} | Panashe Bobojani`;
  const description = project?.tagline ?? page?.description ?? 'Return to the portfolio of Panashe Bobojani to explore selected work and contact details.';
  const canonical = siteUrl && known ? `${siteUrl}${canonicalPath === '/' ? '/' : canonicalPath}` : '';
  const imagePath = '/social/portfolio.png';
  return { title, description, canonical, image: siteUrl ? `${siteUrl}${imagePath}` : imagePath, robots: known && siteUrl ? 'index, follow' : 'noindex, follow' };
}

export function metadataTags(meta: ReturnType<typeof getMetadata>) {
  return [
    ['name', 'description', meta.description], ['name', 'robots', meta.robots],
    ['property', 'og:type', 'website'], ['property', 'og:site_name', 'Panashe Bobojani'],
    ['property', 'og:title', meta.title], ['property', 'og:description', meta.description],
    ['property', 'og:image', meta.image], ['property', 'og:image:width', '1200'],
    ['property', 'og:image:height', '630'], ['property', 'og:image:alt', 'Panashe Bobojani — Software Systems & AI/ML'],
    ['name', 'twitter:card', 'summary_large_image'], ['name', 'twitter:title', meta.title],
    ['name', 'twitter:description', meta.description], ['name', 'twitter:image', meta.image],
    ...(meta.canonical ? [['property', 'og:url', meta.canonical]] : []),
  ];
}

export function applyMetadata(meta: ReturnType<typeof getMetadata>) {
  document.title = meta.title;
  document.querySelectorAll('[data-seo]').forEach(element => element.remove());
  document.querySelector('meta[name="description"]:not([data-seo])')?.remove();
  for (const [attribute, key, content] of metadataTags(meta)) {
    const element = document.createElement('meta');
    element.setAttribute(attribute, key);
    element.content = content;
    element.dataset.seo = '';
    document.head.append(element);
  }
  if (meta.canonical) {
    const element = document.createElement('link');
    element.rel = 'canonical';
    element.href = meta.canonical;
    element.dataset.seo = '';
    document.head.append(element);
  }
}
