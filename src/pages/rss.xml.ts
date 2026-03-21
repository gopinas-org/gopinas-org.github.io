import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const news = (await getCollection('news')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  const site = context.site?.href ?? 'https://gopinas.org/';
  return rss({
    title: 'GoPinas News',
    description: 'News and announcements from Go Federation of the Philippines.',
    site,
    items: news.map((post) => ({
      link: `/news/${post.id}/`,
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
    })),
  });
};
