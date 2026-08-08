import type { MetadataRoute } from 'next';
import { SITE_URL, withBase } from '@/lib/base';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}${withBase('/sitemap.xml')}`,
    host: SITE_URL,
  };
}
