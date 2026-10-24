export interface HeroSlide {
  id: string;
  image: string;
  title?: string;
  subtitle?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Frontend & Web Modern' | 'Backend & Programming' | 'Database & Tools' | string;
  level: number; // 1 - 100
  badge: string;
  description?: string;
}

export interface UserRecord {
  id: number;
  username: string;
  email: string;
  phone: string;
  image: string;
  password: string;
  role_id: number;
  is_active: number; // 1 = Aktif, 0 = Nonaktif
  date_create: string;
}

export interface UserRoleRecord {
  id: number;
  role: string;
}

export interface UserMenuRecord {
  id: number;
  menu: string;
}

export interface UserAccessMenuRecord {
  id: number;
  role_id: number;
  menu_id: number;
}

export interface UserSubMenuRecord {
  id: number;
  menu_id: number;
  title: string;
  url: string;
  icon: string;
  is_active: number; // 1 = Aktif, 0 = Nonaktif
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  image: string;
  link?: string;
  client?: string;
  description?: string;
  demoFeatures?: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  suitableFor?: string; // Cocok untuk: ...
  note?: string; // Catatan: ...
  features: string[];
  featured: boolean;
  badge?: string;
  icon: 'star' | 'stars' | 'star-fill';
}

export interface FaqItem {
  id: string;
  category: 'general' | 'pricing' | 'support';
  number: number;
  question: string;
  answer: string;
  answer2?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  is_public?: boolean;
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    dribbble?: string;
    instagram?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  date: string;
  author: string;
  authorAvatar: string;
  readTime: string;
  image: string;
  link?: string;
  featured: boolean;
}

export interface SimpusBookItem {
  id: string;
  code: string;
  title: string;
  author: string;
  category: string;
  year: number;
  stock: number;
  shelf: string;
  rating: string;
  image?: string;
  link?: string;
}

export interface AboutTabItem {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  badge: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export interface DashboardOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerAvatar: string;
  product: string;
  amount: string;
  status: 'Completed' | 'Pending' | 'Cancelled';
  createdAt: string;
}

export interface ActivityLogItem {
  id: string;
  type: 'success' | 'primary' | 'warning' | 'info' | 'danger';
  text: string;
  highlight?: string;
  time: string;
}

export interface CompanyInfo {
  sitename: string;
  fullName: string;
  major: string;
  avatarImage?: string;
  aboutImage?: string;
  logoUrl?: string;
  faviconUrl?: string;
  aboutSectionBadge?: string;
  aboutSectionTitle?: string;
  aboutSectionSubtitle?: string;
  heroTitle: string;
  heroDescription: string;
  aboutHeading: string;
  aboutLead: string;
  yearsExperience: string;
  projectsCount: string;
  servicesSubtitle: string;
  servicesHeading: string;
  servicesDescription: string;
  ctaBadge: string;
  ctaHeading: string;
  ctaDescription: string;
  location: string;
  email: string;
  phone: string;
  openHours: string;
  footerAddress: string;
  mapEmbedUrl: string;
  simpusFinePerDay?: number;
}

export interface DatabaseSchema {
  databaseName: string;
  user: UserRecord[];
  user_role: UserRoleRecord[];
  user_menu: UserMenuRecord[];
  user_access_menu: UserAccessMenuRecord[];
  user_sub_menu: UserSubMenuRecord[];
  company: CompanyInfo;
  heroSlides: HeroSlide[];
  skills: SkillItem[];
  services: ServiceItem[];
  features: FeatureItem[];
  aboutTabs?: AboutTabItem[];
  simpusBooks?: SimpusBookItem[];
  portfolio: PortfolioItem[];
  pricing: PricingPlan[];
  faqs: FaqItem[];
  team: TeamMember[];
  blogPosts: BlogPost[];
  messages: ContactMessage[];
  orders: DashboardOrder[];
  activities: ActivityLogItem[];
  subscribers: { id: string; email: string; createdAt: string }[];
  dashboardStats: {
    totalSales: string;
    salesGrowth: string;
    revenue: string;
    revenueGrowth: string;
    ordersCount: string;
    ordersGrowth: string;
    customersCount: string;
    customersGrowth: string;
  };
}

