import { getCollection } from 'astro:content';
import { getActiveLanguages } from '../../i18n/utils';
import { DEFAULT_LANG } from '../../config';
import synonymsData from '../../data/synonyms.json';

export async function getStaticPaths() {
  const langs = getActiveLanguages();
  return langs.map(lang => ({
    params: { lang }
  }));
}

export async function GET({ params }: { params: { lang: string } }) {
  const lang = params.lang;
  const allGuides = await getCollection('guides');

  // Index guides by "lang:slug"
  const guideMap = new Map();
  allGuides.forEach(guide => {
    const [guideLang, ...slugParts] = guide.id.split('/');
    const slug = slugParts.join('/');
    guideMap.set(`${guideLang}:${slug}`, guide);
  });

  const enGuides = allGuides.filter(g => g.id.startsWith(`${DEFAULT_LANG}/`));

  // Build full list of guides for this language (native + fallback)
  const resolvedGuides = enGuides.map(enGuide => {
    const slug = enGuide.id.split('/').slice(1).join('/');
    const nativeGuide = guideMap.get(`${lang}:${slug}`);
    if (nativeGuide) {
      return { guide: nativeGuide, isFallback: false, slug };
    }
    return { guide: enGuide, isFallback: lang !== DEFAULT_LANG, slug };
  });

  // Include any native guides that don't have an EN counterpart
  allGuides.filter(g => g.id.startsWith(`${lang}/`)).forEach(nativeGuide => {
    const slug = nativeGuide.id.split('/').slice(1).join('/');
    if (!resolvedGuides.some(item => item.slug === slug)) {
      resolvedGuides.push({ guide: nativeGuide, isFallback: false, slug });
    }
  });

  // Get language specific synonyms
  // @ts-ignore
  const synonyms = synonymsData[lang] || {};

  // Build index array
  const index = resolvedGuides.map(({ guide, isFallback, slug }) => {
    return {
      type: 'guide',
      url: `/${lang}/guides/${slug}/`,
      title: guide.data.title,
      description: guide.data.description,
      section: guide.data.section,
      isFallback,
      searchableText: `${guide.data.title} ${guide.data.description} ${guide.data.section} ${(guide.data.tags || []).join(' ')} ${(guide.data.keywords || []).join(' ')}`.toLowerCase()
    };
  });

  return new Response(JSON.stringify({ index, synonyms }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

