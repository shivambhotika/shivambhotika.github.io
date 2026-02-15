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

const SUBSTACK_FEED_URL = 'https://outerspeak.substack.com/feed';

async function fetchRSSWithFallback(url: string): Promise<string> {
  // Try direct fetch first
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
    });
    if (response.ok) {
      return response.text();
    }
  } catch {
    // Fall through to proxy
  }

  // Fallback to RSS proxy (rss2json.com free tier)
  const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;
  const proxyResponse = await fetch(proxyUrl);
  if (!proxyResponse.ok) {
    throw new Error(`Proxy failed with status ${proxyResponse.status}`);
  }
  const data = await proxyResponse.json();
  if (data.status !== 'ok') {
    throw new Error(`Proxy returned error: ${data.message}`);
  }
  // Convert JSON back to items format (handled separately)
  return JSON.stringify(data);
}

export async function getSubstackPosts(): Promise<SubstackPost[]> {
  try {
    const result = await fetchRSSWithFallback(SUBSTACK_FEED_URL);

    // Check if result is JSON (from proxy) or XML (direct)
    if (result.startsWith('{')) {
      const data = JSON.parse(result);
      return data.items.map((item: { title?: string; link?: string; pubDate?: string; content?: string; description?: string; guid?: string }) => ({
        title: item.title || '',
        link: item.link || '',
        pubDate: item.pubDate || '',
        content: item.content || '',
        contentSnippet: item.description || '',
        guid: item.guid || item.link || '',
      }));
    }

    // Parse XML
    const feed = await parser.parseString(result);
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
