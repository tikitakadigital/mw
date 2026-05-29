export interface Specialism {
  ico: string;
  t: string;
  s: string;
}

export interface ServicePackage {
  tier: string;
  price: string;
  popular?: boolean;
  bullets: string[];
}

export interface ProcessStep {
  n: string;
  t: string;
  s: string;
}

export interface PlannerReview {
  name: string;
  date: string;
  guests: number;
  venue: string;
  body: string;
  stars?: number;
  photo?: string;
  source?: 'google' | 'manual';
}

export interface FAQ {
  q: string;
  a: string;
}

export interface Planner {
  verified: boolean;   // true = vetted by admin, appears in matcher + full profile
  id: string;
  name: string;
  firm: string;
  location: string;
  style: string;
  types: string[];
  guests: string;
  minGuests: number;
  maxGuests: number;
  minBudget: number;
  maxBudget: number;
  season: string;
  price: string;
  rating: string;
  reviews: number;
  scene: string;
  img: string;
  featured: boolean;
  tagline: string;
  signatureLine?: string;
  bio: string;
  languages: string[];
  based: string;
  response: string;
  avgResponse?: string;
  weddingsPerYear?: string;
  instagram?: string;
  nextAvailable?: string;
  deposit?: string;
  badges: string[];
  photos: string[];
  specialisms?: Specialism[];
  services: ServicePackage[];
  process?: ProcessStep[];
  reviewsData?: PlannerReview[];
  faqs?: FAQ[];
  preferredVenues: string[];
  yearsActive: number;
}

export interface CostSnapshot {
  g: string;
  range: string;
  highlight?: boolean;
}

export interface Breakdown {
  item: string;
  value: string;
}

export interface WhyExpensive {
  h: string;
  p: string;
}

export interface Venue {
  id: string;
  name: string;
  region: string;
  img: string;
  photos: string[];
  photosNote?: string;
  blurb: string;
  capacity: string;
  rentalRange: string;
  rentalMid: number;
  cateringTier: string;
  cateringPerHead: { low: number; high: number };
  cateringMid: number;
  season: string;
  usp: string;
  tagline: string;
  plannerRequired: boolean;
  blankCanvas: boolean;
  costSnapshot: CostSnapshot[];
  totalFor80: number;
  estTotal80: { low: number; high: number };
  breakdown: Breakdown[];
  pros: string[];
  things_to_know: string[];
  whyExpensive: WhyExpensive[] | null;
  includes: string[];
  notIncluded: string[];
  alternatives: string[];
  plannerIds: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  img: string;
  date: string;
  readTime: string;
  feature?: boolean;
}

export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'blockquote'; text: string }
  | { type: 'ul'; items: string[] };

export interface Supplier {
  role: string;
  name: string;
}

export interface RealWedding {
  slug: string;
  couple: string;
  venueId: string;
  venueName: string;
  region: string;
  guests: number;
  date: string;
  month: string;
  total: number;
  totalRange: string;
  plannerId: string;
  plannerName: string;
  style: string;
  excerpt: string;
  photos: string[];
  suppliers: Supplier[];
  breakdown: Breakdown[];
  quote: string;
}

export interface EditorialMember {
  id: string;
  name: string;
  role: string;
  bio: string;
}

export interface UseCase {
  key: string;
  icon: string;
  title: string;
  body: string;
}

export interface Lead {
  id: string;
  initials: string;
  couple: string;
  maskedName: string;
  received: string;
  receivedTs: string;
  weddingDate: string;
  guests: number;
  budget: { low: number; high: number };
  budgetLabel: string;
  venueId: string;
  venueName: string;
  venueStatus: string;
  style: string;
  priority: string;
  support: string;
  catering: string;
  florals: string;
  photo: string;
  music: string;
  extras: string[];
  logistics: string;
  complexity: number;
  tier: string;
  email: string;
  phone: string;
  nationality: string;
  languages: string;
  note: string;
  status: 'new' | 'unlocked' | 'contacted' | 'booked' | 'lost';
  unlocked: boolean;
}
