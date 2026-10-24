'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Rocket,
  Globe,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  TrendingUp,
  ShieldCheck,
  Lightbulb,
  Users,
  CloudUpload,
  Settings,
  Headset,
  Star,
  Sparkles,
  Plus,
  Link2,
  HelpCircle,
  CreditCard,
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  ArrowUp,
  Menu,
  X,
  LayoutDashboard,
  Code2,
  Database,
  BookOpen,
  Terminal,
  Cpu,
  Layers,
  Search,
  QrCode,
  Calendar,
  Award,
  ExternalLink,
  Check,
  Zap,
  MonitorSmartphone,
  Shield
} from 'lucide-react';
import { DatabaseSchema, PortfolioItem, PricingPlan, SimpusBookItem } from '@/types/company';

const STRIVE_IMG = 'https://bootstrapmade.com/content/demo/Strive/assets/img';

interface CompanyProfileViewProps {
  initialData: DatabaseSchema;
}

const INITIAL_SIMPUS_BOOKS: SimpusBookItem[] = [
  {
    id: 'bk-1',
    code: 'WEB-PRO-01',
    title: 'KOPINARY CAFE – Artisan Coffee & Eatery | Company Profile + Admin CMS',
    author: 'Next.js 14 + React Js + MySQL (2026)',
    category: 'Company Profile & Bisnis',
    year: 2026,
    stock: 5,
    shelf: 'Full-Stack (Frontend + Backend)',
    rating: '5.0',
    image: '/uploads/1792821008636-Screenshot-2026-10-24-080518.png',
    link: '/#pricing'
  },
  {
    id: 'bk-2',
    code: 'WEB-PRO-02',
    title: 'LAVENSA STORE – Modern E-Commerce Fashion & Toko Online + Midtrans',
    author: 'Next.js App Router + Node.js API + MySQL (2026)',
    category: 'E-Commerce & Toko Online',
    year: 2026,
    stock: 4,
    shelf: 'Katalog Produk, Cart & Invoice Otomatis',
    rating: '5.0',
    image: '/uploads/ecommerce-store-lavensa.jpg',
    link: '/#pricing'
  },
  {
    id: 'bk-3',
    code: 'WEB-PRO-03',
    title: 'CAREWELL CLINIC – Website Profil Klinik Medis & Booking Dokter Online',
    author: 'Next.js + Tailwind + WhatsApp Booking API (2026)',
    category: 'Landing Page & UMKM',
    year: 2026,
    stock: 6,
    shelf: 'High-Converting Appointment & Fast Load',
    rating: '4.9',
    image: '/uploads/carewell-clinic-landing.jpg',
    link: '/#pricing'
  },
  {
    id: 'bk-4',
    code: 'WEB-PRO-04',
    title: 'SYNERGY OS – Enterprise SaaS Admin Dashboard & Role-Based Access',
    author: 'Next.js 14 + PostgreSQL / MySQL RBAC (2026)',
    category: 'Custom Web App & API',
    year: 2026,
    stock: 3,
    shelf: 'Multi-Role, Analitik & Audit Log',
    rating: '5.0',
    image: '/uploads/synergy-admin-dashboard.jpg',
    link: '/#pricing'
  },
  {
    id: 'bk-5',
    code: 'WEB-PRO-05',
    title: 'AXIS ARCHITECT – Corporate Construction & Interior Architecture',
    author: 'Next.js 14 + Tailwind + MySQL (2026)',
    category: 'Company Profile & Bisnis',
    year: 2026,
    stock: 4,
    shelf: 'Corporate Profile & Project Showcase',
    rating: '4.9',
    image: '/uploads/axis-architect-corporate.jpg',
    link: '/#pricing'
  },
  {
    id: 'bk-6',
    code: 'WEB-PRO-06',
    title: 'PERPUSERAJAYA – Sistem Perpustakaan Sekolah Digital & Portal E-Katalog',
    author: 'Next.js + TypeScript + Database Relasional (2026)',
    category: 'Custom Web App & API',
    year: 2026,
    stock: 5,
    shelf: 'Digital Library & PPDB Portal',
    rating: '5.0',
    image: '/uploads/1792806664315-Screenshot-2026-10-24-085051.png',
    link: '/#pricing'
  }
];

export default function CompanyProfileView({ initialData }: CompanyProfileViewProps) {
  const [data, setData] = useState<DatabaseSchema>(initialData);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeNav, setActiveNav] = useState('hero');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Hero Carousel & Interactive Showcase State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroShowcaseTab, setHeroShowcaseTab] = useState<'simpus' | 'stack' | 'database'>('simpus');

  // About Section Interactive Tab Index
  const [aboutTabIdx, setAboutTabIdx] = useState<number>(0);

  // Skills Category Filter
  const [skillFilter, setSkillFilter] = useState<string>('Semua');

  // Interactive Live Web Package & Project Estimator Simulator State
  const [simpusBooks, setSimpusBooks] = useState<SimpusBookItem[]>(
    initialData.simpusBooks && initialData.simpusBooks.length > 0
      ? initialData.simpusBooks
      : INITIAL_SIMPUS_BOOKS
  );
  const [simpusSearch, setSimpusSearch] = useState('');
  const [simpusCat, setSimpusCat] = useState<string>('Semua');
  const [borrowedReceipts, setBorrowedReceipts] = useState<
    Array<{ id: string; bookId?: string; title: string; code: string; borrower: string; dueDate: string }>
  >([
    {
      id: 'ORD-8901',
      bookId: 'bk-1',
      title: 'Website Company Profile Eksekutif + Admin CMS Dinamis',
      code: 'WEB-PKG-01',
      borrower: 'PT Nusantara Karya Mandiri',
      dueDate: 'Estimasi 5-7 Hari Kerja'
    }
  ]);
  const [lateDaysSim, setLateDaysSim] = useState<number>(2);
  const [simpusToast, setSimpusToast] = useState<string | null>(null);

  // Services Slider State
  const [serviceStartIndex, setServiceStartIndex] = useState(0);

  // Initial Fullscreen Preloader & Smooth Entrance/Exit State
  const [siteLoading, setSiteLoading] = useState<boolean>(true);
  const [preloaderExiting, setPreloaderExiting] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(20);
  const [loadingStatusText, setLoadingStatusText] = useState<string>(
    'Menginisialisasi Nexvora App Engine...'
  );

  useEffect(() => {
    const t1 = setTimeout(() => {
      setLoadingProgress(55);
      setLoadingStatusText('Sinkronisasi Database company_db & Layanan...');
    }, 180);
    const t2 = setTimeout(() => {
      setLoadingProgress(88);
      setLoadingStatusText('Menyiapkan Desain UI/UX & Animasi...');
    }, 420);
    const t3 = setTimeout(() => {
      setLoadingProgress(100);
      setLoadingStatusText('Sistem Siap Digunakan!');
      setPreloaderExiting(true);
    }, 780);
    const t4 = setTimeout(() => {
      setSiteLoading(false);
    }, 1280);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleSkipPreloader = () => {
    setPreloaderExiting(true);
    setTimeout(() => setSiteLoading(false), 220);
  };

  // Portfolio Filter & Lightbox State (with Smooth Entrance/Exit Animation)
  const [portfolioFilter, setPortfolioFilter] = useState<string>('All');
  const [portfolioAnim, setPortfolioAnim] = useState<'enter' | 'exit'>('enter');
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  const handlePortfolioFilterChange = (cat: string) => {
    if (cat === portfolioFilter) return;
    setPortfolioAnim('exit');
    setTimeout(() => {
      setPortfolioFilter(cat);
      setPortfolioAnim('enter');
    }, 180);
  };

  // FAQ Tabs & Accordion State
  const [faqTab, setFaqTab] = useState<'general' | 'pricing' | 'support'>('general');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-g1');

  // Order Modal State
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [orderForm, setOrderForm] = useState({ name: '', email: '' });
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactStatus, setContactStatus] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterMsg, setNewsletterMsg] = useState<string | null>(null);

  // Sync live data from Backend Database API
  useEffect(() => {
    fetch('/api/company')
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data) {
          setData(res.data);
          if (Array.isArray(res.data.simpusBooks) && res.data.simpusBooks.length > 0) {
            setSimpusBooks(res.data.simpusBooks);
          }
        }
      })
      .catch(() => {});
  }, []);

  // Scroll Progress & Active Section Spy
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);

      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (y / docHeight) * 100)));
      }

      const sections = [
        'hero',
        'about',
        'skills',
        'simpus-live',
        'services',
        'portfolio',
        'pricing',
        'contact'
      ];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveNav(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Hero Auto-Carousel
  useEffect(() => {
    if (!data.heroSlides.length) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [data.heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % data.heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + data.heroSlides.length) % data.heroSlides.length
    );
  };

  const nextServiceSlide = () => {
    if (!data.services.length) return;
    setServiceStartIndex((prev) => (prev + 1) % data.services.length);
  };

  const prevServiceSlide = () => {
    if (!data.services.length) return;
    setServiceStartIndex(
      (prev) => (prev - 1 + data.services.length) % data.services.length
    );
  };

  const visibleServices = () => {
    if (data.services.length <= 3) return data.services;
    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push(data.services[(serviceStartIndex + i) % data.services.length]);
    }
    return result;
  };

  const renderServiceIcon = (icon: string) => {
    switch (icon) {
      case 'BarChart3':
        return <BookOpen className="w-7 h-7" />;
      case 'TrendingUp':
        return <TrendingUp className="w-7 h-7" />;
      case 'ShieldCheck':
        return <Database className="w-7 h-7" />;
      case 'Lightbulb':
        return <Lightbulb className="w-7 h-7" />;
      case 'Users':
        return <Users className="w-7 h-7" />;
      case 'CloudUpload':
        return <CloudUpload className="w-6 h-6" />;
      case 'Settings':
        return <Settings className="w-6 h-6" />;
      case 'Headset':
        return <Code2 className="w-6 h-6" />;
      default:
        return <BarChart3 className="w-7 h-7" />;
    }
  };

  const filteredSkills =
    skillFilter === 'Semua'
      ? data.skills || []
      : (data.skills || []).filter((s) => s.category === skillFilter);

  const filteredSimpusBooks = simpusBooks.filter((b) => {
    const matchCat = simpusCat === 'Semua' || b.category === simpusCat;
    const matchSearch =
      b.title.toLowerCase().includes(simpusSearch.toLowerCase()) ||
      b.author.toLowerCase().includes(simpusSearch.toLowerCase()) ||
      b.code.toLowerCase().includes(simpusSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleBorrowSimpusBook = (book: SimpusBookItem) => {
    if (book.stock <= 0) return;
    setSimpusBooks((prev) =>
      prev.map((item) =>
        item.id === book.id ? { ...item, stock: item.stock - 1 } : item
      )
    );
    const trxId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    setBorrowedReceipts((prev) => [
      {
        id: trxId,
        bookId: book.id,
        title: book.title,
        code: book.code,
        borrower: 'Klien Demo (Konsultasi & Booking Slot)',
        dueDate: 'Estimasi 5-14 Hari Kerja'
      },
      ...prev
    ]);
    setSimpusToast(
      `Berhasil memilih paket "${book.title}" (${trxId})! Slot pengerjaan otomatis tercatat di simulasi order.`
    );
    setTimeout(() => setSimpusToast(null), 4000);
  };

  const handleRemoveReceipt = (receiptId: string) => {
    const target = borrowedReceipts.find((r) => r.id === receiptId);
    if (!target) return;

    // Restore stock to simpusBooks (+1)
    setSimpusBooks((prev) =>
      prev.map((item) =>
        (target.bookId && item.id === target.bookId) ||
        item.code === target.code ||
        item.title === target.title
          ? { ...item, stock: item.stock + 1 }
          : item
      )
    );

    // Remove from borrowedReceipts
    setBorrowedReceipts((prev) => prev.filter((r) => r.id !== receiptId));

    setSimpusToast(
      `Pilihan paket "${target.title}" (${target.id}) telah dibatalkan / dihapus dari simulasi order.`
    );
    setTimeout(() => setSimpusToast(null), 4000);
  };

  const handleToggleSimpusBook = (book: SimpusBookItem) => {
    const existing = borrowedReceipts.find(
      (r) => (r.bookId && r.bookId === book.id) || r.code === book.code || r.title === book.title
    );
    if (existing) {
      // Engga jadi pilih / batal
      handleRemoveReceipt(existing.id);
    } else {
      // Pilih / nambah
      handleBorrowSimpusBook(book);
    }
  };

  const handleClearAllReceipts = () => {
    if (borrowedReceipts.length === 0) return;
    // Restore stock for all
    setSimpusBooks((prev) =>
      prev.map((item) => {
        const count = borrowedReceipts.filter(
          (r) => (r.bookId && r.bookId === item.id) || r.code === item.code || r.title === item.title
        ).length;
        return count > 0 ? { ...item, stock: item.stock + count } : item;
      })
    );
    setBorrowedReceipts([]);
    setSimpusToast('Semua pilihan paket di simulasi order berhasil dibatalkan.');
    setTimeout(() => setSimpusToast(null), 4000);
  };

  const filteredPortfolio =
    portfolioFilter === 'All'
      ? data.portfolio
      : data.portfolio.filter((item) => {
          const itemCat = (item.category || '').toLowerCase().trim();
          const filterCat = portfolioFilter.toLowerCase().trim();
          return itemCat === filterCat || itemCat.includes(filterCat) || filterCat.includes(itemCat);
        });

  const filteredFaqs = data.faqs.filter((f) => f.category === faqTab);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setContactStatus(null);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      const json = await res.json();
      if (json.success) {
        setContactStatus({
          type: 'success',
          text: 'Pesan Anda berhasil dikirim ke Database & Inbox AppDashboard!'
        });
        setContactForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setContactStatus({
          type: 'error',
          text: json.message || 'Gagal mengirim pesan.'
        });
      }
    } catch {
      setContactStatus({
        type: 'error',
        text: 'Terjadi gangguan jaringan.'
      });
    } finally {
      setContactLoading(false);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterLoading(true);
    setNewsletterMsg(null);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail })
      });
      const json = await res.json();
      setNewsletterMsg(json.message || 'Terima kasih telah berlangganan!');
      if (json.success) setNewsletterEmail('');
    } catch {
      setNewsletterMsg('Gagal berlangganan.');
    } finally {
      setNewsletterLoading(false);
    }
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;
    setOrderSubmitting(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: orderForm.name,
          customerEmail: orderForm.email,
          product: selectedPlan.name,
          amount: `Rp ${selectedPlan.price}`
        })
      });
      const json = await res.json();
      if (json.success) {
        setOrderSuccess(
          `Order ${json.data.orderNumber} berhasil tercatat di Database AppDashboard (/admin)!`
        );
        setOrderForm({ name: '', email: '' });
      }
    } finally {
      setOrderSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#334155] font-sans selection:bg-[#ea7c00] selection:text-white">
      {/* Full-Screen Modern Automatic Loading Screen (Preloader) with Smooth Entrance & Exit */}
      {siteLoading && (
        <div
          className={`fixed inset-0 z-[100] bg-[#070514] text-white flex flex-col items-center justify-center p-6 select-none transition-all ${
            preloaderExiting ? 'animate-preloader-exit' : ''
          }`}
        >
          {/* Ambient Radial Glowing Aura */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(circle at 35% 35%, rgba(234, 124, 0, 0.28), transparent 45%), radial-gradient(circle at 65% 65%, rgba(139, 92, 246, 0.25), transparent 45%)'
            }}
          />

          <div className="relative z-10 w-full max-w-sm rounded-3xl border border-[#2d2654] bg-[#110e26]/90 backdrop-blur-2xl p-8 shadow-2xl text-center space-y-6 animate-auth-card">
            {/* Spinning Brand Rings */}
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border-4 border-t-transparent border-[#ea7c00] animate-spin" />
              <div
                className="absolute w-14 h-14 rounded-full border-4 border-b-transparent border-[#8b5cf6] animate-spin"
                style={{ animationDirection: 'reverse', animationDuration: '0.9s' }}
              />
              <Rocket className="w-7 h-7 text-amber-400 absolute animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-gradient-to-r from-[#ea7c00]/20 to-[#8b5cf6]/20 text-amber-300 border border-amber-400/30">
                ✨ Nexvora Digital Suite • v2025
              </span>
              <h2 className="text-xl font-extrabold text-white tracking-tight">
                Memuat Pengalaman Web Pro
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed min-h-[36px]">
                {loadingStatusText}
              </p>
            </div>

            {/* Glowing Shimmer Progress Bar */}
            <div className="space-y-1.5">
              <div className="w-full h-2.5 rounded-full bg-[#1e193d] overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#ea7c00] via-amber-400 to-[#8b5cf6] transition-all duration-300 ease-out shadow-[0_0_12px_#ea7c00]"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>Frontend &amp; Backend</span>
                <span className="text-amber-400 font-bold">{loadingProgress}%</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSkipPreloader}
              className="text-[11px] font-semibold text-slate-400 hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
            >
              Lewati Loading →
            </button>
          </div>
        </div>
      )}

      {/* Top Scroll Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-black/20">
        <div
          className="h-full bg-gradient-to-r from-[#ea7c00] via-amber-400 to-[#8b5cf6] transition-all duration-150 shadow-[0_0_12px_#ea7c00]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ==================== HEADER (PRO GLASSMORPHIC NAVBAR) ==================== */}
      <header
        id="header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0d0b1c]/90 backdrop-blur-xl py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] border-b border-white/10'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5 border-b border-white/10'
        }`}
      >
        <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 lg:gap-4">
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center gap-2.5 group shrink-0">
            {data.company.logoUrl ? (
              <img
                src={data.company.logoUrl}
                alt={data.company.sitename}
                className="w-10 h-10 rounded-xl object-cover border border-[#ea7c00]/50 shadow-lg shadow-[#ea7c00]/30 group-hover:scale-105 transition-transform shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ea7c00] to-amber-600 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-[#ea7c00]/30 group-hover:scale-105 transition-transform shrink-0">
                <Code2 className="w-5 h-5" />
              </div>
            )}
            <div className="flex flex-col">
              <div className="flex items-center leading-none">
                <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-display whitespace-nowrap">
                  {data.company.sitename}
                </span>
                <span className="text-2xl font-black text-[#ea7c00] ml-0.5">.</span>
                <span className="ml-2 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full bg-[#ea7c00]/20 text-amber-300 border border-[#ea7c00]/40 hidden 2xl:inline-block whitespace-nowrap">
                  Jasa Web &amp; Backend
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium hidden 2xl:block mt-0.5 whitespace-nowrap">
                Jasa Pembuatan Website • Frontend &amp; Backend
              </span>
            </div>
          </a>

          {/* Desktop Navigation Menu (Pro Single-Line Pill with No-Wrap) */}
          <nav className="hidden xl:flex items-center bg-white/[0.06] border border-white/10 backdrop-blur-md rounded-full p-1.5 text-xs 2xl:text-[13px] font-semibold text-slate-200 shrink-0 gap-0.5 2xl:gap-1 shadow-lg shadow-black/20">
            {[
              { id: 'hero', label: 'Home' },
              { id: 'about', label: 'Profil IT' },
              { id: 'services', label: 'Jasa Website' },
              { id: 'skills', label: 'Skills' },
              { id: 'simpus-live', label: 'Simulasi Order' },
              { id: 'portfolio', label: 'Portofolio' },
              { id: 'pricing', label: 'Paket Harga' }
            ].map((item) => {
              const isActive = activeNav === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`px-3 py-1.5 2xl:px-3.5 rounded-full transition-all duration-200 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#ea7c00] to-amber-500 text-white font-bold shadow-md shadow-[#ea7c00]/30'
                      : 'hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            {/* Dropdown Lainnya */}
            <div
              className="relative shrink-0"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 px-3 py-1.5 2xl:px-3.5 rounded-full hover:text-white hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Lainnya</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {dropdownOpen && (
                <ul className="absolute right-0 top-full mt-2 w-64 bg-[#131026] text-white rounded-2xl shadow-2xl py-2.5 text-xs font-semibold z-50 border border-white/15 backdrop-blur-xl">
                  <li>
                    <a
                      href="#services"
                      className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-white/10 hover:text-amber-400 transition-colors"
                    >
                      <Globe className="w-4 h-4 text-[#ea7c00] shrink-0" />
                      <span>Jasa Pembuatan Website &amp; Backend</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#simpus-live"
                      className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-white/10 hover:text-amber-400 transition-colors"
                    >
                      <Layers className="w-4 h-4 text-[#ea7c00] shrink-0" />
                      <span>Katalog Paket Web &amp; Kalkulator Proyek</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#faq"
                      className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-white/10 hover:text-amber-400 transition-colors"
                    >
                      <HelpCircle className="w-4 h-4 text-[#ea7c00] shrink-0" />
                      <span>Tanya Jawab (FAQ Jasa Web)</span>
                    </a>
                  </li>
                </ul>
              )}
            </div>

            <a
              href="#contact"
              className={`px-3 py-1.5 2xl:px-3.5 rounded-full transition-all duration-200 whitespace-nowrap shrink-0 ${
                activeNav === 'contact'
                  ? 'bg-gradient-to-r from-[#ea7c00] to-amber-500 text-white font-bold shadow-md shadow-[#ea7c00]/30'
                  : 'hover:text-white hover:bg-white/10'
              }`}
            >
              Kontak
            </a>
          </nav>

          {/* Right CTA Button + Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#pricing"
              className="group relative inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#ea7c00] via-amber-500 to-[#ea7c00] bg-[length:200%_auto] hover:bg-right text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-xl shadow-[#ea7c00]/35 hover:shadow-2xl hover:shadow-[#ea7c00]/55 border border-amber-300/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 whitespace-nowrap overflow-hidden shrink-0 cursor-pointer"
            >
              {/* Shimmer sweep light effect on hover */}
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />

              {/* Icon with smooth hover animation */}
              <Rocket className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-300 shrink-0" />

              <span className="whitespace-nowrap">Pesan Website</span>

              {/* Pulsing online indicator dot */}
              <span className="relative flex h-2 w-2 ml-0.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
            </a>

            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="xl:hidden text-white p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
              aria-label="Toggle Menu"
            >
              {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {mobileNavOpen && (
          <div className="xl:hidden fixed inset-0 top-[68px] bg-black/80 backdrop-blur-md z-50 p-4">
            <div className="bg-[#110f24] border border-white/15 rounded-2xl p-5 text-white space-y-2 shadow-2xl max-h-[82vh] overflow-y-auto">
              {[
                { label: 'Home', href: '#hero' },
                { label: 'Profil & Spesialisasi IT', href: '#about' },
                { label: 'Jasa Pembuatan Website (Frontend & Backend)', href: '#services' },
                { label: 'Skills & Keahlian Pemrograman', href: '#skills' },
                { label: 'Simulasi Katalog Paket Web & Estimasi Proyek', href: '#simpus-live' },
                { label: 'Portofolio Karya Website', href: '#portfolio' },
                { label: 'Paket Harga Jasa Pembuatan Web', href: '#pricing' },
                { label: 'FAQ Jasa Website', href: '#faq' },
                { label: 'Kontak & Konsultasi', href: '#contact' }
              ].map((nav) => (
                <a
                  key={nav.href}
                  href={nav.href}
                  onClick={() => setMobileNavOpen(false)}
                  className="block py-2.5 px-4 rounded-xl text-sm font-semibold hover:text-[#ea7c00] hover:bg-white/5 transition-colors"
                >
                  {nav.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ==================== 1. HERO SECTION (PRO SPLIT + INTERACTIVE SHOWCASE) ==================== */}
        <section
          id="hero"
          className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#080711] text-white pt-28 pb-12"
        >
          {/* Background Slides with Pro Gradient Overlay */}
          <div className="absolute inset-0">
            {data.heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-1000 ${
                  index === currentSlide
                    ? 'opacity-100 scale-100 z-10'
                    : 'opacity-0 scale-105 z-0'
                }`}
              >
                <img
                  src={slide.image}
                  alt="Hero Slide"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#080711]/95 via-[#0d0b1c]/85 to-[#080711]/75" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,124,0,0.18),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.18),transparent_50%)]" />
              </div>
            ))}
          </div>

          {/* Main Hero Grid: Left Executive Pitch + Right Live Interactive Engineering Card */}
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column (7 cols) */}
              <div className="lg:col-span-7 space-y-6 text-left">
                {/* Top Status & Identity Badge with Uploaded Avatar Photo */}
                <div className="inline-flex flex-wrap items-center gap-2.5 bg-white/[0.07] backdrop-blur-md border border-white/15 pl-2 pr-4 py-1.5 rounded-full">
                  <a
                    href={data.company.avatarImage || `${STRIVE_IMG}/person/person-m-8.webp`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Lihat Foto Profil Developer (_blank)"
                    className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#ea7c00] shrink-0 block"
                  >
                    <img
                      src={data.company.avatarImage || `${STRIVE_IMG}/person/person-m-8.webp`}
                      alt={data.company.fullName}
                      className="w-full h-full object-cover"
                    />
                  </a>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Open Order Jasa Website
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-400">
                    <Code2 className="w-4 h-4 text-[#ea7c00]" />
                    {data.company.fullName} • Frontend &amp; Backend Developer
                  </span>
                </div>

                {/* High-Impact Pro Headline */}
                <h1 className="text-3xl sm:text-5xl xl:text-[52px] font-extrabold text-white leading-[1.12] tracking-tight font-display">
                  {data.company.heroTitle || (
                    <>
                      Jasa Pembuatan Website Pro{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea7c00] via-amber-400 to-orange-400">
                        (Frontend &amp; Backend)
                      </span>{' '}
                      &amp; Sistem Informasi
                    </>
                  )}
                </h1>

                {/* Subtitle Description */}
                <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
                  {data.company.heroDescription}
                </p>

                {/* Key Highlights Pills */}
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {[
                    { icon: <Globe className="w-3.5 h-3.5 text-[#ea7c00]" />, text: 'Jasa Website Full-Stack (Frontend + Backend)' },
                    { icon: <Layers className="w-3.5 h-3.5 text-amber-400" />, text: 'Company Profile, Toko Online (E-Commerce) & SIAKAD' },
                    { icon: <Database className="w-3.5 h-3.5 text-purple-400" />, text: 'Backend Admin CMS, REST API & Database SQL' }
                  ].map((pill, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.06] border border-white/10 text-xs font-semibold text-slate-200"
                    >
                      {pill.icon}
                      {pill.text}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <a
                    href="#pricing"
                    className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#ea7c00] to-amber-500 hover:from-[#d46f00] hover:to-[#ea7c00] text-white font-bold text-sm sm:text-[15px] px-7 py-4 rounded-2xl shadow-xl shadow-[#ea7c00]/30 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Rocket className="w-4 h-4" />
                    <span>Pesan Jasa Pembuatan Website</span>
                  </a>
                  <a
                    href="#services"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm sm:text-[15px] px-6 py-4 rounded-2xl backdrop-blur-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Layers className="w-4 h-4 text-amber-400" />
                    <span>Layanan Frontend &amp; Backend</span>
                  </a>
                </div>

                {/* Carousel Slide Indicators & Manual Controls */}
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={prevSlide}
                      aria-label="Previous Slide"
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ea7c00] text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={nextSlide}
                      aria-label="Next Slide"
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ea7c00] text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    {data.heroSlides.map((s, idx) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          idx === currentSlide
                            ? 'w-8 bg-[#ea7c00]'
                            : 'w-2.5 bg-white/30 hover:bg-white/60'
                        }`}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    0{currentSlide + 1} / 0{data.heroSlides.length} • Full-Stack Web Studio
                  </span>
                </div>
              </div>

              {/* Right Column (5 cols): Interactive Engineering & System Preview Card */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl bg-[#110f24]/90 backdrop-blur-2xl border border-white/15 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)] overflow-hidden">
                  {/* Window Top Bar */}
                  <div className="px-5 py-3.5 bg-[#181432] border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500" />
                      <span className="w-3 h-3 rounded-full bg-amber-400" />
                      <span className="w-3 h-3 rounded-full bg-emerald-400" />
                      <span className="ml-2 text-xs font-mono text-slate-300 font-semibold">
                        syauqi-dev://jasa-website-fullstack
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      FRONTEND + BACKEND
                    </span>
                  </div>

                  {/* Interactive Switcher Tabs inside Card */}
                  <div className="grid grid-cols-3 gap-1 p-2 bg-[#0d0b1c]/60 border-b border-white/10 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setHeroShowcaseTab('simpus')}
                      className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        heroShowcaseTab === 'simpus'
                          ? 'bg-[#ea7c00] text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Jasa Website</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroShowcaseTab('stack')}
                      className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        heroShowcaseTab === 'stack'
                          ? 'bg-[#ea7c00] text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Backend &amp; API</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroShowcaseTab('database')}
                      className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        heroShowcaseTab === 'database'
                          ? 'bg-[#ea7c00] text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Database className="w-3.5 h-3.5" />
                      <span>company_db</span>
                    </button>
                  </div>

                  {/* Card Body Content */}
                  <div className="p-6 space-y-4">
                    {heroShowcaseTab === 'simpus' && (
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                              Layanan Unggulan • Terima Beres
                            </span>
                            <h3 className="text-lg font-extrabold text-white mt-0.5">
                              Jasa Pembuatan Website &amp; Backend
                            </h3>
                          </div>
                          <span className="px-3 py-1 rounded-xl bg-[#ea7c00]/20 text-amber-300 text-xs font-bold border border-[#ea7c00]/30">
                            Full-Stack
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          Melayani pembuatan berbagai jenis website modern lengkap dengan sistem
                          Backend Dashboard Admin, API, &amp; Database SQL:
                        </p>

                        <div className="grid grid-cols-2 gap-2.5 text-xs">
                          {[
                            { title: 'Web Company Profile', sub: 'Frontend + Admin CMS' },
                            { title: 'Toko Online / E-Commerce', sub: 'Katalog, Cart & Order' },
                            { title: 'Landing Page Bisnis', sub: 'UI/UX Pro & SEO Cepat' },
                            { title: 'Sistem Backend & API', sub: 'RBAC User & MySQL' }
                          ].map((item) => (
                            <div
                              key={item.title}
                              className="p-3 rounded-2xl bg-white/[0.04] border border-white/10"
                            >
                              <div className="font-bold text-white">{item.title}</div>
                              <div className="text-[11px] text-amber-400 mt-0.5">{item.sub}</div>
                            </div>
                          ))}
                        </div>

                        <div className="pt-1">
                          <a
                            href="#pricing"
                            className="block w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#ea7c00] to-amber-500 hover:from-[#d46f00] hover:to-[#ea7c00] text-white text-xs font-bold text-center shadow-lg hover:opacity-95 transition-opacity"
                          >
                            Lihat Paket Jasa Website ↓
                          </a>
                        </div>
                      </div>
                    )}

                    {heroShowcaseTab === 'stack' && (
                      <div className="space-y-3.5">
                        <div className="p-3.5 rounded-2xl bg-[#090814] border border-white/10 font-mono text-xs text-slate-200 space-y-1.5">
                          <div className="text-emerald-400">
                            $ syauqi-web-service --frontend --backend
                          </div>
                          <div>
                            <span className="text-purple-400">Frontend:</span> Next.js 14, React 18,
                            TypeScript, Tailwind
                          </div>
                          <div>
                            <span className="text-amber-400">Backend:</span> Laravel / Node.js, REST
                            API, RBAC Auth
                          </div>
                          <div>
                            <span className="text-cyan-400">Database:</span> MySQL `company_db` +
                            Admin Dashboard
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5 text-xs">
                          {(data.skills || []).slice(0, 4).map((sk) => (
                            <div
                              key={sk.id}
                              className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between"
                            >
                              <span className="font-semibold text-white truncate pr-2">
                                {sk.name.split('(')[0]}
                              </span>
                              <span className="text-amber-400 font-extrabold">{sk.level}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {heroShowcaseTab === 'database' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-purple-300">
                            Skema Aktif: `company_db` (5 Tabel Utama)
                          </span>
                          <span className="text-[11px] font-mono text-emerald-400">CONNECTED</span>
                        </div>
                        <div className="space-y-1.5 text-xs font-mono">
                          {[
                            { t: '1. user', d: 'id, username, email, role_id, is_active' },
                            { t: '2. user_role', d: 'id, role (Admin & User)' },
                            { t: '3. user_menu', d: 'id, menu (Admin, User, Menu)' },
                            { t: '4. user_access_menu', d: 'id, role_id, menu_id' },
                            { t: '5. user_sub_menu', d: 'id, menu_id, title, url, icon' }
                          ].map((row) => (
                            <div
                              key={row.t}
                              className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-2"
                            >
                              <strong className="text-amber-400">{row.t}</strong>
                              <span className="text-slate-400 truncate text-[11px]">{row.d}</span>
                            </div>
                          ))}
                        </div>
                        <a
                          href="#contact"
                          className="block w-full py-2.5 rounded-xl bg-gradient-to-r from-[#ea7c00] to-amber-500 hover:from-[#d46f00] hover:to-[#ea7c00] text-white text-center text-xs font-bold transition-all shadow-md"
                        >
                          Konsultasikan Kebutuhan Sistem &amp; Database Anda →
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Hero Glass Bento KPI Bar */}
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 p-4 sm:p-6 rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/10 shadow-2xl">
              {[
                {
                  val: `${data.company.yearsExperience}+ Tahun`,
                  label: 'Pengalaman Jasa Pembuatan Web',
                  sub: 'Full-Stack Frontend & Backend'
                },
                {
                  val: data.company.projectsCount || '28+ Proyek',
                  label: 'Portofolio Website & Sistem',
                  sub: 'Company Profile, E-Commerce & Web App'
                },
                {
                  val: `${data.skills?.length || 12} Keahlian`,
                  label: 'Kompetensi Teknik Informatika',
                  sub: 'Frontend, Backend API & Database SQL'
                },
                {
                  val: '5 Tabel RBAC',
                  label: 'Database company_db Terintegrasi',
                  sub: 'Live CRUD di AppDashboard (/admin)'
                }
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="p-3 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#ea7c00]/40 transition-colors"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-amber-300 font-display">
                    {stat.val}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-amber-400 mt-1">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 hidden sm:block">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 2. ABOUT SECTION (PROFIL TEKNIK INFORMATIKA BENTO) ==================== */}
        <section id="about" className="py-20 sm:py-28 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between pb-14 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ea7c00]/10 text-[#ea7c00] text-xs font-extrabold uppercase tracking-wider mb-3">
                  <Award className="w-4 h-4" />
                  <span>
                    {data.company.aboutSectionBadge ||
                      'Personal Company Profile • Teknik Informatika'}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight font-display">
                  {data.company.aboutSectionTitle ||
                    'Rekayasa Perangkat Lunak & Solusi Web Era Baru'}
                </h2>
              </div>
              <p className="text-slate-600 text-sm sm:text-base max-w-md">
                {data.company.aboutSectionSubtitle ||
                  'Menggabungkan fondasi ilmu komputer, algoritma, dan perancangan basis data dengan estetika UI/UX kelas profesional.'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Portrait + Floating Engineering Cards */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#f8fafc] group">
                  <a
                    href={data.company.aboutImage || `${STRIVE_IMG}/about/about-portrait-2.webp`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Buka Foto Profil IT di Tab Baru (_blank)"
                    className="block w-full h-[460px]"
                  >
                    <img
                      src={data.company.aboutImage || `${STRIVE_IMG}/about/about-portrait-2.webp`}
                      alt="Profil Teknik Informatika"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </a>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b1c]/90 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between gap-3">
                    <div>
                      <span className="px-3 py-1 rounded-full bg-[#ea7c00] text-white text-xs font-bold inline-block">
                        {data.company.major}
                      </span>
                      <div className="flex items-center gap-2.5 mt-2.5">
                        <a
                          href={data.company.avatarImage || `${STRIVE_IMG}/person/person-m-8.webp`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Lihat Foto Avatar Developer (_blank)"
                          className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#ea7c00] shrink-0 block"
                        >
                          <img
                            src={data.company.avatarImage || `${STRIVE_IMG}/person/person-m-8.webp`}
                            alt={data.company.fullName}
                            className="w-full h-full object-cover"
                          />
                        </a>
                        <div>
                          <h3 className="text-2xl font-extrabold leading-tight">
                            {data.company.fullName}
                          </h3>
                          <p className="text-xs text-slate-300">
                            Full-Stack Web Developer &amp; Information Systems Architect
                          </p>
                        </div>
                      </div>
                    </div>
                    <a
                      href={data.company.aboutImage || `${STRIVE_IMG}/about/about-portrait-2.webp`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Lihat Gambar Penuh (_blank)"
                      className="w-9 h-9 rounded-full bg-white/15 hover:bg-[#ea7c00] text-white flex items-center justify-center shrink-0 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Floating Badge Top-Right */}
                <div className="absolute -top-5 -right-3 sm:right-4 bg-[#0d0b1c] text-white px-5 py-4 rounded-2xl shadow-2xl border border-white/10">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#ea7c00] leading-none">
                    {data.company.projectsCount}
                  </div>
                  <div className="text-xs font-semibold text-slate-300 mt-1">
                    Proyek Web &amp; Sistem
                  </div>
                </div>
              </div>

              {/* Right Content + Interactive Tabs (Synced from db.aboutTabs) */}
              <div className="lg:col-span-7 space-y-6">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f172a] leading-tight font-display">
                  {data.company.aboutHeading}
                </h3>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  {data.company.aboutLead}
                </p>

                {/* Interactive Profile Tabs */}
                {(() => {
                  const tabs =
                    data.aboutTabs && data.aboutTabs.length > 0
                      ? data.aboutTabs
                      : [
                          {
                            id: 'abt-1',
                            tabLabel: 'Jasa Website Full-Stack',
                            title:
                              'Layanan Pembuatan Website Profesional (Frontend UI/UX + Backend CMS)',
                            description:
                              'Membangun website dari nol hingga siap online: mulai dari Company Profile Perusahaan, Website Toko Online (E-Commerce), Landing Page Bisnis/UMKM, hingga Portal Akademik & Sistem Informasi Custom.',
                            badge: 'Terima Beres: Desain Modern, Panel Admin CMS & Gratis Deploy'
                          },
                          {
                            id: 'abt-2',
                            tabLabel: 'Backend & REST API',
                            title: 'Rekayasa Sistem Backend, Autentikasi RBAC & Integrasi API',
                            description:
                              'Menguasai pengembangan mesin belakang website menggunakan Next.js App Router, Node.js, PHP/Laravel, RESTful API, serta manajemen hak akses multi-role (Admin & User) yang cepat dan aman.',
                            badge: '100% Responsif di Smartphone, Tablet/iPad, & Desktop'
                          },
                          {
                            id: 'abt-3',
                            tabLabel: 'Database & Admin CMS',
                            title: 'Integrasi Penuh dengan Database company_db & AppDashboard',
                            description:
                              'Setiap website dilengkapi panel kendali AppDashboard (/admin) dengan 5 tabel utama RBAC serta CMS dinamis untuk menambah/mengedit layanan, portofolio, harga, dan pesanan klien secara real-time.',
                            badge: 'Clean Architecture, RESTful API, & Keamanan Data Terjamin'
                          }
                        ];
                  const safeIdx = aboutTabIdx < tabs.length ? aboutTabIdx : 0;
                  const activeTabItem = tabs[safeIdx];

                  return (
                    <>
                      <div className="flex flex-wrap gap-2 pt-1 border-b border-slate-200 pb-3">
                        {tabs.map((t, idx) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setAboutTabIdx(idx)}
                            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                              safeIdx === idx
                                ? 'bg-[#0d0b1c] text-white shadow-md'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {idx + 1}. {t.tabLabel}
                          </button>
                        ))}
                      </div>

                      {activeTabItem && (
                        <div className="p-6 rounded-2xl bg-[#f8fafc] border border-slate-200/80 space-y-3">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-[#ea7c00]/15 text-[#ea7c00] flex items-center justify-center shrink-0">
                              {safeIdx % 3 === 0 ? (
                                <Globe className="w-6 h-6" />
                              ) : safeIdx % 3 === 1 ? (
                                <Cpu className="w-6 h-6" />
                              ) : (
                                <Database className="w-6 h-6" />
                              )}
                            </div>
                            <div className="space-y-2">
                              <h4 className="text-lg font-extrabold text-[#0f172a]">
                                {activeTabItem.title}
                              </h4>
                              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                                {activeTabItem.description}
                              </p>
                              {activeTabItem.badge && (
                                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ea7c00] bg-orange-50 px-3 py-1 rounded-lg">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>{activeTabItem.badge}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}

                {/* Action Row */}
                <div className="pt-2 flex flex-wrap items-center gap-3.5">
                  <a
                    href="#simpus-live"
                    className="inline-flex items-center gap-2 bg-[#ea7c00] hover:bg-[#d46f00] text-white font-bold text-sm px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-[#ea7c00]/25"
                  >
                    <Layers className="w-4 h-4" />
                    <span>Lihat Katalog Paket Website</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Poin Keunggulan Rekayasa Perangkat Lunak (Synced from db.features) */}
            {data.features && data.features.length > 0 && (
              <div className="mt-16 pt-12 border-t border-slate-200/80">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.features.map((feat) => (
                    <div
                      key={feat.id}
                      className="p-6 rounded-2xl bg-[#fcfbf9] hover:bg-white border border-slate-200/80 hover:border-[#ea7c00]/50 shadow-sm hover:shadow-lg transition-all flex items-start gap-4"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-[#ea7c00]/15 text-[#ea7c00] flex items-center justify-center shrink-0">
                        {renderServiceIcon(feat.icon)}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-[#0f172a] text-base">{feat.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                          {feat.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ==================== 2B. SKILLS SECTION (PRO DARK TECH MATRIX) ==================== */}
        <section
          id="skills"
          className="py-20 sm:py-28 bg-[#0b0918] text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(234,124,0,0.12),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.14),transparent_45%)]" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ea7c00]/20 border border-[#ea7c00]/40 text-amber-300 text-xs font-extrabold uppercase tracking-wider mb-3">
                  <Terminal className="w-4 h-4" />
                  <span>Technical Skills • Spesialis Jasa Pembuatan Website</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
                  Keahlian Pemrograman Frontend, Backend &amp; Database
                </h2>
                <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
                  Seluruh daftar keahlian teknologi di bawah ini tersimpan di database dan dapat ditambah atau
                  diperbarui secara langsung melalui menu{' '}
                  <strong className="text-white">Skills Frontend &amp; Backend</strong> di AppDashboard.
                </p>
              </div>

              {/* Filter Kategori Skill (Dinamis mengikuti kategori bawaan & kategori baru dari Admin) */}
              <div className="flex flex-wrap gap-2">
                {Array.from(
                  new Set([
                    'Semua',
                    ...(data.skills || []).map((s) => s.category).filter(Boolean),
                    'Frontend & Web Modern',
                    'Backend & Programming',
                    'Database & Tools'
                  ])
                ).map((cat) => {
                  const active = skillFilter === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSkillFilter(cat)}
                      className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        active
                          ? 'bg-gradient-to-r from-[#ea7c00] to-amber-500 text-white shadow-lg shadow-[#ea7c00]/30'
                          : 'bg-white/[0.06] text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Skills Progress Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredSkills.map((sk) => (
                <div
                  key={sk.id}
                  className="bg-[#131026]/90 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-[#ea7c00]/60 shadow-xl transition-all group hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-amber-400 bg-[#ea7c00]/15 px-2.5 py-0.5 rounded-md">
                        {sk.category}
                      </span>
                      <h4 className="font-extrabold text-base sm:text-lg text-white mt-2 group-hover:text-amber-300 transition-colors">
                        {sk.name}
                      </h4>
                    </div>
                    <span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-white/10 text-amber-300 border border-white/10 shrink-0">
                      {sk.level}%
                    </span>
                  </div>

                  {/* Progress Track */}
                  <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#ea7c00] via-amber-400 to-[#8b5cf6] rounded-full transition-all duration-700"
                      style={{ width: `${sk.level}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10 text-xs text-slate-400">
                    <span>Tingkat Penguasaan:</span>
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {sk.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 2C. SPECIAL INTERACTIVE SECTION: LIVE KATALOG PAKET WEBSITE & ESTIMATOR PROYEK ==================== */}
        <section
          id="simpus-live"
          className="py-20 sm:py-28 bg-gradient-to-b from-[#f8fafc] to-white border-b border-slate-200/80"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ea7c00]/15 text-[#ea7c00] text-xs font-extrabold uppercase tracking-wider mb-3">
                  <Sparkles className="w-4 h-4" />
                  <span>Interactive Showcase • Layanan Jasa Pembuatan Website (Frontend &amp; Backend)</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight font-display">
                  Simulasi Live: Katalog Paket Website &amp; Kalkulator Estimasi Proyek
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
                  Pilih langsung paket &amp; template website siap pakai (Company Profile, Toko Online /
                  E-Commerce, Landing Page, hingga Custom Web App), simulasi booking pengerjaan, serta
                  hitung estimasi biaya modul tambahan secara real-time.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-4 py-2.5 rounded-2xl bg-[#0d0b1c] text-white text-xs font-bold flex items-center gap-2 shadow-md">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Katalog Jasa Website &amp; Estimasi Aktif ({simpusBooks.length} Paket)</span>
                </div>
              </div>
            </div>

            {simpusToast && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-600 text-white text-sm font-bold flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>{simpusToast}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSimpusToast(null)}
                  className="text-white/80 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 8 Cols: Interactive Web Package Catalog & Booking Grid */}
              <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                <div className="p-5 sm:p-6 bg-[#0d0b1c] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#ea7c00] flex items-center justify-center text-white">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base sm:text-lg">
                        Katalog Paket &amp; Template Website Siap Pakai (Frontend + Backend)
                      </h3>
                      <p className="text-xs text-slate-400">
                        Cari jenis website, tech stack, atau kode paket lalu klik Pilih Paket Web
                      </p>
                    </div>
                  </div>

                  {/* Search Input */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Cari paket website / stack..."
                      value={simpusSearch}
                      onChange={(e) => setSimpusSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/10 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#ea7c00]"
                    />
                  </div>
                </div>

                {/* Dynamic Category Filter Bar */}
                <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap gap-2">
                  {Array.from(
                    new Set(['Semua', ...simpusBooks.map((b) => b.category).filter(Boolean)])
                  ).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSimpusCat(c)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        simpusCat === c
                          ? 'bg-[#ea7c00] text-white shadow'
                          : 'bg-white text-slate-600 border border-slate-200 hover:border-[#ea7c00]'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                {/* Web Package List */}
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredSimpusBooks.map((book) => {
                    const isSelected = borrowedReceipts.some(
                      (r) =>
                        (r.bookId && r.bookId === book.id) ||
                        r.code === book.code ||
                        r.title === book.title
                    );
                    const selectedCount = borrowedReceipts.filter(
                      (r) =>
                        (r.bookId && r.bookId === book.id) ||
                        r.code === book.code ||
                        r.title === book.title
                    ).length;

                    return (
                      <div
                        key={book.id}
                        className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
                          isSelected
                            ? 'border-[#ea7c00] ring-2 ring-[#ea7c00]/25 bg-orange-50/20 shadow-md'
                            : 'border-slate-200 hover:border-[#ea7c00] bg-white shadow-sm hover:shadow-md'
                        }`}
                      >
                        <div>
                          {book.image && (
                            <div className="relative h-36 rounded-xl overflow-hidden mb-3 bg-slate-100 group">
                              <a
                                href={book.image}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Lihat Preview Website di Tab Baru (_blank)"
                                className="block w-full h-full"
                              >
                                <img
                                  src={book.image}
                                  alt={book.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </a>
                              <a
                                href={book.link || book.image}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Buka Link / Preview Website (_blank)"
                                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/70 hover:bg-[#ea7c00] text-white flex items-center justify-center transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          )}
                          <div className="flex items-center justify-between gap-2 text-[11px] font-bold">
                            <span className="px-2.5 py-0.5 rounded-md bg-orange-50 text-[#ea7c00]">
                              {book.category}
                            </span>
                            <div className="flex items-center gap-1.5">
                              {isSelected && (
                                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-[10px] font-bold inline-flex items-center gap-1 border border-emerald-300">
                                  <Check className="w-2.5 h-2.5" /> Dipilih ({selectedCount})
                                </span>
                              )}
                              <span className="font-mono text-slate-400">{book.code}</span>
                            </div>
                          </div>
                          <h4 className="font-extrabold text-[#0f172a] text-base mt-2 leading-snug">
                            {book.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1">
                            Tech Stack: <strong className="text-slate-700">{book.author}</strong> (
                            {book.year})
                          </p>
                          <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                            <span>⚡ {book.shelf}</span>
                            <span>•</span>
                            <span className="text-amber-500 font-bold">★ {book.rating}</span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                          <span
                            className={`text-xs font-extrabold px-2.5 py-1 rounded-lg ${
                              book.stock > 0
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-rose-50 text-rose-700'
                            }`}
                          >
                            {book.stock > 0 ? `Slot: ${book.stock} Proyek` : 'Slot Penuh'}
                          </span>

                          <div className="flex items-center gap-1.5">
                            {/* Tombol Batal Pilih (X) jika sudah dipilih */}
                            {isSelected && (
                              <button
                                type="button"
                                onClick={() => handleToggleSimpusBook(book)}
                                className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white border border-rose-200 text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
                                title="Batal pilih / hapus paket ini dari simulasi order (✕)"
                              >
                                <X className="w-3.5 h-3.5" />
                                <span>Batal (✕)</span>
                              </button>
                            )}

                            {/* Tombol Pilih atau Tambah */}
                            <button
                              type="button"
                              disabled={book.stock <= 0}
                              onClick={() => handleBorrowSimpusBook(book)}
                              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-white text-xs font-bold transition-all cursor-pointer disabled:bg-slate-200 disabled:text-slate-400 active:scale-95 ${
                                isSelected
                                  ? 'bg-[#ea7c00] hover:bg-[#c96a00]'
                                  : 'bg-[#0d0b1c] hover:bg-[#ea7c00]'
                              }`}
                              title={isSelected ? 'Tambah slot pilihan lagi' : 'Pilih paket web ini'}
                            >
                              {isSelected ? (
                                <>
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>Tambah</span>
                                </>
                              ) : (
                                <>
                                  <Rocket className="w-3.5 h-3.5" />
                                  <span>Pilih Paket Web</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right 4 Cols: Live Booking Log & Custom Module Cost Estimator */}
              <div className="lg:col-span-4 space-y-6">
                {/* Kalkulator Estimasi Modul Tambahan */}
                <div className="bg-[#0d0b1c] text-white rounded-3xl p-6 border border-white/10 shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                      Kalkulator Proyek
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300">
                      Rp {(data.company.simpusFinePerDay || 500000).toLocaleString('id-ID')} / Modul
                    </span>
                  </div>
                  <h4 className="text-lg font-extrabold">
                    Simulasi Kalkulator Modul &amp; Fitur Tambahan
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Geser jumlah modul / fitur custom tambahan (seperti Payment Gateway, Export Laporan
                    PDF/Excel, Multi-Role RBAC, atau Integrasi API) untuk melihat estimasi biaya:
                  </p>

                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-400">Modul Tambahan:</span>
                      <span className="text-amber-400">{lateDaysSim} Modul</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={10}
                      value={lateDaysSim}
                      onChange={(e) => setLateDaysSim(Number(e.target.value))}
                      className="w-full accent-[#ea7c00] cursor-pointer"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-between">
                    <span className="text-xs text-slate-300">Estimasi Biaya Modul:</span>
                    <span className="text-xl font-extrabold text-amber-400">
                      Rp{' '}
                      {(
                        lateDaysSim * (data.company.simpusFinePerDay || 500000)
                      ).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {/* Log Simulasi Booking & Order Website */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-[#0f172a] text-base">
                        Log Simulasi Booking &amp; Order Website
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Klik tombol <strong className="text-rose-500 font-bold">✕</strong> jika engga jadi pilih / ingin menghapus
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#ea7c00] px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200">
                        {borrowedReceipts.length} Order
                      </span>
                      {borrowedReceipts.length > 0 && (
                        <button
                          type="button"
                          onClick={handleClearAllReceipts}
                          className="text-[11px] font-bold text-slate-400 hover:text-rose-600 hover:underline cursor-pointer transition-colors"
                          title="Hapus / batalkan semua pilihan paket"
                        >
                          Hapus Semua ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {borrowedReceipts.length === 0 ? (
                    <div className="p-6 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center space-y-2">
                      <p className="text-xs font-bold text-slate-700">Belum ada paket yang dipilih</p>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Silakan klik tombol <strong className="text-[#ea7c00]">"Pilih Paket Web"</strong> di katalog sebelah kiri untuk menambahkan simulasi order.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {borrowedReceipts.map((rc) => (
                        <div
                          key={rc.id}
                          className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-1.5 transition-all hover:border-slate-300 shadow-xs relative group"
                        >
                          <div className="flex items-center justify-between font-bold text-[#0f172a]">
                            <span className="text-[#ea7c00] font-mono font-bold tracking-wide">
                              {rc.id}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                                DIPILIH
                              </span>
                              {/* Tombol X (Batal / Hapus Pilihan) */}
                              <button
                                type="button"
                                onClick={() => handleRemoveReceipt(rc.id)}
                                className="w-5 h-5 rounded-full bg-rose-100 hover:bg-rose-500 text-rose-600 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-90"
                                title="Batal pilih / hapus paket ini (✕)"
                                aria-label="Engga jadi pilih"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="font-bold text-slate-800 line-clamp-1 pr-2">
                            {rc.title}
                          </div>

                          <div className="text-slate-500 flex items-center justify-between pt-0.5 text-[11px]">
                            <span>{rc.borrower}</span>
                            <span className="font-semibold text-slate-700">{rc.dueDate}</span>
                          </div>

                          {/* Tombol Teks Engga Jadi Pilih / Hapus */}
                          <div className="pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                            <span className="text-slate-400">Pilihan Aktif</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveReceipt(rc.id)}
                              className="inline-flex items-center gap-1 font-bold text-rose-500 hover:text-rose-700 hover:underline cursor-pointer transition-colors"
                            >
                              <X className="w-3 h-3" />
                              <span>Engga jadi pilih (Hapus)</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 3. SERVICES SECTION ==================== */}
        <section id="services" className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ea7c00]/10 text-[#ea7c00] text-xs font-extrabold uppercase tracking-wider mb-3">
                <Layers className="w-4 h-4" />
                <span>{data.company.servicesSubtitle}</span>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight font-display max-w-2xl">
                  {data.company.servicesHeading}
                </h2>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-[#0d0b1c] hover:bg-[#ea7c00] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all shrink-0 self-start lg:self-auto"
                >
                  <span>Diskusikan Kebutuhan Sistem Anda</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Services Slider Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {visibleServices().map((srv) => (
                <div
                  key={srv.id}
                  className="bg-[#fcfbf9] hover:bg-white border border-slate-200/90 rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:border-[#ea7c00]/50 transition-all duration-300 relative group flex flex-col justify-between hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-[#ea7c00]/15 group-hover:bg-[#ea7c00] text-[#ea7c00] group-hover:text-white flex items-center justify-center transition-all shadow-sm">
                        {renderServiceIcon(srv.icon)}
                      </div>
                      <span className="text-3xl font-black text-slate-200 group-hover:text-[#ea7c00]/30 transition-colors font-display">
                        {srv.number}
                      </span>
                    </div>
                    <h4 className="text-xl font-extrabold text-[#0f172a] group-hover:text-[#ea7c00] transition-colors">
                      {srv.title}
                    </h4>
                    <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-200/70 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">
                      Full-Stack &amp; Database Ready
                    </span>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1 text-xs font-extrabold text-[#ea7c00] group-hover:translate-x-1 transition-transform"
                    >
                      <span>Konsultasi</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center justify-center gap-3 mt-10">
              <button
                type="button"
                onClick={prevServiceSlide}
                className="w-11 h-11 rounded-full border border-slate-300 hover:bg-[#ea7c00] hover:border-[#ea7c00] hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextServiceSlide}
                className="w-11 h-11 rounded-full border border-slate-300 hover:bg-[#ea7c00] hover:border-[#ea7c00] hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* ==================== 4. CALL TO ACTION SECTION (DARK PRO) ==================== */}
        <section
          id="call-to-action"
          className="py-20 sm:py-24 bg-[#0d0b1c] text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,124,0,0.16),transparent_65%)]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 bg-[#ea7c00]/20 text-amber-300 border border-[#ea7c00]/30 px-4 py-1.5 rounded-full text-xs font-bold">
                  <Rocket className="w-4 h-4" />
                  <span>{data.company.ctaBadge}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight font-display">
                  {data.company.ctaHeading}
                </h2>
                <p className="text-base text-slate-300 leading-relaxed">
                  {data.company.ctaDescription}
                </p>
              </div>

              <div className="lg:col-span-5 space-y-5">
                <div className="space-y-2.5">
                  {[
                    'Website Company Profile, Toko Online (E-Commerce) & Landing Page',
                    'Dashboard Admin AppDashboard + Database company_db (5 Tabel RBAC)',
                    'Desain UI/UX Pro Responsif di HP, Tablet & Desktop + Gratis Deploy'
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-slate-200">
                      <CheckCircle2 className="w-5 h-5 text-[#ea7c00] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <a
                    href="#portfolio"
                    className="bg-gradient-to-r from-[#ea7c00] to-amber-500 hover:from-[#d46f00] hover:to-[#ea7c00] text-white font-bold text-sm px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-[#ea7c00]/30"
                  >
                    Lihat Karya Portofolio
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 5. PORTFOLIO SECTION (JASA PEMBUATAN WEBSITE & SISTEM BACKEND) ==================== */}
        <section id="portfolio" className="py-20 sm:py-28 bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ea7c00]/15 text-[#ea7c00] text-xs font-extrabold uppercase tracking-wider mb-3">
                  <Code2 className="w-4 h-4" />
                  <span>Showcase Karya • Jasa Pembuatan Website</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight font-display">
                  Portofolio Website Bisnis, E-Commerce &amp; Sistem Backend
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
                  Klik pada kartu proyek untuk melihat rincian arsitektur website, fitur unggulan
                  Frontend &amp; Backend, serta skema database yang digunakan.
                </p>
              </div>

              {/* Filter Pills (Dinamis mengikuti kategori bawaan & kategori baru dari Admin) */}
              <ul className="flex flex-wrap items-center gap-2">
                {Array.from(
                  new Set([
                    'All',
                    ...data.portfolio.map((p) => p.category).filter(Boolean)
                  ])
                ).map((cat) => {
                  const active = portfolioFilter === cat;
                  return (
                    <li key={cat}>
                      <button
                        type="button"
                        onClick={() => handlePortfolioFilterChange(cat)}
                        className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                          active
                            ? 'bg-[#0d0b1c] text-white shadow-lg'
                            : 'bg-white text-slate-600 border border-slate-200 hover:border-[#ea7c00] hover:text-[#ea7c00]'
                        }`}
                      >
                        {cat}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Portfolio Grid with Smooth Staggered Entrance & Exit */}
            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all ${
                portfolioAnim === 'enter' ? 'animate-stagger-in' : 'animate-view-exit'
              }`}
            >
              {filteredPortfolio.map((item) => {
                const targetUrl = item.link || item.image || '/#portfolio';
                return (
                  <div
                    key={item.id}
                    onClick={() => setLightboxItem(item)}
                    className="cursor-pointer bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-200/80 hover:border-[#ea7c00] group transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
                  >
                    <div>
                      <div className="relative h-60 overflow-hidden">
                        <a
                          href={item.image}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title="Buka gambar penuh di tab baru (_blank)"
                          className="block w-full h-full"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </a>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b1c]/80 via-transparent to-transparent pointer-events-none" />
                        <span className="absolute top-4 left-4 bg-[#0d0b1c]/90 backdrop-blur-md text-amber-400 border border-white/15 text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow">
                          {item.category}
                        </span>
                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                          <span className="text-xs font-bold text-amber-300">{item.subtitle}</span>
                          <a
                            href={targetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            title="Buka Link Proyek di Tab Baru (_blank)"
                            className="w-9 h-9 rounded-full bg-[#ea7c00] hover:bg-amber-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>

                      <div className="p-6">
                        <a
                          href={targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-start gap-1.5 text-lg sm:text-xl font-extrabold text-[#0f172a] hover:text-[#ea7c00] transition-colors leading-snug"
                        >
                          <span>{item.title}</span>
                          <ExternalLink className="w-4 h-4 shrink-0 mt-1 text-[#ea7c00]" />
                        </a>
                        {item.description && (
                          <p className="text-xs sm:text-sm text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-bold px-3 py-1 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-orange-50 group-hover:text-[#ea7c00] transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-xs font-extrabold text-[#ea7c00] hover:underline"
                      >
                        <span>Buka Link</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================== 6. PRICING SECTION ==================== */}
        <section id="pricing" className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto pb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ea7c00]/10 text-[#ea7c00] text-xs font-extrabold uppercase tracking-wider mb-3">
                <Sparkles className="w-4 h-4" />
                <span>Investasi Jasa Pembuatan Website</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight font-display">
                Paket Harga Jasa Pembuatan Website (Frontend &amp; Backend)
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                Pilihan paket transparan mulai dari Landing Page &amp; Company Profile, Website Full-Stack +
                Admin CMS, hingga Toko Online (E-Commerce) &amp; Sistem Informasi Custom.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {data.pricing.map((plan) => (
                <div
                  key={plan.id}
                  className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all ${
                    plan.featured
                      ? 'bg-[#0d0b1c] text-white border-2 border-[#ea7c00] shadow-2xl md:-translate-y-3'
                      : 'bg-[#fcfbf9] text-[#0f172a] border border-slate-200 shadow-lg'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-[#ea7c00] to-amber-500 text-white text-xs font-extrabold uppercase px-4 py-1 rounded-full shadow-md">
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
                        plan.featured
                          ? 'bg-[#ea7c00] text-white'
                          : 'bg-[#ea7c00]/15 text-[#ea7c00]'
                      }`}
                    >
                      {plan.icon === 'stars' ? (
                        <Sparkles className="w-7 h-7" />
                      ) : (
                        <Star className="w-7 h-7 fill-current" />
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold font-display">
                      {plan.name}
                    </h3>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-base font-extrabold text-[#ea7c00] mr-1">Rp</span>
                      <span className="text-4xl font-black tracking-tight">{plan.price}</span>
                      <span
                        className={`text-xs ml-1.5 ${
                          plan.featured ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {plan.period}
                      </span>
                    </div>

                    <p
                      className={`text-sm mt-4 leading-relaxed ${
                        plan.featured ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {plan.description}
                    </p>

                    {plan.suitableFor && (
                      <div
                        className={`mt-4 p-3.5 rounded-2xl text-xs transition-all ${
                          plan.featured
                            ? 'bg-blue-500/15 border border-blue-400/30 text-blue-100 shadow-sm'
                            : 'bg-blue-50 border border-blue-200 text-blue-950 shadow-sm'
                        }`}
                      >
                        <span className="font-extrabold flex items-center gap-1.5 mb-1 text-[11px] uppercase tracking-wider text-blue-500 dark:text-blue-400">
                          <span>🎯 Cocok untuk:</span>
                        </span>
                        <p className={`text-xs leading-relaxed font-medium ${plan.featured ? 'text-blue-100/95' : 'text-slate-700'}`}>
                          {plan.suitableFor}
                        </p>
                      </div>
                    )}

                    {plan.note && (
                      <div
                        className={`mt-3 p-3.5 rounded-2xl text-xs transition-all ${
                          plan.featured
                            ? 'bg-amber-500/15 border border-amber-400/25 text-amber-200 shadow-sm'
                            : 'bg-amber-50 border border-amber-200 text-amber-950 shadow-sm'
                        }`}
                      >
                        <span className="font-extrabold flex items-center gap-1.5 mb-1 text-[11px] uppercase tracking-wider text-[#ea7c00]">
                          <span>📝 Catatan:</span>
                        </span>
                        <p className={`text-[11.5px] leading-relaxed italic ${plan.featured ? 'text-amber-100/85' : 'text-slate-600'}`}>
                          {plan.note}
                        </p>
                      </div>
                    )}

                    <ul
                      className={`space-y-3 mt-6 pt-6 border-t text-sm ${
                        plan.featured ? 'border-white/10' : 'border-slate-200'
                      }`}
                    >
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#ea7c00] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPlan(plan);
                      setOrderSuccess(null);
                    }}
                    className={`w-full mt-8 py-4 rounded-2xl font-extrabold text-sm transition-all cursor-pointer ${
                      plan.featured
                        ? 'bg-gradient-to-r from-[#ea7c00] to-amber-500 hover:from-[#d46f00] hover:to-[#ea7c00] text-white shadow-lg shadow-[#ea7c00]/30'
                        : 'bg-[#0d0b1c] hover:bg-[#ea7c00] text-white'
                    }`}
                  >
                    Pesan Paket Ini Sekarang
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 7. FAQ & TEAM SECTION ==================== */}
        <section id="faq" className="py-20 sm:py-28 bg-[#f8fafc]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center pb-10">
              <h2 className="text-3xl font-extrabold text-[#0f172a] font-display">
                Pertanyaan Umum (FAQ Jasa Pembuatan Website)
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                Informasi lengkap seputar layanan pembuatan website Frontend, sistem Backend Admin, dan Database
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
              {[
                { id: 'general', label: 'Umum & Skills', icon: <HelpCircle className="w-4 h-4" /> },
                { id: 'pricing', label: 'Proyek & Database', icon: <CreditCard className="w-4 h-4" /> },
                { id: 'support', label: 'CMS & Dukungan', icon: <Headset className="w-4 h-4" /> }
              ].map((tab) => {
                const active = faqTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setFaqTab(tab.id as 'general' | 'pricing' | 'support');
                      const first = data.faqs.find((f) => f.category === tab.id);
                      setOpenFaqId(first?.id || null);
                    }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      active
                        ? 'bg-[#0d0b1c] text-white shadow-lg'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-[#ea7c00]'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="space-y-4">
              {filteredFaqs.map((item) => {
                const isOpen = openFaqId === item.id;
                return (
                  <div
                    key={item.id}
                    className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <span className="w-8 h-8 rounded-xl bg-[#ea7c00]/15 text-[#ea7c00] font-extrabold text-xs flex items-center justify-center shrink-0">
                          {item.number}
                        </span>
                        <span className="font-extrabold text-base sm:text-lg text-[#0f172a]">
                          {item.question}
                        </span>
                      </div>
                      <Plus
                        className={`w-5 h-5 text-[#ea7c00] shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-45' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-slate-600 space-y-3 border-t border-slate-100 leading-relaxed">
                        <p>{item.answer}</p>
                        {item.answer2 && <p>{item.answer2}</p>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================== 8. TEAM / SPESIALISASI SECTION ==================== */}
        <section id="team" className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pb-12">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#ea7c00]">
                Engineering Roles
              </span>
              <h2 className="text-3xl font-extrabold text-[#0f172a] mt-1 font-display">
                Profil Developer &amp; Peran Spesialisasi
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {data.team
                .filter((member) => member.is_public !== false)
                .map((member) => (
                <div
                  key={member.id}
                  className="bg-[#fcfbf9] rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <a
                      href={member.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Lihat Foto Spesialis di Tab Baru (_blank)"
                      className="block w-full h-full"
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </a>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-extrabold text-[#0f172a]">{member.name}</h4>
                    <span className="block text-xs font-bold text-[#ea7c00] mt-0.5">
                      {member.position}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ==================== 10. CONTACT SECTION ==================== */}
        <section id="contact" className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pb-12">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#ea7c00]">
                Hubungi Developer
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] mt-1 font-display">
                Kontak &amp; Diskusi Proyek Sistem Informasi
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-1">
                Kirimkan pesan Anda—otomatis tersimpan ke Database &amp; tampil di AppDashboard Admin
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-5 rounded-3xl overflow-hidden shadow-lg border border-slate-200 min-h-[380px] bg-slate-100">
                <iframe
                  src={data.company.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '420px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi"
                />
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#f8fafc] p-5 rounded-2xl border border-slate-200/80 flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#ea7c00]/15 text-[#ea7c00] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#0f172a] text-sm">Lokasi</h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                        {data.company.location}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#f8fafc] p-5 rounded-2xl border border-slate-200/80 flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#ea7c00]/15 text-[#ea7c00] flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#0f172a] text-sm">Email</h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                        {data.company.email}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#f8fafc] p-5 rounded-2xl border border-slate-200/80 flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#ea7c00]/15 text-[#ea7c00] flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#0f172a] text-sm">WhatsApp / Telepon</h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                        {data.company.phone}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#f8fafc] p-5 rounded-2xl border border-slate-200/80 flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#ea7c00]/15 text-[#ea7c00] flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#0f172a] text-sm">Jam Aktif</h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                        {data.company.openHours}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Get in Touch Form */}
                <div className="bg-[#fcfbf9] p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg">
                  <h3 className="text-2xl font-extrabold text-[#0f172a] font-display">
                    Kirim Pesan Langsung ke Database
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 mb-6">
                    Tertarik memesan pembuatan Website Company Profile, Toko Online (E-Commerce),
                    Sistem Backend, atau Custom Web App? Kirim pesan di bawah ini.
                  </p>

                  {contactStatus && (
                    <div
                      className={`p-4 rounded-xl mb-5 text-sm font-bold ${
                        contactStatus.type === 'success'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-600 text-white'
                      }`}
                    >
                      {contactStatus.text}
                    </div>
                  )}

                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        required
                        placeholder="Nama Lengkap Anda"
                        value={contactForm.name}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:border-[#ea7c00] focus:outline-none text-sm"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Alamat Email"
                        value={contactForm.email}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:border-[#ea7c00] focus:outline-none text-sm"
                      />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Subjek (Misal: Pembuatan Website Company Profile / Toko Online)"
                      value={contactForm.subject}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:border-[#ea7c00] focus:outline-none text-sm"
                    />
                    <textarea
                      rows={4}
                      required
                      placeholder="Tuliskan detail kebutuhan proyek atau pesan Anda..."
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:border-[#ea7c00] focus:outline-none text-sm"
                    />
                    <button
                      type="submit"
                      disabled={contactLoading}
                      className="bg-gradient-to-r from-[#ea7c00] to-amber-500 hover:from-[#d46f00] hover:to-[#ea7c00] text-white font-bold text-sm px-8 py-4 rounded-xl transition-all shadow-lg shadow-[#ea7c00]/25 disabled:opacity-50 cursor-pointer"
                    >
                      {contactLoading ? 'Menyimpan ke Database...' : 'Kirim Pesan Sekarang'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ==================== FOOTER (DARK PRO FOOTER) ==================== */}
      <footer id="footer" className="bg-[#080711] text-white pt-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12">
            <div className="lg:col-span-4 space-y-4">
              <a href="#hero" className="inline-flex items-center gap-2.5 text-2xl font-extrabold text-white font-display group">
                {data.company.logoUrl && (
                  <img
                    src={data.company.logoUrl}
                    alt={data.company.sitename}
                    className="w-8 h-8 rounded-lg object-cover border border-[#ea7c00]/50 shadow-md shadow-[#ea7c00]/20 group-hover:scale-105 transition-transform shrink-0"
                  />
                )}
                <span>{data.company.sitename}</span>
                <span className="text-[#ea7c00]">.</span>
              </a>
              <p className="text-sm text-slate-400 leading-relaxed">
                Layanan Jasa Pembuatan Website Profesional (Frontend &amp; Backend) —{' '}
                <strong className="text-white">{data.company.fullName}</strong> ({data.company.major}
                ). Spesialis Website Company Profile, E-Commerce, Sistem Informasi &amp; Database SQL.
              </p>
              <div className="pt-2">
                <h5 className="font-bold text-sm mb-3 text-slate-200">
                  Berlangganan Promo &amp; Info Jasa Website
                </h5>
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex rounded-xl overflow-hidden bg-white/[0.07] border border-white/10"
                >
                  <input
                    type="email"
                    required
                    placeholder="Masukkan email Anda"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-transparent px-4 py-3 text-sm text-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={newsletterLoading}
                    className="bg-[#ea7c00] hover:bg-[#d46f00] text-white px-5 py-3 transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                {newsletterMsg && (
                  <p className="text-xs text-emerald-400 mt-2">{newsletterMsg}</p>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-amber-400">
                Navigasi
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                {[
                  { label: 'Profil IT', href: '#about' },
                  { label: 'Jasa Website', href: '#services' },
                  { label: 'Simulasi Order Web', href: '#simpus-live' },
                  { label: 'Portofolio', href: '#portfolio' },
                  { label: 'Kontak', href: '#contact' }
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="flex items-center gap-1.5 hover:text-[#ea7c00] transition-colors"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-[#ea7c00]" />
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-amber-400">
                Layanan Utama
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                {[
                  'Web Company Profile',
                  'Web Toko Online',
                  'Next.js & React',
                  'Backend & MySQL',
                  'AppDashboard CMS'
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#services"
                      className="flex items-center gap-1.5 hover:text-[#ea7c00] transition-colors"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-[#ea7c00]" />
                      <span>{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-amber-400">
                Informasi Kontak
              </h4>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#ea7c00]/15 text-[#ea7c00] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <p>{data.company.footerAddress}</p>
                </div>
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#ea7c00]/15 text-[#ea7c00] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <p>{data.company.phone}</p>
                </div>
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#ea7c00]/15 text-[#ea7c00] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <p>{data.company.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/[0.03] border-t border-white/10 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>
              © Copyright <strong className="text-white">{data.company.fullName}</strong> (
              {data.company.major}) — All Rights Reserved
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <a href="#services" className="hover:text-[#ea7c00] transition-colors">
                Layanan Web
              </a>
              <a href="#simpus-live" className="hover:text-[#ea7c00] transition-colors">
                Katalog Paket
              </a>
              <a href="#pricing" className="hover:text-[#ea7c00] transition-colors">
                Paket Harga
              </a>
              <a href="#contact" className="hover:text-[#ea7c00] transition-colors">
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll Top Button */}
      {scrolled && (
        <a
          href="#hero"
          className="fixed right-5 bottom-5 z-40 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ea7c00] to-amber-500 text-white flex items-center justify-center shadow-xl shadow-[#ea7c00]/30 hover:-translate-y-1 transition-all"
        >
          <ArrowUp className="w-5 h-5" />
        </a>
      )}

      {/* Portfolio Lightbox Modal with Smooth Entrance & Exit */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-modal-backdrop-in">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto animate-modal-card-in">
            <div className="relative h-64">
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-[#ea7c00] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 sm:p-8 space-y-4">
              <span className="inline-block text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-orange-50 text-[#ea7c00]">
                {lightboxItem.category} — {lightboxItem.subtitle}
              </span>
              <h3 className="text-2xl font-extrabold text-[#0f172a] font-display">
                {lightboxItem.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {lightboxItem.description}
              </p>

              {lightboxItem.demoFeatures && lightboxItem.demoFeatures.length > 0 && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0f172a]">
                    Fitur Unggulan Sistem &amp; Database:
                  </h4>
                  {lightboxItem.demoFeatures.map((df, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#ea7c00] shrink-0" />
                      <span>{df}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-2">
                {lightboxItem.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-bold px-3 py-1 rounded-lg bg-[#ea7c00]/10 text-[#ea7c00]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Order Modal with Smooth Entrance & Exit */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-modal-backdrop-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-4 shadow-2xl animate-modal-card-in">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-[#0f172a]">
                Pesan Paket: {selectedPlan.name} (Rp {selectedPlan.price})
              </h3>
              <button
                type="button"
                onClick={() => setSelectedPlan(null)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {orderSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-sm font-semibold space-y-3 animate-toast-in">
                <div className="flex items-center gap-2 text-emerald-700">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <p>{orderSuccess}</p>
                </div>
                <Link
                  href="/admin"
                  className="inline-block bg-[#0d0b1c] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow hover:bg-slate-800 transition-colors"
                >
                  Lihat di AppDashboard →
                </Link>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit} className="space-y-3.5">
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap / Instansi"
                  value={orderForm.name}
                  onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-[#ea7c00] focus:outline-none"
                />
                <input
                  type="email"
                  required
                  placeholder="Alamat Email Aktif"
                  value={orderForm.email}
                  onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-[#ea7c00] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={orderSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ea7c00] to-amber-500 text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all hover:brightness-105"
                >
                  {orderSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin shrink-0" />
                      <span>Menyimpan ke Database...</span>
                    </>
                  ) : (
                    <span>Konfirmasi Pemesanan</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
