import Parser from 'rss-parser';

export interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string;
  guid: string;
}

const parser = new Parser();

export async function getSubstackPosts(): Promise<SubstackPost[]> {
  try {
    const feed = await parser.parseURL('https://gabrieletinelli.substack.com/feed');

    return feed.items.map((item) => ({
      title: item.title || '',
      link: item.link || '',
      pubDate: item.pubDate || '',
      content: item['content:encoded'] || item.content || '',
      contentSnippet: item.contentSnippet || '',
      guid: item.guid || item.link || '',
    }));
  } catch (error) {
    console.error('Error fetching Substack RSS:', error);
    return [];
  }
}
