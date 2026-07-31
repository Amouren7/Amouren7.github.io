import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../config';

/**
 * RSS Feed — /rss.xml
 * 取非 draft 文章，按 pubDate 降序输出
 */
export async function GET(context: { site: URL }) {
  const posts = (
    await getCollection('blog', ({ data }) => !data.draft)
  ).sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.slug}/`,
      categories: post.data.tags,
    })),
    customData: `<language>${SITE.lang}</language>`,
  });
}
