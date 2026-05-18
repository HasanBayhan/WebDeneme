export interface SEOMetadata {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export interface OrganizationData {
  name: string;
  url: string;
  logo: string;
  description: string;
  email?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  social?: {
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
}

export interface ProductData {
  name: string;
  model: string;
  sku: string;
  description: string;
  image: string;
  brand: string;
  manufacturer: string;
  power: string;
  voltage: string;
  efficiency: string;
  price?: string;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  url: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

const SITE_URL = 'https://ecpower.com.tr';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;
const SITE_NAME = 'EC POWER';
const BRAND_NAME = 'EC POWER';
const LOGO_URL = `${SITE_URL}/favicon.svg`;

const orgData: OrganizationData = {
  name: 'EC POWER',
  url: SITE_URL,
  logo: LOGO_URL,
  description: 'Lazer epilasyon cihazları için profesyonel power supply üreticisi. 15 yılı aşkın deneyim ile yüksek performanslı güç kaynakları.',
  email: 'info@ecpower.com.tr',
  phone: '+90 212 549 0000',
  address: {
    street: 'İkitelli OSB Mahallesi, Atatürk Bulvarı No:127',
    city: 'İstanbul',
    region: 'Başakşehir',
    postalCode: '34307',
    country: 'Türkiye',
  },
  social: {
    linkedin: 'https://linkedin.com/company/ecpower',
    youtube: 'https://youtube.com/@ecpower',
  },
};

export function generateOrganizationSchema(): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: orgData.name,
    url: orgData.url,
    logo: {
      '@type': 'ImageObject',
      url: orgData.logo,
      width: 200,
      height: 200,
    },
    description: orgData.description,
    email: orgData.email,
    telephone: orgData.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: orgData.address?.street,
      addressLocality: orgData.address?.city,
      addressRegion: orgData.address?.region,
      postalCode: orgData.address?.postalCode,
      addressCountry: orgData.address?.country,
    },
    sameAs: Object.values(orgData.social || {}).filter(Boolean),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: orgData.phone,
      email: orgData.email,
      contactType: 'sales',
      availableLanguage: ['Turkish', 'English'],
    },
  };
  return JSON.stringify(schema);
}

export function generateWebsiteSchema(): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: `${SITE_NAME} - Lazer Epilasyon Power Supply`,
    description: orgData.description,
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
  return JSON.stringify(schema);
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return JSON.stringify(schema);
}

export function generateProductSchema(product: ProductData): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: product.sku,
    description: product.description,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    manufacturer: {
      '@type': 'Organization',
      name: product.manufacturer,
    },
    model: product.model,
    offers: {
      '@type': 'Offer',
      url: product.url,
      priceCurrency: product.currency || 'USD',
      price: product.price || '0',
      availability: product.availability
        ? `https://schema.org/${product.availability}`
        : 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Güç',
        value: product.power,
      },
      {
        '@type': 'PropertyValue',
        name: 'Voltaj',
        value: product.voltage,
      },
      {
        '@type': 'PropertyValue',
        name: 'Verimlilik',
        value: product.efficiency,
      },
    ],
  };
  return JSON.stringify(schema);
}

export function generateContactSchema(): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'EC POWER İletişim',
    description: 'EC POWER ile iletişime geçin. Lazer epilasyon power supply çözümleri için uzman ekibimizle iletişime geçin.',
    mainEntity: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: orgData.phone,
        email: orgData.email,
        contactType: 'customer service',
        availableLanguage: ['Turkish', 'English'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      },
    },
  };
  return JSON.stringify(schema);
}

export function generateFAQSchema(faqs: { q: string; a: string }[]): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
  return JSON.stringify(schema);
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime: string;
  author: string;
  url: string;
}): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedTime,
    dateModified: article.modifiedTime,
    author: {
      '@type': 'Organization',
      name: article.author,
      url: SITE_URL,
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  };
  return JSON.stringify(schema);
}

export function generateArticleSchemaForAbout(): string {
  return generateArticleSchema({
    title: 'EC POWER Hakkında - 15 Yıllık Deneyim',
    description: 'EC POWER olarak 2009 yılından bu yana lazer epilasyon cihazları için yüksek performanslı güç kaynakları üretiyoruz.',
    publishedTime: '2024-01-01',
    modifiedTime: new Date().toISOString().split('T')[0],
    author: 'EC POWER',
    url: `${SITE_URL}/about`,
  });
}

export function getSEOConfig() {
  return {
    siteUrl: SITE_URL,
    siteName: SITE_NAME,
    brandName: BRAND_NAME,
    defaultImage: DEFAULT_IMAGE,
    twitterHandle: '@ecpower',
    locale: 'tr_TR',
    localeAlternate: 'en_US',
    organization: orgData,
  };
}

export function generateCanonicalUrl(path: string): string {
  const baseUrl = SITE_URL;
  const cleanPath = path.replace(/\/$/, '');
  return cleanPath === '' ? baseUrl : `${baseUrl}${cleanPath}`;
}