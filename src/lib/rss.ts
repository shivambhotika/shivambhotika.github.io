import Parser from 'rss-parser';

export interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string;
  guid: string;
}

export interface PodcastEpisode {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  duration?: string;
  guid: string;
}

const parser = new Parser({
  customFields: {
    item: ['itunes:duration', 'content:encoded'],
  },
});

async function fetchWithBrowserHeaders(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  });
  if (!response.ok) {
    throw new Error(`Status code ${response.status}`);
  }
  return response.text();
}

export async function getSubstackPosts(): Promise<SubstackPost[]> {
  try {
    const xml = await fetchWithBrowserHeaders('https://gabrieletinelli.substack.com/feed');
    const feed = await parser.parseString(xml);

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

export async function getPodcastEpisodes(): Promise<PodcastEpisode[]> {
  try {
    const feed = await parser.parseURL('https://bricks-bytes.com/feed/podcast/bitbuilders/');

    return feed.items.map((item) => ({
      title: item.title || '',
      link: item.link || '',
      pubDate: item.pubDate || '',
      description: item.contentSnippet || item.content || '',
      duration: item['itunes:duration'] || undefined,
      guid: item.guid || item.link || '',
    }));
  } catch (error) {
    console.error('Error fetching Podcast RSS:', error);
    return [];
  }
}
