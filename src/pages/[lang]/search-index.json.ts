import { getCollection } from 'astro:content';
import { getActiveLanguages } from '../../i18n/utils';
import synonymsData from '../../data/synonyms.json';

export async function getStaticPaths() {
  const langs = getActiveLanguages();
  return langs.map(lang => ({
    params: { lang }
  }));
}

export async function GET({ params }: { params: { lang: string } }) {
  const lang = params.lang;
  
  // Fetch guides
  const guides = await getCollection('guides', (entry) => {
    return entry.id.startsWith(`${lang}/`);
  });

  // Get language specific synonyms
  // @ts-ignore
  const synonyms = synonymsData[lang] || {};

  // Build index array
  const index = guides.map(guide => {
    const [, ...slugParts] = guide.id.split('/');
    const slug = slugParts.join('/');
    
    return {
      type: 'guide',
      url: `/${lang}/guides/${slug}/`,
      title: guide.data.title,
      description: guide.data.description,
      section: guide.data.section,
      // We index the body text minimally if needed, but titles and descriptions are usually enough for a simple search.
      // We add searchable text combining everything
      searchableText: `${guide.data.title} ${guide.data.description} ${guide.data.section}`.toLowerCase()
    };
  });

  // Future-proofing: Here we could also append links from links.json and phrases from phrases.json to the index array.

  return new Response(JSON.stringify({ index, synonyms }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
