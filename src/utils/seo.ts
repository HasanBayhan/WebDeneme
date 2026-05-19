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
  keywords?: string[];
  noindex?: boolean;
}

// Per-page keyword map for on-page SEO
export const PAGE_KEYWORDS: Record<string, string[]> = {
  '/': [
    'lazer epilasyon power supply',
    'güç kaynağı üreticisi',
    'epilasyon cihazı güç kaynağı',
    'diode lazer güç kaynağı',
    'EC POWER',
    'lazer power supply Türkiye',
    'CE sertifikalı güç kaynağı',
    'profesyonel lazer epilasyon',
    'power supply imalatı',
  ],
  '/products': [
    'EC-500 power supply',
    'EC-800 power supply',
    'EC-1200 power supply',
    'EC-2000 power supply',
    'lazer epilasyon güç kaynağı fiyat',
    '500W güç kaynağı',
    '1200W güç kaynağı',
    'CE UL RoHS sertifikalı',
    'yüksek verimli güç kaynağı',
    'lazer cihaz güç ünitesi',
  ],
  '/about': [
    'EC POWER hakkında',
    'güç kaynağı üreticisi Türkiye',
    'ISO 9001 sertifikalı üretici',
    'lazer cihaz üreticisi İstanbul',
    'power supply imalathanesi',
    'TÜV sertifikalı',
  ],
  '/contact': [
    'EC POWER iletişim',
    'power supply teklif',
    'lazer epilasyon güç kaynağı fiyat teklifi',
    'İkitelli OSB tedarikçi',
    'güç kaynağı satış İstanbul',
  ],
};

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
const LOGO_URL = `${SITE_URL}/logo.png`;
const LOGO_SVG = `${SITE_URL}/favicon.svg`;

const orgData: OrganizationData = {
  name: 'EC POWER Güç Sistemleri',
  url: SITE_URL,
  logo: LOGO_URL,
  description:
    "Lazer epilasyon cihazları için profesyonel power supply üreticisi. 2009'dan bu yana 15 yılı aşkın deneyim ile yüksek performanslı güç kaynakları. CE, UL, RoHS, ISO 9001 ve TÜV sertifikalı.",
  email: 'info@ecpower.com.tr',
  phone: '+90-212-549-0000',
  address: {
    street: 'İkitelli OSB Mahallesi, Atatürk Bulvarı No:127',
    city: 'İstanbul',
    region: 'Başakşehir',
    postalCode: '34307',
    country: 'TR',
  },
  social: {
    linkedin: 'https://linkedin.com/company/ecpower',
    youtube: 'https://youtube.com/@ecpower',
  },
};

function toIsoDate(value: Date = new Date()): string {
  return value.toISOString().split('T')[0];
}

export function generateOrganizationSchema(): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: orgData.name,
    alternateName: SITE_NAME,
    url: orgData.url,
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#logo`,
      url: LOGO_SVG,
      contentUrl: LOGO_SVG,
      width: 512,
      height: 512,
      caption: 'EC POWER - Lazer Epilasyon Power Supply',
    },
    image: {
      '@type': 'ImageObject',
      url: DEFAULT_IMAGE,
      width: 1200,
      height: 630,
    },
    description: orgData.description,
    email: orgData.email,
    telephone: orgData.phone,
    foundingDate: '2009',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 50,
      maxValue: 200,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Worldwide',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: orgData.address?.street,
      addressLocality: orgData.address?.city,
      addressRegion: orgData.address?.region,
      postalCode: orgData.address?.postalCode,
      addressCountry: orgData.address?.country,
    },
    sameAs: Object.values(orgData.social || {}).filter(Boolean),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: orgData.phone,
        email: orgData.email,
        contactType: 'sales',
        availableLanguage: ['Turkish', 'English'],
      },
      {
        '@type': 'ContactPoint',
        telephone: orgData.phone,
        email: 'support@ecpower.com.tr',
        contactType: 'customer support',
        availableLanguage: ['Turkish', 'English'],
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Lazer Epilasyon Power Supply Ürünleri',
      itemListElement: [
        { '@type': 'Product', name: 'EC-500 Power Supply' },
        { '@type': 'Product', name: 'EC-800 Power Supply' },
        { '@type': 'Product', name: 'EC-1200 Power Supply' },
        { '@type': 'Product', name: 'EC-2000 Power Supply' },
      ],
    },
  };
  return JSON.stringify(schema);
}

export function generateLocalBusinessSchema(): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Manufacturer'],
    '@id': `${SITE_URL}/#localbusiness`,
    name: orgData.name,
    url: SITE_URL,
    telephone: orgData.phone,
    email: orgData.email,
    image: DEFAULT_IMAGE,
    logo: LOGO_SVG,
    description: orgData.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: orgData.address?.street,
      addressLocality: orgData.address?.city,
      addressRegion: orgData.address?.region,
      postalCode: orgData.address?.postalCode,
      addressCountry: orgData.address?.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '41.0604',
      longitude: '28.7981',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '10:00',
        closes: '14:00',
      },
    ],
    priceRange: '$$',
    currenciesAccepted: 'TRY, USD, EUR',
    paymentAccepted: 'Havale, Kredi Kartı',
    areaServed: 'Worldwide',
    sameAs: Object.values(orgData.social || {}).filter(Boolean),
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
    '@id': `${SITE_URL}/contact#webpage`,
    name: 'EC POWER İletişim - Power Supply Teklif Formu',
    description:
      'EC POWER ile iletişime geçin. Lazer epilasyon power supply çözümleri için teklif alın. İstanbul İkitelli OSB ofisimizde teknik destek.',
    url: `${SITE_URL}/contact`,
    inLanguage: 'tr-TR',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    mainEntity: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: orgData.phone,
          email: orgData.email,
          contactType: 'sales',
          availableLanguage: ['Turkish', 'English'],
        },
        {
          '@type': 'ContactPoint',
          telephone: orgData.phone,
          email: 'support@ecpower.com.tr',
          contactType: 'technical support',
          availableLanguage: ['Turkish', 'English'],
        },
      ],
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

export function generateAboutPageSchema(): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${SITE_URL}/about#webpage`,
    name: 'EC POWER Hakkında - 15 Yıllık Deneyim',
    description:
      'EC POWER olarak 2009 yılından bu yana lazer epilasyon cihazları için yüksek performanslı güç kaynakları üretiyoruz.',
    url: `${SITE_URL}/about`,
    inLanguage: 'tr-TR',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    dateModified: toIsoDate(),
  };
  return JSON.stringify(schema);
}

export function generateArticleSchemaForAbout(): string {
  return generateAboutPageSchema();
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
  const normalizedPath = path.replace(/\/index\.html$/, '/').replace(/\/$/, '').replace(/[?#].*$/, '');
  return normalizedPath === '' ? SITE_URL : `${SITE_URL}${normalizedPath}`;
}

export function getPageKeywords(path: string): string {
  const keys = PAGE_KEYWORDS[path] || PAGE_KEYWORDS['/'];
  return keys.join(', ');
}

export function generateHreflangLinks(path: string): { lang: string; url: string }[] {
  const normalizedPath = path.replace(/\/index\.html$/, '/').replace(/\/$/, '').replace(/[?#].*$/, '');
  const pagePath = normalizedPath === '' ? '' : normalizedPath;
  return [
    { lang: 'tr', url: `${SITE_URL}${pagePath}` },
    { lang: 'x-default', url: `${SITE_URL}${pagePath}` },
  ];
}

export function generateWebPageSchema(page: {
  name: string;
  description: string;
  url: string;
  breadcrumbs?: { name: string; url: string }[];
}): string {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${page.url}#webpage`,
    url: page.url,
    name: page.name,
    description: page.description,
    inLanguage: 'tr-TR',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    dateModified: toIsoDate(),
  };

  if (page.breadcrumbs && page.breadcrumbs.length > 0) {
    schema.breadcrumb = {
      '@type': 'BreadcrumbList',
      itemListElement: page.breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };
  }

  return JSON.stringify(schema);
}
