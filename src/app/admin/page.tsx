'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Menu,
  Search,
  Moon,
  Sun,
  Maximize2,
  Minimize2,
  Bell,
  ChevronDown,
  LayoutGrid,
  Gauge,
  Users,
  Shield,
  Calendar,
  Kanban,
  MessageSquare,
  Contact,
  FolderOpen,
  Mail,
  CheckSquare,
  Headset,
  Puzzle,
  FileText,
  BarChart2,
  Receipt,
  Tag,
  HelpCircle,
  ShoppingCart,
  DollarSign,
  Package,
  ArrowUp,
  ArrowDown,
  Check,
  UserPlus,
  AlertTriangle,
  XCircle,
  PlusCircle,
  Settings,
  ExternalLink,
  Trash2,
  RefreshCw,
  LogOut,
  LogIn,
  Lock,
  X,
  Database,
  Code2,
  BookOpen,
  Globe,
  Eye,
  EyeOff,
  Upload,
  ImagePlus
} from 'lucide-react';
import { DatabaseSchema } from '@/types/company';
import { initialDatabase } from '@/lib/seedData';

const DASH_IMG = 'https://bootstrapmade.com/content/demo/AppDashboard/assets/img';

type ActiveView =
  | 'command-center'
  | 'messages'
  | 'orders'
  | 'cms-skills'
  | 'cms-portfolio'
  | 'cms-services'
  | 'cms-pricing'
  | 'cms-simpus'
  | 'cms-about'
  | 'cms-team'
  | 'cms-settings'
  | 'database-viewer'
  | 'db-user'
  | 'db-user-role'
  | 'db-user-menu'
  | 'db-user-access'
  | 'db-user-submenu';

const VALID_ACTIVE_VIEWS: ActiveView[] = [
  'command-center',
  'messages',
  'orders',
  'cms-skills',
  'cms-portfolio',
  'cms-services',
  'cms-pricing',
  'cms-simpus',
  'cms-about',
  'cms-team',
  'cms-settings',
  'database-viewer',
  'db-user',
  'db-user-role',
  'db-user-menu',
  'db-user-access',
  'db-user-submenu'
];

const DEFAULT_PORTFOLIO_CATEGORIES = [
  'Company Profile',
  'E-Commerce & Bisnis',
  'Sistem Informasi',
  'Database & CMS',
  'Web Era Modern',
  'Full-Stack App'
];

const DEFAULT_SKILL_CATEGORIES = [
  'Frontend & Web Modern',
  'Backend & Programming',
  'Database & Tools'
];

const DEFAULT_POST_CATEGORIES = [
  'Jasa Website',
  'Web Era Modern',
  'Database SQL',
  'UI/UX Design',
  'Full-Stack',
  'Cloud & DevOps'
];

const DEFAULT_SIMPUS_CATEGORIES = [
  'Company Profile & Bisnis',
  'E-Commerce & Toko Online',
  'Landing Page & UMKM',
  'Custom Web App & API'
];

export default function AppDashboardPage() {
  const [db, setDb] = useState<DatabaseSchema>(initialDatabase);
  const darkMode = true;
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [authLoadingState, setAuthLoadingState] = useState<
    'initial' | 'logging-out' | 'logging-in' | null
  >('initial');
  const [loadingProgress, setLoadingProgress] = useState<number>(20);
  const [viewAnim, setViewAnim] = useState<'enter' | 'exit'>('enter');
  const [topBarLoading, setTopBarLoading] = useState<boolean>(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginShake, setLoginShake] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useState<{
    username: string;
    email: string;
    role: string;
  }>({
    username: 'Syauqi Abduraffi',
    email: 'syauqi.informatika@devmail.id',
    role: 'Admin'
  });
  const [authToast, setAuthToast] = useState<{
    id: number;
    type: 'login' | 'logout' | 'denied';
    title: string;
    message: string;
    time: string;
  } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState<ActiveView>('command-center');

  // Submenu states
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    company_db: true,
    cms: true
  });

  // Custom Category States (Bikin Kategori Sendiri & Custom Dropdown UI)
  const [customPortfolioCategories, setCustomPortfolioCategories] = useState<string[]>(
    DEFAULT_PORTFOLIO_CATEGORIES
  );
  const [portCatDropdownOpen, setPortCatDropdownOpen] = useState<boolean>(false);
  const [modalPortCatDropdownOpen, setModalPortCatDropdownOpen] = useState<boolean>(false);
  const [showCustomCatCreator, setShowCustomCatCreator] = useState<boolean>(false);
  const [newPortCategoryName, setNewPortCategoryName] = useState<string>('');

  const [customSkillCategories, setCustomSkillCategories] = useState<string[]>(
    DEFAULT_SKILL_CATEGORIES
  );
  const [skillCatDropdownOpen, setSkillCatDropdownOpen] = useState<boolean>(false);
  const [modalSkillCatDropdownOpen, setModalSkillCatDropdownOpen] = useState<boolean>(false);
  const [showCustomSkillCatCreator, setShowCustomSkillCatCreator] = useState<boolean>(false);
  const [newSkillCategoryName, setNewSkillCategoryName] = useState<string>('');

  // Forms & Modal states for company_db tables (user, user_role, user_menu, user_sub_menu)
  const [selectedAccessRoleId, setSelectedAccessRoleId] = useState<number>(1);
  const [tableSearch, setTableSearch] = useState<string>('');
  const [entriesPerPage, setEntriesPerPage] = useState<number>(5);

  const [userModalOpen, setUserModalOpen] = useState<boolean>(false);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [userForm, setUserForm] = useState({
    username: '',
    email: '',
    phone: '+62 812-',
    image: 'https://bootstrapmade.com/content/demo/AppDashboard/assets/img/profile-img.webp',
    password: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    role_id: 1,
    is_active: 1
  });

  const [roleModalOpen, setRoleModalOpen] = useState<boolean>(false);
  const [editingRoleId, setEditingRoleId] = useState<number | null>(null);
  const [roleForm, setRoleForm] = useState({
    role: ''
  });

  const [menuModalOpen, setMenuModalOpen] = useState<boolean>(false);
  const [editingMenuId, setEditingMenuId] = useState<number | null>(null);
  const [menuForm, setMenuForm] = useState({
    menu: ''
  });

  const [subMenuModalOpen, setSubMenuModalOpen] = useState<boolean>(false);
  const [editingSubMenuId, setEditingSubMenuId] = useState<number | null>(null);
  const [subMenuForm, setSubMenuForm] = useState({
    menu_id: 1,
    title: '',
    url: 'command-center',
    icon: 'fas fa-fw fa-folder',
    is_active: 1
  });

  // Header dropdowns
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chartRange, setChartRange] = useState<'12M' | '6M' | '30D'>('12M');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [toastExiting, setToastExiting] = useState<boolean>(false);
  const [isSavingAction, setIsSavingAction] = useState<boolean>(false);

  // Forms & Edit States for CMS & Orders
  const [newOrderModal, setNewOrderModal] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [orderForm, setOrderForm] = useState({
    orderNumber: '',
    customerName: '',
    customerEmail: '',
    product: 'Jasa Website Full-Stack (Frontend + Backend)',
    amount: 'Rp 3.500.000',
    status: 'Completed'
  });

  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [skillModalOpen, setSkillModalOpen] = useState<boolean>(false);
  const [skillForm, setSkillForm] = useState<{
    name: string;
    category: string;
    level: number;
    badge: string;
    description: string;
  }>({
    name: '',
    category: 'Frontend & Web Modern',
    level: 90,
    badge: 'Full-Stack Pro',
    description: ''
  });

  const [editingPortfolioId, setEditingPortfolioId] = useState<string | null>(null);
  const [portfolioModalOpen, setPortfolioModalOpen] = useState<boolean>(false);
  const [portForm, setPortForm] = useState({
    title: '',
    subtitle: 'Full-Stack Web & Admin CMS',
    category: 'Company Profile',
    tags: 'Next.js, MySQL, Admin CMS',
    image:
      'https://bootstrapmade.com/content/demo/Strive/assets/img/portfolio/portfolio-1.webp',
    link: '/#portfolio',
    description: ''
  });

  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceModalOpen, setServiceModalOpen] = useState<boolean>(false);
  const [srvForm, setSrvForm] = useState({
    number: '',
    title: '',
    description: ''
  });

  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [teamModalOpen, setTeamModalOpen] = useState<boolean>(false);
  const [teamForm, setTeamForm] = useState({
    name: '',
    position: '',
    bio: '',
    image: 'https://bootstrapmade.com/content/demo/Strive/assets/img/person/person-m-8.webp',
    is_public: true
  });

  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [messageModalOpen, setMessageModalOpen] = useState<boolean>(false);
  const [messageForm, setMessageForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [companyForm, setCompanyForm] = useState(initialDatabase.company);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);

  // 1. State untuk Paket Harga Website (cms-pricing — Gambar 1)
  const [editingPricingId, setEditingPricingId] = useState<string | null>(null);
  const [pricingModalOpen, setPricingModalOpen] = useState<boolean>(false);
  const [pricingForm, setPricingForm] = useState({
    name: '',
    price: '2.5 Jt',
    period: '/proyek',
    description: '',
    suitableFor: '',
    note: '',
    features:
      'Desain Frontend Modern & Responsif (HP, Tablet, PC)\nBackend Dashboard Admin & Database SQL\nGratis Setup Deploy ke Cloud Vercel / Hosting\nRevisi Fleksibel & Source Code Lengkap',
    featured: false,
    badge: '',
    icon: 'star' as 'star' | 'stars' | 'star-fill'
  });

  // 2. State untuk Slider Hero Website (cms-settings — Gambar 2)
  const [newHeroSlideUrl, setNewHeroSlideUrl] = useState<string>('');

  // 3. State untuk Artikel & Catatan IT (cms-posts — Gambar 3)
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [postModalOpen, setPostModalOpen] = useState<boolean>(false);
  const [postForm, setPostForm] = useState({
    title: '',
    category: 'Jasa Website',
    date: '12 Okt 2026',
    readTime: '5 Menit Baca',
    author: 'Syauqi Abduraffi',
    excerpt: '',
    image: 'https://bootstrapmade.com/content/demo/Strive/assets/img/blog/blog-post-7.webp',
    link: '/#recent-posts',
    featured: true
  });
  const [customPostCategories, setCustomPostCategories] = useState<string[]>(
    DEFAULT_POST_CATEGORIES
  );
  const [postCatDropdownOpen, setPostCatDropdownOpen] = useState<boolean>(false);
  const [modalPostCatDropdownOpen, setModalPostCatDropdownOpen] = useState<boolean>(false);
  const [showNewPostCatInput, setShowNewPostCatInput] = useState<boolean>(false);
  const [newPostCategoryName, setNewPostCategoryName] = useState<string>('');

  // 4. State untuk Simulasi Katalog Paket Website & Kalkulator Proyek (cms-simpus — Gambar 4)
  const [editingSimpusId, setEditingSimpusId] = useState<string | null>(null);
  const [simpusModalOpen, setSimpusModalOpen] = useState<boolean>(false);
  const [simpusForm, setSimpusForm] = useState({
    code: 'WEB-PKG-05',
    title: '',
    author: 'Next.js 14 • Tailwind CSS • Database SQL',
    category: 'Company Profile & Bisnis',
    year: 2026,
    stock: 5,
    shelf: 'Full-Stack + Panel Admin',
    rating: '5.0',
    image: 'https://bootstrapmade.com/content/demo/Strive/assets/img/portfolio/portfolio-1.webp',
    link: '/#pricing'
  });
  const [customSimpusCategories, setCustomSimpusCategories] = useState<string[]>(
    DEFAULT_SIMPUS_CATEGORIES
  );
  const [simpusCatDropdownOpen, setSimpusCatDropdownOpen] = useState<boolean>(false);
  const [modalSimpusCatDropdownOpen, setModalSimpusCatDropdownOpen] = useState<boolean>(false);
  const [showNewSimpusCatInput, setShowNewSimpusCatInput] = useState<boolean>(false);
  const [newSimpusCategoryName, setNewSimpusCategoryName] = useState<string>('');

  // 5. State untuk Profil IT & Rekayasa Perangkat Lunak (cms-about — Gambar 5)
  const [editingAboutTabId, setEditingAboutTabId] = useState<string | null>(null);
  const [aboutTabModalOpen, setAboutTabModalOpen] = useState<boolean>(false);
  const [aboutTabForm, setAboutTabForm] = useState({
    tabLabel: '',
    title: '',
    description: '',
    badge: 'Standar Rekayasa Perangkat Lunak Teknik Informatika'
  });

  const [editingFeatureId, setEditingFeatureId] = useState<string | null>(null);
  const [featureModalOpen, setFeatureModalOpen] = useState<boolean>(false);
  const [featureForm, setFeatureForm] = useState({
    title: '',
    description: '',
    icon: 'ShieldCheck'
  });

  const notify = (msg: string) => {
    setToast(msg);
    setToastExiting(false);
    setTimeout(() => {
      setToastExiting(true);
      setTimeout(() => {
        setToast(null);
        setToastExiting(false);
      }, 260);
    }, 3500);
  };

  // Helper: Gabungkan semua kategori portofolio (Default + Database + Buatan Sendiri)
  const allPortfolioCategories = Array.from(
    new Set([
      ...customPortfolioCategories,
      ...(db.portfolio || []).map((p) => p.category).filter(Boolean)
    ])
  );

  // Helper: Tambah Kategori Portofolio Baru Sendiri
  const handleAddCustomPortfolioCategory = (targetModal = false) => {
    const trimmed = newPortCategoryName.trim();
    if (!trimmed) {
      notify('Ketik nama kategori baru terlebih dahulu!');
      return;
    }
    const updated = Array.from(new Set([trimmed, ...customPortfolioCategories]));
    setCustomPortfolioCategories(updated);
    try {
      localStorage.setItem('company_custom_portfolio_categories', JSON.stringify(updated));
    } catch {}
    setPortForm((prev) => ({ ...prev, category: trimmed }));
    setNewPortCategoryName('');
    setShowCustomCatCreator(false);
    if (targetModal) {
      setModalPortCatDropdownOpen(false);
    } else {
      setPortCatDropdownOpen(false);
    }
    notify(`Kategori baru "${trimmed}" berhasil dibuat & dipilih!`);
  };

  // Helper: Hapus Kategori Portofolio Custom dari daftar
  const handleDeleteCustomPortfolioCategory = (catToDelete: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customPortfolioCategories.filter((c) => c !== catToDelete);
    const finalCats = updated.length > 0 ? updated : DEFAULT_PORTFOLIO_CATEGORIES;
    setCustomPortfolioCategories(finalCats);
    try {
      localStorage.setItem('company_custom_portfolio_categories', JSON.stringify(finalCats));
    } catch {}
    if (portForm.category === catToDelete) {
      setPortForm((prev) => ({ ...prev, category: finalCats[0] || 'Company Profile' }));
    }
    notify(`Kategori "${catToDelete}" dihapus dari daftar pilihan.`);
  };

  // Helper: Gabungkan semua kategori skill
  const allSkillCategories = Array.from(
    new Set([
      ...customSkillCategories,
      ...(db.skills || []).map((s) => s.category).filter(Boolean)
    ])
  );

  // Helper: Tambah Kategori Skill Baru Sendiri
  const handleAddCustomSkillCategory = (targetModal = false) => {
    const trimmed = newSkillCategoryName.trim();
    if (!trimmed) {
      notify('Ketik nama kategori skill terlebih dahulu!');
      return;
    }
    const updated = Array.from(new Set([trimmed, ...customSkillCategories]));
    setCustomSkillCategories(updated);
    try {
      localStorage.setItem('company_custom_skill_categories', JSON.stringify(updated));
    } catch {}
    setSkillForm((prev) => ({ ...prev, category: trimmed }));
    setNewSkillCategoryName('');
    setShowCustomSkillCatCreator(false);
    if (targetModal) {
      setModalSkillCatDropdownOpen(false);
    } else {
      setSkillCatDropdownOpen(false);
    }
    notify(`Kategori Skill "${trimmed}" berhasil dibuat & dipilih!`);
  };

  // Helper: Upload file gambar dari komputer/HP ke server (/api/upload)
  const handleUploadImageFile = async (
    file: File | undefined,
    onSuccess: (uploadedUrl: string) => void
  ) => {
    if (!file) return;
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const json = await res.json();
      if (json.success && json.url) {
        onSuccess(json.url);
        notify(`Gambar "${file.name}" berhasil di-upload!`);
      } else {
        // Client-side FileReader fallback
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            onSuccess(reader.result);
            notify(`Gambar "${file.name}" berhasil dimuat!`);
          }
        };
        reader.readAsDataURL(file);
      }
    } catch {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onSuccess(reader.result);
          notify(`Gambar "${file.name}" berhasil dimuat!`);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingImage(false);
    }
  };

  // Helper: Langsung ganti/upload gambar pada kartu portofolio tertentu dan simpan ke company_db
  const handleQuickUploadPortfolioImage = async (portfolioId: string, file: File | undefined) => {
    if (!file) return;
    await handleUploadImageFile(file, async (uploadedUrl) => {
      const res = await fetch('/api/company', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'portfolio',
          action: 'update',
          id: portfolioId,
          payload: { image: uploadedUrl }
        })
      });
      const json = await res.json();
      if (json.success) {
        setDb(json.data);
        if (editingPortfolioId === portfolioId) {
          setPortForm((prev) => ({ ...prev, image: uploadedUrl }));
        }
        notify('Gambar Portofolio berhasil di-upload & disimpan ke Database!');
      }
    });
  };

  // Helper: Buka gambar di tab baru (_blank), mendukung URL biasa maupun Base64 Data URL
  const openImageNewTab = (imageUrl: string, e?: React.MouseEvent | string) => {
    if (!imageUrl) return;
    if (imageUrl.startsWith('data:image/')) {
      if (typeof e === 'object' && e && 'preventDefault' in e) {
        e.preventDefault();
      }
      const win = window.open('', '_blank');
      if (win) {
        win.document.write(
          `<html><head><title>Preview Gambar Portofolio</title><style>body{margin:0;background:#0b0918;display:flex;align-items:center;justify-content:center;min-height:100vh;}img{max-width:95vw;max-height:95vh;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,0.7);}</style></head><body><img src="${imageUrl}" alt="Preview"/></body></html>`
        );
        win.document.close();
      }
    }
  };

  // Automatic Animated View Switcher + Simpan Menu Aktif agar saat Reload tetap Standby di Menu yang Diklik!
  const navigateView = (nextView: ActiveView) => {
    try {
      localStorage.setItem('company_admin_active_view', nextView);
      const url = new URL(window.location.href);
      url.searchParams.set('view', nextView);
      window.history.replaceState(null, '', url.toString());
    } catch {}

    if (nextView === activeView) {
      setSidebarOpen(false);
      return;
    }
    setSidebarOpen(false);
    setPortCatDropdownOpen(false);
    setSkillCatDropdownOpen(false);
    setTopBarLoading(true);
    setViewAnim('exit');
    setTimeout(() => {
      setActiveView(nextView);
      setViewAnim('enter');
      setTimeout(() => {
        setTopBarLoading(false);
      }, 380);
    }, 200);
  };

  // Helper: Notifikasi Masuk / Keluar / Dilarang Masuk Otomatis & Smooth
  const triggerAuthNotification = (
    type: 'login' | 'logout' | 'denied',
    title: string,
    message: string
  ) => {
    const timeStr = new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    const toastId = Date.now();
    setAuthToast({
      id: toastId,
      type,
      title,
      message,
      time: timeStr
    });
    setTimeout(() => {
      setAuthToast((prev) => (prev && prev.id === toastId ? null : prev));
    }, 4500);
  };

  // Automatic Logout with Smooth Loading, Strict Session Lock & Automatic Notification
  const triggerAutoLogout = () => {
    setUserMenuOpen(false);
    setNotifOpen(false);
    setLoginError(null);
    // Kosongkan form login agar wajib ketik Email/Username & Password saat mau masuk kembali
    setLoginForm({ email: '', password: '' });
    setShowPassword(false);
    try {
      localStorage.setItem('company_admin_logged_out', 'true');
    } catch {}

    setViewAnim('exit');
    setLoadingProgress(12);
    setAuthLoadingState('logging-out');
    setTimeout(() => setLoadingProgress(45), 160);
    setTimeout(() => setLoadingProgress(78), 340);
    setTimeout(() => setLoadingProgress(100), 520);
    setTimeout(() => {
      setIsLoggedOut(true);
      setAuthLoadingState(null);
      setViewAnim('enter');
      triggerAuthNotification(
        'logout',
        'Anda Telah Keluar (Logout Otomatis)',
        'Sesi Admin Dashboard telah dikunci dengan aman. Dilarang masuk kembali tanpa mengisi Email / Username (company_db.user) & Password!'
      );
    }, 760);
  };

  // Strict Login Validation against company_db.user + Smooth Entrance Animation & Notification
  const triggerAutoLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const rawIdentifier = loginForm.email.trim();
    const rawPassword = loginForm.password.trim();

    const triggerDeniedShake = (errMsg: string, notifTitle: string, notifDesc: string) => {
      setLoginError(errMsg);
      setLoginShake(false);
      setTimeout(() => setLoginShake(true), 10);
      setTimeout(() => setLoginShake(false), 500);
      triggerAuthNotification('denied', notifTitle, notifDesc);
    };

    // 1. Tolak jika Email/Username atau Password kosong
    if (!rawIdentifier || !rawPassword) {
      triggerDeniedShake(
        'Silakan masukkan Email / Username dan Password Anda terlebih dahulu.',
        'Form Belum Lengkap',
        'Email / Username dan Password wajib diisi untuk masuk.'
      );
      return;
    }

    // 2. Cek kecocokan akun pada tabel company_db.user
    const userList = db.user && db.user.length > 0 ? db.user : initialDatabase.user;
    const matchedUser = userList.find(
      (u) =>
        u.email.toLowerCase() === rawIdentifier.toLowerCase() ||
        u.username.toLowerCase() === rawIdentifier.toLowerCase()
    );

    if (!matchedUser) {
      triggerDeniedShake(
        `Email atau Username "${rawIdentifier}" tidak ditemukan. Silakan periksa kembali.`,
        'Akun Tidak Ditemukan',
        `Akun "${rawIdentifier}" tidak terdaftar pada sistem.`
      );
      return;
    }

    // 3. Cek status aktif akun (is_active === 1)
    if (matchedUser.is_active !== 1) {
      triggerDeniedShake(
        `Akun "${matchedUser.username}" sedang dinonaktifkan. Silakan hubungi Administrator.`,
        'Akun Nonaktif',
        `Akun Anda belum aktif untuk mengakses dashboard.`
      );
      return;
    }

    // 4. Validasi Password (mendukung password standar company_db.user: 'password', 'admin123', 'syauqi123', atau hash/string di db)
    const validPasswords = ['password', 'admin123', 'syauqi123', '123456', matchedUser.password];
    if (!validPasswords.includes(rawPassword)) {
      triggerDeniedShake(
        'Password yang Anda masukkan salah. Silakan coba kembali.',
        'Password Salah',
        'Pastikan huruf besar dan kecil pada password sudah benar.'
      );
      return;
    }

    // 5. Kredensial Valid -> Buka kunci & jalankan transisi masuk yang smooth
    setLoginError(null);
    const roleObj = (db.user_role || []).find((r) => r.id === matchedUser.role_id);
    const roleName = roleObj ? roleObj.role : matchedUser.role_id === 1 ? 'Admin' : 'User';
    const activeUserInfo = {
      username: matchedUser.username,
      email: matchedUser.email,
      role: roleName
    };
    setLoggedInUser(activeUserInfo);

    try {
      localStorage.removeItem('company_admin_logged_out');
      localStorage.setItem('company_admin_user', JSON.stringify(activeUserInfo));
    } catch {}

    setLoadingProgress(15);
    setAuthLoadingState('logging-in');
    setTimeout(() => setLoadingProgress(48), 160);
    setTimeout(() => setLoadingProgress(82), 340);
    setTimeout(() => setLoadingProgress(100), 520);
    setTimeout(() => {
      setIsLoggedOut(false);
      setAuthLoadingState(null);
      setViewAnim('enter');
      triggerAuthNotification(
        'login',
        `Berhasil Masuk — Selamat Datang, ${matchedUser.username}!`,
        `Autentikasi company_db.user berhasil (${matchedUser.email} • Role: ${roleName}). Sesi Admin Dashboard kini aktif!`
      );
      notify(`Selamat datang kembali, ${matchedUser.username} (${roleName})!`);
    }, 760);
  };

  const fetchDb = async () => {
    try {
      const res = await fetch('/api/company');
      const json = await res.json();
      if (json.success && json.data) {
        setDb(json.data);
        setCompanyForm(json.data.company);
      }
    } catch {
      // keep initial
    }
  };

  useEffect(() => {
    let wasLoggedOut = false;
    // 1. Pulihkan Menu yang terakhir diklik saat halaman di-Reload (Standby di menu aktif, TIDAK balik ke Dashboard Utama)
    try {
      // Cek apakah user sebelumnya sudah Logout (Jika sudah keluar -> Dilarang Masuk walaupun di-reload!)
      if (localStorage.getItem('company_admin_logged_out') === 'true') {
        wasLoggedOut = true;
        setIsLoggedOut(true);
        setLoginForm({ email: '', password: '' });
      }

      const savedUser = localStorage.getItem('company_admin_user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser && parsedUser.username && parsedUser.email) {
          setLoggedInUser(parsedUser);
        }
      }

      const urlParams = new URLSearchParams(window.location.search);
      const viewFromUrl = urlParams.get('view') as ActiveView | null;
      const viewFromStorage = localStorage.getItem(
        'company_admin_active_view'
      ) as ActiveView | null;

      const restoredView =
        viewFromUrl && VALID_ACTIVE_VIEWS.includes(viewFromUrl)
          ? viewFromUrl
          : viewFromStorage && VALID_ACTIVE_VIEWS.includes(viewFromStorage)
          ? viewFromStorage
          : null;

      if (restoredView) {
        setActiveView(restoredView);
        localStorage.setItem('company_admin_active_view', restoredView);
        const url = new URL(window.location.href);
        url.searchParams.set('view', restoredView);
        window.history.replaceState(null, '', url.toString());
      }

      const savedAccessRole = localStorage.getItem('company_admin_access_role_id');
      if (savedAccessRole) {
        setSelectedAccessRoleId(Number(savedAccessRole) || 1);
      }

      // Pulihkan kategori custom yang pernah dibuat user
      const savedPortCats = localStorage.getItem('company_custom_portfolio_categories');
      if (savedPortCats) {
        const parsed = JSON.parse(savedPortCats);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCustomPortfolioCategories(
            Array.from(new Set([...parsed, ...DEFAULT_PORTFOLIO_CATEGORIES]))
          );
        }
      }

      const savedSkillCats = localStorage.getItem('company_custom_skill_categories');
      if (savedSkillCats) {
        const parsed = JSON.parse(savedSkillCats);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCustomSkillCategories(
            Array.from(new Set([...parsed, ...DEFAULT_SKILL_CATEGORIES]))
          );
        }
      }
    } catch {}

    fetchDb();
    // Automatic initial entrance loading animation
    const t1 = setTimeout(() => setLoadingProgress(75), 140);
    const t2 = setTimeout(() => setLoadingProgress(100), 320);
    const t3 = setTimeout(() => {
      setAuthLoadingState(null);
      setViewAnim('enter');
      if (wasLoggedOut) {
        triggerAuthNotification(
          'denied',
          'Sesi Terkunci — Dilarang Masuk Tanpa Login',
          'Anda telah keluar (Logout) sebelumnya. Silakan masukkan Email / Username (company_db.user) dan Password terlebih dahulu.'
        );
      }
    }, 480);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const toggleSubmenu = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Handlers for API mutations
  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = editingOrderId !== null;
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section: 'orders',
        action: isEditing ? 'update' : 'create',
        id: editingOrderId ?? undefined,
        payload: orderForm
      })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      setNewOrderModal(false);
      setEditingOrderId(null);
      setOrderForm({
        orderNumber: '',
        customerName: '',
        customerEmail: '',
        product: 'Jasa Pembuatan Website Full-Stack (Frontend + Backend)',
        amount: 'Rp 4.500.000',
        status: 'Completed'
      });
      notify(
        isEditing
          ? 'Data Order Jasa Website berhasil diperbarui di Database!'
          : 'Order Jasa Website baru berhasil disimpan ke Database!'
      );
    }
  };

  const handleDeleteOrder = async (id: string) => {
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: 'orders', action: 'delete', id })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      notify('Order berhasil dihapus dari Database.');
    }
  };

  const handleUpdateOrderStatus = async (id: string, status: string) => {
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section: 'orders',
        action: 'updateStatus',
        id,
        payload: { status }
      })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      notify('Status order berhasil diperbarui di Database.');
    }
  };

  const handleSaveMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMessageId) return;
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section: 'messages',
        action: 'update',
        id: editingMessageId,
        payload: messageForm
      })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      setMessageModalOpen(false);
      setEditingMessageId(null);
      notify('Pesan klien berhasil diperbarui di Database!');
    }
  };

  const handleDeleteMessage = async (id: string) => {
    const res = await fetch(`/api/inquiries?id=${id}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.success) {
      setDb({ ...db, messages: json.data });
      notify('Pesan kontak berhasil dihapus dari Database.');
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = editingSkillId !== null;
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section: 'skills',
        action: isEditing ? 'update' : 'create',
        id: editingSkillId ?? undefined,
        payload: skillForm
      })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      setEditingSkillId(null);
      setSkillModalOpen(false);
      setSkillForm({
        name: '',
        category: 'Frontend & Web Modern',
        level: 90,
        badge: 'Teknik Informatika',
        description: ''
      });
      notify(
        isEditing
          ? 'Skill berhasil diperbarui di Database & Website Utama!'
          : 'Skill Teknik Informatika berhasil ditambahkan ke Database & Frontend!'
      );
    }
  };

  const handleDeleteSkill = async (id: string) => {
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: 'skills', action: 'delete', id })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      if (editingSkillId === id) setEditingSkillId(null);
      notify('Skill berhasil dihapus dari Database.');
    }
  };

  const handleAddPortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingAction(true);
    try {
      const isEditing = editingPortfolioId !== null;
      const res = await fetch('/api/company', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'portfolio',
          action: isEditing ? 'update' : 'create',
          id: editingPortfolioId ?? undefined,
          payload: portForm
        })
      });
      const json = await res.json();
      if (json.success) {
        setDb(json.data);
        setEditingPortfolioId(null);
        setPortfolioModalOpen(false);
        setPortForm({
          title: '',
          subtitle: 'Full-Stack Web & Admin CMS',
          category: 'Company Profile',
          tags: 'Next.js, MySQL, Admin CMS',
          image:
            'https://bootstrapmade.com/content/demo/Strive/assets/img/portfolio/portfolio-1.webp',
          link: '/#portfolio',
          description: ''
        });
        notify(
          isEditing
            ? 'Proyek Portofolio berhasil diperbarui di Database & Website!'
            : 'Proyek Portofolio berhasil disimpan ke Database & ditampilkan di Frontend!'
        );
      }
    } finally {
      setIsSavingAction(false);
    }
  };

  const handleDeletePortfolio = async (id: string) => {
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: 'portfolio', action: 'delete', id })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      if (editingPortfolioId === id) setEditingPortfolioId(null);
      notify('Item portofolio dihapus dari Database.');
    }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = editingServiceId !== null;
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section: 'services',
        action: isEditing ? 'update' : 'create',
        id: editingServiceId ?? undefined,
        payload: srvForm
      })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      setEditingServiceId(null);
      setServiceModalOpen(false);
      setSrvForm({ number: '', title: '', description: '' });
      notify(
        isEditing
          ? 'Layanan Jasa Pembuatan Website berhasil diperbarui di Database & Frontend!'
          : 'Layanan Jasa Pembuatan Website baru berhasil disimpan ke Database!'
      );
    }
  };

  const handleDeleteService = async (id: string) => {
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: 'services', action: 'delete', id })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      if (editingServiceId === id) {
        setEditingServiceId(null);
        setSrvForm({ number: '', title: '', description: '' });
      }
      notify('Layanan dihapus dari Database.');
    }
  };

  const handleAddTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = editingTeamId !== null;
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section: 'team',
        action: isEditing ? 'update' : 'create',
        id: editingTeamId ?? undefined,
        payload: teamForm
      })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      setEditingTeamId(null);
      setTeamModalOpen(false);
      setTeamForm({
        name: '',
        position: '',
        bio: '',
        image: 'https://bootstrapmade.com/content/demo/Strive/assets/img/person/person-m-8.webp',
        is_public: true
      });
      notify(
        isEditing
          ? 'Data Tim Spesialisasi berhasil diperbarui di Database!'
          : 'Spesialisasi baru berhasil ditambahkan ke Database!'
      );
    }
  };

  const handleToggleTeamPublic = async (id: string) => {
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: 'team', action: 'togglePublic', id })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      const target = json.data?.team?.find((t: any) => t.id === id);
      const isPub = target ? target.is_public !== false : true;
      notify(
        isPub
          ? `Status Tim diubah: PUBLIC di Website ✓`
          : `Status Tim diubah: NO PUBLIC (Disembunyikan dari Website) 🔒`
      );
    }
  };

  const handleSetAllTeamPublic = async (isPublic: boolean) => {
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section: 'team',
        action: 'setAllPublic',
        payload: { is_public: isPublic }
      })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      notify(
        isPublic
          ? '📢 Semua Tim Spesialisasi sekarang berstatus PUBLIC di Website!'
          : '🔒 Semua Tim Spesialisasi sekarang berstatus NO PUBLIC (Disembunyikan dari Website)!'
      );
    }
  };

  const handleDeleteTeam = async (id: string) => {
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: 'team', action: 'delete', id })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      if (editingTeamId === id) setEditingTeamId(null);
      notify('Data Tim Spesialisasi dihapus dari Database.');
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section: 'company',
        action: 'update',
        payload: companyForm
      })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      setCompanyForm(json.data.company);
      notify('Biodata, Foto & Profil Pribadi berhasil disimpan ke Database & Website!');
    }
  };

  // Helper: Upload foto profil developer / foto about & langsung simpan ke company_db
  const handleUploadCompanyPhoto = async (
    field: 'avatarImage' | 'aboutImage' | 'logoUrl' | 'faviconUrl',
    file: File | undefined
  ) => {
    if (!file) return;
    await handleUploadImageFile(file, async (uploadedUrl) => {
      const nextCompany = { ...companyForm, [field]: uploadedUrl };
      setCompanyForm(nextCompany);
      const res = await fetch('/api/company', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'company',
          action: 'update',
          payload: { [field]: uploadedUrl }
        })
      });
      const json = await res.json();
      if (json.success) {
        setDb(json.data);
        setCompanyForm(json.data.company);
        notify(
          field === 'avatarImage'
            ? 'Foto Profil Developer berhasil di-upload & ditampilkan!'
            : field === 'aboutImage'
            ? 'Foto Profil IT (#about) berhasil di-upload & ditampilkan!'
            : field === 'logoUrl'
            ? 'Logo Brand Website (Navbar & Footer) berhasil di-upload & diperbarui!'
            : 'Favicon Tab Browser berhasil di-upload & diperbarui!'
        );
      }
    });
  };

  // Helper: Tambah / Ganti / Hapus Slide Hero (Gambar 2)
  const handleAddHeroSlide = async (imageUrl: string) => {
    if (!imageUrl.trim()) return;
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section: 'heroSlides',
        action: 'create',
        payload: { image: imageUrl.trim() }
      })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      setNewHeroSlideUrl('');
      notify('Gambar Slider Hero baru berhasil ditambahkan!');
    }
  };

  const handleUpdateHeroSlideImage = async (slideId: string, file: File | undefined) => {
    if (!file) return;
    await handleUploadImageFile(file, async (uploadedUrl) => {
      const res = await fetch('/api/company', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'heroSlides',
          action: 'update',
          id: slideId,
          payload: { image: uploadedUrl }
        })
      });
      const json = await res.json();
      if (json.success) {
        setDb(json.data);
        notify('Gambar Slide Hero berhasil diganti!');
      }
    });
  };

  const handleDeleteHeroSlide = async (slideId: string) => {
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section: 'heroSlides',
        action: 'delete',
        id: slideId
      })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      notify('Slide Hero dihapus dari Database.');
    }
  };

  // ==================== 1. HANDLERS PAKET HARGA WEBSITE (cms-pricing — Gambar 1) ====================
  const handleSavePricing = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = editingPricingId !== null;
    const featuresArr = pricingForm.features
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section: 'pricing',
        action: isEditing ? 'update' : 'create',
        id: editingPricingId ?? undefined,
        payload: {
          ...pricingForm,
          features: featuresArr
        }
      })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      setEditingPricingId(null);
      setPricingModalOpen(false);
      setPricingForm({
        name: '',
        price: '2.5 Jt',
        period: '/proyek',
        description: '',
        suitableFor: '',
        note: '',
        features:
          'Desain Frontend Modern & Responsif (HP, Tablet, PC)\nBackend Dashboard Admin & Database SQL\nGratis Setup Deploy ke Cloud Vercel / Hosting\nRevisi Fleksibel & Source Code Lengkap',
        featured: false,
        badge: '',
        icon: 'star'
      });
      notify(
        isEditing
          ? 'Paket Harga Website berhasil diperbarui di Database & Frontend!'
          : 'Paket Harga Website baru berhasil ditambahkan ke Database & Frontend!'
      );
    }
  };

  const handleDeletePricing = async (id: string) => {
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: 'pricing', action: 'delete', id })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      if (editingPricingId === id) setEditingPricingId(null);
      notify('Paket Harga berhasil dihapus dari Database.');
    }
  };

  // ==================== 3. HANDLERS ARTIKEL & CATATAN IT (cms-posts — Gambar 3) ====================
  const allPostCategories = Array.from(
    new Set([
      ...customPostCategories,
      ...(db.blogPosts || []).map((p) => p.category).filter(Boolean)
    ])
  );

  const handleAddCustomPostCategory = (targetModal = false) => {
    const trimmed = newPostCategoryName.trim();
    if (!trimmed) {
      notify('Ketik nama kategori artikel terlebih dahulu!');
      return;
    }
    const updated = Array.from(new Set([trimmed, ...customPostCategories]));
    setCustomPostCategories(updated);
    setPostForm((prev) => ({ ...prev, category: trimmed }));
    setNewPostCategoryName('');
    if (targetModal) {
      setModalPostCatDropdownOpen(false);
    } else {
      setPostCatDropdownOpen(false);
    }
    notify(`Kategori Artikel "${trimmed}" berhasil dibuat & dipilih!`);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = editingPostId !== null;
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section: 'blogPosts',
        action: isEditing ? 'update' : 'create',
        id: editingPostId ?? undefined,
        payload: postForm
      })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      setEditingPostId(null);
      setPostModalOpen(false);
      setPostForm({
        title: '',
        category: 'Sistem Informasi',
        date: '12 Okt 2026',
        readTime: '5 Menit Baca',
        author: db.company.fullName || 'Syauqi Abduraffi',
        excerpt: '',
        image: 'https://bootstrapmade.com/content/demo/Strive/assets/img/blog/blog-post-7.webp',
        link: '/#recent-posts',
        featured: false
      });
      notify(
        isEditing
          ? 'Artikel & Catatan IT berhasil diperbarui di Database & Frontend!'
          : 'Artikel & Catatan IT baru berhasil dipublikasikan ke Website!'
      );
    }
  };

  const handleDeletePost = async (id: string) => {
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: 'blogPosts', action: 'delete', id })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      if (editingPostId === id) setEditingPostId(null);
      notify('Artikel dihapus dari Database.');
    }
  };

  const handleQuickUploadPostImage = async (postId: string, file: File | undefined) => {
    if (!file) return;
    await handleUploadImageFile(file, async (uploadedUrl) => {
      const res = await fetch('/api/company', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'blogPosts',
          action: 'update',
          id: postId,
          payload: { image: uploadedUrl }
        })
      });
      const json = await res.json();
      if (json.success) {
        setDb(json.data);
        notify('Gambar Artikel berhasil di-upload & disimpan ke Database!');
      }
    });
  };

  // ==================== 4. HANDLERS KATALOG PAKET WEBSITE & ESTIMATOR (cms-simpus — Gambar 4) ====================
  const allSimpusCategories = Array.from(
    new Set([
      ...customSimpusCategories,
      ...(db.simpusBooks || []).map((b) => b.category).filter(Boolean)
    ])
  );

  const handleAddCustomSimpusCategory = (targetModal = false) => {
    const trimmed = newSimpusCategoryName.trim();
    if (!trimmed) {
      notify('Ketik nama kategori paket website terlebih dahulu!');
      return;
    }
    const updated = Array.from(new Set([trimmed, ...customSimpusCategories]));
    setCustomSimpusCategories(updated);
    setSimpusForm((prev) => ({ ...prev, category: trimmed }));
    setNewSimpusCategoryName('');
    if (targetModal) {
      setModalSimpusCatDropdownOpen(false);
    } else {
      setSimpusCatDropdownOpen(false);
    }
    notify(`Kategori Paket Website "${trimmed}" berhasil dibuat & dipilih!`);
  };

  const handleSaveSimpusBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = editingSimpusId !== null;
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section: 'simpusBooks',
        action: isEditing ? 'update' : 'create',
        id: editingSimpusId ?? undefined,
        payload: simpusForm
      })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      setEditingSimpusId(null);
      setSimpusModalOpen(false);
      setSimpusForm({
        code: `WEB-PKG-${String((json.data.simpusBooks?.length || 4) + 1).padStart(2, '0')}`,
        title: '',
        author: 'Next.js 14 • Tailwind CSS • Database SQL',
        category: 'Company Profile & Bisnis',
        year: 2026,
        stock: 5,
        shelf: 'Full-Stack + Panel Admin',
        rating: '5.0',
        image: 'https://bootstrapmade.com/content/demo/Strive/assets/img/portfolio/portfolio-1.webp',
        link: '/#pricing'
      });
      notify(
        isEditing
          ? 'Paket Website berhasil diperbarui di Database & Frontend!'
          : 'Paket Website baru berhasil ditambahkan ke Katalog Simulasi Order!'
      );
    }
  };

  const handleDeleteSimpusBook = async (id: string) => {
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: 'simpusBooks', action: 'delete', id })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      if (editingSimpusId === id) setEditingSimpusId(null);
      notify('Paket Website dihapus dari Katalog Simulasi Order.');
    }
  };

  const handleQuickUploadSimpusImage = async (bookId: string, file: File | undefined) => {
    if (!file) return;
    await handleUploadImageFile(file, async (uploadedUrl) => {
      const res = await fetch('/api/company', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'simpusBooks',
          action: 'update',
          id: bookId,
          payload: { image: uploadedUrl }
        })
      });
      const json = await res.json();
      if (json.success) {
        setDb(json.data);
        notify('Gambar Preview Paket Website berhasil di-upload & disimpan!');
      }
    });
  };

  // ==================== 5. HANDLERS PROFIL IT & KEUNGGULAN (cms-about — Gambar 5) ====================
  const handleSaveAboutTab = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = editingAboutTabId !== null;
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section: 'aboutTabs',
        action: isEditing ? 'update' : 'create',
        id: editingAboutTabId ?? undefined,
        payload: aboutTabForm
      })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      setEditingAboutTabId(null);
      setAboutTabModalOpen(false);
      setAboutTabForm({
        tabLabel: '',
        title: '',
        description: '',
        badge: 'Standar Rekayasa Perangkat Lunak Teknik Informatika'
      });
      notify(
        isEditing
          ? 'Tab Spesialisasi Profil IT berhasil diperbarui!'
          : 'Tab Spesialisasi baru berhasil ditambahkan ke Profil IT!'
      );
    }
  };

  const handleDeleteAboutTab = async (id: string) => {
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: 'aboutTabs', action: 'delete', id })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      if (editingAboutTabId === id) setEditingAboutTabId(null);
      notify('Tab Spesialisasi Profil IT dihapus.');
    }
  };

  const handleSaveFeature = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = editingFeatureId !== null;
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section: 'features',
        action: isEditing ? 'update' : 'create',
        id: editingFeatureId ?? undefined,
        payload: featureForm
      })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      setEditingFeatureId(null);
      setFeatureModalOpen(false);
      setFeatureForm({ title: '', description: '', icon: 'ShieldCheck' });
      notify(
        isEditing
          ? 'Kartu Keunggulan Profil IT berhasil diperbarui!'
          : 'Kartu Keunggulan baru berhasil ditambahkan ke Profil IT!'
      );
    }
  };

  const handleDeleteFeature = async (id: string) => {
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: 'features', action: 'delete', id })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      if (editingFeatureId === id) setEditingFeatureId(null);
      notify('Kartu Keunggulan dihapus dari Database.');
    }
  };

  // Handlers for company_db tables: user, user_role, user_menu, user_access_menu, user_sub_menu
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section: 'user',
        action: editingUserId !== null ? 'update' : 'create',
        id: editingUserId ?? undefined,
        payload: userForm
      })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      setUserModalOpen(false);
      setEditingUserId(null);
      setUserForm({ ...userForm, username: '', email: '' });
      notify(
        editingUserId !== null
          ? 'Data User berhasil diperbarui di company_db!'
          : 'User baru berhasil ditambahkan ke Tabel user (company_db)!'
      );
    }
  };

  const handleToggleUserActive = async (id: number) => {
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: 'user', action: 'toggleActive', id })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      notify('Status is_active pada Tabel user berhasil diperbarui.');
    }
  };

  const handleDeleteUser = async (id: number) => {
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: 'user', action: 'delete', id })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      notify('User dihapus dari Tabel user.');
    }
  };

  const handleAddRole = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section: 'user_role',
        action: editingRoleId !== null ? 'update' : 'create',
        id: editingRoleId ?? undefined,
        payload: roleForm
      })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      setRoleModalOpen(false);
      setEditingRoleId(null);
      setRoleForm({ role: '' });
      notify(
        editingRoleId !== null
          ? 'Role berhasil diperbarui di Tabel user_role!'
          : 'Role baru ditambahkan ke Tabel user_role (company_db)!'
      );
    }
  };

  const handleDeleteRole = async (id: number) => {
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: 'user_role', action: 'delete', id })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      notify('Role dihapus dari Tabel user_role.');
    }
  };

  const handleAddMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section: 'user_menu',
        action: editingMenuId !== null ? 'update' : 'create',
        id: editingMenuId ?? undefined,
        payload: menuForm
      })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      setMenuModalOpen(false);
      setEditingMenuId(null);
      setMenuForm({ menu: '' });
      notify(
        editingMenuId !== null
          ? 'Menu berhasil diperbarui di Tabel user_menu!'
          : 'Menu baru ditambahkan ke Tabel user_menu (company_db)!'
      );
    }
  };

  const handleDeleteMenu = async (id: number) => {
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: 'user_menu', action: 'delete', id })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      notify('Menu dihapus dari Tabel user_menu.');
    }
  };

  const handleToggleAccessMenu = async (role_id: number, menu_id: number) => {
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section: 'user_access_menu',
        action: 'toggle',
        payload: { role_id, menu_id }
      })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      notify('Hak akses pada Tabel user_access_menu berhasil diperbarui!');
    }
  };

  const handleAddSubMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section: 'user_sub_menu',
        action: editingSubMenuId !== null ? 'update' : 'create',
        id: editingSubMenuId ?? undefined,
        payload: subMenuForm
      })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      setSubMenuModalOpen(false);
      setEditingSubMenuId(null);
      setSubMenuForm({ ...subMenuForm, title: '' });
      notify(
        editingSubMenuId !== null
          ? 'Submenu berhasil diperbarui di Tabel user_sub_menu!'
          : 'Submenu baru ditambahkan ke Tabel user_sub_menu (company_db)!'
      );
    }
  };

  const handleToggleSubMenuActive = async (id: number) => {
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section: 'user_sub_menu',
        action: 'toggleActive',
        id
      })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      notify('Status is_active pada Tabel user_sub_menu diperbarui.');
    }
  };

  const handleDeleteSubMenu = async (id: number) => {
    const res = await fetch('/api/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: 'user_sub_menu', action: 'delete', id })
    });
    const json = await res.json();
    if (json.success) {
      setDb(json.data);
      notify('Submenu dihapus dari Tabel user_sub_menu.');
    }
  };

  // AppDashboard Dark Mode Theme Palette (Deep Navy / Violet Suite)
  const bgMain = darkMode
    ? 'dark bg-[#0b091b] text-[#e2e8f0]'
    : 'bg-[#f4f7fb] text-[#273447]';
  const bgHeader = darkMode
    ? 'bg-[#110f24]/95 backdrop-blur-md border-[#262246]'
    : 'bg-white border-[#dbe4ef]';
  const bgSidebar = darkMode
    ? 'bg-[#0e0c1f] border-[#262246]'
    : 'bg-white border-[#d9e2ec]';
  const bgCard = darkMode
    ? 'bg-[#131029] border-[#282249]'
    : 'bg-white border-[#e2e9f2]';
  const textHeading = darkMode ? 'text-white' : 'text-[#111827]';
  const textMuted = darkMode ? 'text-[#94a3b8]' : 'text-[#687789]';
  const borderCol = darkMode ? 'border-[#2c2552]' : 'border-[#dbe4ef]';
  const hoverItem = darkMode ? 'hover:bg-[#1d183b] hover:text-white' : 'hover:bg-[#edf3ff]';

  // Komponen Notifikasi Otomatis Masuk / Keluar / Dilarang Masuk (Smooth Floating Banner)
  const authNotificationBanner = authToast && (
    <div
      key={authToast.id}
      className="fixed top-5 right-5 z-[100] w-[92vw] max-w-md rounded-2xl border backdrop-blur-2xl shadow-2xl overflow-hidden animate-auth-toast"
      style={{
        backgroundColor:
          authToast.type === 'login'
            ? 'rgba(12, 31, 28, 0.96)'
            : authToast.type === 'logout'
            ? 'rgba(26, 17, 46, 0.96)'
            : 'rgba(40, 12, 22, 0.96)',
        borderColor:
          authToast.type === 'login'
            ? 'rgba(16, 185, 129, 0.45)'
            : authToast.type === 'logout'
            ? 'rgba(139, 92, 246, 0.45)'
            : 'rgba(239, 68, 68, 0.55)'
      }}
    >
      <div className="p-4 flex items-start gap-3.5">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${
            authToast.type === 'login'
              ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-600/30'
              : authToast.type === 'logout'
              ? 'bg-gradient-to-br from-[#8b5cf6] to-[#2563eb] text-white shadow-purple-600/30'
              : 'bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-red-600/30'
          }`}
        >
          {authToast.type === 'login' ? (
            <Check className="w-5 h-5" />
          ) : authToast.type === 'logout' ? (
            <LogOut className="w-5 h-5" />
          ) : (
            <AlertTriangle className="w-5 h-5" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span
              className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                authToast.type === 'login'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : authToast.type === 'logout'
                  ? 'bg-[#8b5cf6]/20 text-[#c4b5fd] border border-[#8b5cf6]/30'
                  : 'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full animate-ping ${
                  authToast.type === 'login'
                    ? 'bg-emerald-400'
                    : authToast.type === 'logout'
                    ? 'bg-[#a78bfa]'
                    : 'bg-red-400'
                }`}
              />
              <span>
                {authToast.type === 'login'
                  ? 'Notifikasi Masuk Otomatis'
                  : authToast.type === 'logout'
                  ? 'Notifikasi Keluar Otomatis'
                  : 'Akses Ditolak • Dilarang Masuk'}
              </span>
            </span>
            <span className="text-[10px] font-mono text-slate-400 shrink-0">{authToast.time}</span>
          </div>
          <h4 className="text-sm font-extrabold text-white mt-1 leading-snug">
            {authToast.title}
          </h4>
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{authToast.message}</p>
        </div>
        <button
          type="button"
          onClick={() => setAuthToast(null)}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer shrink-0"
          title="Tutup Notifikasi"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      {/* Smooth Auto-Close Progress Bar */}
      <div className="w-full h-1 bg-black/30 overflow-hidden">
        <div
          className={`h-full animate-toast-progress ${
            authToast.type === 'login'
              ? 'bg-gradient-to-r from-emerald-400 to-teal-400'
              : authToast.type === 'logout'
              ? 'bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6]'
              : 'bg-gradient-to-r from-red-500 to-amber-500'
          }`}
        />
      </div>
    </div>
  );

  // Full-Screen Automatic Loading & Smooth Entrance/Exit Overlay
  if (authLoadingState !== null) {
    const isLoggingOut = authLoadingState === 'logging-out';
    const isLoggingIn = authLoadingState === 'logging-in';
    const titleText =
      authLoadingState === 'initial'
        ? 'Memuat Admin Suite (company_db)...'
        : isLoggingIn
        ? 'Memverifikasi Kredensial & Membuka Sesi Admin...'
        : 'Mengakhiri Sesi & Mengunci Akses Admin (Logout)...';
    const subText = isLoggingOut
      ? 'Menyimpan perubahan database & mengunci halaman agar dilarang masuk tanpa login ulang'
      : isLoggingIn
      ? `Selamat datang kembali, ${loggedInUser.username} (${loggedInUser.email}) — Memuat Dashboard`
      : 'Menghubungkan 5 tabel RBAC company_db & menyinkronkan antarmuka Dark Mode';

    return (
      <div className="min-h-screen bg-[#0b091b] text-white flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
        {authNotificationBanner}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.28), transparent 45%), radial-gradient(circle at 75% 75%, rgba(37, 99, 235, 0.25), transparent 45%)'
          }}
        />
        <div className="relative z-10 w-full max-w-sm rounded-3xl border border-[#2d2654] bg-[#131029]/95 backdrop-blur-xl p-8 shadow-2xl text-center space-y-5 animate-auth-card">
          {/* Dual Ring Animated Spinner */}
          <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
            <div
              className={`w-16 h-16 rounded-full border-4 border-t-transparent animate-spin ${
                isLoggingOut
                  ? 'border-[#ef4444]'
                  : isLoggingIn
                  ? 'border-emerald-400'
                  : 'border-[#8b5cf6]'
              }`}
            />
            <div
              className={`absolute w-10 h-10 rounded-full border-4 border-b-transparent animate-spin ${
                isLoggingOut
                  ? 'border-[#fb923c]'
                  : isLoggingIn
                  ? 'border-teal-400'
                  : 'border-[#2563eb]'
              }`}
              style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}
            />
            {isLoggingOut ? (
              <LogOut className="w-5 h-5 text-[#f87171] absolute" />
            ) : isLoggingIn ? (
              <Check className="w-5 h-5 text-emerald-300 absolute" />
            ) : (
              <Shield className="w-5 h-5 text-[#c4b5fd] absolute" />
            )}
          </div>

          <div className="space-y-1.5">
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                isLoggingOut
                  ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                  : isLoggingIn
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-[#8b5cf6]/20 text-[#c4b5fd] border border-[#8b5cf6]/30'
              }`}
            >
              {isLoggingOut
                ? '🔒 Proses Keluar Otomatis'
                : isLoggingIn
                ? '✅ Proses Masuk Otomatis'
                : '⚡ Sinkronisasi Sistem'}
            </span>
            <h2 className="text-lg font-extrabold text-white tracking-tight">{titleText}</h2>
            <p className="text-xs text-slate-400 leading-relaxed">{subText}</p>
          </div>

          {/* Automatic Progress Bar */}
          <div className="space-y-1.5">
            <div className="w-full h-2.5 rounded-full bg-[#1f1a3d] overflow-hidden p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-300 ease-out ${
                  isLoggingOut
                    ? 'bg-gradient-to-r from-[#ef4444] to-[#f97316]'
                    : isLoggingIn
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
                    : 'bg-gradient-to-r from-[#8b5cf6] to-[#2563eb]'
                }`}
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>company_db.user</span>
              <span>{loadingProgress}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If user clicked Keluar / Logout -> Strict Lock! Dilarang Masuk Tanpa Isi Email/Username & Password
  if (isLoggedOut) {
    return (
      <div className="min-h-screen bg-[#0b091b] text-white flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans relative overflow-hidden">
        {authNotificationBanner}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 15% 25%, rgba(139, 92, 246, 0.28), transparent 45%), radial-gradient(circle at 85% 75%, rgba(37, 99, 235, 0.25), transparent 45%)'
          }}
        />

        {/* 2-Column Responsive Card: Kiri (Branding & Fitur) + Kanan (Form Login) */}
        <div
          className={`relative z-10 w-full max-w-5xl rounded-3xl border border-[#2d2654] bg-[#120f2b]/95 backdrop-blur-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 ${
            loginShake ? 'animate-auth-shake border-red-500/60' : 'animate-auth-card'
          }`}
        >
          {/* ==================== SISI KIRI: BRANDING & CMS OVERVIEW ==================== */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#1a1442] via-[#130f30] to-[#0d0922] p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-[#26204c] flex flex-col justify-between relative overflow-hidden">
            <div
              className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-purple-600/15 blur-3xl pointer-events-none"
            />
            <div
              className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-blue-600/15 blur-3xl pointer-events-none"
            />

            <div className="relative z-10 space-y-6">
              {/* App Brand Header */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#3b82f6] flex items-center justify-center shadow-lg shadow-purple-600/30">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="block text-lg font-extrabold text-white tracking-wide">
                    AppDashboard
                  </span>
                  <span className="block text-xs font-semibold text-[#a78bfa]">
                    CMS &amp; Admin Suite
                  </span>
                </div>
              </div>

              {/* Headline & Description */}
              <div className="space-y-2.5 pt-2">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#8b5cf6]/20 text-[#c4b5fd] border border-[#8b5cf6]/30">
                  Portal Administrator
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  Kelola Profil &amp; Portofolio Anda
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Pusat kendali terpadu untuk mengatur portofolio proyek, layanan web, tim spesialisasi, dan konfigurasi database secara aman &amp; real-time.
                </p>
              </div>

              {/* Fitur Utama */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 p-3 rounded-2xl border border-[#2d2557] bg-[#141031]/80 shadow-sm">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-white font-bold text-xs">Realtime Database Sync</strong>
                    <span className="text-[11px] text-slate-400">Sinkronisasi otomatis dengan website frontend</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl border border-[#2d2557] bg-[#141031]/80 shadow-sm">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-white font-bold text-xs">Kontrol Publikasi Tim</strong>
                    <span className="text-[11px] text-slate-400">Atur status Public / No Public dengan mudah</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl border border-[#2d2557] bg-[#141031]/80 shadow-sm">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-white font-bold text-xs">Keamanan Terjamin</strong>
                    <span className="text-[11px] text-slate-400">Autentikasi akun &amp; manajemen hak akses RBAC</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Signature */}
            <div className="relative z-10 pt-6 mt-6 border-t border-[#26204c]/80 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center font-bold text-white text-xs shadow-md">
                  SA
                </div>
                <div>
                  <strong className="block text-white font-semibold text-xs">SyauqiDev. Studio</strong>
                  <span className="text-[10px] text-slate-400">Teknik Informatika &amp; Web Developer</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">v2.4.0</span>
            </div>
          </div>

          {/* ==================== SISI KANAN: FORM LOGIN ==================== */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center space-y-6 bg-[#131029]/80">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/15 text-blue-300 border border-blue-500/30 mb-3">
                <Lock className="w-3 h-3" />
                <span>Autentikasi Pengguna</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Selamat Datang Kembali
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
                Silakan masukkan Email atau Username dan Password Anda untuk masuk ke Dashboard.
              </p>
            </div>

            {/* Box Alert Error jika validasi gagal */}
            {loginError && (
              <div className="p-3.5 rounded-2xl border border-red-500/40 bg-red-500/15 text-red-200 text-xs font-semibold flex items-start gap-2.5 animate-view-enter">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="block font-bold text-red-300 text-xs">Gagal Masuk</span>
                  <p className="text-red-100 text-[11px] leading-relaxed">{loginError}</p>
                </div>
              </div>
            )}

            <form onSubmit={triggerAutoLogin} noValidate className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  Email atau Username <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  autoComplete="username"
                  placeholder="nama@email.com atau username"
                  value={loginForm.email}
                  onChange={(e) => {
                    setLoginForm({ ...loginForm, email: e.target.value });
                    if (loginError) setLoginError(null);
                  }}
                  className={`w-full px-4 py-3 rounded-xl border bg-[#1a1636] text-white text-sm placeholder-slate-500 focus:outline-none transition-colors ${
                    loginError && !loginForm.email.trim()
                      ? 'border-red-500 focus:border-red-400'
                      : 'border-[#322b5e] focus:border-[#8b5cf6]'
                  }`}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-200">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] font-bold text-[#a78bfa] hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1"
                  >
                    {showPassword ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Sembunyikan</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Lihat Password</span>
                      </>
                    )}
                  </button>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Masukkan password Anda"
                  value={loginForm.password}
                  onChange={(e) => {
                    setLoginForm({ ...loginForm, password: e.target.value });
                    if (loginError) setLoginError(null);
                  }}
                  className={`w-full px-4 py-3 rounded-xl border bg-[#1a1636] text-white text-sm placeholder-slate-500 focus:outline-none transition-colors ${
                    loginError && !loginForm.password.trim()
                      ? 'border-red-500 focus:border-red-400'
                      : 'border-[#322b5e] focus:border-[#8b5cf6]'
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8b5cf6] via-[#6366f1] to-[#2563eb] hover:from-[#7c3aed] hover:to-[#1d4ed8] text-white font-extrabold text-sm shadow-xl shadow-purple-600/25 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99] mt-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk ke Dashboard</span>
              </button>
            </form>

            <div className="pt-4 border-t border-[#26204a] flex items-center justify-between text-xs">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-[#a78bfa] hover:text-white font-semibold transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Ke Halaman Depan Website</span>
              </Link>
              <span className="text-slate-500 text-[11px]">SyauqiDev © 2026</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${bgMain} font-sans transition-colors duration-200`}>
      {/* Smooth Automatic Notification Banner (Masuk / Keluar) */}
      {authNotificationBanner}

      {/* Top Glowing Animated Loading Bar on View Switch */}
      {topBarLoading && (
        <>
          <div className="fixed top-0 left-0 right-0 z-[70] h-1.5 bg-[#0e0c1f] overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-[#8b5cf6] via-[#06b6d4] to-[#10b981] animate-nprogress-beam shadow-[0_0_14px_#8b5cf6]" />
          </div>

          {/* Floating Center Indicator Pill */}
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[75] pointer-events-none animate-floating-pill-in">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-purple-500/40 bg-[#131029]/95 backdrop-blur-xl shadow-2xl shadow-purple-900/50 text-xs font-bold text-white">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-[#a78bfa] border-t-transparent animate-spin shrink-0" />
              <span className="tracking-wide text-white">Memuat Data Modul...</span>
            </div>
          </div>
        </>
      )}

      {/* Toast Notification with Smooth Automatic Entrance & Exit Animation + Progress Bar */}
      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-[80] overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-r from-[#1b153b]/95 via-[#161f42]/95 to-[#0e2a3a]/95 text-white backdrop-blur-xl shadow-2xl shadow-purple-950/60 max-w-md ${
            toastExiting ? 'animate-toast-out' : 'animate-toast-in'
          }`}
        >
          <div className="px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-900/40 text-white">
              <Check className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0 pr-2">
              <span className="block text-[10px] font-extrabold uppercase tracking-widest text-[#a78bfa]">
                company_db • Berhasil
              </span>
              <p className="text-xs font-semibold text-slate-100 leading-snug">{toast}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setToastExiting(true);
                setTimeout(() => {
                  setToast(null);
                  setToastExiting(false);
                }, 260);
              }}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {/* Smooth Auto-Close Countdown Line */}
          <div className="w-full h-1 bg-black/40 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-[#8b5cf6] animate-toast-progress" />
          </div>
        </div>
      )}

      {/* ==================== TOP HEADER (APPDASHBOARD DARK MODE) ==================== */}
      <header
        className={`fixed top-0 left-0 right-0 h-[68px] z-40 border-b px-4 sm:px-6 flex items-center justify-between gap-3 shadow-lg ${bgHeader}`}
      >
        {/* Header Left */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => navigateView('command-center')}
            className="flex items-center gap-2.5 text-left cursor-pointer"
          >
            <img
              src={`${DASH_IMG}/logo.webp`}
              alt="AppDashboard"
              className="w-8 h-8 object-contain"
            />
            <span className={`font-bold text-lg tracking-tight hidden sm:inline ${textHeading}`}>
              AppDashboard
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (window.innerWidth < 1024) {
                setSidebarOpen(!sidebarOpen);
              } else {
                setSidebarCollapsed(!sidebarCollapsed);
              }
            }}
            className={`w-9 h-9 rounded-lg border ${borderCol} flex items-center justify-center hover:bg-[#8b5cf6]/20 hover:text-[#a78bfa] transition-colors cursor-pointer`}
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className={`hidden md:flex flex-col leading-tight pl-3 border-l ${borderCol}`}>
            <span className={`text-[10px] uppercase tracking-wider font-semibold ${textMuted}`}>
              Database Aktif
            </span>
            <strong className="text-xs font-bold text-[#10b981]">company_db</strong>
          </div>
        </div>

        {/* Header Search (Desktop) */}
        <div className="hidden lg:flex flex-1 max-w-md mx-4">
          <div
            className={`w-full flex items-center gap-2 px-3.5 py-2 rounded-xl border ${borderCol} bg-[#181432] text-white`}
          >
            <Search className={`w-4 h-4 ${textMuted}`} />
            <input
              type="search"
              placeholder="Cari tabel company_db, menu, atau user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm focus:outline-none placeholder-slate-400"
            />
          </div>
        </div>

        {/* Header Right (Tanpa Toggle Dark/Light - Permanen Dark Mode) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* View Live Strive Frontend Button */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#ea7c00]/15 text-[#fb923c] border border-[#ea7c00]/30 hover:bg-[#ea7c00] hover:text-white transition-all"
          >
            <span>Strive Frontend</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className={`hidden md:flex w-10 h-10 rounded-xl border ${borderCol} items-center justify-center hover:text-[#a78bfa] transition-colors cursor-pointer`}
            title="Fullscreen"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setNotifOpen(!notifOpen);
                setUserMenuOpen(false);
              }}
              className={`w-10 h-10 rounded-xl border ${borderCol} flex items-center justify-center relative hover:text-[#a78bfa] transition-colors cursor-pointer`}
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#8b5cf6] text-white text-[10px] font-bold flex items-center justify-center">
                {db.messages.length + 1}
              </span>
            </button>

            {notifOpen && (
              <div
                className={`absolute right-0 mt-2 w-80 rounded-2xl border ${bgCard} shadow-2xl p-4 z-50 animate-view-enter`}
              >
                <div className={`flex items-center justify-between pb-3 border-b ${borderCol}`}>
                  <div>
                    <span className={`text-[11px] uppercase ${textMuted}`}>Today</span>
                    <h6 className={`font-bold text-sm ${textHeading}`}>Notifications</h6>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNotifOpen(false)}
                    className="text-xs text-[#a78bfa] font-semibold"
                  >
                    Mark all read
                  </button>
                </div>
                <div className={`divide-y ${borderCol} max-h-64 overflow-y-auto my-2`}>
                  <div className="py-2.5 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#10b981]/20 text-[#34d399] flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`text-xs font-bold ${textHeading}`}>
                        Database company_db Aktif
                      </div>
                      <div className={`text-xs ${textMuted}`}>
                        5 Tabel Menu &amp; User RBAC terhubung otomatis
                      </div>
                      <div className={`text-[10px] ${textMuted} mt-0.5`}>Baru saja</div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setNotifOpen(false);
                    navigateView('messages');
                  }}
                  className="w-full pt-2 text-center text-xs font-semibold text-[#a78bfa] hover:underline"
                >
                  View all inquiries ({db.messages.length})
                </button>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setUserMenuOpen(!userMenuOpen);
                setNotifOpen(false);
              }}
              className={`flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-xl border ${borderCol} hover:border-[#8b5cf6] transition-all cursor-pointer`}
            >
              <img
                src={db.company.avatarImage || `${DASH_IMG}/profile-img.webp`}
                alt={db.company.fullName}
                className="w-8 h-8 rounded-lg object-cover"
              />
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <strong className={`text-xs font-bold ${textHeading}`}>
                  {db.company.fullName}
                </strong>
                <small className={`text-[10px] ${textMuted} max-w-[130px] truncate`}>
                  {db.company.major}
                </small>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 ${textMuted}`} />
            </button>

            {userMenuOpen && (
              <div
                className={`absolute right-0 mt-2 w-64 rounded-2xl border ${bgCard} shadow-2xl p-3 z-50 space-y-1 animate-view-enter`}
              >
                <div className={`flex items-center gap-3 p-2 border-b ${borderCol} mb-1`}>
                  <img
                    src={db.company.avatarImage || `${DASH_IMG}/profile-img.webp`}
                    alt={db.company.fullName}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div>
                    <h6 className={`font-bold text-sm ${textHeading}`}>
                      {db.company.fullName}
                    </h6>
                    <span className={`text-xs ${textMuted}`}>
                      {db.company.major}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setUserMenuOpen(false);
                    navigateView('db-user');
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium ${hoverItem}`}
                >
                  <Users className="w-4 h-4 text-[#a78bfa]" />
                  <span>Manajemen Akun ({db.user?.length || 0})</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUserMenuOpen(false);
                    navigateView('cms-settings');
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium ${hoverItem}`}
                >
                  <Settings className="w-4 h-4 text-[#34d399]" />
                  <span>Edit Biodata &amp; Foto Profil</span>
                </button>
                <div className={`pt-1 mt-1 border-t ${borderCol}`}>
                  <button
                    type="button"
                    onClick={triggerAutoLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-[#f87171] hover:bg-[#ef4444]/20 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar / Logout Otomatis</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* TOMBOL KELUAR (LOGOUT OTOMATIS DENGAN LOADING & ANIMASI) */}
          <button
            type="button"
            onClick={triggerAutoLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#ef4444] to-[#dc2626] hover:from-[#dc2626] hover:to-[#b91c1c] text-white text-xs font-bold shadow-md shadow-red-600/25 transition-all cursor-pointer"
            title="Keluar / Logout Otomatis"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar</span>
          </button>
        </div>
      </header>

      {/* ==================== SIDEBAR (BERSIH TANPA MENU DOUBLE) ==================== */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-[68px] bottom-0 left-0 z-30 border-r transition-all duration-300 flex flex-col justify-between overflow-y-auto ${bgSidebar} ${
          sidebarCollapsed ? 'lg:w-[76px]' : 'lg:w-[280px]'
        } ${sidebarOpen ? 'translate-x-0 w-[280px]' : '-translate-x-full lg:translate-x-0'}`}
      >
        <nav className="p-4 space-y-1.5">
          {/* 1. Dashboard Utama */}
          <button
            type="button"
            onClick={() => navigateView('command-center')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeView === 'command-center'
                ? 'bg-gradient-to-r from-[#8b5cf6] to-[#2563eb] text-white shadow-md'
                : hoverItem
            }`}
          >
            <LayoutGrid className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && <span>Dashboard Utama</span>}
          </button>

          {/* 2. Grup Menu: Admin & Menu Suite (company_db) — Tanpa Menu Double */}
          {!sidebarCollapsed && (
            <div>
              <button
                type="button"
                onClick={() => toggleSubmenu('company_db')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer ${hoverItem}`}
              >
                <span className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-[#a78bfa]" />
                  <span>Admin Suite (company_db)</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openMenus.company_db ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openMenus.company_db && (
                <ul className="pl-9 pr-2 py-1 space-y-1 text-xs font-medium">
                  <li>
                    <button
                      type="button"
                      onClick={() => navigateView('db-user-role')}
                      className={`w-full flex items-center justify-between py-2 px-3 rounded-lg transition-all cursor-pointer ${
                        activeView === 'db-user-role' || activeView === 'db-user-access'
                          ? 'bg-[#8b5cf6]/20 text-[#c4b5fd] font-bold border border-[#8b5cf6]/30'
                          : hoverItem
                      }`}
                    >
                      <span>Role Management</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1f1a3d] text-[#a78bfa]">
                        {db.user_role?.length || 0}
                      </span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => navigateView('db-user')}
                      className={`w-full flex items-center justify-between py-2 px-3 rounded-lg transition-all cursor-pointer ${
                        activeView === 'db-user'
                          ? 'bg-[#8b5cf6]/20 text-[#c4b5fd] font-bold border border-[#8b5cf6]/30'
                          : hoverItem
                      }`}
                    >
                      <span>Manajemen Akun</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1f1a3d] text-[#a78bfa]">
                        {db.user?.length || 0}
                      </span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => navigateView('db-user-menu')}
                      className={`w-full flex items-center justify-between py-2 px-3 rounded-lg transition-all cursor-pointer ${
                        activeView === 'db-user-menu'
                          ? 'bg-[#8b5cf6]/20 text-[#c4b5fd] font-bold border border-[#8b5cf6]/30'
                          : hoverItem
                      }`}
                    >
                      <span>Menu Management</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1f1a3d] text-[#a78bfa]">
                        {db.user_menu?.length || 0}
                      </span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => navigateView('db-user-submenu')}
                      className={`w-full flex items-center justify-between py-2 px-3 rounded-lg transition-all cursor-pointer ${
                        activeView === 'db-user-submenu'
                          ? 'bg-[#8b5cf6]/20 text-[#c4b5fd] font-bold border border-[#8b5cf6]/30'
                          : hoverItem
                      }`}
                    >
                      <span>Submenu Management</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1f1a3d] text-[#a78bfa]">
                        {db.user_sub_menu?.length || 0}
                      </span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => navigateView('database-viewer')}
                      className={`w-full flex items-center justify-between py-2 px-3 rounded-lg transition-all cursor-pointer ${
                        activeView === 'database-viewer'
                          ? 'bg-[#8b5cf6]/20 text-[#c4b5fd] font-bold border border-[#8b5cf6]/30'
                          : hoverItem
                      }`}
                    >
                      <span>Skema SQL (company_db)</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#10b981]/20 text-[#34d399]">
                        SQL
                      </span>
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}

          {/* 3. Grup Menu: CMS & Jasa Pembuatan Website */}
          {!sidebarCollapsed && (
            <div>
              <button
                type="button"
                onClick={() => toggleSubmenu('cms')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer ${hoverItem}`}
              >
                <span className="flex items-center gap-3">
                  <Puzzle className="w-4 h-4 text-[#fb923c]" />
                  <span>Jasa Website &amp; CMS</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openMenus.cms ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openMenus.cms && (
                <ul className="pl-9 pr-2 py-1 space-y-1 text-xs font-medium">
                  <li>
                    <button
                      type="button"
                      onClick={() => navigateView('cms-services')}
                      className={`w-full text-left py-2 px-3 rounded-lg transition-all cursor-pointer ${
                        activeView === 'cms-services'
                          ? 'bg-[#8b5cf6]/20 text-[#c4b5fd] font-bold border border-[#8b5cf6]/30'
                          : hoverItem
                      }`}
                    >
                      Jasa Pembuatan Web ({db.services.length})
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => navigateView('cms-pricing')}
                      className={`w-full flex items-center justify-between py-2 px-3 rounded-lg transition-all cursor-pointer ${
                        activeView === 'cms-pricing'
                          ? 'bg-[#8b5cf6]/20 text-[#c4b5fd] font-bold border border-[#8b5cf6]/30'
                          : hoverItem
                      }`}
                    >
                      <span>Paket Harga Website ({db.pricing.length})</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                        CRUD
                      </span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => navigateView('cms-portfolio')}
                      className={`w-full text-left py-2 px-3 rounded-lg transition-all cursor-pointer ${
                        activeView === 'cms-portfolio'
                          ? 'bg-[#8b5cf6]/20 text-[#c4b5fd] font-bold border border-[#8b5cf6]/30'
                          : hoverItem
                      }`}
                    >
                      Portofolio Proyek Web ({db.portfolio.length})
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => navigateView('cms-simpus')}
                      className={`w-full flex items-center justify-between py-2 px-3 rounded-lg transition-all cursor-pointer ${
                        activeView === 'cms-simpus'
                          ? 'bg-[#8b5cf6]/20 text-[#c4b5fd] font-bold border border-[#8b5cf6]/30'
                          : hoverItem
                      }`}
                    >
                      <span>Simulasi &amp; Katalog Web ({(db.simpusBooks || []).length})</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">
                        LIVE
                      </span>
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      onClick={() => navigateView('cms-about')}
                      className={`w-full flex items-center justify-between py-2 px-3 rounded-lg transition-all cursor-pointer ${
                        activeView === 'cms-about'
                          ? 'bg-[#8b5cf6]/20 text-[#c4b5fd] font-bold border border-[#8b5cf6]/30'
                          : hoverItem
                      }`}
                    >
                      <span>Profil IT &amp; Rekayasa (About)</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                        PRO
                      </span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => navigateView('cms-skills')}
                      className={`w-full text-left py-2 px-3 rounded-lg transition-all cursor-pointer ${
                        activeView === 'cms-skills'
                          ? 'bg-[#8b5cf6]/20 text-[#c4b5fd] font-bold border border-[#8b5cf6]/30'
                          : hoverItem
                      }`}
                    >
                      Skills Frontend &amp; Backend ({db.skills.length})
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => navigateView('cms-team')}
                      className={`w-full text-left py-2 px-3 rounded-lg transition-all cursor-pointer ${
                        activeView === 'cms-team'
                          ? 'bg-[#8b5cf6]/20 text-[#c4b5fd] font-bold border border-[#8b5cf6]/30'
                          : hoverItem
                      }`}
                    >
                      Tim Spesialisasi ({db.team.length})
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => navigateView('cms-settings')}
                      className={`w-full flex items-center justify-between py-2 px-3 rounded-lg transition-all cursor-pointer ${
                        activeView === 'cms-settings'
                          ? 'bg-[#8b5cf6]/20 text-[#c4b5fd] font-bold border border-[#8b5cf6]/30'
                          : hoverItem
                      }`}
                    >
                      <span>Biodata &amp; Hero Website</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300 font-bold">
                        FOTO
                      </span>
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}

          {/* 4. Pesan & Order Jasa Website (Tanpa Menu Duplikat) */}
          <button
            type="button"
            onClick={() => navigateView('messages')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              activeView === 'messages'
                ? 'bg-gradient-to-r from-[#8b5cf6] to-[#2563eb] text-white'
                : hoverItem
            }`}
          >
            <span className="flex items-center gap-3">
              <Mail className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Kotak Masuk Klien</span>}
            </span>
            {!sidebarCollapsed && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#8b5cf6]/20 text-[#c4b5fd]">
                {db.messages.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => navigateView('orders')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              activeView === 'orders'
                ? 'bg-gradient-to-r from-[#8b5cf6] to-[#2563eb] text-white'
                : hoverItem
            }`}
          >
            <span className="flex items-center gap-3">
              <Receipt className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Order Jasa Website</span>}
            </span>
            {!sidebarCollapsed && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#10b981]/20 text-[#34d399]">
                {db.orders.length}
              </span>
            )}
          </button>
        </nav>

        {/* TOMBOL KELUAR (LOGOUT OTOMATIS) DI BAGIAN BAWAH SIDEBAR */}
        <div className={`p-4 border-t ${borderCol}`}>
          <button
            type="button"
            onClick={triggerAutoLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#ef4444]/15 hover:bg-[#ef4444] text-[#f87171] hover:text-white border border-[#ef4444]/30 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && <span>Keluar / Logout</span>}
          </button>
        </div>
      </aside>

      {/* ==================== MAIN CONTENT AREA (DENGAN ANIMASI MASUK & KELUAR OTOMATIS) ==================== */}
      <main
        className={`flex-1 pt-[68px] transition-all duration-300 ${
          sidebarCollapsed ? 'lg:pl-[76px]' : 'lg:pl-[280px]'
        }`}
      >
        <div
          className={`p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6 ${
            viewAnim === 'enter' ? 'animate-view-enter' : 'animate-view-exit'
          }`}
        >
          {/* ==================== VIEW 1: COMMAND CENTER (JASA PEMBUATAN WEBSITE & BACKEND) ==================== */}
          {activeView === 'command-center' && (
            <>
              {/* 1. Dashboard Hero & 4 KPI Cards */}
              <div className={`rounded-2xl border p-6 sm:p-8 shadow-sm ${bgCard}`}>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#315cf6]">
                      Command Center • Full-Stack Web Development (Frontend &amp; Backend)
                    </span>
                    <h1 className={`text-2xl sm:text-3xl font-extrabold mt-1 ${textHeading}`}>
                      Dashboard Jasa Pembuatan Website &amp; Sistem Backend
                    </h1>
                    <p className={`text-sm mt-1 ${textMuted}`}>
                      Kelola order jasa pembuatan website (Frontend &amp; Backend), katalog paket
                      website &amp; kalkulator proyek, portofolio karya, serta 5 tabel database{' '}
                      <code className="text-amber-400 font-mono">company_db</code> dari satu
                      workspace.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => navigateView('cms-services')}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border ${borderCol} text-xs sm:text-sm font-semibold hover:border-[#ea7c00] hover:text-[#ea7c00] transition-all cursor-pointer`}
                    >
                      <Globe className="w-4 h-4 text-[#ea7c00]" />
                      <span>Kelola Jasa Website</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateView('orders')}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border ${borderCol} text-xs sm:text-sm font-semibold hover:border-[#315cf6] transition-all cursor-pointer`}
                    >
                      <Receipt className="w-4 h-4 text-[#315cf6]" />
                      <span>Order &amp; Invoice</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewOrderModal(true)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#315cf6] hover:bg-[#254bdb] text-white text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>+ Order Jasa Web</span>
                    </button>
                  </div>
                </div>

                {/* 4 KPI Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 pt-6">
                  {/* KPI 1: Total Website Built */}
                  <div
                    className={`p-5 rounded-2xl border ${borderCol} flex items-start gap-4 ${
                      darkMode ? 'bg-[#141d2d]' : 'bg-[#fbfdff]'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#315cf6]/15 text-[#315cf6] flex items-center justify-center shrink-0">
                      <ShoppingCart className="w-6 h-6" />
                    </div>
                    <div>
                      <span className={`text-xs font-medium ${textMuted}`}>
                        Proyek Jasa Website
                      </span>
                      <strong className={`block text-2xl font-extrabold mt-0.5 ${textHeading}`}>
                        {db.dashboardStats.totalSales}
                      </strong>
                      <small className="inline-flex items-center gap-1 text-xs font-semibold text-[#0f9b7a] mt-1">
                        <ArrowUp className="w-3.5 h-3.5" />
                        {db.dashboardStats.salesGrowth}
                      </small>
                    </div>
                  </div>

                  {/* KPI 2: Revenue Jasa Web */}
                  <div
                    className={`p-5 rounded-2xl border ${borderCol} flex items-start gap-4 ${
                      darkMode ? 'bg-[#141d2d]' : 'bg-[#fbfdff]'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#dff8f0] text-[#0f9b7a] flex items-center justify-center shrink-0">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                      <span className={`text-xs font-medium ${textMuted}`}>
                        Pendapatan Jasa Web
                      </span>
                      <strong className={`block text-2xl font-extrabold mt-0.5 ${textHeading}`}>
                        {db.dashboardStats.revenue}
                      </strong>
                      <small className="inline-flex items-center gap-1 text-xs font-semibold text-[#0f9b7a] mt-1">
                        <ArrowUp className="w-3.5 h-3.5" />
                        {db.dashboardStats.revenueGrowth}
                      </small>
                    </div>
                  </div>

                  {/* KPI 3: Layanan Jasa Web */}
                  <div
                    className={`p-5 rounded-2xl border ${borderCol} flex items-start gap-4 ${
                      darkMode ? 'bg-[#141d2d]' : 'bg-[#fbfdff]'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#fff0d7] text-[#c87914] flex items-center justify-center shrink-0">
                      <Package className="w-6 h-6" />
                    </div>
                    <div>
                      <span className={`text-xs font-medium ${textMuted}`}>
                        Layanan Frontend &amp; Backend
                      </span>
                      <strong className={`block text-2xl font-extrabold mt-0.5 ${textHeading}`}>
                        {db.services.length} Layanan Pro
                      </strong>
                      <small className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 mt-1">
                        <ArrowUp className="w-3.5 h-3.5" />
                        Full-Stack, API &amp; Database
                      </small>
                    </div>
                  </div>

                  {/* KPI 4: Kepuasan Klien */}
                  <div
                    className={`p-5 rounded-2xl border ${borderCol} flex items-start gap-4 ${
                      darkMode ? 'bg-[#141d2d]' : 'bg-[#fbfdff]'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#ddf4fb] text-[#0c9dc8] flex items-center justify-center shrink-0">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <span className={`text-xs font-medium ${textMuted}`}>
                        Kepuasan Klien Jasa Web
                      </span>
                      <strong className={`block text-2xl font-extrabold mt-0.5 ${textHeading}`}>
                        {db.dashboardStats.customersCount}
                      </strong>
                      <small className="inline-flex items-center gap-1 text-xs font-semibold text-[#0f9b7a] mt-1">
                        <ArrowUp className="w-3.5 h-3.5" />
                        {db.dashboardStats.customersGrowth}
                      </small>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Dashboard Workbench (Revenue Chart + Recent Activity & Quick Actions) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left 8 Cols: Revenue Overview Area Chart */}
                <section className={`lg:col-span-8 rounded-2xl border p-6 shadow-sm ${bgCard}`}>
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-5">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#315cf6]">
                        Statistik Jasa Pembuatan Website (Frontend &amp; Backend)
                      </span>
                      <h2 className={`text-xl font-bold ${textHeading}`}>
                        Grafik Pendapatan &amp; Pertumbuhan Proyek Website
                      </h2>
                    </div>

                    <div
                      className={`inline-flex p-1 rounded-xl border ${borderCol} ${
                        darkMode ? 'bg-[#141d2d]' : 'bg-[#f4f7fb]'
                      }`}
                    >
                      {(['12M', '6M', '30D'] as const).map((rng) => (
                        <button
                          key={rng}
                          type="button"
                          onClick={() => setChartRange(rng)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            chartRange === rng
                              ? 'bg-[#315cf6] text-white shadow-sm'
                              : textMuted
                          }`}
                        >
                          {rng}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Chart Summary Row */}
                  <div className="grid grid-cols-3 gap-4 pb-6 mb-4 border-b border-gray-100 dark:border-gray-800">
                    <div>
                      <span className={`text-xs ${textMuted}`}>Pendapatan Jasa Web</span>
                      <strong className={`block text-xl font-extrabold ${textHeading}`}>
                        Rp 48.5 Jt
                      </strong>
                    </div>
                    <div>
                      <span className={`text-xs ${textMuted}`}>Proyek Frontend &amp; Backend</span>
                      <strong className={`block text-xl font-extrabold ${textHeading}`}>
                        28 Website
                      </strong>
                    </div>
                    <div>
                      <span className={`text-xs ${textMuted}`}>Klien Instansi &amp; UMKM</span>
                      <strong className={`block text-xl font-extrabold ${textHeading}`}>
                        24 Klien
                      </strong>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex items-center justify-end gap-5 text-xs font-medium mb-3">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#315cf6]" /> Jasa Full-Stack Web
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#0f9b7a]" /> Jasa Backend &amp; API
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#c87914]" /> Klien Baru
                    </span>
                  </div>

                  {/* Smooth Area SVG Chart (Matching AppDashboard ApexCharts) */}
                  <div className="w-full overflow-x-auto">
                    <svg
                      viewBox="0 0 720 260"
                      className="w-full h-[260px] select-none"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#315cf6" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#315cf6" stopOpacity="0.02" />
                        </linearGradient>
                        <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0f9b7a" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#0f9b7a" stopOpacity="0.02" />
                        </linearGradient>
                      </defs>

                      {/* Horizontal Dashed Grid Lines */}
                      {[40, 90, 140, 190, 230].map((y, idx) => (
                        <g key={y}>
                          <line
                            x1="45"
                            y1={y}
                            x2="700"
                            y2={y}
                            stroke={darkMode ? '#2b3a50' : '#dbe4ef'}
                            strokeDasharray="4 4"
                          />
                          <text
                            x="5"
                            y={y + 4}
                            fill={darkMode ? '#9aa8b9' : '#687789'}
                            fontSize="11"
                          >
                            {(10 - idx * 2)}Jt
                          </text>
                        </g>
                      ))}

                      {/* Revenue Area & Stroke */}
                      <path
                        d="M50,150 C95,120 120,138 160,115 C200,95 230,130 270,90 C310,60 340,100 380,75 C420,55 450,85 490,48 C530,30 570,55 610,38 L695,25 L695,230 L50,230 Z"
                        fill="url(#revGrad)"
                      />
                      <path
                        d="M50,150 C95,120 120,138 160,115 C200,95 230,130 270,90 C310,60 340,100 380,75 C420,55 450,85 490,48 C530,30 570,55 610,38 L695,25"
                        fill="none"
                        stroke="#315cf6"
                        strokeWidth="3"
                      />

                      {/* Expenses Area & Stroke */}
                      <path
                        d="M50,185 C95,175 120,180 160,168 C200,160 230,172 270,155 C310,145 340,160 380,142 C420,135 450,148 490,130 C530,122 570,135 610,125 L695,115 L695,230 L50,230 Z"
                        fill="url(#expGrad)"
                      />
                      <path
                        d="M50,185 C95,175 120,180 160,168 C200,160 230,172 270,155 C310,145 340,160 380,142 C420,135 450,148 490,130 C530,122 570,135 610,125 L695,115"
                        fill="none"
                        stroke="#0f9b7a"
                        strokeWidth="2.5"
                      />

                      {/* Customers Line */}
                      <path
                        d="M50,220 C110,210 180,200 250,192 C320,182 400,172 480,162 C550,152 620,145 695,136"
                        fill="none"
                        stroke="#c87914"
                        strokeWidth="2.5"
                        strokeDasharray="6 3"
                      />

                      {/* X-Axis Labels */}
                      {[
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec'
                      ].map((m, i) => (
                        <text
                          key={m}
                          x={50 + i * 58}
                          y="252"
                          fill={darkMode ? '#9aa8b9' : '#687789'}
                          fontSize="11"
                          textAnchor="middle"
                        >
                          {m}
                        </text>
                      ))}
                    </svg>
                  </div>
                </section>

                {/* Right 4 Cols: Recent Activity + Quick Actions */}
                <aside className="lg:col-span-4 space-y-6">
                  {/* Live Queue: Recent Activity */}
                  <section className={`rounded-2xl border p-6 shadow-sm ${bgCard}`}>
                    <div className="flex items-center justify-between pb-4">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#315cf6]">
                          Live queue
                        </span>
                        <h2 className={`text-lg font-bold ${textHeading}`}>
                          Aktivitas Jasa Website
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigateView('orders')}
                        className="text-xs font-semibold text-[#315cf6] hover:underline cursor-pointer"
                      >
                        Lihat Semua
                      </button>
                    </div>

                    <div className="space-y-3.5">
                      {db.activities.slice(0, 5).map((act) => {
                        const badgeColors = {
                          success: 'bg-[#dff8f0] text-[#0f9b7a]',
                          primary: 'bg-[#315cf6]/15 text-[#315cf6]',
                          warning: 'bg-[#fff0d7] text-[#c87914]',
                          info: 'bg-[#ddf4fb] text-[#0c9dc8]',
                          danger: 'bg-[#fde5ea] text-[#e05264]'
                        }[act.type];

                        return (
                          <div key={act.id} className="flex items-start gap-3">
                            <span
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${badgeColors}`}
                            >
                              {act.type === 'success' && <Check className="w-4 h-4" />}
                              {act.type === 'primary' && <UserPlus className="w-4 h-4" />}
                              {act.type === 'warning' && <AlertTriangle className="w-4 h-4" />}
                              {act.type === 'info' && <MessageSquare className="w-4 h-4" />}
                              {act.type === 'danger' && <XCircle className="w-4 h-4" />}
                            </span>
                            <div className="text-xs leading-snug">
                              <strong className={`block font-semibold ${textHeading}`}>
                                {act.text}{' '}
                                {act.highlight && (
                                  <span className="text-[#315cf6]">{act.highlight}</span>
                                )}
                              </strong>
                              <small className={textMuted}>{act.time}</small>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* Shortcuts: Quick Actions */}
                  <section className={`rounded-2xl border p-6 shadow-sm ${bgCard}`}>
                    <div className="pb-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#315cf6]">
                        Shortcuts
                      </span>
                      <h2 className={`text-lg font-bold ${textHeading}`}>
                        Aksi Cepat Jasa Web &amp; Backend
                      </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setNewOrderModal(true)}
                        className={`p-4 rounded-xl border ${borderCol} hover:border-[#315cf6] hover:bg-[#315cf6]/5 flex flex-col items-center gap-2 transition-all cursor-pointer`}
                      >
                        <PlusCircle className="w-5 h-5 text-[#315cf6]" />
                        <span className="text-xs font-semibold">+ Order Jasa Web</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => navigateView('cms-services')}
                        className={`p-4 rounded-xl border ${borderCol} hover:border-[#315cf6] hover:bg-[#315cf6]/5 flex flex-col items-center gap-2 transition-all cursor-pointer`}
                      >
                        <Globe className="w-5 h-5 text-[#ea7c00]" />
                        <span className="text-xs font-semibold">Kelola Jasa Web</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => navigateView('cms-portfolio')}
                        className={`p-4 rounded-xl border ${borderCol} hover:border-[#315cf6] hover:bg-[#315cf6]/5 flex flex-col items-center gap-2 transition-all cursor-pointer`}
                      >
                        <UserPlus className="w-5 h-5 text-[#0f9b7a]" />
                        <span className="text-xs font-semibold">Edit Portofolio</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => navigateView('messages')}
                        className={`p-4 rounded-xl border ${borderCol} hover:border-[#315cf6] hover:bg-[#315cf6]/5 flex flex-col items-center gap-2 transition-all cursor-pointer`}
                      >
                        <FileText className="w-5 h-5 text-[#c87914]" />
                        <span className="text-xs font-semibold">Pesan Klien</span>
                      </button>
                    </div>
                  </section>
                </aside>
              </div>

              {/* 3. Dashboard Insight Grid (Workflow Jasa Web + Layanan Terlaris + System Status) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Panel 1:Tahapan Pengerjaan Jasa Website */}
                <section className={`rounded-2xl border p-6 shadow-sm ${bgCard}`}>
                  <div className="flex items-center justify-between pb-5">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#315cf6]">
                        Full-Stack Pipeline
                      </span>
                      <h2 className={`text-lg font-bold ${textHeading}`}>
                        Tahapan Jasa Pembuatan Web
                      </h2>
                    </div>
                    <span className={`text-xs ${textMuted}`}>End-to-End</span>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        label: '1. Desain UI/UX & Frontend',
                        val: '100%',
                        sub: 'Next.js / Tailwind',
                        width: 'w-full',
                        color: 'bg-[#315cf6]'
                      },
                      {
                        label: '2. Backend API & Auth RBAC',
                        val: '95%',
                        sub: 'Node.js / Laravel',
                        width: 'w-11/12',
                        color: 'bg-[#0f9b7a]'
                      },
                      {
                        label: '3. Database SQL (company_db)',
                        val: '98%',
                        sub: '5 Tabel Utama + CMS',
                        width: 'w-11/12',
                        color: 'bg-[#c87914]'
                      },
                      {
                        label: '4. Deploy Cloud & Maintenance',
                        val: '100%',
                        sub: 'Vercel / Server',
                        width: 'w-full',
                        color: 'bg-[#0c9dc8]'
                      }
                    ].map((f) => (
                      <div key={f.label} className="space-y-1.5">
                        <div className="flex items-baseline justify-between text-xs">
                          <span className="font-semibold">{f.label}</span>
                          <div className="space-x-2">
                            <strong className={`text-sm font-extrabold ${textHeading}`}>
                              {f.val}
                            </strong>
                            <small className={textMuted}>{f.sub}</small>
                          </div>
                        </div>
                        <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                          <div className={`h-full rounded-full ${f.width} ${f.color}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Panel 2: Layanan Jasa Website Terlaris */}
                <section className={`rounded-2xl border p-6 shadow-sm ${bgCard}`}>
                  <div className="flex items-center justify-between pb-5">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#315cf6]">
                        Best Seller Services
                      </span>
                      <h2 className={`text-lg font-bold ${textHeading}`}>
                        Paket Jasa Website Terlaris
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigateView('cms-services')}
                      className="text-xs font-semibold text-[#315cf6] cursor-pointer"
                    >
                      Kelola →
                    </button>
                  </div>

                  <div className="space-y-3.5">
                    {[
                      {
                        rank: 1,
                        name: 'Jasa Website Full-Stack (Frontend + Backend)',
                        rev: 'Rp 18.5 Jt • Company Profile & CMS',
                        change: '+24.4%',
                        pos: true
                      },
                      {
                        rank: 2,
                        name: 'Jasa Website Toko Online & E-Commerce',
                        rev: 'Rp 14.2 Jt • Keranjang, Checkout & Invoice',
                        change: '+19.1%',
                        pos: true
                      },
                      {
                        rank: 3,
                        name: 'Jasa Sistem Backend, REST API & Database',
                        rev: 'Rp 9.8 Jt • MySQL company_db & RBAC',
                        change: '+15.8%',
                        pos: true
                      },
                      {
                        rank: 4,
                        name: 'Jasa Landing Page Promosi & SEO Bisnis',
                        rev: 'Rp 6.0 Jt • CTA WhatsApp & Konversi',
                        change: '+11.4%',
                        pos: true
                      }
                    ].map((p) => (
                      <div
                        key={p.rank}
                        className={`p-3 rounded-xl border ${borderCol} flex items-center justify-between`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-[#315cf6]/10 text-[#315cf6] text-xs font-extrabold flex items-center justify-center">
                            {p.rank}
                          </span>
                          <div>
                            <strong className={`block text-xs sm:text-sm font-bold ${textHeading}`}>
                              {p.name}
                            </strong>
                            <small className={`text-xs ${textMuted}`}>{p.rev}</small>
                          </div>
                        </div>
                        <span
                          className={`text-xs font-bold ${
                            p.pos ? 'text-[#0f9b7a]' : 'text-[#e05264]'
                          }`}
                        >
                          {p.change}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Panel 3: System Status */}
                <section className={`rounded-2xl border p-6 shadow-sm ${bgCard}`}>
                  <div className="flex items-center justify-between pb-5">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#315cf6]">
                        Backend &amp; Database Status
                      </span>
                      <h2 className={`text-lg font-bold ${textHeading}`}>
                        Status Server &amp; Database
                      </h2>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#dff8f0] text-[#0f9b7a]">
                      Online 100%
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { val: '99.98%', label: 'Frontend & API Uptime', dot: 'bg-[#0f9b7a]' },
                      { val: '5 Tabel', label: 'Database company_db', dot: 'bg-[#315cf6]' },
                      { val: '0.04s', label: 'Kecepatan Query SQL', dot: 'bg-[#0c9dc8]' },
                      { val: 'Ready', label: 'Cloud Vercel Deploy', dot: 'bg-[#0f9b7a]' }
                    ].map((st) => (
                      <div
                        key={st.label}
                        className={`p-4 rounded-xl border ${borderCol} flex items-start gap-3`}
                      >
                        <span className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${st.dot}`} />
                        <div>
                          <strong className={`block text-lg font-extrabold ${textHeading}`}>
                            {st.val}
                          </strong>
                          <small className={`text-xs ${textMuted}`}>{st.label}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* 4. Dashboard Lower Grid (Recent Orders Table + Sales Targets) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left 8 Cols: Recent Orders Table */}
                <section className={`lg:col-span-8 rounded-2xl border p-6 shadow-sm ${bgCard}`}>
                  <div className="flex items-center justify-between pb-5">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#315cf6]">
                        Order Jasa Pembuatan Website
                      </span>
                      <h2 className={`text-xl font-bold ${textHeading}`}>
                        Daftar Pesanan Website Klien (Frontend &amp; Backend)
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigateView('orders')}
                      className="px-4 py-2 rounded-xl bg-[#315cf6] text-white text-xs font-semibold cursor-pointer"
                    >
                      Kelola Semua Order
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr
                          className={`border-b ${borderCol} text-xs uppercase font-bold ${textMuted}`}
                        >
                          <th className="py-3 px-3">Kode Order</th>
                          <th className="py-3 px-3">Klien / Instansi</th>
                          <th className="py-3 px-3">Paket Jasa Website</th>
                          <th className="py-3 px-3">Nilai Proyek</th>
                          <th className="py-3 px-3">Status</th>
                          <th className="py-3 px-3 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                        {db.orders.map((ord) => {
                          const badgeStyle =
                            ord.status === 'Completed'
                              ? 'bg-[#dff8f0] text-[#0f9b7a]'
                              : ord.status === 'Pending'
                              ? 'bg-[#fff0d7] text-[#c87914]'
                              : 'bg-[#fde5ea] text-[#e05264]';

                          return (
                            <tr key={ord.id}>
                              <td className="py-3.5 px-3 font-bold text-[#315cf6]">
                                {ord.orderNumber}
                              </td>
                              <td className="py-3.5 px-3">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={ord.customerAvatar}
                                    alt={ord.customerName}
                                    className="w-9 h-9 rounded-full object-cover"
                                  />
                                  <div className="leading-tight">
                                    <strong className={`block text-xs sm:text-sm ${textHeading}`}>
                                      {ord.customerName}
                                    </strong>
                                    <span className={`text-xs ${textMuted}`}>
                                      {ord.customerEmail}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3.5 px-3 text-xs sm:text-sm">{ord.product}</td>
                              <td className="py-3.5 px-3 font-bold text-xs sm:text-sm">
                                {ord.amount}
                              </td>
                              <td className="py-3.5 px-3">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-bold ${badgeStyle}`}
                                >
                                  {ord.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-3">
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingOrderId(ord.id);
                                      setOrderForm({
                                        orderNumber: ord.orderNumber,
                                        customerName: ord.customerName,
                                        customerEmail: ord.customerEmail,
                                        product: ord.product,
                                        amount: ord.amount,
                                        status: ord.status
                                      });
                                      setNewOrderModal(true);
                                    }}
                                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 text-xs font-bold transition-all cursor-pointer"
                                  >
                                    <span>✏️</span>
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteOrder(ord.id)}
                                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#ef4444] hover:bg-[#dc2626] text-white text-xs font-bold transition-all cursor-pointer"
                                  >
                                    <span>🗑️</span>
                                    <span>Delete</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Right 4 Cols: Sales Targets */}
                <section className={`lg:col-span-4 rounded-2xl border p-6 shadow-sm ${bgCard}`}>
                  <div className="pb-5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#315cf6]">
                      Kapasitas Pengerjaan
                    </span>
                    <h2 className={`text-xl font-bold ${textHeading}`}>
                      Target Jasa Website &amp; Backend
                    </h2>
                  </div>

                  <div className="space-y-5">
                    {[
                      {
                        label: 'Jasa Website Full-Stack (Frontend + Backend)',
                        pct: '92%',
                        color: 'bg-[#315cf6]',
                        w: 'w-[92%]'
                      },
                      {
                        label: 'Jasa Website Company Profile & E-Commerce',
                        pct: '88%',
                        color: 'bg-[#0f9b7a]',
                        w: 'w-[88%]'
                      },
                      {
                        label: 'Jasa Pembuatan REST API & Database SQL',
                        pct: '95%',
                        color: 'bg-[#c87914]',
                        w: 'w-[95%]'
                      }
                    ].map((t) => (
                      <div key={t.label} className="space-y-2">
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span className={textMuted}>{t.label}</span>
                          <strong className={`font-extrabold ${textHeading}`}>{t.pct}</strong>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                          <div className={`h-full rounded-full ${t.w} ${t.color}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </>
          )}

          {/* ==================== VIEW 2: CONTACT MESSAGES INBOX ==================== */}
          {activeView === 'messages' && (
            <div className={`rounded-2xl border p-6 shadow-sm space-y-5 ${bgCard}`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase text-[#315cf6]">
                    Strive Contact Form Inbox
                  </span>
                  <h2 className={`text-2xl font-bold ${textHeading}`}>
                    Kotak Masuk Pesanan &amp; Konsultasi Klien ({db.messages.length})
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={fetchDb}
                  className="p-2.5 rounded-xl border border-gray-200 hover:text-[#315cf6] cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {db.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-5 rounded-2xl border ${borderCol} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <strong className={`text-base font-bold ${textHeading}`}>
                          {msg.name}
                        </strong>
                        <span className={`text-xs ${textMuted}`}>({msg.email})</span>
                      </div>
                      <div className="text-xs font-bold text-[#315cf6]">{msg.subject}</div>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingMessageId(msg.id);
                          setMessageForm({
                            name: msg.name,
                            email: msg.email,
                            subject: msg.subject,
                            message: msg.message
                          });
                          setMessageModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 text-xs font-bold transition-all cursor-pointer"
                      >
                        <span>✏️</span>
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#ef4444] hover:bg-[#dc2626] text-white text-xs font-bold transition-all cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== VIEW 3: ORDERS MANAGEMENT ==================== */}
          {activeView === 'orders' && (
            <div className={`rounded-2xl border p-6 shadow-sm space-y-5 ${bgCard}`}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase text-[#ea7c00]">
                    Manajemen Order Jasa Pembuatan Website (Frontend &amp; Backend)
                  </span>
                  <h2 className={`text-2xl font-bold ${textHeading}`}>
                    Daftar Order &amp; Invoice Pembuatan Website ({db.orders.length})
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingOrderId(null);
                    setOrderForm({
                      orderNumber: `#WEB-00${db.orders.length + 1}`,
                      customerName: '',
                      customerEmail: '',
                      product: 'Jasa Pembuatan Website Full-Stack (Frontend + Backend)',
                      amount: 'Rp 4.500.000',
                      status: 'Completed'
                    });
                    setNewOrderModal(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#ea7c00] to-amber-500 text-white text-xs font-bold shadow-lg shadow-orange-600/25 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>+ Tambah Order Website</span>
                </button>
              </div>

              <div className="space-y-3">
                {db.orders.map((ord) => (
                  <div
                    key={ord.id}
                    className={`p-4 rounded-xl border ${borderCol} flex flex-wrap items-center justify-between gap-4 hover:border-[#ea7c00]/40 transition-all`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={ord.customerAvatar}
                        alt={ord.customerName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <strong className={`text-sm font-bold ${textHeading}`}>
                          {ord.orderNumber} — {ord.customerName}
                        </strong>
                        <p className={`text-xs ${textMuted}`}>
                          {ord.product} • <span className="text-amber-400 font-bold">{ord.amount}</span> ({ord.customerEmail})
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      <select
                        value={ord.status}
                        onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                        style={{ colorScheme: 'dark' }}
                        className={`px-3 py-1.5 rounded-lg border ${borderCol} text-xs font-semibold bg-[#1a1636] text-white cursor-pointer`}
                      >
                        <option value="Completed" className="bg-[#13102a] text-white">Completed</option>
                        <option value="Pending" className="bg-[#13102a] text-white">Pending</option>
                        <option value="Cancelled" className="bg-[#13102a] text-white">Cancelled</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => {
                          setEditingOrderId(ord.id);
                          setOrderForm({
                            orderNumber: ord.orderNumber,
                            customerName: ord.customerName,
                            customerEmail: ord.customerEmail,
                            product: ord.product,
                            amount: ord.amount,
                            status: ord.status
                          });
                          setNewOrderModal(true);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 text-xs font-bold transition-all cursor-pointer"
                      >
                        <span>✏️</span>
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteOrder(ord.id)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#ef4444] hover:bg-[#dc2626] text-white text-xs font-bold transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== VIEW 3B: SKILLS TEKNIK INFORMATIKA CMS ==================== */}
          {activeView === 'cms-skills' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <form
                onSubmit={handleAddSkill}
                className={`lg:col-span-5 rounded-2xl border p-6 space-y-4 h-fit ${bgCard} ${
                  editingSkillId ? 'ring-2 ring-[#eab308]' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#315cf6] text-xs font-bold uppercase tracking-wider">
                    <Code2 className="w-4 h-4" />
                    <span>
                      {editingSkillId ? '✏️ Mode Edit Skill' : 'Database Tabel: skills'}
                    </span>
                  </div>
                  {editingSkillId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingSkillId(null);
                        setSkillForm({
                          name: '',
                          category: 'Frontend & Web Modern',
                          level: 90,
                          badge: 'Teknik Informatika',
                          description: ''
                        });
                      }}
                      className="text-xs font-bold text-amber-400 hover:underline cursor-pointer"
                    >
                      Batal Edit ✕
                    </button>
                  )}
                </div>
                <h3 className={`text-lg font-bold ${textHeading}`}>
                  {editingSkillId
                    ? 'Edit Skill Frontend / Backend'
                    : 'Tambah Skill Teknik Informatika'}
                </h3>
                <div>
                  <label className={`block text-xs font-bold mb-1 ${textMuted}`}>
                    Nama Bahasa / Framework / Database
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Laravel / Python / PostgreSQL"
                    value={skillForm.name}
                    onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${borderCol} bg-[#1a1636] text-white text-sm`}
                  />
                </div>
                {/* KATEGORI KEAHLIAN (CUSTOM DROPDOWN MODERN + BIKIN KATEGORI SENDIRI) */}
                <div className="relative space-y-2">
                  <div className="flex items-center justify-between">
                    <label className={`block text-xs font-bold ${textMuted}`}>
                      Kategori Keahlian
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setShowCustomSkillCatCreator(!showCustomSkillCatCreator);
                        setSkillCatDropdownOpen(false);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 cursor-pointer"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>
                        {showCustomSkillCatCreator ? 'Tutup Input Kategori' : '+ Buat Kategori Sendiri'}
                      </span>
                    </button>
                  </div>

                  {/* Trigger Custom Dropdown */}
                  <button
                    type="button"
                    onClick={() => setSkillCatDropdownOpen(!skillCatDropdownOpen)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#3d3575] bg-[#1a1636] hover:bg-[#221d47] text-white text-sm flex items-center justify-between transition-all cursor-pointer shadow-inner"
                  >
                    <span className="flex items-center gap-2.5 truncate">
                      <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] shrink-0" />
                      <span className="font-semibold text-white truncate">
                        {skillForm.category || 'Frontend & Web Modern'}
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5 shrink-0">
                      <span className="px-2 py-0.5 rounded-md bg-[#8b5cf6]/20 text-[#c4b5fd] text-[10px] font-bold">
                        Pilih Kategori
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#a78bfa] transition-transform ${
                          skillCatDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </span>
                  </button>

                  {/* Panel Input Buat Kategori Skill Sendiri */}
                  {showCustomSkillCatCreator && (
                    <div className="p-3 rounded-xl border border-amber-500/40 bg-[#15122e] space-y-2">
                      <label className="block text-[11px] font-bold text-amber-300">
                        ✨ Buat / Ketik Kategori Skill Sendiri:
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Misal: Cloud & DevOps / Mobile App..."
                          value={newSkillCategoryName}
                          onChange={(e) => setNewSkillCategoryName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddCustomSkillCategory(false);
                            }
                          }}
                          className="flex-1 px-3 py-2 rounded-xl border border-[#3d3575] bg-[#0f0c24] text-white text-xs focus:outline-none focus:border-amber-400"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddCustomSkillCategory(false)}
                          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#ea7c00] to-amber-500 text-white text-xs font-extrabold cursor-pointer shrink-0"
                        >
                          + Pakai
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Custom Modern Dropdown Menu */}
                  {skillCatDropdownOpen && (
                    <div className="z-30 w-full rounded-2xl border-2 border-[#4c3f91] bg-[#13102b] p-2 shadow-2xl space-y-1.5">
                      <div className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#a78bfa] flex items-center justify-between">
                        <span>Daftar Kategori Keahlian ({allSkillCategories.length})</span>
                        <button
                          type="button"
                          onClick={() => setSkillCatDropdownOpen(false)}
                          className="text-slate-400 hover:text-white cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="max-h-52 overflow-y-auto space-y-1 pr-1">
                        {allSkillCategories.map((cat) => {
                          const isSelected = skillForm.category === cat;
                          return (
                            <div
                              key={cat}
                              onClick={() => {
                                setSkillForm({ ...skillForm, category: cat });
                                setSkillCatDropdownOpen(false);
                              }}
                              className={`px-3 py-2 rounded-xl flex items-center justify-between text-xs cursor-pointer transition-all ${
                                isSelected
                                  ? 'bg-gradient-to-r from-[#8b5cf6] to-[#2563eb] text-white font-extrabold shadow-md'
                                  : 'bg-[#1a1638]/70 hover:bg-[#262052] text-slate-100 font-medium'
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                <Tag className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                <span>{cat}</span>
                              </span>
                              {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                            </div>
                          );
                        })}
                      </div>
                      {/* Quick Input Buat Kategori Baru di dalam Dropdown */}
                      <div className="pt-2 border-t border-[#2d2654] flex items-center gap-1.5">
                        <input
                          type="text"
                          placeholder="Ketik kategori baru sendiri..."
                          value={newSkillCategoryName}
                          onChange={(e) => setNewSkillCategoryName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddCustomSkillCategory(false);
                            }
                          }}
                          className="flex-1 px-2.5 py-1.5 rounded-lg border border-[#3d3575] bg-[#0d0a1f] text-white text-xs focus:outline-none focus:border-amber-400"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddCustomSkillCategory(false)}
                          className="px-3 py-1.5 rounded-lg bg-[#ea7c00] hover:bg-amber-500 text-white text-xs font-extrabold cursor-pointer shrink-0"
                        >
                          + Buat
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${textMuted}`}>
                      Persentase Skill ({skillForm.level}%)
                    </label>
                    <input
                      type="number"
                      min={50}
                      max={100}
                      value={skillForm.level}
                      onChange={(e) =>
                        setSkillForm({ ...skillForm, level: Number(e.target.value) })
                      }
                      className={`w-full px-3.5 py-2.5 rounded-xl border ${borderCol} bg-[#1a1636] text-white text-sm`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${textMuted}`}>
                      Badge Label
                    </label>
                    <input
                      type="text"
                      placeholder="Misal: Core Stack"
                      value={skillForm.badge}
                      onChange={(e) => setSkillForm({ ...skillForm, badge: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border ${borderCol} bg-[#1a1636] text-white text-sm`}
                    />
                  </div>
                </div>
                <div>
                  <label className={`block text-xs font-bold mb-1 ${textMuted}`}>
                    Deskripsi Penerapan (Frontend / Backend / Database)
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Jelaskan penggunaan skill ini dalam pembuatan website..."
                    value={skillForm.description}
                    onChange={(e) =>
                      setSkillForm({ ...skillForm, description: e.target.value })
                    }
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${borderCol} bg-[#1a1636] text-white text-sm`}
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                    editingSkillId
                      ? 'bg-[#eab308] hover:bg-[#ca8a04] text-slate-950'
                      : 'bg-[#315cf6] hover:bg-[#254bdb] text-white'
                  }`}
                >
                  {editingSkillId ? '💾 Simpan Perubahan Skill' : 'Simpan Skill ke Database'}
                </button>
              </form>

              <div className="lg:col-span-7 space-y-3">
                {db.skills.map((sk) => (
                  <div
                    key={sk.id}
                    className={`p-4 rounded-2xl border ${bgCard} flex items-center justify-between gap-4 transition-all ${
                      editingSkillId === sk.id ? 'border-[#eab308] ring-1 ring-[#eab308]' : ''
                    }`}
                  >
                    <div className="flex-1 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <strong className={`text-sm font-bold ${textHeading}`}>
                          {sk.name}
                        </strong>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#315cf6]/15 text-[#315cf6]">
                          {sk.category}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ea7c00]/15 text-[#ea7c00]">
                          {sk.badge} • {sk.level}%
                        </span>
                      </div>
                      <p className={`text-xs ${textMuted}`}>{sk.description}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingSkillId(sk.id);
                          setSkillForm({
                            name: sk.name,
                            category: sk.category,
                            level: sk.level,
                            badge: sk.badge,
                            description: sk.description || ''
                          });
                          setSkillModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 text-xs font-bold transition-all cursor-pointer"
                        title="Edit Skill"
                      >
                        <span>✏️</span>
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSkill(sk.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#ef4444]/20 hover:bg-[#ef4444] text-[#f87171] hover:text-white text-xs font-bold transition-all cursor-pointer"
                        title="Hapus Skill"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== VIEW 4: STRIVE PORTFOLIO CMS ==================== */}
          {activeView === 'cms-portfolio' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <form
                onSubmit={handleAddPortfolio}
                className={`lg:col-span-5 rounded-2xl border p-6 space-y-3.5 h-fit ${bgCard} ${
                  editingPortfolioId ? 'ring-2 ring-[#eab308]' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#ea7c00] text-xs font-bold uppercase tracking-wider">
                    <BookOpen className="w-4 h-4" />
                    <span>
                      {editingPortfolioId
                        ? '✏️ Mode Edit Portofolio'
                        : 'Database Tabel: portfolio_projects'}
                    </span>
                  </div>
                  {editingPortfolioId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingPortfolioId(null);
                        setPortForm({
                          title: '',
                          subtitle: 'Full-Stack Web Development (Frontend & Backend)',
                          category: 'Company Profile',
                          tags: 'Next.js, MySQL, REST API',
                          image:
                            'https://bootstrapmade.com/content/demo/Strive/assets/img/portfolio/portfolio-1.webp',
                          link: '/#portfolio',
                          description: ''
                        });
                      }}
                      className="text-xs font-bold text-amber-400 hover:underline cursor-pointer"
                    >
                      Batal Edit ✕
                    </button>
                  )}
                </div>
                <h3 className={`text-lg font-bold ${textHeading}`}>
                  {editingPortfolioId
                    ? 'Edit Proyek Portofolio Website'
                    : 'Tambah Proyek Portofolio Website'}
                </h3>
                <input
                  type="text"
                  required
                  placeholder="Judul Proyek (Misal: Website Company Profile Korporat)"
                  value={portForm.title}
                  onChange={(e) => setPortForm({ ...portForm, title: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border ${borderCol} bg-[#1a1636] text-white text-sm`}
                />
                <input
                  type="text"
                  required
                  placeholder="Subjudul (Misal: Full-Stack Next.js + CMS Admin)"
                  value={portForm.subtitle}
                  onChange={(e) => setPortForm({ ...portForm, subtitle: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border ${borderCol} bg-[#1a1636] text-white text-sm`}
                />

                {/* KATEGORI PROYEK PORTOFOLIO (CUSTOM MODERN DROPDOWN + BIKIN KATEGORI SENDIRI) */}
                <div className="p-3.5 rounded-2xl border border-[#362e68] bg-[#161230] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-extrabold text-slate-200 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-amber-400" />
                      <span>Kategori Proyek Portofolio</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setShowCustomCatCreator(!showCustomCatCreator);
                        setPortCatDropdownOpen(false);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-[11px] font-extrabold transition-all cursor-pointer"
                    >
                      <PlusCircle className="w-3 h-3" />
                      <span>
                        {showCustomCatCreator ? 'Tutup Form Kategori' : '+ Buat Kategori Sendiri'}
                      </span>
                    </button>
                  </div>

                  {/* Tombol Trigger Custom Dropdown (Pengganti <select> gelap yang tidak terbaca) */}
                  <button
                    type="button"
                    onClick={() => setPortCatDropdownOpen(!portCatDropdownOpen)}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#463b84] hover:border-[#8b5cf6] bg-[#1e193f] text-white text-sm flex items-center justify-between transition-all cursor-pointer shadow-md"
                  >
                    <span className="flex items-center gap-2.5 truncate">
                      <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-amber-400 to-[#ea7c00] shrink-0" />
                      <span className="font-bold text-white truncate">
                        {portForm.category || 'Company Profile'}
                      </span>
                    </span>
                    <span className="flex items-center gap-2 shrink-0">
                      <span className="px-2 py-0.5 rounded-md bg-[#8b5cf6]/25 border border-[#8b5cf6]/40 text-[#ddd6fe] text-[10px] font-bold">
                        {portCatDropdownOpen ? 'Tutup Pilihan' : 'Pilih Kategori'}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-amber-400 transition-transform duration-200 ${
                          portCatDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </span>
                  </button>

                  {/* Box Buat Kategori Sendiri secara langsung */}
                  {showCustomCatCreator && (
                    <div className="p-3 rounded-xl border border-amber-400/40 bg-[#110e26] space-y-2 animate-view-enter">
                      <label className="block text-[11px] font-bold text-amber-300">
                        ✨ Ketik Nama Kategori Portofolio Anda Sendiri:
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Contoh: Sistem Akademik / Web Rumah Sakit / Aplikasi Kasir..."
                          value={newPortCategoryName}
                          onChange={(e) => setNewPortCategoryName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddCustomPortfolioCategory(false);
                            }
                          }}
                          className="flex-1 px-3 py-2 rounded-xl border border-[#463b84] bg-[#1a1538] text-white text-xs placeholder-slate-400 focus:outline-none focus:border-amber-400"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddCustomPortfolioCategory(false)}
                          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#ea7c00] to-amber-500 hover:from-[#d46f00] hover:to-[#ea7c00] text-white text-xs font-extrabold shadow-md cursor-pointer shrink-0"
                        >
                          + Tambah &amp; Pakai
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Daftar Pilihan Custom Dropdown (Terang, Jelas, Kontras Tinggi, Bisa Buat & Hapus Kategori) */}
                  {portCatDropdownOpen && (
                    <div className="rounded-2xl border-2 border-[#6d5ce7] bg-[#110e26] p-2.5 shadow-2xl space-y-2 animate-view-enter">
                      <div className="flex items-center justify-between px-2 py-1 border-b border-[#2a2352]">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#c4b5fd]">
                          Pilih Kategori ({allPortfolioCategories.length} Kategori Tersedia)
                        </span>
                        <button
                          type="button"
                          onClick={() => setPortCatDropdownOpen(false)}
                          className="text-xs font-bold text-slate-400 hover:text-white cursor-pointer px-1.5"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Daftar Item Kategori */}
                      <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
                        {allPortfolioCategories.map((cat) => {
                          const isSelected = portForm.category === cat;
                          const countInCat = (db.portfolio || []).filter(
                            (p) => p.category === cat
                          ).length;
                          const isCustom = !DEFAULT_PORTFOLIO_CATEGORIES.includes(cat);

                          return (
                            <div
                              key={cat}
                              onClick={() => {
                                setPortForm({ ...portForm, category: cat });
                                setPortCatDropdownOpen(false);
                              }}
                              className={`px-3 py-2.5 rounded-xl flex items-center justify-between gap-2 text-xs cursor-pointer transition-all ${
                                isSelected
                                  ? 'bg-gradient-to-r from-[#8b5cf6] to-[#2563eb] text-white font-extrabold shadow-lg border border-white/25'
                                  : 'bg-[#1c173d] hover:bg-[#2a225a] text-white font-semibold border border-[#322a60]'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 truncate">
                                <span
                                  className={`w-2 h-2 rounded-full shrink-0 ${
                                    isSelected ? 'bg-amber-300' : 'bg-[#8b5cf6]'
                                  }`}
                                />
                                <span className="truncate text-white">{cat}</span>
                                {isCustom && (
                                  <span className="px-1.5 py-0.5 rounded bg-amber-500/25 text-amber-300 text-[9px] font-extrabold">
                                    Custom
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    isSelected
                                      ? 'bg-black/25 text-white'
                                      : 'bg-[#110e26] text-[#a78bfa]'
                                  }`}
                                >
                                  {countInCat} Proyek
                                </span>
                                {isSelected && <Check className="w-4 h-4 text-amber-300" />}
                                {isCustom && (
                                  <button
                                    type="button"
                                    onClick={(e) => handleDeleteCustomPortfolioCategory(cat, e)}
                                    className="p-1 rounded-lg bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white transition-colors"
                                    title="Hapus kategori custom ini"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Quick Input Buat Kategori Baru langsung di dalam Dropdown */}
                      <div className="pt-2 border-t border-[#2d2654] space-y-1.5">
                        <span className="block text-[10px] font-bold text-amber-300 px-1">
                          + Ingin kategori lain? Ketik kategori baru sendiri:
                        </span>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            placeholder="Ketik kategori baru (Misal: Web Sekolah)..."
                            value={newPortCategoryName}
                            onChange={(e) => setNewPortCategoryName(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddCustomPortfolioCategory(false);
                              }
                            }}
                            className="flex-1 px-3 py-2 rounded-xl border border-[#463b84] bg-[#1a1538] text-white text-xs placeholder-slate-400 focus:outline-none focus:border-amber-400"
                          />
                          <button
                            type="button"
                            onClick={() => handleAddCustomPortfolioCategory(false)}
                            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#ea7c00] to-amber-500 hover:from-[#d46f00] hover:to-[#ea7c00] text-white text-xs font-extrabold cursor-pointer shrink-0"
                          >
                            + Buat
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <label className={`block text-[11px] font-bold mb-1 ${textMuted}`}>
                    Link URL Website / Demo Proyek (Buka di Tab Baru `_blank`)
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: https://demo-web.vercel.app atau /#pricing"
                    value={portForm.link}
                    onChange={(e) => setPortForm({ ...portForm, link: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${borderCol} bg-[#1a1636] text-white text-sm font-mono`}
                  />
                </div>
                {/* UPLOAD GAMBAR PORTOFOLIO (PILIH FILE GAMBAR / PREVIEW / _BLANK) */}
                <div className="p-3.5 rounded-2xl border border-[#322b5e] bg-[#161230] space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-extrabold text-amber-400 flex items-center gap-1.5">
                      <ImagePlus className="w-4 h-4" />
                      <span>Upload Gambar Proyek Portofolio</span>
                    </label>
                    {uploadingImage && (
                      <span className="text-[11px] font-bold text-emerald-400 animate-pulse">
                        Mengupload gambar...
                      </span>
                    )}
                  </div>

                  {/* Preview Gambar + Tombol Pilih File & Lihat _blank */}
                  <div className="flex items-center gap-3.5">
                    <a
                      href={portForm.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => openImageNewTab(portForm.image, e)}
                      className="relative group w-20 h-20 rounded-xl overflow-hidden border-2 border-[#3b82f6]/50 shrink-0 block bg-[#0d0b1c]"
                      title="Klik untuk lihat gambar penuh di tab baru (_blank)"
                    >
                      <img
                        src={portForm.image}
                        alt="Preview Gambar Portofolio"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 text-white" />
                      </div>
                    </a>

                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#ea7c00] to-amber-500 hover:from-[#d46f00] hover:to-[#ea7c00] text-white text-xs font-extrabold shadow-md cursor-pointer transition-all">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Pilih / Upload Gambar</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              handleUploadImageFile(file, (uploadedUrl) => {
                                setPortForm((prev) => ({ ...prev, image: uploadedUrl }));
                              });
                              e.target.value = '';
                            }}
                          />
                        </label>

                        {portForm.image && (
                          <a
                            href={portForm.image}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => openImageNewTab(portForm.image, e)}
                            className="px-3 py-2 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold inline-flex items-center gap-1 shrink-0"
                            title="Buka Gambar di Tab Baru (_blank)"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Lihat Gambar (_blank)</span>
                          </a>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Format: JPG, PNG, WEBP. Klik tombol di atas untuk upload file gambar dari
                        komputer/HP Anda.
                      </p>
                    </div>
                  </div>

                  {/* Input URL Gambar (Otomatis terisi saat upload atau ketik manual) */}
                  <div>
                    <label className={`block text-[10px] font-bold mb-1 ${textMuted}`}>
                      Path / Link URL Gambar (Otomatis terisi saat Upload File):
                    </label>
                    <input
                      type="text"
                      placeholder="/uploads/nama-gambar.png atau https://..."
                      value={portForm.image}
                      onChange={(e) => setPortForm({ ...portForm, image: e.target.value })}
                      className={`w-full px-3 py-2 rounded-xl border ${borderCol} bg-[#1a1636] text-white text-xs font-mono`}
                    />
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Tags (Misal: Next.js, MySQL, REST API)"
                  value={portForm.tags}
                  onChange={(e) => setPortForm({ ...portForm, tags: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border ${borderCol} bg-[#1a1636] text-white text-sm`}
                />
                <textarea
                  rows={3}
                  placeholder="Deskripsi Proyek Website..."
                  value={portForm.description}
                  onChange={(e) => setPortForm({ ...portForm, description: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border ${borderCol} bg-[#1a1636] text-white text-sm`}
                />
                <button
                  type="submit"
                  disabled={isSavingAction}
                  className={`w-full py-3 rounded-xl font-bold text-sm cursor-pointer flex items-center justify-center gap-2 transition-all ${
                    editingPortfolioId
                      ? 'bg-[#eab308] hover:bg-[#ca8a04] text-slate-950'
                      : 'bg-[#315cf6] hover:bg-[#254bdb] text-white'
                  }`}
                >
                  {isSavingAction ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin shrink-0" />
                      <span>Menyimpan ke company_db...</span>
                    </>
                  ) : editingPortfolioId ? (
                    '💾 Simpan Perubahan Portofolio'
                  ) : (
                    'Publish Proyek ke Website'
                  )}
                </button>
              </form>

              <div className="lg:col-span-7 space-y-3">
                {db.portfolio.map((item) => {
                  const targetUrl = item.link || item.image || '/#portfolio';
                  return (
                    <div
                      key={item.id}
                      className={`p-4 rounded-2xl border ${bgCard} flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-[#3b82f6]/50 ${
                        editingPortfolioId === item.id ? 'border-[#eab308] ring-1 ring-[#eab308]' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        {/* Gambar Portofolio dengan Link & target="_blank" */}
                        <a
                          href={item.image}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => openImageNewTab(item.image, e)}
                          className="relative group shrink-0 block rounded-xl overflow-hidden border border-white/15 w-16 h-16 bg-[#0d0b1c]"
                          title="Klik untuk membuka gambar penuh di tab baru (_blank)"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 rounded-xl object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <ExternalLink className="w-4 h-4 text-white" />
                          </div>
                        </a>

                        <div className="space-y-1">
                          {/* Judul Portofolio dengan Link & target="_blank" */}
                          <a
                            href={targetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1.5 text-sm font-bold hover:text-[#60a5fa] transition-colors ${textHeading}`}
                            title="Buka Link Proyek di Tab Baru (_blank)"
                          >
                            <span>{item.title}</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#60a5fa] shrink-0" />
                          </a>
                          <p className={`text-xs ${textMuted}`}>
                            {item.category} • {item.subtitle}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 pt-0.5">
                            <a
                              href={targetUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#2563eb]/20 text-[#60a5fa] hover:bg-[#2563eb] hover:text-white text-[11px] font-mono font-semibold transition-colors"
                            >
                              <span>🔗 {targetUrl}</span>
                              <span>(_blank)</span>
                            </a>
                            <a
                              href={item.image}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => openImageNewTab(item.image, e)}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#8b5cf6]/20 text-[#c4b5fd] hover:bg-[#8b5cf6] hover:text-white text-[11px] font-semibold transition-colors"
                            >
                              <span>🖼️ Lihat Gambar (_blank)</span>
                            </a>
                            <label
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 hover:bg-emerald-600 hover:text-white text-[11px] font-bold transition-colors cursor-pointer"
                              title="Upload / Ganti Gambar Langsung dari Perangkat"
                            >
                              <Upload className="w-3 h-3" />
                              <span>Upload Gambar</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  handleQuickUploadPortfolioImage(item.id, file);
                                  e.target.value = '';
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <a
                          href={targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold transition-all"
                          title="Buka Link Proyek di Tab Baru (_blank)"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Link</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingPortfolioId(item.id);
                            setPortForm({
                              title: item.title,
                              subtitle: item.subtitle,
                              category: item.category,
                              tags: Array.isArray(item.tags) ? item.tags.join(', ') : '',
                              image: item.image,
                              link: item.link || '/#portfolio',
                              description: item.description || ''
                            });
                            setPortfolioModalOpen(true);
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 text-xs font-bold transition-all cursor-pointer"
                          title="Edit Portofolio"
                        >
                          <span>✏️</span>
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePortfolio(item.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#ef4444]/20 hover:bg-[#ef4444] text-[#f87171] hover:text-white text-xs font-bold transition-all cursor-pointer"
                          title="Hapus Portofolio"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ==================== VIEW 5: MANAJEMEN JASA PEMBUATAN WEBSITE (FRONTEND & BACKEND) ==================== */}
          {activeView === 'cms-services' && (
            <div className="space-y-6">
              {/* Top Hero Banner for Jasa Pembuatan Website & Backend */}
              <div
                className="relative overflow-hidden rounded-2xl border border-[#2a2456] bg-gradient-to-r from-[#0c0a20] via-[#13102e] to-[#1a143e] p-6 sm:p-8 shadow-2xl text-white"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 85% 30%, rgba(234, 124, 0, 0.2), transparent 45%), linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)',
                  backgroundSize: '100% 100%, 28px 28px, 28px 28px'
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ea7c00]/20 border border-[#ea7c00]/40 text-amber-300 text-xs font-bold mb-2">
                      <Globe className="w-3.5 h-3.5" />
                      <span>Full-Stack Web Development • Frontend &amp; Backend</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      Manajemen Jasa Pembuatan Website &amp; Sistem Backend
                    </h2>
                    <p className="text-xs sm:text-sm text-[#a599e9] mt-1">
                      Kelola daftar layanan Jasa Pembuatan Website (Company Profile, Toko Online /
                      E-Commerce, Landing Page, hingga pembuatan khusus Backend API &amp; Database
                      MySQL) yang tampil di halaman depan. Klik tombol <strong>✏️ Edit</strong> pada
                      kartu layanan untuk mengubah isi layanan.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingOrderId(null);
                        setNewOrderModal(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#ea7c00] to-amber-500 text-white text-xs font-bold shadow-lg shadow-orange-600/30 transition-all cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>+ Buat Order Jasa Web</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateView('command-center')}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#252142] hover:bg-[#322c56] text-white text-xs font-bold border border-[#383163] transition-all cursor-pointer"
                    >
                      <span>⬅</span>
                      <span>Dashboard</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <form
                  onSubmit={handleAddService}
                  className={`lg:col-span-5 rounded-2xl border p-6 space-y-4 h-fit ${bgCard} ${
                    editingServiceId ? 'ring-2 ring-[#eab308] border-[#eab308]' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#ea7c00] text-xs font-bold uppercase tracking-wider">
                      <Code2 className="w-4 h-4" />
                      <span>
                        {editingServiceId
                          ? `✏️ Mode Edit Layanan (#${srvForm.number || '01'})`
                          : 'Tambah Layanan Jasa Website Baru'}
                      </span>
                    </div>
                    {editingServiceId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingServiceId(null);
                          setSrvForm({ number: '', title: '', description: '' });
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#ef4444]/20 text-[#f87171] hover:bg-[#ef4444] hover:text-white text-xs font-bold transition-all cursor-pointer"
                      >
                        Batal Edit ✕
                      </button>
                    )}
                  </div>
                  <h3 className={`text-lg font-bold ${textHeading}`}>
                    {editingServiceId
                      ? 'Edit Layanan Jasa Pembuatan Website'
                      : 'Form Jasa Pembuatan Website (Frontend / Backend)'}
                  </h3>
                  <div>
                    <label className={`block text-xs font-bold mb-1.5 ${textMuted}`}>
                      Nama Layanan Jasa Website
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Jasa Pembuatan Website E-Commerce + Backend Admin"
                      value={srvForm.title}
                      onChange={(e) => setSrvForm({ ...srvForm, title: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border ${borderCol} bg-[#1a1636] text-white text-sm focus:outline-none focus:border-[#ea7c00]`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-bold mb-1.5 ${textMuted}`}>
                      Deskripsi Cakupan Kerja (Frontend, Backend &amp; Database)
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Jelaskan fitur Frontend UI/UX, sistem Backend Dashboard, API, dan Database yang didapat klien..."
                      value={srvForm.description}
                      onChange={(e) => setSrvForm({ ...srvForm, description: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border ${borderCol} bg-[#1a1636] text-white text-sm focus:outline-none focus:border-[#ea7c00]`}
                    />
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="submit"
                      className={`flex-1 py-3 rounded-xl font-bold text-sm shadow-lg transition-all cursor-pointer ${
                        editingServiceId
                          ? 'bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 shadow-yellow-500/20'
                          : 'bg-gradient-to-r from-[#ea7c00] to-amber-500 hover:from-[#d46f00] hover:to-[#ea7c00] text-white shadow-orange-600/25'
                      }`}
                    >
                      {editingServiceId
                        ? '💾 Simpan Perubahan Layanan'
                        : 'Simpan & Tampilkan di Website Utama'}
                    </button>
                  </div>
                </form>

                <div className="lg:col-span-7 space-y-3">
                  {db.services.map((s) => (
                    <div
                      key={s.id}
                      className={`p-5 rounded-2xl border ${bgCard} flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:border-[#ea7c00]/50 transition-all ${
                        editingServiceId === s.id
                          ? 'border-[#eab308] ring-2 ring-[#eab308]/60 bg-[#1a1638]'
                          : ''
                      }`}
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-lg text-xs font-extrabold bg-[#ea7c00]/20 text-amber-400">
                            Layanan #{s.number}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-[#8b5cf6]/20 text-[#c4b5fd]">
                            Frontend + Backend Ready
                          </span>
                          {editingServiceId === s.id && (
                            <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-extrabold bg-[#eab308] text-slate-950">
                              ✏️ Sedang Diedit
                            </span>
                          )}
                        </div>
                        <h4 className={`font-extrabold text-base ${textHeading}`}>{s.title}</h4>
                        <p className={`text-xs sm:text-sm leading-relaxed ${textMuted}`}>
                          {s.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingServiceId(s.id);
                            setSrvForm({
                              number: s.number,
                              title: s.title,
                              description: s.description
                            });
                            setServiceModalOpen(true);
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 text-xs font-bold shadow-md transition-all cursor-pointer"
                          title="Edit Layanan Jasa Website"
                        >
                          <span>✏️</span>
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteService(s.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#ef4444]/20 hover:bg-[#ef4444] text-[#f87171] hover:text-white text-xs font-bold transition-colors shrink-0 cursor-pointer"
                          title="Hapus Layanan"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Hapus</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== VIEW 6: STRIVE TEAM MEMBERS ==================== */}
          {activeView === 'cms-team' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <form
                onSubmit={handleAddTeam}
                className={`lg:col-span-4 rounded-2xl border p-6 space-y-4 h-fit ${bgCard} ${
                  editingTeamId ? 'ring-2 ring-[#eab308]' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#315cf6]">
                    {editingTeamId ? '✏️ Mode Edit Tim Spesialisasi' : 'Tambah Spesialisasi Tim'}
                  </span>
                  {editingTeamId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTeamId(null);
                        setTeamForm({
                          name: '',
                          position: '',
                          bio: '',
                          image:
                            'https://bootstrapmade.com/content/demo/Strive/assets/img/person/person-m-8.webp',
                          is_public: true
                        });
                      }}
                      className="text-xs font-bold text-amber-400 hover:underline cursor-pointer"
                    >
                      Batal Edit ✕
                    </button>
                  )}
                </div>
                <h3 className={`text-lg font-bold ${textHeading}`}>
                  {editingTeamId ? 'Edit Profil Spesialisasi' : 'Tambah Peran / Spesialisasi'}
                </h3>
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap / Role"
                  value={teamForm.name}
                  onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border ${borderCol} bg-[#1a1636] text-white text-sm`}
                />
                <input
                  type="text"
                  required
                  placeholder="Posisi / Spesialisasi (Misal: Full-Stack Web Developer)"
                  value={teamForm.position}
                  onChange={(e) => setTeamForm({ ...teamForm, position: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border ${borderCol} bg-[#1a1636] text-white text-sm`}
                />
                <textarea
                  rows={3}
                  required
                  placeholder="Deskripsi Keahlian..."
                  value={teamForm.bio}
                  onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border ${borderCol} bg-[#1a1636] text-white text-sm`}
                />
                <div className="rounded-xl border border-[#322b5e] bg-[#15122e] p-3 space-y-2.5">
                  <span className="block text-[11px] font-bold text-slate-300">
                    🖼️ Upload Foto / Gambar Spesialisasi
                  </span>
                  <div className="flex items-center gap-3">
                    {teamForm.image && (
                      <a
                        href={teamForm.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          if (teamForm.image.startsWith('data:image/')) {
                            e.preventDefault();
                            openImageNewTab(teamForm.image, teamForm.name || 'Foto Tim');
                          }
                        }}
                        className="w-14 h-14 rounded-xl overflow-hidden border border-[#322b5e] shrink-0 block"
                        title="Klik untuk buka foto di tab baru (_blank)"
                      >
                        <img
                          src={teamForm.image}
                          alt="Preview Tim"
                          className="w-full h-full object-cover object-top"
                        />
                      </a>
                    )}
                    <div className="flex-1 space-y-1.5">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] hover:from-[#7c3aed] hover:to-[#4f46e5] text-white text-xs font-bold cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{uploadingImage ? 'Mengupload...' : 'Pilih / Upload Gambar'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            handleUploadImageFile(file, (url) =>
                              setTeamForm((prev) => ({ ...prev, image: url }))
                            );
                            e.target.value = '';
                          }}
                        />
                      </label>
                      <input
                        type="text"
                        placeholder="URL Gambar /uploads/..."
                        value={teamForm.image}
                        onChange={(e) => setTeamForm({ ...teamForm, image: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#322b5e] bg-[#1a1636] text-white text-[11px] font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Status Publikasi Website Switch */}
                <div className="flex items-center justify-between p-3 rounded-xl border border-[#322b5e] bg-[#15122e]">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-200">Status Publikasi</span>
                    <span
                      className={`text-[11px] font-semibold flex items-center gap-1 ${
                        teamForm.is_public ? 'text-emerald-400' : 'text-slate-400'
                      }`}
                    >
                      {teamForm.is_public ? (
                        <>
                          <Eye className="w-3 h-3 text-emerald-400" /> Tampil di Website (Public)
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3 text-slate-400" /> Disembunyikan (No Public)
                        </>
                      )}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTeamForm({ ...teamForm, is_public: !teamForm.is_public })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                      teamForm.is_public ? 'bg-emerald-500' : 'bg-slate-700'
                    }`}
                    title={teamForm.is_public ? 'Ubah ke No Public' : 'Ubah ke Public'}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        teamForm.is_public ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 rounded-xl font-bold text-sm cursor-pointer ${
                    editingTeamId
                      ? 'bg-[#eab308] hover:bg-[#ca8a04] text-slate-950'
                      : 'bg-[#315cf6] hover:bg-[#254bdb] text-white'
                  }`}
                >
                  {editingTeamId ? '💾 Simpan Perubahan Tim' : 'Tambah Spesialisasi'}
                </button>
              </form>

              <div className="lg:col-span-8 space-y-4">
                {/* Header Bar: Status Summary & Bulk Action Buttons */}
                <div
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-md ${bgCard}`}
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-sm font-bold ${textHeading}`}>
                      👥 Tim Spesialisasi ({db.team.length})
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold border border-emerald-500/30 inline-flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {db.team.filter((m) => m.is_public !== false).length} Public
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-500/20 text-slate-300 text-xs font-bold border border-slate-600/40 inline-flex items-center gap-1">
                      <EyeOff className="w-3 h-3" />
                      {db.team.filter((m) => m.is_public === false).length} No Public
                    </span>
                  </div>

                  {/* Bulk Action Buttons: Public Semua vs No Public Semuanya */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => handleSetAllTeamPublic(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/40 border border-emerald-400/30 transition-all cursor-pointer active:scale-95"
                      title="Ubah semua spesialisasi tim menjadi Public (Tampil di Website)"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>📢 Public Semua</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetAllTeamPublic(false)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-slate-200 text-xs font-bold shadow-lg shadow-black/40 border border-slate-600/60 transition-all cursor-pointer active:scale-95"
                      title="Ubah semua spesialisasi tim menjadi No Public (Sembunyikan dari Website)"
                    >
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>🔒 No Public Semuanya</span>
                    </button>
                  </div>
                </div>

                {/* Team Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {db.team.map((m) => {
                    const isPub = m.is_public !== false;
                    return (
                      <div
                        key={m.id}
                        className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 ${bgCard} ${
                          editingTeamId === m.id ? 'border-[#eab308] ring-2 ring-[#eab308]' : ''
                        } ${!isPub ? 'border-dashed border-slate-700/80 opacity-90' : ''}`}
                      >
                        <div>
                          <a
                            href={m.image}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              if (m.image?.startsWith('data:image/')) {
                                e.preventDefault();
                                openImageNewTab(m.image, m.name);
                              }
                            }}
                            className="block relative group overflow-hidden"
                            title="Klik gambar untuk buka di tab baru (_blank)"
                          >
                            <img
                              src={m.image}
                              alt={m.name}
                              className={`w-full h-44 object-cover object-top group-hover:scale-105 transition-transform duration-300 ${
                                !isPub ? 'filter grayscale-[35%] opacity-85' : ''
                              }`}
                            />
                            {/* Status Badge on Image */}
                            <div className="absolute top-2.5 left-2.5">
                              {isPub ? (
                                <span className="px-2.5 py-1 rounded-lg bg-emerald-600/95 text-white text-[10px] font-extrabold backdrop-blur-md shadow-md inline-flex items-center gap-1.5 border border-emerald-400/40">
                                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                  <span>Public</span>
                                </span>
                              ) : (
                                <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-slate-300 text-[10px] font-extrabold backdrop-blur-md shadow-md inline-flex items-center gap-1.5 border border-slate-700">
                                  <EyeOff className="w-3 h-3 text-slate-400" />
                                  <span>No Public</span>
                                </span>
                              )}
                            </div>

                            <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/70 text-white text-[10px] font-bold inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <ExternalLink className="w-3 h-3" />
                              <span>Lihat Gambar (_blank)</span>
                            </span>
                          </a>
                          <div className="p-4">
                            <div className="flex items-center justify-between gap-2">
                              <strong className={`block text-sm font-bold ${textHeading}`}>
                                {m.name}
                              </strong>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  isPub
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                    : 'bg-slate-700/50 text-slate-400 border border-slate-600'
                                }`}
                              >
                                {isPub ? 'Aktif di Web' : 'Disembunyikan'}
                              </span>
                            </div>
                            <span className="text-xs text-[#315cf6] font-semibold">
                              {m.position}
                            </span>
                            <p className={`text-xs mt-2 ${textMuted}`}>{m.bio}</p>
                          </div>
                        </div>

                        {/* Card Action Footer with Status Toggle Button */}
                        <div className="px-4 pb-4 flex items-center justify-between gap-2 border-t border-[#26204a]/60 pt-3">
                          {/* Toggle Status Button (Public / No Public) */}
                          <button
                            type="button"
                            onClick={() => handleToggleTeamPublic(m.id)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              isPub
                                ? 'bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white border border-emerald-500/40 shadow-sm'
                                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-600 shadow-sm'
                            }`}
                            title={isPub ? 'Klik untuk ubah ke No Public' : 'Klik untuk ubah ke Public'}
                          >
                            {isPub ? (
                              <>
                                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Public</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                                <span>No Public</span>
                              </>
                            )}
                          </button>

                          {/* Edit & Delete Buttons */}
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingTeamId(m.id);
                                setTeamForm({
                                  name: m.name,
                                  position: m.position,
                                  bio: m.bio,
                                  image: m.image,
                                  is_public: m.is_public !== false
                                });
                                setTeamModalOpen(true);
                              }}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 text-xs font-bold transition-all cursor-pointer"
                            >
                              <span>✏️</span>
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteTeam(m.id)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#ef4444]/20 hover:bg-[#ef4444] text-[#f87171] hover:text-white text-xs font-bold transition-all cursor-pointer"
                              title="Hapus"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Hapus</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ==================== VIEW 7: COMPANY SETTINGS (GAMBAR 2: BIODATA + UPLOAD & TAMPILKAN FOTO) ==================== */}
          {activeView === 'cms-settings' && (
            <div className="space-y-6">
              {/* Top Hero Banner for Biodata & Profil Pribadi */}
              <div
                className="relative overflow-hidden rounded-2xl border border-[#2a2456] bg-gradient-to-r from-[#0c0a20] via-[#13102e] to-[#1a143e] p-6 sm:p-8 shadow-2xl text-white"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 85% 30%, rgba(139, 92, 246, 0.18), transparent 45%), linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)',
                  backgroundSize: '100% 100%, 28px 28px, 28px 28px'
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      Edit Biodata Company Profile Pribadi (Teknik Informatika)
                    </h2>
                    <div className="flex items-center gap-2.5 mt-2">
                      <span className="w-1 h-4 rounded-full bg-[#a855f7] inline-block" />
                      <span className="text-xs sm:text-sm font-medium text-[#a599e9]">
                        Admin Suite / Personal Identity, Upload Foto Profil &amp; Hero Section CMS (`company_db`)
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => navigateView('command-center')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#252142] hover:bg-[#322c56] text-white text-xs font-bold border border-[#383163] transition-all cursor-pointer"
                    >
                      <span>⬅</span>
                      <span>Kembali ke Dashboard</span>
                    </button>
                    <button
                      type="button"
                      onClick={triggerAutoLogout}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#ef4444] hover:bg-[#dc2626] text-white text-xs font-bold shadow-lg shadow-red-600/30 transition-all cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Keluar / Logout</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left 7 Cols: Form Biodata + Upload Foto Profil & Foto About */}
                <form
                  onSubmit={handleSaveSettings}
                  className={`lg:col-span-7 rounded-2xl border p-6 sm:p-8 space-y-5 shadow-2xl ${
                    darkMode
                      ? 'bg-[#110f24] border-[#262246] text-white'
                      : bgCard
                  }`}
                >
                  {/* PANEL UPLOAD & TAMPILKAN FOTO BIODATA (GAMBAR 2) */}
                  <div className="p-4 sm:p-5 rounded-2xl border border-[#342c63] bg-[#171332] space-y-4">
                    <div className="flex items-center justify-between border-b border-[#2b2452] pb-3">
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#a78bfa]">
                          📸 Foto Identitas &amp; Gambar Utama Website
                        </span>
                        <h4 className="text-sm font-bold text-white mt-0.5">
                          Upload &amp; Tampilkan Foto Profil Developer + Gambar Profil IT
                        </h4>
                      </div>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                        Live Preview Aktif
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Card 1: Foto Profil / Avatar Developer */}
                      <div className="p-3.5 rounded-xl border border-[#2f2859] bg-[#120f26] space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-200">
                            1. Foto Profil / Avatar Developer
                          </span>
                          <a
                            href={companyForm.avatarImage || `${DASH_IMG}/profile-img.webp`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              const imgUrl = companyForm.avatarImage || `${DASH_IMG}/profile-img.webp`;
                              if (imgUrl.startsWith('data:image/')) {
                                e.preventDefault();
                                openImageNewTab(imgUrl, companyForm.fullName);
                              }
                            }}
                            className="text-[10px] text-[#a78bfa] hover:underline inline-flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Buka (_blank)</span>
                          </a>
                        </div>

                        <div className="relative group rounded-xl overflow-hidden border border-[#38306b] bg-[#0c0a1a] h-44 flex items-center justify-center">
                          <img
                            src={companyForm.avatarImage || `${DASH_IMG}/profile-img.webp`}
                            alt={companyForm.fullName}
                            className="w-full h-full object-cover object-top"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <label className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white text-xs font-bold shadow-lg cursor-pointer">
                              📁 Ganti Foto Profil
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  handleUploadCompanyPhoto('avatarImage', file);
                                  e.target.value = '';
                                }}
                              />
                            </label>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] hover:from-[#7c3aed] hover:to-[#5b21b6] text-white text-xs font-bold shadow-md cursor-pointer transition-all">
                            <span>📤 Upload Foto Profil (Pilih File)</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                handleUploadCompanyPhoto('avatarImage', file);
                                e.target.value = '';
                              }}
                            />
                          </label>
                          <input
                            type="text"
                            placeholder="Atau URL Foto /uploads/..."
                            value={companyForm.avatarImage || ''}
                            onChange={(e) =>
                              setCompanyForm({ ...companyForm, avatarImage: e.target.value })
                            }
                            className="w-full px-2.5 py-1.5 rounded-lg border border-[#322b5e] bg-[#1a1636] text-white text-[11px] font-mono"
                          />
                        </div>
                      </div>

                      {/* Card 2: Foto Profil IT & Rekayasa (About Image) */}
                      <div className="p-3.5 rounded-xl border border-[#2f2859] bg-[#120f26] space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-200">
                            2. Foto Utama Profil IT (About)
                          </span>
                          <a
                            href={companyForm.aboutImage || '/flexstart/assets/img/about.jpg'}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              const imgUrl = companyForm.aboutImage || '/flexstart/assets/img/about.jpg';
                              if (imgUrl.startsWith('data:image/')) {
                                e.preventDefault();
                                openImageNewTab(imgUrl, 'Foto Profil IT');
                              }
                            }}
                            className="text-[10px] text-[#a78bfa] hover:underline inline-flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Buka (_blank)</span>
                          </a>
                        </div>

                        <div className="relative group rounded-xl overflow-hidden border border-[#38306b] bg-[#0c0a1a] h-44 flex items-center justify-center">
                          <img
                            src={companyForm.aboutImage || '/flexstart/assets/img/about.jpg'}
                            alt="Foto Profil IT"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <label className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white text-xs font-bold shadow-lg cursor-pointer">
                              📁 Ganti Gambar Profil IT
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  handleUploadCompanyPhoto('aboutImage', file);
                                  e.target.value = '';
                                }}
                              />
                            </label>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#1e40af] text-white text-xs font-bold shadow-md cursor-pointer transition-all">
                            <span>📤 Upload Gambar Profil IT (Pilih File)</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                handleUploadCompanyPhoto('aboutImage', file);
                                e.target.value = '';
                              }}
                            />
                          </label>
                          <input
                            type="text"
                            placeholder="Atau URL Gambar /uploads/..."
                            value={companyForm.aboutImage || ''}
                            onChange={(e) =>
                              setCompanyForm({ ...companyForm, aboutImage: e.target.value })
                            }
                            className="w-full px-2.5 py-1.5 rounded-lg border border-[#322b5e] bg-[#1a1636] text-white text-[11px] font-mono"
                          />
                        </div>
                      </div>

                      {/* Card 3: Logo Brand Website (Navbar & Footer) */}
                      <div className="p-3.5 rounded-xl border border-[#ea7c00]/30 bg-[#120f26] space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                            <Code2 className="w-3.5 h-3.5 text-[#ea7c00]" />
                            <span>3. Logo Brand Website (Navbar &amp; Footer)</span>
                          </span>
                          <a
                            href={companyForm.logoUrl || '/uploads/syauqidev-logo.jpg'}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              const imgUrl = companyForm.logoUrl || '/uploads/syauqidev-logo.jpg';
                              if (imgUrl.startsWith('data:image/')) {
                                e.preventDefault();
                                openImageNewTab(imgUrl, 'Logo Brand Website');
                              }
                            }}
                            className="text-[10px] text-amber-400 hover:underline inline-flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Buka (_blank)</span>
                          </a>
                        </div>

                        <div className="relative group rounded-xl overflow-hidden border border-[#ea7c00]/40 bg-[#0c0a1a] h-44 flex items-center justify-center p-2">
                          <img
                            src={companyForm.logoUrl || '/uploads/syauqidev-logo.jpg'}
                            alt="Logo Brand Website"
                            className="max-h-full max-w-full object-contain drop-shadow-[0_4px_12px_rgba(234,124,0,0.3)]"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <label className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#ea7c00] to-amber-600 text-white text-xs font-bold shadow-lg cursor-pointer">
                              📁 Ganti Logo Brand
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  handleUploadCompanyPhoto('logoUrl', file);
                                  e.target.value = '';
                                }}
                              />
                            </label>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#ea7c00] to-amber-600 hover:from-[#d46f00] hover:to-[#ea7c00] text-white text-xs font-bold shadow-md cursor-pointer transition-all">
                            <span>📤 Upload Logo Brand (Pilih File)</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                handleUploadCompanyPhoto('logoUrl', file);
                                e.target.value = '';
                              }}
                            />
                          </label>
                          <input
                            type="text"
                            placeholder="Atau URL Logo /uploads/..."
                            value={companyForm.logoUrl || ''}
                            onChange={(e) =>
                              setCompanyForm({ ...companyForm, logoUrl: e.target.value })
                            }
                            className="w-full px-2.5 py-1.5 rounded-lg border border-[#322b5e] bg-[#1a1636] text-white text-[11px] font-mono"
                          />
                        </div>
                      </div>

                      {/* Card 4: Favicon Browser Tab (Tab Icon Website) */}
                      <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-[#120f26] space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 text-emerald-400" />
                            <span>4. Favicon Browser Tab (Icon Web Tab)</span>
                          </span>
                          <a
                            href={companyForm.faviconUrl || '/uploads/syauqidev-logo.jpg'}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              const imgUrl = companyForm.faviconUrl || '/uploads/syauqidev-logo.jpg';
                              if (imgUrl.startsWith('data:image/')) {
                                e.preventDefault();
                                openImageNewTab(imgUrl, 'Favicon Tab');
                              }
                            }}
                            className="text-[10px] text-emerald-400 hover:underline inline-flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Buka (_blank)</span>
                          </a>
                        </div>

                        {/* Simulated Chrome Browser Tab Preview */}
                        <div className="relative group rounded-xl overflow-hidden border border-emerald-500/30 bg-[#090814] h-44 flex flex-col items-center justify-center p-3">
                          <div className="w-full max-w-[220px] rounded-t-xl bg-[#1f1d38] border border-b-0 border-white/10 px-3 py-1.5 flex items-center gap-2 shadow">
                            <img
                              src={companyForm.faviconUrl || '/uploads/syauqidev-logo.jpg'}
                              alt="Favicon Tab"
                              className="w-4 h-4 rounded-full object-cover shrink-0"
                            />
                            <span className="text-[11px] text-slate-200 truncate font-medium">
                              {companyForm.sitename || 'SyauqiDev'} — Personal...
                            </span>
                          </div>
                          <div className="w-full max-w-[220px] h-0.5 bg-[#ea7c00]" />
                          <div className="mt-3 flex items-center justify-center">
                            <img
                              src={companyForm.faviconUrl || '/uploads/syauqidev-logo.jpg'}
                              alt="Favicon Preview"
                              className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500/50 shadow-lg shadow-emerald-500/20"
                            />
                          </div>
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <label className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-lg cursor-pointer">
                              📁 Ganti Favicon
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  handleUploadCompanyPhoto('faviconUrl', file);
                                  e.target.value = '';
                                }}
                              />
                            </label>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md cursor-pointer transition-all">
                            <span>📤 Upload Favicon (Pilih File)</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                handleUploadCompanyPhoto('faviconUrl', file);
                                e.target.value = '';
                              }}
                            />
                          </label>
                          <input
                            type="text"
                            placeholder="Atau URL Favicon /uploads/..."
                            value={companyForm.faviconUrl || ''}
                            onChange={(e) =>
                              setCompanyForm({ ...companyForm, faviconUrl: e.target.value })
                            }
                            className="w-full px-2.5 py-1.5 rounded-lg border border-[#322b5e] bg-[#1a1636] text-white text-[11px] font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${textMuted}`}>
                        Nama Lengkap Developer
                      </label>
                      <input
                        type="text"
                        value={companyForm.fullName}
                        onChange={(e) =>
                          setCompanyForm({ ...companyForm, fullName: e.target.value })
                        }
                        className={`w-full px-4 py-2.5 rounded-xl border ${borderCol} ${
                          darkMode ? 'bg-[#1a1636] text-white' : 'bg-transparent'
                        } text-sm focus:outline-none focus:border-[#8b5cf6]`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${textMuted}`}>
                        Jurusan / Spesialisasi
                      </label>
                      <input
                        type="text"
                        value={companyForm.major}
                        onChange={(e) =>
                          setCompanyForm({ ...companyForm, major: e.target.value })
                        }
                        className={`w-full px-4 py-2.5 rounded-xl border ${borderCol} ${
                          darkMode ? 'bg-[#1a1636] text-white' : 'bg-transparent'
                        } text-sm focus:outline-none focus:border-[#8b5cf6]`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-xs font-bold mb-1.5 ${textMuted}`}>
                      Brand Sitename
                    </label>
                    <input
                      type="text"
                      value={companyForm.sitename}
                      onChange={(e) =>
                        setCompanyForm({ ...companyForm, sitename: e.target.value })
                      }
                      className={`w-full px-4 py-2.5 rounded-xl border ${borderCol} ${
                        darkMode ? 'bg-[#1a1636] text-white' : 'bg-transparent'
                      } text-sm focus:outline-none focus:border-[#8b5cf6]`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-bold mb-1.5 ${textMuted}`}>
                      Hero Main Headline
                    </label>
                    <input
                      type="text"
                      value={companyForm.heroTitle}
                      onChange={(e) =>
                        setCompanyForm({ ...companyForm, heroTitle: e.target.value })
                      }
                      className={`w-full px-4 py-2.5 rounded-xl border ${borderCol} ${
                        darkMode ? 'bg-[#1a1636] text-white' : 'bg-transparent'
                      } text-sm focus:outline-none focus:border-[#8b5cf6]`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-bold mb-1.5 ${textMuted}`}>
                      Hero Subtitle Description
                    </label>
                    <textarea
                      rows={4}
                      value={companyForm.heroDescription}
                      onChange={(e) =>
                        setCompanyForm({ ...companyForm, heroDescription: e.target.value })
                      }
                      className={`w-full px-4 py-3 rounded-xl border ${borderCol} ${
                        darkMode ? 'bg-[#1a1636] text-white' : 'bg-transparent'
                      } text-sm leading-relaxed focus:outline-none focus:border-[#8b5cf6]`}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${textMuted}`}>
                        Email
                      </label>
                      <input
                        type="text"
                        value={companyForm.email}
                        onChange={(e) =>
                          setCompanyForm({ ...companyForm, email: e.target.value })
                        }
                        className={`w-full px-4 py-2.5 rounded-xl border ${borderCol} ${
                          darkMode ? 'bg-[#1a1636] text-white' : 'bg-transparent'
                        } text-sm focus:outline-none focus:border-[#8b5cf6]`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${textMuted}`}>
                        Phone / WhatsApp
                      </label>
                      <input
                        type="text"
                        value={companyForm.phone}
                        onChange={(e) =>
                          setCompanyForm({ ...companyForm, phone: e.target.value })
                        }
                        className={`w-full px-4 py-2.5 rounded-xl border ${borderCol} ${
                          darkMode ? 'bg-[#1a1636] text-white' : 'bg-transparent'
                        } text-sm focus:outline-none focus:border-[#8b5cf6]`}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#26204a]">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#7c3aed] hover:from-[#1d4ed8] hover:to-[#6d28d9] text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
                    >
                      💾 Simpan Perubahan Biodata &amp; Foto ke Website
                    </button>

                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => navigateView('command-center')}
                        className="px-4 py-3 rounded-xl bg-[#252142] hover:bg-[#322c56] text-slate-200 text-xs sm:text-sm font-bold transition-all cursor-pointer"
                      >
                        Batal / Kembali
                      </button>
                      <button
                        type="button"
                        onClick={triggerAutoLogout}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#ef4444] hover:bg-[#dc2626] text-white text-xs sm:text-sm font-bold shadow-lg shadow-red-600/25 transition-all cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Keluar / Logout</span>
                      </button>
                    </div>
                  </div>
                </form>

                {/* Right 5 Cols: Galeri Slide Gambar Hero Website (Upload & Tampilkan Gambar Hero) */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="rounded-2xl border border-[#262246] bg-[#110f24] p-6 text-white space-y-4 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-[#241f44] pb-3">
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400">
                          🖼️ Hero Slider Images (#hero)
                        </span>
                        <h3 className="text-base font-bold text-white mt-0.5">
                          Galeri Gambar Banner Utama ({db.heroSlides?.length || 0} Slide)
                        </h3>
                      </div>
                      <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white text-xs font-bold shadow-md cursor-pointer transition-all">
                        <span>+ Upload Slide Baru</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            handleUploadImageFile(file, (url) => {
                              handleAddHeroSlide(url);
                            });
                            e.target.value = '';
                          }}
                        />
                      </label>
                    </div>

                    {/* Input Tambah URL Slide Manual */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleAddHeroSlide(newHeroSlideUrl);
                      }}
                      className="flex gap-2"
                    >
                      <input
                        type="text"
                        placeholder="Atau tempel URL gambar slide /uploads/..."
                        value={newHeroSlideUrl}
                        onChange={(e) => setNewHeroSlideUrl(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-xs font-mono"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-[#8b5cf6] hover:bg-[#7c3aed] text-white text-xs font-bold cursor-pointer shrink-0"
                      >
                        + Tambah
                      </button>
                    </form>

                    {/* Daftar Gambar Hero Slide */}
                    <div className="space-y-3 max-h-[540px] overflow-y-auto pr-1">
                      {(db.heroSlides || []).map((slide, idx) => (
                        <div
                          key={slide.id || idx}
                          className="p-3 rounded-xl border border-[#2d2654] bg-[#16132d] flex items-center gap-3.5"
                        >
                          <a
                            href={slide.image}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              if (slide.image?.startsWith('data:image/')) {
                                e.preventDefault();
                                openImageNewTab(slide.image, `Hero Slide #${idx + 1}`);
                              }
                            }}
                            className="relative group w-24 h-16 rounded-lg overflow-hidden border border-[#38306b] shrink-0 block"
                            title="Klik untuk lihat ukuran penuh (_blank)"
                          >
                            <img
                              src={slide.image}
                              alt={`Hero Slide ${idx + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                            <span className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] font-bold text-white">
                              _blank
                            </span>
                          </a>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded bg-[#8b5cf6]/20 text-[#c4b5fd] text-[10px] font-bold">
                                Slide #{idx + 1}
                              </span>
                              <span className="text-[11px] text-slate-400 truncate font-mono">
                                {slide.image}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <label className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[11px] font-bold cursor-pointer">
                                <span>📁 Ganti Gambar</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    handleUpdateHeroSlideImage(slide.id, file);
                                    e.target.value = '';
                                  }}
                                />
                              </label>
                              <button
                                type="button"
                                onClick={() => handleDeleteHeroSlide(slide.id)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#ef4444]/20 hover:bg-[#ef4444] text-[#f87171] hover:text-white text-[11px] font-bold cursor-pointer transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Hapus</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== VIEW 7B: PAKET HARGA WEBSITE (GAMBAR 1: ADD, EDIT, DELETE PRICING) ==================== */}
          {activeView === 'cms-pricing' && (
            <div className="space-y-6">
              {/* Top Banner Paket Harga */}
              <div
                className="relative overflow-hidden rounded-2xl border border-[#2a2456] bg-gradient-to-r from-[#0c0a20] via-[#13102e] to-[#1a143e] p-6 sm:p-8 shadow-2xl text-white"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 85% 30%, rgba(16, 185, 129, 0.18), transparent 45%)'
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold uppercase tracking-wider mb-2">
                      💰 Paket Harga Pembuatan Website (#pricing)
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      Manajemen Paket Harga Website &amp; Sistem Informasi
                    </h2>
                    <p className="text-xs sm:text-sm text-[#a599e9] mt-1">
                      Tambah, Edit, dan Hapus paket harga jasa pembuatan website yang tampil di halaman depan (`#pricing`).
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <a
                      href="/#pricing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#252142] hover:bg-[#322c56] text-white text-xs font-bold border border-[#383163] transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Lihat #pricing (_blank)</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Form Add / Edit Paket Harga */}
                <form
                  onSubmit={handleSavePricing}
                  className={`lg:col-span-4 rounded-2xl border p-6 space-y-4 self-start ${bgCard}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className={`text-lg font-bold ${textHeading}`}>
                      {editingPricingId ? '✏️ Edit Paket Harga' : '+ Tambah Paket Harga Baru'}
                    </h3>
                    {editingPricingId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingPricingId(null);
                          setPricingForm({
                            name: '',
                            price: '2.5 Jt',
                            period: '/proyek',
                            description: '',
                            suitableFor: '',
                            note: '',
                            features:
                              'Desain Frontend Modern & Responsif (HP, Tablet, PC)\nBackend Dashboard Admin & Database SQL\nGratis Setup Deploy ke Cloud Vercel / Hosting\nRevisi Fleksibel & Source Code Lengkap',
                            featured: false,
                            badge: '',
                            icon: 'star'
                          });
                        }}
                        className="text-xs text-rose-400 hover:underline cursor-pointer"
                      >
                        Batal Edit
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Nama Paket Website
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Paket Sistem Informasi / SIMPUS"
                      value={pricingForm.name}
                      onChange={(e) => setPricingForm({ ...pricingForm, name: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border ${borderCol} bg-[#16132d] text-white text-sm`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Harga Paket
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="3.5 Jt"
                        value={pricingForm.price}
                        onChange={(e) => setPricingForm({ ...pricingForm, price: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border ${borderCol} bg-[#16132d] text-white text-sm font-bold`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Periode / Satuan
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="/proyek"
                        value={pricingForm.period}
                        onChange={(e) => setPricingForm({ ...pricingForm, period: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border ${borderCol} bg-[#16132d] text-white text-sm`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Deskripsi Singkat Paket
                    </label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Aplikasi web dinamis dengan database relasional..."
                      value={pricingForm.description}
                      onChange={(e) =>
                        setPricingForm({ ...pricingForm, description: e.target.value })
                      }
                      className={`w-full px-3.5 py-2.5 rounded-xl border ${borderCol} bg-[#16132d] text-white text-sm`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-blue-300 mb-1 flex items-center gap-1.5">
                      <span>🎯 Cocok untuk:</span>
                      <span className="text-[10px] text-slate-400 font-normal">(Target pengguna / rekomendasi bisnis)</span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Contoh: Cocok untuk Company Profile, Personal Branding, atau Landing Page bisnis..."
                      value={pricingForm.suitableFor}
                      onChange={(e) =>
                        setPricingForm({ ...pricingForm, suitableFor: e.target.value })
                      }
                      className={`w-full px-3.5 py-2.5 rounded-xl border ${borderCol} bg-[#16132d] text-white text-sm`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                      <span>📝 Catatan:</span>
                      <span className="text-[10px] text-slate-400 font-normal">(Scope, hosting, ketentuan proyek)</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Contoh: Harga berlaku untuk scope yang disepakati. Domain & hosting server terpisah jika diperlukan..."
                      value={pricingForm.note}
                      onChange={(e) =>
                        setPricingForm({ ...pricingForm, note: e.target.value })
                      }
                      className={`w-full px-3.5 py-2.5 rounded-xl border ${borderCol} bg-[#16132d] text-white text-sm`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Daftar Fitur Paket (1 Baris = 1 Fitur Checklist)
                    </label>
                    <textarea
                      rows={6}
                      required
                      placeholder={
                        'Full-Stack Frontend + Backend API\nDatabase MySQL / PostgreSQL\nDashboard Admin Dark Mode Pro\nManajemen Role, User & Menu'
                      }
                      value={pricingForm.features}
                      onChange={(e) =>
                        setPricingForm({ ...pricingForm, features: e.target.value })
                      }
                      className={`w-full px-3.5 py-2.5 rounded-xl border ${borderCol} bg-[#16132d] text-white text-xs font-mono leading-relaxed`}
                    />
                  </div>

                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-[#322b5e] bg-[#16132d] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pricingForm.featured}
                      onChange={(e) =>
                        setPricingForm({
                          ...pricingForm,
                          featured: e.target.checked,
                          badge: e.target.checked ? 'Paling Diminati' : ''
                        })
                      }
                      className="w-4 h-4 accent-[#8b5cf6]"
                    />
                    <span className="text-xs font-bold text-amber-300">
                      ⭐ Tandai sebagai Paket &ldquo;PALING DIMINATI&rdquo; (Highlight Ungu/Biru)
                    </span>
                  </label>

                  <button
                    type="submit"
                    className={`w-full py-3 rounded-xl font-bold text-sm cursor-pointer shadow-lg transition-all ${
                      editingPricingId
                        ? 'bg-[#eab308] hover:bg-[#ca8a04] text-slate-950'
                        : 'bg-gradient-to-r from-[#8b5cf6] to-[#2563eb] hover:from-[#7c3aed] hover:to-[#1d4ed8] text-white'
                    }`}
                  >
                    {editingPricingId ? '💾 Simpan Perubahan Paket Harga' : '+ Tambah Paket Harga'}
                  </button>
                </form>

                {/* Daftar Kartu Paket Harga (Persis Gambar 1 + Tombol Edit & Hapus) */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {db.pricing.map((plan) => (
                    <div
                      key={plan.id}
                      className={`relative rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                        plan.featured
                          ? 'bg-gradient-to-b from-[#1e1646] to-[#13102a] border-[#8b5cf6] ring-2 ring-[#8b5cf6]/40 shadow-2xl'
                          : bgCard
                      } ${
                        editingPricingId === plan.id ? 'ring-2 ring-[#eab308] border-[#eab308]' : ''
                      }`}
                    >
                      {plan.featured && (
                        <span className="self-start px-3 py-1 rounded-full bg-gradient-to-r from-[#2563eb] to-[#7c3aed] text-white text-[10px] font-extrabold uppercase tracking-wider mb-3 shadow">
                          {plan.badge || 'PALING DIMINATI'}
                        </span>
                      )}

                      <div>
                        <h4 className="text-lg font-extrabold text-white">{plan.name}</h4>
                        <div className="mt-2 flex items-baseline gap-1.5">
                          <span className="text-2xl font-black text-[#60a5fa]">
                            Rp {plan.price}
                          </span>
                          <span className="text-xs text-slate-400">{plan.period}</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                          {plan.description}
                        </p>

                        {plan.suitableFor && (
                          <div className="mt-3 p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/25 text-xs">
                            <span className="font-bold text-blue-300 flex items-center gap-1 mb-1">
                              <span>🎯 Cocok untuk:</span>
                            </span>
                            <p className="text-slate-200 text-[11.5px] leading-relaxed">
                              {plan.suitableFor}
                            </p>
                          </div>
                        )}

                        {plan.note && (
                          <div className="mt-2.5 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs">
                            <span className="font-bold text-amber-300 flex items-center gap-1 mb-1">
                              <span>📝 Catatan:</span>
                            </span>
                            <p className="text-slate-300 text-[11px] leading-relaxed">
                              {plan.note}
                            </p>
                          </div>
                        )}

                        <ul className="mt-4 pt-4 border-t border-[#2b2452] space-y-2">
                          {(plan.features || []).map((feat, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-slate-200">
                              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[#2b2452] flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingPricingId(plan.id);
                            setPricingForm({
                              name: plan.name,
                              price: plan.price,
                              period: plan.period,
                              description: plan.description,
                              suitableFor: plan.suitableFor || '',
                              note: plan.note || '',
                              features: (plan.features || []).join('\n'),
                              featured: Boolean(plan.featured),
                              badge: plan.badge || '',
                              icon: plan.icon || 'star'
                            });
                            setPricingModalOpen(true);
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 text-xs font-bold transition-all cursor-pointer"
                        >
                          <span>✏️</span>
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePricing(plan.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#ef4444]/20 hover:bg-[#ef4444] text-[#f87171] hover:text-white text-xs font-bold transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== VIEW 7D: KATALOG PAKET WEBSITE & KALKULATOR PROYEK (GAMBAR 4: ADD, EDIT, DELETE PAKET WEB) ==================== */}
          {activeView === 'cms-simpus' && (
            <div className="space-y-6">
              {/* Top Banner Katalog Paket Web */}
              <div className="relative overflow-hidden rounded-2xl border border-[#2a2456] bg-gradient-to-r from-[#0c0a20] via-[#13102e] to-[#1a143e] p-6 sm:p-8 shadow-2xl text-white">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-extrabold uppercase tracking-wider mb-2">
                      🚀 Simulasi Live: Katalog Paket Website &amp; Kalkulator Estimasi Proyek (#simpus-live)
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      Backend Katalog Paket Website, Slot Pengerjaan &amp; Kalkulator Modul
                    </h2>
                    <p className="text-xs sm:text-sm text-[#a599e9] mt-1">
                      Kelola seluruh daftar paket &amp; template website siap pakai (Company Profile, E-Commerce, Landing Page, Custom Web App), slot proyek tersedia, gambar preview website, serta tarif estimasi per modul tambahan.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <a
                      href="/#simpus-live"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#252142] hover:bg-[#322c56] text-white text-xs font-bold border border-[#383163] transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Buka Simulasi Katalog Web (_blank)</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Bar Pengaturan Cepat Tarif Estimasi per Modul Tambahan */}
              <form
                onSubmit={handleSaveSettings}
                className="rounded-2xl border border-[#2d2654] bg-[#13102a] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-white"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-extrabold text-sm">
                    Rp
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Pengaturan Tarif Estimasi per Modul / Fitur Tambahan
                    </h4>
                    <p className="text-xs text-slate-400">
                      Digunakan langsung pada Kalkulator Modul &amp; Fitur Tambahan di halaman depan `#simpus-live`.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <input
                    type="number"
                    min={0}
                    step={50000}
                    value={companyForm.simpusFinePerDay ?? 500000}
                    onChange={(e) =>
                      setCompanyForm({
                        ...companyForm,
                        simpusFinePerDay: Number(e.target.value)
                      })
                    }
                    className="w-36 px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm font-bold"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white text-xs font-bold cursor-pointer shrink-0"
                  >
                    💾 Update Tarif Modul
                  </button>
                </div>
              </form>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Form Add / Edit Paket Website */}
                <form
                  onSubmit={handleSaveSimpusBook}
                  className={`lg:col-span-4 rounded-2xl border p-6 space-y-4 self-start ${bgCard}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className={`text-lg font-bold ${textHeading}`}>
                      {editingSimpusId ? '✏️ Edit Paket Website' : '+ Tambah Paket Website Siap Pakai'}
                    </h3>
                    {editingSimpusId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingSimpusId(null);
                          setSimpusForm({
                            code: 'WEB-PKG-05',
                            title: '',
                            author: 'Next.js 14 • Tailwind CSS • Database SQL',
                            category: 'Company Profile & Bisnis',
                            year: 2026,
                            stock: 5,
                            shelf: 'Full-Stack + Panel Admin',
                            rating: '5.0',
                            image:
                              'https://bootstrapmade.com/content/demo/Strive/assets/img/portfolio/portfolio-1.webp',
                            link: '/#pricing'
                          });
                        }}
                        className="text-xs text-rose-400 hover:underline cursor-pointer"
                      >
                        Batal Edit
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Kode Paket Web
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="WEB-PKG-05"
                        value={simpusForm.code}
                        onChange={(e) => setSimpusForm({ ...simpusForm, code: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl border ${borderCol} bg-[#16132d] text-white text-xs font-mono`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Arsitektur / Fitur Utama
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Full-Stack + Panel Admin"
                        value={simpusForm.shelf}
                        onChange={(e) => setSimpusForm({ ...simpusForm, shelf: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl border ${borderCol} bg-[#16132d] text-white text-xs font-bold`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Nama Paket / Template Website
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Website Company Profile Eksekutif + Admin CMS..."
                      value={simpusForm.title}
                      onChange={(e) => setSimpusForm({ ...simpusForm, title: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border ${borderCol} bg-[#16132d] text-white text-sm`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Tech Stack / Developer
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Next.js 14 • Tailwind CSS • Database SQL"
                      value={simpusForm.author}
                      onChange={(e) => setSimpusForm({ ...simpusForm, author: e.target.value })}
                      className={`w-full px-3.5 py-2 rounded-xl border ${borderCol} bg-[#16132d] text-white text-sm`}
                    />
                  </div>

                  {/* Custom Dropdown Kategori Paket Website + Buat Kategori Sendiri */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-300">Kategori Website</label>
                      <button
                        type="button"
                        onClick={() => setShowNewSimpusCatInput(!showNewSimpusCatInput)}
                        className="text-[11px] font-bold text-[#a78bfa] hover:text-[#c4b5fd] cursor-pointer"
                      >
                        {showNewSimpusCatInput ? '✖ Tutup Input' : '+ Buat Kategori Sendiri'}
                      </button>
                    </div>

                    {showNewSimpusCatInput && (
                      <div className="flex gap-2 p-2.5 rounded-xl bg-[#191536] border border-[#8b5cf6]/40">
                        <input
                          type="text"
                          placeholder="Ketik kategori website baru..."
                          value={newSimpusCategoryName}
                          onChange={(e) => setNewSimpusCategoryName(e.target.value)}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-[#110e24] border border-[#322b5e] text-white text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddCustomSimpusCategory(false)}
                          className="px-3 py-1.5 rounded-lg bg-[#8b5cf6] hover:bg-[#7c3aed] text-white text-xs font-bold cursor-pointer"
                        >
                          Simpan
                        </button>
                      </div>
                    )}

                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setSimpusCatDropdownOpen(!simpusCatDropdownOpen)}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-[#322b5e] bg-[#16132d] hover:border-[#8b5cf6] text-white text-sm font-semibold transition-all cursor-pointer"
                      >
                        <span className="truncate">{simpusForm.category}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#a78bfa] transition-transform ${
                            simpusCatDropdownOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {simpusCatDropdownOpen && (
                        <div className="absolute z-40 left-0 right-0 mt-1.5 rounded-xl border border-[#3b3270] bg-[#141129] shadow-2xl py-1.5 max-h-56 overflow-y-auto">
                          {allSimpusCategories.map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => {
                                setSimpusForm({ ...simpusForm, category: cat });
                                setSimpusCatDropdownOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-3.5 py-2 text-left text-xs font-semibold transition-colors cursor-pointer ${
                                simpusForm.category === cat
                                  ? 'bg-[#8b5cf6]/25 text-[#c4b5fd]'
                                  : 'text-slate-200 hover:bg-[#231d47]'
                              }`}
                            >
                              <span>{cat}</span>
                              {simpusForm.category === cat && (
                                <Check className="w-3.5 h-3.5 text-[#a78bfa]" />
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Tahun</label>
                      <input
                        type="number"
                        required
                        value={simpusForm.year}
                        onChange={(e) =>
                          setSimpusForm({ ...simpusForm, year: Number(e.target.value) })
                        }
                        className={`w-full px-3 py-2 rounded-xl border ${borderCol} bg-[#16132d] text-white text-xs`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Slot Proyek
                      </label>
                      <input
                        type="number"
                        min={0}
                        required
                        value={simpusForm.stock}
                        onChange={(e) =>
                          setSimpusForm({ ...simpusForm, stock: Number(e.target.value) })
                        }
                        className={`w-full px-3 py-2 rounded-xl border ${borderCol} bg-[#16132d] text-white text-xs font-bold`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Rating</label>
                      <input
                        type="text"
                        required
                        value={simpusForm.rating}
                        onChange={(e) =>
                          setSimpusForm({ ...simpusForm, rating: e.target.value })
                        }
                        className={`w-full px-3 py-2 rounded-xl border ${borderCol} bg-[#16132d] text-white text-xs`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Link Detail / Demo Website (_blank)
                    </label>
                    <input
                      type="text"
                      placeholder="/#pricing"
                      value={simpusForm.link}
                      onChange={(e) => setSimpusForm({ ...simpusForm, link: e.target.value })}
                      className={`w-full px-3.5 py-2 rounded-xl border ${borderCol} bg-[#16132d] text-white text-xs font-mono`}
                    />
                  </div>

                  {/* Upload Gambar Preview Paket Website */}
                  <div className="p-3.5 rounded-xl border border-[#2d2654] bg-[#16132d] space-y-2.5">
                    <label className="block text-xs font-bold text-slate-300">
                      Preview / Gambar Paket Website (Upload File / URL)
                    </label>
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          simpusForm.image ||
                          'https://bootstrapmade.com/content/demo/Strive/assets/img/portfolio/portfolio-1.webp'
                        }
                        alt="Preview Paket Website"
                        className="w-16 h-16 rounded-lg object-cover border border-[#8b5cf6]/40 shrink-0"
                      />
                      <div className="flex-1 space-y-1.5">
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white text-xs font-bold cursor-pointer shadow">
                          <span>📁 Pilih &amp; Upload Gambar</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              handleUploadImageFile(file, (url) =>
                                setSimpusForm((prev) => ({ ...prev, image: url }))
                              );
                              e.target.value = '';
                            }}
                          />
                        </label>
                        <input
                          type="text"
                          value={simpusForm.image}
                          onChange={(e) => setSimpusForm({ ...simpusForm, image: e.target.value })}
                          className="w-full px-2.5 py-1 rounded-lg border border-[#322b5e] bg-[#1a1636] text-white text-[11px] font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3 rounded-xl font-bold text-sm cursor-pointer shadow-lg ${
                      editingSimpusId
                        ? 'bg-[#eab308] hover:bg-[#ca8a04] text-slate-950'
                        : 'bg-gradient-to-r from-[#8b5cf6] to-[#2563eb] text-white'
                    }`}
                  >
                    {editingSimpusId ? '💾 Simpan Perubahan Paket Web' : '+ Tambah Paket ke Katalog Web'}
                  </button>
                </form>

                {/* Daftar Katalog Paket Website (Persis Gambar 4 + Edit, Upload Gambar & Hapus) */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(db.simpusBooks || []).map((book) => (
                    <div
                      key={book.id}
                      className={`rounded-2xl border p-5 flex flex-col justify-between ${bgCard} ${
                        editingSimpusId === book.id ? 'border-[#eab308] ring-2 ring-[#eab308]' : ''
                      }`}
                    >
                      <div>
                        <div className="flex items-start gap-3.5">
                          <div className="relative group w-20 h-24 rounded-xl overflow-hidden border border-[#38306b] shrink-0 bg-[#0c0a1a]">
                            <a
                              href={
                                book.image ||
                                'https://bootstrapmade.com/content/demo/Strive/assets/img/portfolio/portfolio-1.webp'
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => {
                                if (book.image?.startsWith('data:image/')) {
                                  e.preventDefault();
                                  openImageNewTab(book.image, book.title);
                                }
                              }}
                              className="block w-full h-full"
                            >
                              <img
                                src={
                                  book.image ||
                                  'https://bootstrapmade.com/content/demo/Strive/assets/img/portfolio/portfolio-1.webp'
                                }
                                alt={book.title}
                                className="w-full h-full object-cover"
                              />
                            </a>
                            <label
                              className="absolute inset-x-0 bottom-0 py-1 bg-black/75 text-white text-[9px] font-bold text-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Ganti Gambar Paket Web"
                            >
                              📁 Gambar
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  handleQuickUploadSimpusImage(book.id, file);
                                  e.target.value = '';
                                }}
                              />
                            </label>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold">
                                {book.category}
                              </span>
                              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">
                                {book.shelf}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  book.stock > 0
                                    ? 'bg-emerald-500/20 text-emerald-300'
                                    : 'bg-rose-500/20 text-rose-300'
                                }`}
                              >
                                Slot: {book.stock} Proyek
                              </span>
                            </div>
                            <h4 className="text-sm font-extrabold text-white leading-snug">
                              {book.title}
                            </h4>
                            <p className="text-xs text-slate-400 mt-0.5">
                              {book.author} • {book.year} • ⭐ {book.rating}
                            </p>
                            <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                              Kode: {book.code}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#26204a] flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingSimpusId(book.id);
                            setSimpusForm({
                              code: book.code,
                              title: book.title,
                              author: book.author,
                              category: book.category,
                              year: book.year,
                              stock: book.stock,
                              shelf: book.shelf,
                              rating: String(book.rating || '5.0'),
                              image:
                                book.image ||
                                'https://bootstrapmade.com/content/demo/Strive/assets/img/portfolio/portfolio-1.webp',
                              link: book.link || '/#pricing'
                            });
                            setSimpusModalOpen(true);
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 text-xs font-bold cursor-pointer"
                        >
                          <span>✏️</span>
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteSimpusBook(book.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#ef4444]/20 hover:bg-[#ef4444] text-[#f87171] hover:text-white text-xs font-bold cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== VIEW 7E: PROFIL IT & REKAYASA PERANGKAT LUNAK (GAMBAR 5: ABOUT SECTION CMS) ==================== */}
          {activeView === 'cms-about' && (
            <div className="space-y-6">
              {/* Top Banner Profil IT */}
              <div className="relative overflow-hidden rounded-2xl border border-[#2a2456] bg-gradient-to-r from-[#0c0a20] via-[#13102e] to-[#1a143e] p-6 sm:p-8 shadow-2xl text-white">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-extrabold uppercase tracking-wider mb-2">
                      🏛️ Profil IT: Rekayasa Perangkat Lunak &amp; Jasa Pembuatan Website (#about)
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      Manajemen Seksi Profil IT, Tab Spesialisasi &amp; Kartu Keunggulan
                    </h2>
                    <p className="text-xs sm:text-sm text-[#a599e9] mt-1">
                      Kelola Foto Utama Profil IT, Judul/Subjudul, Tab Spesialisasi (Full-Stack, Backend, UI/UX), dan Kartu Keunggulan di seksi `#about`.
                    </p>
                  </div>
                  <a
                    href="/#about"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#252142] hover:bg-[#322c56] text-white text-xs font-bold border border-[#383163] transition-all self-start sm:self-auto"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Lihat #about (_blank)</span>
                  </a>
                </div>
              </div>

              {/* 1. Pengaturan Header, Badge & Foto Utama Profil IT */}
              <form
                onSubmit={handleSaveSettings}
                className={`rounded-2xl border p-6 space-y-5 ${bgCard}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#26204a] pb-4">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#a78bfa]">
                      1. Header &amp; Foto Utama Seksi #about
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      Judul Seksi, Badge Proyek &amp; Upload Gambar Profil IT
                    </h3>
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#7c3aed] text-white text-xs font-bold shadow-lg cursor-pointer self-start sm:self-auto"
                  >
                    💾 Simpan Header &amp; Foto #about
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-4 space-y-3">
                    <div className="relative group rounded-2xl overflow-hidden border border-[#38306b] h-52 bg-[#0c0a1a]">
                      <img
                        src={companyForm.aboutImage || '/flexstart/assets/img/about.jpg'}
                        alt="About Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-slate-950/85 border border-white/10 text-white text-xs font-bold">
                        {companyForm.aboutSectionBadge || '28+ Proyek Web & Sistem'}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <label className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#8b5cf6] hover:bg-[#7c3aed] text-white text-xs font-bold cursor-pointer">
                        <span>📤 Upload Foto #about</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            handleUploadCompanyPhoto('aboutImage', file);
                            e.target.value = '';
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="lg:col-span-8 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          Judul Utama Seksi #about
                        </label>
                        <input
                          type="text"
                          value={companyForm.aboutSectionTitle || ''}
                          onChange={(e) =>
                            setCompanyForm({
                              ...companyForm,
                              aboutSectionTitle: e.target.value
                            })
                          }
                          className={`w-full px-3.5 py-2.5 rounded-xl border ${borderCol} bg-[#16132d] text-white text-sm font-bold`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          Teks Badge Melayang pada Foto
                        </label>
                        <input
                          type="text"
                          value={companyForm.aboutSectionBadge || ''}
                          onChange={(e) =>
                            setCompanyForm({
                              ...companyForm,
                              aboutSectionBadge: e.target.value
                            })
                          }
                          className={`w-full px-3.5 py-2.5 rounded-xl border ${borderCol} bg-[#16132d] text-white text-sm`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Subjudul / Penjelasan Seksi #about
                      </label>
                      <textarea
                        rows={2}
                        value={companyForm.aboutSectionSubtitle || ''}
                        onChange={(e) =>
                          setCompanyForm({
                            ...companyForm,
                            aboutSectionSubtitle: e.target.value
                          })
                        }
                        className={`w-full px-3.5 py-2.5 rounded-xl border ${borderCol} bg-[#16132d] text-white text-sm`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        URL Gambar #about
                      </label>
                      <input
                        type="text"
                        value={companyForm.aboutImage || ''}
                        onChange={(e) =>
                          setCompanyForm({ ...companyForm, aboutImage: e.target.value })
                        }
                        className={`w-full px-3.5 py-2 rounded-xl border ${borderCol} bg-[#16132d] text-white text-xs font-mono`}
                      />
                    </div>
                  </div>
                </div>
              </form>

              {/* 2. CRUD Tab Spesialisasi (db.aboutTabs) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <form
                  onSubmit={handleSaveAboutTab}
                  className={`lg:col-span-4 rounded-2xl border p-6 space-y-4 self-start ${bgCard}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className={`text-base font-bold ${textHeading}`}>
                      {editingAboutTabId
                        ? '✏️ Edit Tab Spesialisasi'
                        : '+ Tambah Tab Spesialisasi (#about)'}
                    </h3>
                    {editingAboutTabId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingAboutTabId(null);
                          setAboutTabForm({
                            tabLabel: '',
                            title: '',
                            description: '',
                            badge: 'Standar Rekayasa Perangkat Lunak Teknik Informatika'
                          });
                        }}
                        className="text-xs text-rose-400 hover:underline cursor-pointer"
                      >
                        Batal
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Label Tombol Tab
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Jasa Website Full-Stack"
                      value={aboutTabForm.tabLabel}
                      onChange={(e) =>
                        setAboutTabForm({ ...aboutTabForm, tabLabel: e.target.value })
                      }
                      className={`w-full px-3.5 py-2 rounded-xl border ${borderCol} bg-[#16132d] text-white text-sm`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Judul Konten Tab
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Pengembangan Website Modern & Sistem Informasi..."
                      value={aboutTabForm.title}
                      onChange={(e) =>
                        setAboutTabForm({ ...aboutTabForm, title: e.target.value })
                      }
                      className={`w-full px-3.5 py-2 rounded-xl border ${borderCol} bg-[#16132d] text-white text-sm`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Deskripsi Paragraf Tab
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={aboutTabForm.description}
                      onChange={(e) =>
                        setAboutTabForm({ ...aboutTabForm, description: e.target.value })
                      }
                      className={`w-full px-3.5 py-2 rounded-xl border ${borderCol} bg-[#16132d] text-white text-xs leading-relaxed`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Badge Keunggulan Tab
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full-Stack Next.js, Laravel, PHP & MySQL Terintegrasi"
                      value={aboutTabForm.badge}
                      onChange={(e) =>
                        setAboutTabForm({ ...aboutTabForm, badge: e.target.value })
                      }
                      className={`w-full px-3.5 py-2 rounded-xl border ${borderCol} bg-[#16132d] text-white text-xs`}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3 rounded-xl font-bold text-sm cursor-pointer ${
                      editingAboutTabId
                        ? 'bg-[#eab308] hover:bg-[#ca8a04] text-slate-950'
                        : 'bg-gradient-to-r from-[#8b5cf6] to-[#2563eb] text-white'
                    }`}
                  >
                    {editingAboutTabId ? '💾 Simpan Perubahan Tab' : '+ Tambah Tab Spesialisasi'}
                  </button>
                </form>

                <div className="lg:col-span-8 space-y-4">
                  {(db.aboutTabs || []).map((tab) => (
                    <div
                      key={tab.id}
                      className={`rounded-2xl border p-5 space-y-3 ${bgCard} ${
                        editingAboutTabId === tab.id ? 'border-[#eab308] ring-2 ring-[#eab308]' : ''
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="px-3 py-1 rounded-xl bg-[#2563eb] text-white text-xs font-extrabold">
                            {tab.tabLabel}
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                            {tab.badge}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingAboutTabId(tab.id);
                              setAboutTabForm({
                                tabLabel: tab.tabLabel,
                                title: tab.title,
                                description: tab.description,
                                badge: tab.badge
                              });
                              setAboutTabModalOpen(true);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 text-xs font-bold cursor-pointer"
                          >
                            <span>✏️</span>
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteAboutTab(tab.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#ef4444]/20 hover:bg-[#ef4444] text-[#f87171] hover:text-white text-xs font-bold cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Hapus</span>
                          </button>
                        </div>
                      </div>

                      <h4 className="text-base font-extrabold text-white">{tab.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{tab.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. CRUD Kartu Keunggulan (db.features) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-[#26204a]">
                <form
                  onSubmit={handleSaveFeature}
                  className={`lg:col-span-4 rounded-2xl border p-6 space-y-4 self-start ${bgCard}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className={`text-base font-bold ${textHeading}`}>
                      {editingFeatureId
                        ? '✏️ Edit Kartu Keunggulan'
                        : '+ Tambah Kartu Keunggulan (#about)'}
                    </h3>
                    {editingFeatureId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingFeatureId(null);
                          setFeatureForm({
                            title: '',
                            description: '',
                            icon: 'ShieldCheck'
                          });
                        }}
                        className="text-xs text-rose-400 hover:underline cursor-pointer"
                      >
                        Batal
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Judul Kartu Keunggulan
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Clean Code & Modular Architecture"
                      value={featureForm.title}
                      onChange={(e) =>
                        setFeatureForm({ ...featureForm, title: e.target.value })
                      }
                      className={`w-full px-3.5 py-2 rounded-xl border ${borderCol} bg-[#16132d] text-white text-sm`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Deskripsi Kartu
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Penjelasan keunggulan teknis..."
                      value={featureForm.description}
                      onChange={(e) =>
                        setFeatureForm({ ...featureForm, description: e.target.value })
                      }
                      className={`w-full px-3.5 py-2 rounded-xl border ${borderCol} bg-[#16132d] text-white text-xs leading-relaxed`}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3 rounded-xl font-bold text-sm cursor-pointer ${
                      editingFeatureId
                        ? 'bg-[#eab308] hover:bg-[#ca8a04] text-slate-950'
                        : 'bg-[#315cf6] hover:bg-[#254bdb] text-white'
                    }`}
                  >
                    {editingFeatureId ? '💾 Simpan Kartu Keunggulan' : '+ Tambah Kartu Keunggulan'}
                  </button>
                </form>

                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {db.features.map((feat) => (
                    <div
                      key={feat.id}
                      className={`rounded-2xl border p-5 flex flex-col justify-between ${bgCard} ${
                        editingFeatureId === feat.id ? 'border-[#eab308] ring-2 ring-[#eab308]' : ''
                      }`}
                    >
                      <div>
                        <h4 className="text-sm font-extrabold text-white">{feat.title}</h4>
                        <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                          {feat.description}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-[#26204a] flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingFeatureId(feat.id);
                            setFeatureForm({
                              title: feat.title,
                              description: feat.description,
                              icon: feat.icon || 'ShieldCheck'
                            });
                            setFeatureModalOpen(true);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 text-xs font-bold cursor-pointer"
                        >
                          <span>✏️</span>
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteFeature(feat.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#ef4444]/20 hover:bg-[#ef4444] text-[#f87171] hover:text-white text-xs font-bold cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== VIEW 8: MANAJEMEN AKUN / TABEL user (Gambar 3) ==================== */}
          {activeView === 'db-user' && (
            <div className="space-y-6">
              {/* Header Banner Persis Gambar 3 */}
              <div
                className="relative overflow-hidden rounded-2xl border border-[#2a2456] bg-gradient-to-r from-[#0c0a20] via-[#13102e] to-[#1a143e] p-6 sm:p-8 shadow-2xl"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 85% 30%, rgba(139, 92, 246, 0.18), transparent 45%), linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)',
                  backgroundSize: '100% 100%, 28px 28px, 28px 28px'
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      Manajemen Akun
                    </h2>
                    <div className="flex items-center gap-2.5 mt-2">
                      <span className="w-1 h-4 rounded-full bg-[#a855f7] inline-block" />
                      <span className="text-xs sm:text-sm font-medium text-[#a599e9]">
                        Admin Suite / User Management &amp; Permissions
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingUserId(null);
                      setUserForm({
                        username: '',
                        email: '',
                        phone: '+62 812-',
                        image: `${DASH_IMG}/person/person-m-1.webp`,
                        password: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
                        role_id: 1,
                        is_active: 1
                      });
                      setUserModalOpen(true);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] hover:from-[#7c3aed] hover:to-[#5b21b6] text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
                  >
                    <span className="text-base leading-none">+</span>
                    <span>Tambah User</span>
                  </button>
                </div>
              </div>

              {/* Card Tabel User (company_db.user) */}
              <div className="rounded-2xl border border-[#262246] bg-[#110f24] text-white p-5 sm:p-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#241f44]">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-300">Show</span>
                    <select
                      value={entriesPerPage}
                      onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                      className="px-2.5 py-1 rounded-lg bg-[#1c1836] border border-[#322b5e] text-white text-xs font-semibold focus:outline-none"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                    </select>
                    <span className="text-xs text-slate-300">entries</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search user / email..."
                        value={tableSearch}
                        onChange={(e) => setTableSearch(e.target.value)}
                        className="pl-9 pr-4 py-1.5 rounded-full bg-[#1a1636] border border-[#322b5e] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#8b5cf6]"
                      />
                    </div>
                    <span className="text-xs font-bold text-[#a78bfa]">
                      Total User: {db.user?.length || 0}
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#1a1638] text-[#9d7bff] border-b border-[#2d2654]">
                        <th className="py-3.5 px-4 font-bold rounded-tl-xl">#</th>
                        <th className="py-3.5 px-4 font-bold">User (username &amp; image)</th>
                        <th className="py-3.5 px-4 font-bold">Email &amp; Phone</th>
                        <th className="py-3.5 px-4 font-bold">Role</th>
                        <th className="py-3.5 px-4 font-bold">Status</th>
                        <th className="py-3.5 px-4 font-bold">Date Created</th>
                        <th className="py-3.5 px-4 font-bold text-center rounded-tr-xl">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#221d42]">
                      {(db.user || [])
                        .filter(
                          (u) =>
                            u.username.toLowerCase().includes(tableSearch.toLowerCase()) ||
                            u.email.toLowerCase().includes(tableSearch.toLowerCase())
                        )
                        .slice(0, entriesPerPage)
                        .map((u, idx) => {
                          const roleName =
                            db.user_role?.find((r) => r.id === u.role_id)?.role ||
                            (u.role_id === 1 ? 'Admin' : 'User');
                          return (
                            <tr
                              key={u.id}
                              className="hover:bg-[#181432] transition-colors"
                            >
                              <td className="py-3.5 px-4 font-semibold text-slate-300">
                                {idx + 1}
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={u.image}
                                    alt={u.username}
                                    className="w-9 h-9 rounded-full object-cover border border-[#8b5cf6]/40"
                                  />
                                  <div>
                                    <div className="font-bold text-white">{u.username}</div>
                                    <div className="text-[11px] text-slate-400 font-mono">
                                      ID #{u.id} • {u.password.slice(0, 14)}...
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="text-slate-200 font-medium">{u.email}</div>
                                <div className="text-xs text-slate-400">{u.phone}</div>
                              </td>
                              <td className="py-3.5 px-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                                    roleName.toLowerCase() === 'admin'
                                      ? 'bg-[#8b5cf6]/20 text-[#c4b5fd] border border-[#8b5cf6]/40'
                                      : 'bg-[#06b6d4]/20 text-[#67e8f9] border border-[#06b6d4]/40'
                                  }`}
                                >
                                  {roleName}
                                </span>
                              </td>
                              <td className="py-3.5 px-4">
                                <button
                                  type="button"
                                  onClick={() => handleToggleUserActive(u.id)}
                                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                                    u.is_active === 1
                                      ? 'bg-[#16a34a] text-white'
                                      : 'bg-[#dc2626] text-white'
                                  }`}
                                >
                                  {u.is_active === 1 ? 'Active' : 'Inactive'}
                                </button>
                              </td>
                              <td className="py-3.5 px-4 text-xs text-slate-300 font-mono">
                                {u.date_create}
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingUserId(u.id);
                                      setUserForm({
                                        username: u.username,
                                        email: u.email,
                                        phone: u.phone,
                                        image: u.image,
                                        password: u.password,
                                        role_id: u.role_id,
                                        is_active: u.is_active
                                      });
                                      setUserModalOpen(true);
                                    }}
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 text-xs font-bold transition-all cursor-pointer"
                                  >
                                    <span>✏️</span>
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteUser(u.id)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ef4444] hover:bg-[#dc2626] text-white text-xs font-bold transition-all cursor-pointer"
                                  >
                                    <span>🗑️</span>
                                    <span>Delete</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>

                {/* Footer Pagination */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 mt-4 border-t border-[#241f44] text-xs text-slate-400">
                  <div>
                    Showing 1 to {db.user?.length || 0} of {db.user?.length || 0} entries
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-3 py-1 rounded-lg bg-[#191534] text-slate-500">
                      Previous
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-[#2563eb] text-white font-bold">
                      1
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-[#191534] text-slate-500">
                      Next
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== VIEW 9: ROLE MANAGEMENT / TABEL user_role (Gambar 1) ==================== */}
          {activeView === 'db-user-role' && (
            <div className="rounded-2xl border border-[#262246] bg-[#110f24] text-white p-6 shadow-2xl">
              {/* Top Header Bar Persis Gambar 1 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#241f44]">
                <h2 className="text-lg sm:text-xl font-bold text-white">Role Management</h2>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search role..."
                      value={tableSearch}
                      onChange={(e) => setTableSearch(e.target.value)}
                      className="pl-9 pr-4 py-1.5 rounded-full bg-[#1a1636] border border-[#322b5e] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#3b82f6]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingRoleId(null);
                      setRoleForm({ role: '' });
                      setRoleModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Add Role</span>
                  </button>
                </div>
              </div>

              {/* Show Entries & Total Role Bar */}
              <div className="flex items-center justify-between py-4 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <span>Show</span>
                  <select
                    value={entriesPerPage}
                    onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                    className="px-2.5 py-1 rounded-md bg-[#252142] border border-[#383163] text-white text-xs focus:outline-none"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                  </select>
                  <span>entries</span>
                </div>
                <div className="font-bold text-white">
                  Total Role: <span className="text-[#a78bfa]">{db.user_role?.length || 0}</span>
                </div>
              </div>

              {/* Table Role Management Persis Gambar 1 (Hanya Admin & User) */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#1a1638] text-[#9d7bff] border-b border-[#2d2654]">
                      <th className="py-3.5 px-4 font-bold w-16">#</th>
                      <th className="py-3.5 px-4 font-bold">Role</th>
                      <th className="py-3.5 px-4 font-bold text-center w-72">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#221d42]">
                    {(db.user_role || [])
                      .filter((r) =>
                        r.role.toLowerCase().includes(tableSearch.toLowerCase())
                      )
                      .slice(0, entriesPerPage)
                      .map((r, index) => (
                        <tr
                          key={r.id}
                          className="hover:bg-[#181432] transition-colors"
                        >
                          <td className="py-3.5 px-4 text-slate-200 font-medium">
                            {index + 1}
                          </td>
                          <td className="py-3.5 px-4 text-white font-semibold">
                            {r.role}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedAccessRoleId(r.id);
                                  try {
                                    localStorage.setItem(
                                      'company_admin_access_role_id',
                                      String(r.id)
                                    );
                                  } catch {}
                                  navigateView('db-user-access');
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#06b6d4] hover:bg-[#0891b2] text-slate-950 text-xs font-bold transition-all cursor-pointer"
                              >
                                <span>🛡️</span>
                                <span>Access</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingRoleId(r.id);
                                  setRoleForm({ role: r.role });
                                  setRoleModalOpen(true);
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 text-xs font-bold transition-all cursor-pointer"
                              >
                                <span>✏️</span>
                                <span>Edit</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteRole(r.id)}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ef4444] hover:bg-[#dc2626] text-white text-xs font-bold transition-all cursor-pointer"
                              >
                                <span>🗑️</span>
                                <span>Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Footer Pagination Persis Gambar 1 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 mt-4 border-t border-[#241f44] text-xs text-slate-400">
                <div>
                  Showing 1 to {db.user_role?.length || 0} of {db.user_role?.length || 0} entries
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="px-3 py-1 rounded-lg bg-[#191534] text-slate-500">
                    Previous
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#2563eb] text-white font-bold">
                    1
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#191534] text-slate-500">
                    Next
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ==================== VIEW 10: MENU MANAGEMENT / TABEL user_menu (Gambar 4) ==================== */}
          {activeView === 'db-user-menu' && (
            <div className="rounded-2xl border border-[#262246] bg-[#110f24] text-white p-6 shadow-2xl">
              {/* Header Bar Persis Gambar 4 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#241f44]">
                <div className="flex items-center gap-2.5">
                  <Menu className="w-5 h-5 text-white" />
                  <h2 className="text-lg sm:text-xl font-bold text-white">Menu Management</h2>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search menu..."
                      value={tableSearch}
                      onChange={(e) => setTableSearch(e.target.value)}
                      className="pl-9 pr-4 py-1.5 rounded-full bg-[#1a1636] border border-[#322b5e] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#3b82f6]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingMenuId(null);
                      setMenuForm({ menu: '' });
                      setMenuModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>New Menu</span>
                  </button>
                </div>
              </div>

              {/* Tabel Menu Management Persis Gambar 4 (Admin, User, Menu) */}
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#1a1638] text-[#9d7bff] border-b border-[#2d2654]">
                      <th className="py-3.5 px-4 font-bold w-20">#</th>
                      <th className="py-3.5 px-4 font-bold">Menu</th>
                      <th className="py-3.5 px-4 font-bold text-center w-56">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#221d42]">
                    {(db.user_menu || [])
                      .filter((m) =>
                        m.menu.toLowerCase().includes(tableSearch.toLowerCase())
                      )
                      .map((m, index) => (
                        <tr
                          key={m.id}
                          className="hover:bg-[#181432] transition-colors"
                        >
                          <td className="py-3.5 px-4 text-slate-200 font-medium">
                            {index + 1}
                          </td>
                          <td className="py-3.5 px-4 text-white font-semibold">
                            {m.menu}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingMenuId(m.id);
                                  setMenuForm({ menu: m.menu });
                                  setMenuModalOpen(true);
                                }}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 text-xs font-bold transition-all cursor-pointer"
                              >
                                <span>✏️</span>
                                <span>Edit</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteMenu(m.id)}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ef4444] hover:bg-[#dc2626] text-white text-xs font-bold transition-all cursor-pointer"
                              >
                                <span>🗑️</span>
                                <span>Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================== VIEW 11: ROLE ACCESS MANAGEMENT / TABEL user_access_menu (Gambar 2) ==================== */}
          {activeView === 'db-user-access' && (
            <div className="rounded-2xl border border-[#262246] bg-[#110f24] text-white p-6 shadow-2xl">
              {/* Header Bar Persis Gambar 2 (Tanpa toggle Admin/User) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#241f44]">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Role Access Management
                </h2>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => navigateView('db-user-role')}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#64748b] hover:bg-[#475569] text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    <span>⬅</span>
                    <span>Back</span>
                  </button>
                </div>
              </div>

              {/* Info Role : Admin / User Persis Gambar 2 */}
              <div className="pt-4 pb-2 text-sm">
                <span className="text-slate-300">Role : </span>
                <strong className="text-white font-extrabold">
                  {db.user_role?.find((r) => r.id === selectedAccessRoleId)?.role || 'Admin'}
                </strong>
              </div>

              {/* Show Entries & Total Menu Persis Gambar 2 */}
              <div className="flex items-center justify-between py-3 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <span>Show</span>
                  <select
                    value={entriesPerPage}
                    onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                    className="px-2.5 py-1 rounded-md bg-[#252142] border border-[#383163] text-white text-xs focus:outline-none"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                  </select>
                  <span>entries</span>
                </div>
                <div className="font-bold text-white">
                  Total Menu: <span className="text-[#a78bfa]">{db.user_menu?.length || 0}</span>
                </div>
              </div>

              {/* Tabel Role Access Management Persis Gambar 2 (Admin, User, Menu + Toggle Nyalakan / Matikan) */}
              <div className="overflow-x-auto mt-1">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#1a1638] text-[#9d7bff] border-b border-[#2d2654]">
                      <th className="py-3.5 px-4 font-bold w-20">#</th>
                      <th className="py-3.5 px-4 font-bold">Menu</th>
                      <th className="py-3.5 px-4 font-bold text-center w-72">Access</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#221d42]">
                    {(db.user_menu || []).slice(0, entriesPerPage).map((m, index) => {
                      const hasAccess = db.user_access_menu?.some(
                        (acc) =>
                          acc.role_id === selectedAccessRoleId && acc.menu_id === m.id
                      );
                      return (
                        <tr
                          key={m.id}
                          className="hover:bg-[#181432] transition-colors"
                        >
                          <td className="py-3.5 px-4 text-slate-200 font-medium">
                            {index + 1}
                          </td>
                          <td className="py-3.5 px-4 text-white font-semibold">
                            {m.menu}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center justify-center gap-6">
                              {/* Toggle Switch Nyalakan */}
                              <button
                                type="button"
                                onClick={() => {
                                  if (!hasAccess) {
                                    handleToggleAccessMenu(selectedAccessRoleId, m.id);
                                  }
                                }}
                                className="inline-flex items-center gap-2 cursor-pointer group"
                              >
                                <span
                                  className={`w-9 h-5 rounded-full p-0.5 transition-colors flex items-center ${
                                    hasAccess ? 'bg-[#2563eb]' : 'bg-[#2b264d]'
                                  }`}
                                >
                                  <span
                                    className={`w-4 h-4 rounded-full bg-white shadow transform transition-transform ${
                                      hasAccess ? 'translate-x-4' : 'translate-x-0'
                                    }`}
                                  />
                                </span>
                                <span
                                  className={`text-xs font-semibold ${
                                    hasAccess ? 'text-white' : 'text-slate-400'
                                  }`}
                                >
                                  Nyalakan
                                </span>
                              </button>

                              {/* Toggle Switch Matikan */}
                              <button
                                type="button"
                                onClick={() => {
                                  if (hasAccess) {
                                    handleToggleAccessMenu(selectedAccessRoleId, m.id);
                                  }
                                }}
                                className="inline-flex items-center gap-2 cursor-pointer group"
                              >
                                <span
                                  className={`w-9 h-5 rounded-full p-0.5 transition-colors flex items-center ${
                                    !hasAccess ? 'bg-[#2563eb]' : 'bg-[#2b264d]'
                                  }`}
                                >
                                  <span
                                    className={`w-4 h-4 rounded-full bg-white shadow transform transition-transform ${
                                      !hasAccess ? 'translate-x-4' : 'translate-x-0'
                                    }`}
                                  />
                                </span>
                                <span
                                  className={`text-xs font-semibold ${
                                    !hasAccess ? 'text-white' : 'text-slate-400'
                                  }`}
                                >
                                  Matikan
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Footer Pagination Persis Gambar 2 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 mt-4 border-t border-[#241f44] text-xs text-slate-400">
                <div>
                  Showing 1 to {db.user_menu?.length || 0} of {db.user_menu?.length || 0} entries
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="px-3 py-1 rounded-lg bg-[#191534] text-slate-500">
                    Previous
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#2563eb] text-white font-bold">
                    1
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#191534] text-slate-500">
                    Next
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ==================== VIEW 12: SUBMENU MANAGEMENT / TABEL user_sub_menu (Gambar 5) ==================== */}
          {activeView === 'db-user-submenu' && (
            <div className="rounded-2xl border border-[#262246] bg-[#110f24] text-white p-6 shadow-2xl">
              {/* Header Bar Persis Gambar 5 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#241f44]">
                <div className="flex items-center gap-2.5">
                  <Menu className="w-5 h-5 text-white" />
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    Submenu Management
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search submenu..."
                      value={tableSearch}
                      onChange={(e) => setTableSearch(e.target.value)}
                      className="pl-9 pr-4 py-1.5 rounded-full bg-[#1a1636] border border-[#322b5e] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#3b82f6]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingSubMenuId(null);
                      setSubMenuForm({
                        menu_id: 1,
                        title: '',
                        url: '',
                        icon: 'fas fa-fw fa-folder',
                        is_active: 1
                      });
                      setSubMenuModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>New Submenu</span>
                  </button>
                </div>
              </div>

              {/* Tabel Submenu Management Persis Gambar 5 */}
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#1a1638] text-[#9d7bff] border-b border-[#2d2654]">
                      <th className="py-3.5 px-4 font-bold w-14">#</th>
                      <th className="py-3.5 px-4 font-bold">Title</th>
                      <th className="py-3.5 px-4 font-bold">Menu</th>
                      <th className="py-3.5 px-4 font-bold">URL</th>
                      <th className="py-3.5 px-4 font-bold">Icon</th>
                      <th className="py-3.5 px-4 font-bold text-center">Status</th>
                      <th className="py-3.5 px-4 font-bold text-center w-52">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#221d42]">
                    {(db.user_sub_menu || [])
                      .filter(
                        (sm) =>
                          sm.title.toLowerCase().includes(tableSearch.toLowerCase()) ||
                          sm.url.toLowerCase().includes(tableSearch.toLowerCase())
                      )
                      .map((sm, index) => {
                        const menuName =
                          db.user_menu?.find((m) => m.id === sm.menu_id)?.menu ||
                          `Menu #${sm.menu_id}`;
                        return (
                          <tr
                            key={sm.id}
                            className="hover:bg-[#181432] transition-colors"
                          >
                            <td className="py-3.5 px-4 text-slate-200 font-medium">
                              {index + 1}
                            </td>
                            <td className="py-3.5 px-4 text-white font-semibold">
                              {sm.title}
                            </td>
                            <td className="py-3.5 px-4 text-slate-200">{menuName}</td>
                            <td className="py-3.5 px-4 text-slate-300 font-mono text-xs">
                              {sm.url}
                            </td>
                            <td className="py-3.5 px-4 text-slate-300 font-mono text-xs">
                              {sm.icon}
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <button
                                type="button"
                                onClick={() => handleToggleSubMenuActive(sm.id)}
                                className={`px-3 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                                  sm.is_active === 1
                                    ? 'bg-[#16a34a] text-white'
                                    : 'bg-[#dc2626] text-white'
                                }`}
                              >
                                {sm.is_active === 1 ? 'Active' : 'Inactive'}
                              </button>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingSubMenuId(sm.id);
                                    setSubMenuForm({
                                      menu_id: sm.menu_id,
                                      title: sm.title,
                                      url: sm.url,
                                      icon: sm.icon,
                                      is_active: sm.is_active
                                    });
                                    setSubMenuModalOpen(true);
                                  }}
                                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 text-xs font-bold transition-all cursor-pointer"
                                >
                                  <span>✏️</span>
                                  <span>Edit</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteSubMenu(sm.id)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ef4444] hover:bg-[#dc2626] text-white text-xs font-bold transition-all cursor-pointer"
                                >
                                  <span>🗑️</span>
                                  <span>Delete</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================== VIEW 13: DATABASE & SQL SCHEMA EXPLORER (company_db) ==================== */}
          {activeView === 'database-viewer' && (
            <div className="space-y-6">
              <div className={`rounded-2xl border p-6 shadow-sm ${bgCard}`}>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-gray-100 dark:border-gray-800">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0f9b7a]">
                      Database Name: company_db (MySQL / MariaDB + Next.js Hybrid)
                    </span>
                    <h2 className={`text-2xl font-bold mt-1 ${textHeading}`}>
                      Struktur Database `company_db` (5 Tabel Menu RBAC + CMS Profil)
                    </h2>
                    <p className={`text-sm mt-1 ${textMuted}`}>
                      Sesuai spesifikasi Anda, database bernama{' '}
                      <code className="text-[#0f9b7a] font-bold font-mono">company_db</code>{' '}
                      memiliki 5 tabel utama manajemen user &amp; menu:{' '}
                      <code>user</code>, <code>user_role</code>, <code>user_menu</code>,{' '}
                      <code>user_access_menu</code>, dan <code>user_sub_menu</code>. File SQL siap
                      import tersedia di{' '}
                      <code className="text-[#ea7c00] font-mono">database/company_db.sql</code>.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const blob = new Blob([JSON.stringify(db, null, 2)], {
                          type: 'application/json'
                        });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'company_db.json';
                        a.click();
                        notify('File company_db.json berhasil di-download!');
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[#315cf6] text-white text-xs font-bold shadow-sm"
                    >
                      Download company_db.json
                    </button>
                  </div>
                </div>

                {/* Ringkasan 5 Tabel Utama company_db + Tabel CMS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
                  {[
                    {
                      table: '1. Manajemen Akun (Tabel: user)',
                      rows: `${db.user?.length || 0} Baris`,
                      cols: 'id, username, email, phone, image, password, role_id, is_active, date_create',
                      view: 'db-user' as ActiveView
                    },
                    {
                      table: '2. Role Management (Tabel: user_role)',
                      rows: `${db.user_role?.length || 0} Baris (Admin & User)`,
                      cols: 'id, role',
                      view: 'db-user-role' as ActiveView
                    },
                    {
                      table: '3. Menu Management (Tabel: user_menu)',
                      rows: `${db.user_menu?.length || 0} Baris (Admin, User, Menu)`,
                      cols: 'id, menu',
                      view: 'db-user-menu' as ActiveView
                    },
                    {
                      table: '4. Role Access Management (user_access_menu)',
                      rows: `${db.user_access_menu?.length || 0} Baris`,
                      cols: 'id, role_id, menu_id',
                      view: 'db-user-access' as ActiveView
                    },
                    {
                      table: '5. Submenu Management (user_sub_menu)',
                      rows: `${db.user_sub_menu?.length || 0} Baris`,
                      cols: 'id, menu_id, title, url, icon, is_active',
                      view: 'db-user-submenu' as ActiveView
                    },
                    {
                      table: '6. CMS Skills & Katalog Website',
                      rows: `${db.skills.length} Skills • ${db.portfolio.length} Proyek`,
                      cols: 'skills, portfolio_projects, services, orders',
                      view: 'cms-skills' as ActiveView
                    }
                  ].map((tb) => (
                    <div
                      key={tb.table}
                      className={`p-4 rounded-xl border ${borderCol} flex flex-col justify-between gap-3`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <code className="text-xs font-bold text-[#315cf6]">{tb.table}</code>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0f9b7a]/15 text-[#0f9b7a]">
                            {tb.rows}
                          </span>
                        </div>
                        <p className={`text-xs mt-2 font-mono ${textMuted}`}>
                          Kolom: {tb.cols}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigateView(tb.view)}
                        className="text-left text-xs font-bold text-[#ea7c00] hover:underline cursor-pointer"
                      >
                        Buka &amp; Kelola Tabel →
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview Skema SQL company_db */}
              <div className={`rounded-2xl border p-6 shadow-sm ${bgCard}`}>
                <h3 className={`text-lg font-bold mb-2 ${textHeading}`}>
                  Preview Skema SQL (`database/company_db.sql`)
                </h3>
                <pre className="p-4 rounded-xl bg-[#0d1119] text-[#d8e0e7] text-xs font-mono overflow-x-auto leading-relaxed">
{`CREATE DATABASE IF NOT EXISTS company_db;
USE company_db;

-- Tabel: user_role (Admin & User)
CREATE TABLE user_role (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  role VARCHAR(128) NOT NULL
);

-- Tabel: user (Manajemen Akun)
CREATE TABLE user (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(128) NOT NULL,
  email VARCHAR(128) NOT NULL UNIQUE,
  phone VARCHAR(30) NOT NULL,
  image VARCHAR(255) NOT NULL,
  password VARCHAR(256) NOT NULL,
  role_id INT(11) NOT NULL,
  is_active INT(1) NOT NULL DEFAULT 1,
  date_create DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabel: user_menu (Admin, User, Menu)
CREATE TABLE user_menu (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  menu VARCHAR(128) NOT NULL
);

-- Tabel: user_access_menu (Role Access Management)
CREATE TABLE user_access_menu (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  role_id INT(11) NOT NULL,
  menu_id INT(11) NOT NULL
);

-- Tabel: user_sub_menu (Submenu Management)
CREATE TABLE user_sub_menu (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  menu_id INT(11) NOT NULL,
  title VARCHAR(128) NOT NULL,
  url VARCHAR(128) NOT NULL,
  icon VARCHAR(128) NOT NULL,
  is_active INT(1) NOT NULL DEFAULT 1
);`}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* ==================== FOOTER (APPDASHBOARD) ==================== */}
        <footer className={`mt-12 border-t py-5 px-6 ${bgHeader}`}>
          <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2.5">
              <img
                src={`${DASH_IMG}/logo.webp`}
                alt="AppDashboard"
                className="w-6 h-6 object-contain"
              />
              <div>
                <strong className={textHeading}>AppDashboard</strong>{' '}
                <span className={textMuted}>— Operational admin workspace</span>
              </div>
            </div>
            <div className={`flex items-center gap-4 ${textMuted}`}>
              <Link href="/#about" className="hover:text-[#315cf6]">
                About
              </Link>
              <Link href="/#pricing" className="hover:text-[#315cf6]">
                Pricing
              </Link>
              <Link href="/#contact" className="hover:text-[#315cf6]">
                Contact
              </Link>
              <span>© 2026 AppDashboard. All Rights Reserved.</span>
            </div>
          </div>
        </footer>
      </main>

      {/* Modal: Add / Edit User (Manajemen Akun) */}
      {userModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-modal-backdrop-in">
          <div className="rounded-2xl border border-[#2d2654] bg-[#13102a] text-white animate-modal-card-in max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#26204a]">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {editingUserId !== null ? 'Edit User' : 'Tambah User Baru'}
                </h3>
                <p className="text-xs text-[#a599e9]">
                  Admin Suite / User Management &amp; Permissions
                </p>
              </div>
              <button
                type="button"
                onClick={() => setUserModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddUser} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Username</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: syauqi_admin"
                  value={userForm.username}
                  onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm focus:outline-none focus:border-[#8b5cf6]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  required
                  placeholder="user@company.id"
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm focus:outline-none focus:border-[#8b5cf6]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Phone</label>
                <input
                  type="text"
                  required
                  placeholder="+62 812-xxxx-xxxx"
                  value={userForm.phone}
                  onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm focus:outline-none focus:border-[#8b5cf6]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Role</label>
                  <select
                    value={userForm.role_id}
                    onChange={(e) =>
                      setUserForm({ ...userForm, role_id: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm focus:outline-none"
                  >
                    {(db.user_role || []).map((r) => (
                      <option key={r.id} value={r.id} className="bg-[#13102a] text-white">
                        {r.role}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Status</label>
                  <select
                    value={userForm.is_active}
                    onChange={(e) =>
                      setUserForm({ ...userForm, is_active: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm focus:outline-none"
                  >
                    <option value={1} className="bg-[#13102a] text-white">
                      Active (1)
                    </option>
                    <option value={0} className="bg-[#13102a] text-white">
                      Inactive (0)
                    </option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setUserModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] hover:from-[#7c3aed] hover:to-[#5b21b6] text-white text-xs font-bold shadow-lg"
                >
                  {editingUserId !== null ? 'Save Changes' : 'Tambah User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add / Edit Role (Role Management) */}
      {roleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-modal-backdrop-in">
          <div className="rounded-2xl border border-[#2d2654] bg-[#13102a] text-white animate-modal-card-in max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#26204a]">
              <h3 className="text-lg font-bold text-white">
                {editingRoleId !== null ? 'Edit Role' : 'Add New Role'}
              </h3>
              <button
                type="button"
                onClick={() => setRoleModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddRole} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Role Name</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Admin / User"
                  value={roleForm.role}
                  onChange={(e) => setRoleForm({ role: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm focus:outline-none focus:border-[#2563eb]"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRoleModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold"
                >
                  Save Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add / Edit Menu (Menu Management) */}
      {menuModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-modal-backdrop-in">
          <div className="rounded-2xl border border-[#2d2654] bg-[#13102a] text-white animate-modal-card-in max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#26204a]">
              <h3 className="text-lg font-bold text-white">
                {editingMenuId !== null ? 'Edit Menu' : 'New Menu'}
              </h3>
              <button
                type="button"
                onClick={() => setMenuModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddMenu} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Menu Name</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Admin / User / Menu"
                  value={menuForm.menu}
                  onChange={(e) => setMenuForm({ menu: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm focus:outline-none focus:border-[#2563eb]"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setMenuModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold"
                >
                  Save Menu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add / Edit Submenu (Submenu Management) */}
      {subMenuModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-modal-backdrop-in">
          <div className="rounded-2xl border border-[#2d2654] bg-[#13102a] text-white animate-modal-card-in max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#26204a]">
              <h3 className="text-lg font-bold text-white">
                {editingSubMenuId !== null ? 'Edit Submenu' : 'New Submenu'}
              </h3>
              <button
                type="button"
                onClick={() => setSubMenuModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddSubMenu} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Dashboard / Role / User Management"
                  value={subMenuForm.title}
                  onChange={(e) => setSubMenuForm({ ...subMenuForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm focus:outline-none focus:border-[#2563eb]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Menu</label>
                <select
                  value={subMenuForm.menu_id}
                  onChange={(e) =>
                    setSubMenuForm({ ...subMenuForm, menu_id: Number(e.target.value) })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm focus:outline-none"
                >
                  {(db.user_menu || []).map((m) => (
                    <option key={m.id} value={m.id} className="bg-[#13102a] text-white">
                      {m.menu}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">URL</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: admin/role atau menu/submenu"
                  value={subMenuForm.url}
                  onChange={(e) => setSubMenuForm({ ...subMenuForm, url: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm font-mono focus:outline-none focus:border-[#2563eb]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Icon</label>
                <input
                  type="text"
                  required
                  placeholder="fas fa-fw fa-tachometer-alt"
                  value={subMenuForm.icon}
                  onChange={(e) => setSubMenuForm({ ...subMenuForm, icon: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm font-mono focus:outline-none focus:border-[#2563eb]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Status</label>
                <select
                  value={subMenuForm.is_active}
                  onChange={(e) =>
                    setSubMenuForm({ ...subMenuForm, is_active: Number(e.target.value) })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm focus:outline-none"
                >
                  <option value={1} className="bg-[#13102a] text-white">
                    Active
                  </option>
                  <option value={0} className="bg-[#13102a] text-white">
                    Inactive
                  </option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSubMenuModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold"
                >
                  Save Submenu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Layanan Jasa Pembuatan Website (cms-services) */}
      {serviceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-modal-backdrop-in">
          <div className="rounded-2xl border border-[#2d2654] bg-[#13102a] text-white animate-modal-card-in max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#26204a]">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400">
                  ✏️ Edit Layanan Jasa Pembuatan Website
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Layanan #{srvForm.number || '01'} — Frontend &amp; Backend
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setServiceModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddService} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Nomor Urut
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="01"
                    value={srvForm.number}
                    onChange={(e) => setSrvForm({ ...srvForm, number: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm font-mono focus:outline-none focus:border-[#eab308]"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Nama Layanan Jasa Website
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Layanan Jasa Website..."
                    value={srvForm.title}
                    onChange={(e) => setSrvForm({ ...srvForm, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm focus:outline-none focus:border-[#eab308]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Deskripsi Cakupan Kerja (Frontend, Backend &amp; Database)
                </label>
                <textarea
                  rows={4}
                  required
                  value={srvForm.description}
                  onChange={(e) => setSrvForm({ ...srvForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm leading-relaxed focus:outline-none focus:border-[#eab308]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setServiceModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 text-xs font-extrabold shadow-lg cursor-pointer"
                >
                  💾 Simpan Perubahan Layanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Skill Teknik Informatika (cms-skills) */}
      {skillModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-modal-backdrop-in">
          <div className="rounded-2xl border border-[#2d2654] bg-[#13102a] text-white animate-modal-card-in max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#26204a]">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400">
                  ✏️ Edit Skill Frontend &amp; Backend
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{skillForm.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSkillModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddSkill} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Nama Bahasa / Framework / Database
                </label>
                <input
                  type="text"
                  required
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-300 mb-1">Kategori</label>
                  <button
                    type="button"
                    onClick={() => setModalSkillCatDropdownOpen(!modalSkillCatDropdownOpen)}
                    className="w-full px-3 py-2 rounded-xl border border-[#463b84] bg-[#1a1636] text-white text-xs font-bold flex items-center justify-between cursor-pointer"
                  >
                    <span className="truncate">{skillForm.category}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  </button>
                  {modalSkillCatDropdownOpen && (
                    <div className="mt-1.5 rounded-xl border-2 border-[#6d5ce7] bg-[#110e26] p-2 shadow-2xl space-y-1.5 z-50">
                      <div className="max-h-40 overflow-y-auto space-y-1">
                        {allSkillCategories.map((cat) => (
                          <div
                            key={cat}
                            onClick={() => {
                              setSkillForm({ ...skillForm, category: cat });
                              setModalSkillCatDropdownOpen(false);
                            }}
                            className={`px-2.5 py-1.5 rounded-lg text-xs cursor-pointer flex items-center justify-between ${
                              skillForm.category === cat
                                ? 'bg-gradient-to-r from-[#8b5cf6] to-[#2563eb] text-white font-extrabold'
                                : 'bg-[#1c173d] hover:bg-[#2a225a] text-white'
                            }`}
                          >
                            <span className="truncate">{cat}</span>
                            {skillForm.category === cat && <Check className="w-3.5 h-3.5 shrink-0" />}
                          </div>
                        ))}
                      </div>
                      <div className="pt-1.5 border-t border-[#2d2654] flex items-center gap-1">
                        <input
                          type="text"
                          placeholder="Kategori baru..."
                          value={newSkillCategoryName}
                          onChange={(e) => setNewSkillCategoryName(e.target.value)}
                          className="flex-1 px-2 py-1 rounded-lg border border-[#463b84] bg-[#1a1538] text-white text-[11px]"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddCustomSkillCategory(true)}
                          className="px-2 py-1 rounded-lg bg-[#ea7c00] text-white text-[11px] font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Level ({skillForm.level}%)
                  </label>
                  <input
                    type="number"
                    min={50}
                    max={100}
                    value={skillForm.level}
                    onChange={(e) =>
                      setSkillForm({ ...skillForm, level: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Badge</label>
                  <input
                    type="text"
                    value={skillForm.badge}
                    onChange={(e) => setSkillForm({ ...skillForm, badge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Deskripsi</label>
                <textarea
                  rows={3}
                  required
                  value={skillForm.description}
                  onChange={(e) => setSkillForm({ ...skillForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSkillModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 text-xs font-extrabold cursor-pointer"
                >
                  💾 Simpan Perubahan Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Portofolio (cms-portfolio) */}
      {portfolioModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-modal-backdrop-in">
          <div className="rounded-2xl border border-[#2d2654] bg-[#13102a] text-white animate-modal-card-in max-w-lg w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto animate-modal-card-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#26204a]">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400">
                  ✏️ Edit Proyek Portofolio Website
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{portForm.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setPortfolioModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddPortfolio} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Judul Proyek</label>
                <input
                  type="text"
                  required
                  value={portForm.title}
                  onChange={(e) => setPortForm({ ...portForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Subjudul</label>
                  <input
                    type="text"
                    required
                    value={portForm.subtitle}
                    onChange={(e) => setPortForm({ ...portForm, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm"
                  />
                </div>
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Kategori (Pilih / Buat Sendiri)
                  </label>
                  <button
                    type="button"
                    onClick={() => setModalPortCatDropdownOpen(!modalPortCatDropdownOpen)}
                    className="w-full px-3.5 py-2 rounded-xl border-2 border-[#463b84] bg-[#1e193f] text-white text-sm font-bold flex items-center justify-between cursor-pointer"
                  >
                    <span className="truncate">{portForm.category || 'Company Profile'}</span>
                    <ChevronDown className="w-4 h-4 text-amber-400 shrink-0" />
                  </button>
                </div>
              </div>

              {/* Custom Dropdown Kategori di dalam Modal Edit Portofolio */}
              {modalPortCatDropdownOpen && (
                <div className="rounded-2xl border-2 border-[#6d5ce7] bg-[#110e26] p-2.5 shadow-2xl space-y-2">
                  <div className="flex items-center justify-between px-2 py-1 border-b border-[#2a2352]">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#c4b5fd]">
                      Pilih atau Buat Kategori Sendiri
                    </span>
                    <button
                      type="button"
                      onClick={() => setModalPortCatDropdownOpen(false)}
                      className="text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1">
                    {allPortfolioCategories.map((cat) => {
                      const isSelected = portForm.category === cat;
                      return (
                        <div
                          key={cat}
                          onClick={() => {
                            setPortForm({ ...portForm, category: cat });
                            setModalPortCatDropdownOpen(false);
                          }}
                          className={`px-3 py-2 rounded-xl flex items-center justify-between text-xs cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#8b5cf6] to-[#2563eb] text-white font-extrabold'
                              : 'bg-[#1c173d] hover:bg-[#2a225a] text-white font-semibold'
                          }`}
                        >
                          <span>{cat}</span>
                          {isSelected && <Check className="w-4 h-4 text-amber-300" />}
                        </div>
                      );
                    })}
                  </div>
                  <div className="pt-2 border-t border-[#2d2654] flex items-center gap-1.5">
                    <input
                      type="text"
                      placeholder="Ketik kategori baru sendiri..."
                      value={newPortCategoryName}
                      onChange={(e) => setNewPortCategoryName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddCustomPortfolioCategory(true);
                        }
                      }}
                      className="flex-1 px-3 py-1.5 rounded-xl border border-[#463b84] bg-[#1a1538] text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddCustomPortfolioCategory(true)}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#ea7c00] to-amber-500 text-white text-xs font-extrabold cursor-pointer shrink-0"
                    >
                      + Buat
                    </button>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Link URL Website / Demo Proyek (`target=&quot;_blank&quot;`)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Contoh: https://demo-web.vercel.app atau /#pricing"
                    value={portForm.link}
                    onChange={(e) => setPortForm({ ...portForm, link: e.target.value })}
                    className="flex-1 px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm font-mono"
                  />
                  {portForm.link && (
                    <a
                      href={portForm.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold inline-flex items-center gap-1 shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Buka (_blank)</span>
                    </a>
                  )}
                </div>
              </div>
              {/* Upload Gambar Proyek Portofolio inside Modal */}
              <div className="rounded-xl border border-[#322b5e] bg-[#15122e] p-3.5 space-y-2.5">
                <label className="block text-xs font-bold text-slate-200">
                  🖼️ Upload Gambar Proyek / Thumbnail (`target=&quot;_blank&quot;`)
                </label>
                <div className="flex items-start gap-3">
                  {portForm.image && (
                    <a
                      href={portForm.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (portForm.image.startsWith('data:image/')) {
                          e.preventDefault();
                          openImageNewTab(portForm.image, portForm.title || 'Gambar Portofolio');
                        }
                      }}
                      className="relative group w-20 h-20 rounded-xl overflow-hidden border border-[#322b5e] shrink-0 block"
                      title="Klik gambar untuk buka di tab baru (_blank)"
                    >
                      <img
                        src={portForm.image}
                        alt="Preview Thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </a>
                  )}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] hover:from-[#7c3aed] hover:to-[#4f46e5] text-white text-xs font-bold shadow-lg cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>
                          {uploadingImage ? 'Mengupload...' : 'Pilih / Upload Gambar'}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            handleUploadImageFile(file, (url) =>
                              setPortForm((prev) => ({ ...prev, image: url }))
                            );
                            e.target.value = '';
                          }}
                        />
                      </label>
                      {portForm.image && (
                        <a
                          href={portForm.image}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            if (portForm.image.startsWith('data:image/')) {
                              e.preventDefault();
                              openImageNewTab(
                                portForm.image,
                                portForm.title || 'Gambar Portofolio'
                              );
                            }
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#252142] hover:bg-[#322c56] border border-[#383163] text-purple-300 text-xs font-bold inline-flex items-center gap-1 shrink-0"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Lihat Gambar (_blank)</span>
                        </a>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="https://... atau /uploads/..."
                      value={portForm.image}
                      onChange={(e) => setPortForm({ ...portForm, image: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Tags</label>
                <input
                  type="text"
                  value={portForm.tags}
                  onChange={(e) => setPortForm({ ...portForm, tags: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Deskripsi</label>
                <textarea
                  rows={3}
                  value={portForm.description}
                  onChange={(e) => setPortForm({ ...portForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPortfolioModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSavingAction}
                  className="px-5 py-2 rounded-xl bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 text-xs font-extrabold cursor-pointer flex items-center gap-1.5 transition-all"
                >
                  {isSavingAction ? (
                    <>
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-950 border-t-transparent animate-spin shrink-0" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <span>💾 Simpan Perubahan Portofolio</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Tim Spesialisasi (cms-team) */}
      {teamModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-modal-backdrop-in">
          <div className="rounded-2xl border border-[#2d2654] bg-[#13102a] text-white animate-modal-card-in max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#26204a]">
              <h3 className="text-lg font-bold text-white">✏️ Edit Tim Spesialisasi</h3>
              <button
                type="button"
                onClick={() => setTeamModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddTeam} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Nama / Role</label>
                <input
                  type="text"
                  required
                  value={teamForm.name}
                  onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Spesialisasi</label>
                <input
                  type="text"
                  required
                  value={teamForm.position}
                  onChange={(e) => setTeamForm({ ...teamForm, position: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Deskripsi</label>
                <textarea
                  rows={3}
                  required
                  value={teamForm.bio}
                  onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm"
                />
              </div>
              <div className="rounded-xl border border-[#322b5e] bg-[#15122e] p-3 space-y-2">
                <label className="block text-xs font-bold text-slate-300">
                  🖼️ Upload Foto / Gambar Spesialisasi
                </label>
                <div className="flex items-center gap-3">
                  {teamForm.image && (
                    <a
                      href={teamForm.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (teamForm.image.startsWith('data:image/')) {
                          e.preventDefault();
                          openImageNewTab(teamForm.image, teamForm.name || 'Foto Tim');
                        }
                      }}
                      className="w-14 h-14 rounded-xl overflow-hidden border border-[#322b5e] shrink-0 block"
                    >
                      <img
                        src={teamForm.image}
                        alt="Preview Tim"
                        className="w-full h-full object-cover object-top"
                      />
                    </a>
                  )}
                  <div className="flex-1 space-y-1.5">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] hover:from-[#7c3aed] hover:to-[#4f46e5] text-white text-xs font-bold cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingImage ? 'Mengupload...' : 'Pilih / Upload Gambar'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          handleUploadImageFile(file, (url) =>
                            setTeamForm((prev) => ({ ...prev, image: url }))
                          );
                          e.target.value = '';
                        }}
                      />
                    </label>
                    <input
                      type="text"
                      value={teamForm.image}
                      onChange={(e) => setTeamForm({ ...teamForm, image: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-[#322b5e] bg-[#1a1636] text-white text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-[#322b5e] bg-[#15122e]">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-200">Status Publikasi</span>
                  <span
                    className={`text-[11px] font-semibold flex items-center gap-1 ${
                      teamForm.is_public ? 'text-emerald-400' : 'text-slate-400'
                    }`}
                  >
                    {teamForm.is_public ? (
                      <>
                        <Eye className="w-3 h-3 text-emerald-400" /> Tampil di Website (Public)
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3 text-slate-400" /> Disembunyikan (No Public)
                      </>
                    )}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setTeamForm({ ...teamForm, is_public: !teamForm.is_public })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                    teamForm.is_public ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                  title={teamForm.is_public ? 'Ubah ke No Public' : 'Ubah ke Public'}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      teamForm.is_public ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setTeamModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 text-xs font-extrabold cursor-pointer"
                >
                  💾 Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Pesan Klien (messages) */}
      {messageModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-modal-backdrop-in">
          <div className="rounded-2xl border border-[#2d2654] bg-[#13102a] text-white animate-modal-card-in max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#26204a]">
              <h3 className="text-lg font-bold text-white">✏️ Edit Pesan Klien</h3>
              <button
                type="button"
                onClick={() => setMessageModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveMessage} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Nama Klien</label>
                <input
                  type="text"
                  required
                  value={messageForm.name}
                  onChange={(e) => setMessageForm({ ...messageForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={messageForm.email}
                  onChange={(e) => setMessageForm({ ...messageForm, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Subjek</label>
                <input
                  type="text"
                  required
                  value={messageForm.subject}
                  onChange={(e) => setMessageForm({ ...messageForm, subject: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Pesan</label>
                <textarea
                  rows={3}
                  required
                  value={messageForm.message}
                  onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setMessageModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 text-xs font-extrabold cursor-pointer"
                >
                  💾 Simpan Pesan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add / Edit Order Jasa Website */}
      {newOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-modal-backdrop-in">
          <div className="rounded-2xl border border-[#2d2654] bg-[#13102a] text-white animate-modal-card-in max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#26204a]">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400">
                  {editingOrderId !== null
                    ? '✏️ Edit Order Jasa Website'
                    : '+ Order Jasa Pembuatan Website Baru'}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {editingOrderId !== null
                    ? `Edit Order ${orderForm.orderNumber}`
                    : 'Buat Order Pembuatan Website'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setNewOrderModal(false);
                  setEditingOrderId(null);
                }}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateOrder} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Nama Klien / Instansi
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: SMA Negeri 1 / PT Maju Jaya"
                  value={orderForm.customerName}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, customerName: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Email Klien
                </label>
                <input
                  type="email"
                  required
                  placeholder="klien@instansi.id"
                  value={orderForm.customerEmail}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, customerEmail: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Paket Jasa Pembuatan Website
                </label>
                <input
                  type="text"
                  required
                  value={orderForm.product}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, product: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Nilai Proyek (Harga)
                  </label>
                  <input
                    type="text"
                    required
                    value={orderForm.amount}
                    onChange={(e) =>
                      setOrderForm({ ...orderForm, amount: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Status Order
                  </label>
                  <select
                    value={orderForm.status}
                    onChange={(e) =>
                      setOrderForm({ ...orderForm, status: e.target.value })
                    }
                    style={{ colorScheme: 'dark' }}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm cursor-pointer"
                  >
                    <option value="Completed" className="bg-[#13102a] text-white">
                      Completed
                    </option>
                    <option value="Pending" className="bg-[#13102a] text-white">
                      Pending
                    </option>
                    <option value="Cancelled" className="bg-[#13102a] text-white">
                      Cancelled
                    </option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setNewOrderModal(false);
                    setEditingOrderId(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 text-xs font-extrabold shadow-lg cursor-pointer"
                >
                  {editingOrderId !== null ? '💾 Simpan Perubahan Order' : '+ Simpan Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Paket Harga Website (cms-pricing) */}
      {pricingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-modal-backdrop-in">
          <div className="rounded-2xl border border-[#2d2654] bg-[#13102a] text-white animate-modal-card-in max-w-lg w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#26204a]">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400">
                  ✏️ Edit Paket Harga Website
                </span>
                <h3 className="text-lg font-bold text-white">{pricingForm.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setPricingModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSavePricing} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Nama Paket Website
                </label>
                <input
                  type="text"
                  required
                  value={pricingForm.name}
                  onChange={(e) => setPricingForm({ ...pricingForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Harga</label>
                  <input
                    type="text"
                    required
                    value={pricingForm.price}
                    onChange={(e) => setPricingForm({ ...pricingForm, price: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Periode</label>
                  <input
                    type="text"
                    required
                    value={pricingForm.period}
                    onChange={(e) => setPricingForm({ ...pricingForm, period: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Deskripsi</label>
                <textarea
                  rows={2}
                  required
                  value={pricingForm.description}
                  onChange={(e) =>
                    setPricingForm({ ...pricingForm, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-blue-300 mb-1 flex items-center gap-1.5">
                  <span>🎯 Cocok untuk:</span>
                  <span className="text-[10px] text-slate-400 font-normal">(Target pengguna / rekomendasi)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Contoh: Cocok untuk Company Profile, Toko Online, UMKM..."
                  value={pricingForm.suitableFor}
                  onChange={(e) =>
                    setPricingForm({ ...pricingForm, suitableFor: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                  <span>📝 Catatan:</span>
                  <span className="text-[10px] text-slate-400 font-normal">(Scope, hosting, ketentuan proyek)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Contoh: Harga berlaku untuk scope yang disepakati..."
                  value={pricingForm.note}
                  onChange={(e) =>
                    setPricingForm({ ...pricingForm, note: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Daftar Fitur (1 Baris = 1 Fitur)
                </label>
                <textarea
                  rows={6}
                  required
                  value={pricingForm.features}
                  onChange={(e) =>
                    setPricingForm({ ...pricingForm, features: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-xs font-mono"
                />
              </div>
              <label className="flex items-center gap-2 p-2.5 rounded-xl border border-[#322b5e] bg-[#1a1636] cursor-pointer">
                <input
                  type="checkbox"
                  checked={pricingForm.featured}
                  onChange={(e) =>
                    setPricingForm({
                      ...pricingForm,
                      featured: e.target.checked,
                      badge: e.target.checked ? 'Paling Diminati' : ''
                    })
                  }
                  className="w-4 h-4 accent-[#8b5cf6]"
                />
                <span className="text-xs font-bold text-amber-300">
                  ⭐ Paket Paling Diminati (Popular Badge)
                </span>
              </label>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPricingModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 text-xs font-extrabold cursor-pointer"
                >
                  💾 Simpan Paket Harga
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Katalog Paket Website (cms-simpus) */}
      {simpusModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-modal-backdrop-in">
          <div className="rounded-2xl border border-[#2d2654] bg-[#13102a] text-white animate-modal-card-in max-w-lg w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#26204a]">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400">
                  ✏️ Edit Katalog Paket Website
                </span>
                <h3 className="text-lg font-bold text-white line-clamp-1">{simpusForm.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSimpusModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveSimpusBook} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Kode Paket Web</label>
                  <input
                    type="text"
                    required
                    value={simpusForm.code}
                    onChange={(e) => setSimpusForm({ ...simpusForm, code: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Arsitektur Sistem</label>
                  <input
                    type="text"
                    required
                    value={simpusForm.shelf}
                    onChange={(e) => setSimpusForm({ ...simpusForm, shelf: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Nama Paket Website</label>
                <input
                  type="text"
                  required
                  value={simpusForm.title}
                  onChange={(e) => setSimpusForm({ ...simpusForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Tim Developer / Tech Stack</label>
                  <input
                    type="text"
                    required
                    value={simpusForm.author}
                    onChange={(e) => setSimpusForm({ ...simpusForm, author: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Kategori Website</label>
                  <input
                    type="text"
                    required
                    value={simpusForm.category}
                    onChange={(e) => setSimpusForm({ ...simpusForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-xs"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Tahun Rilis</label>
                  <input
                    type="number"
                    required
                    value={simpusForm.year}
                    onChange={(e) =>
                      setSimpusForm({ ...simpusForm, year: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Slot Proyek</label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={simpusForm.stock}
                    onChange={(e) =>
                      setSimpusForm({ ...simpusForm, stock: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Rating Klien</label>
                  <input
                    type="text"
                    required
                    value={simpusForm.rating}
                    onChange={(e) =>
                      setSimpusForm({ ...simpusForm, rating: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Link Live Demo Website (_blank)
                </label>
                <input
                  type="text"
                  value={simpusForm.link}
                  onChange={(e) => setSimpusForm({ ...simpusForm, link: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-xs font-mono"
                />
              </div>
              <div className="p-3 rounded-xl border border-[#2d2654] bg-[#181432] flex items-center gap-3">
                <img
                  src={
                    simpusForm.image ||
                    'https://bootstrapmade.com/content/demo/Strive/assets/img/portfolio/portfolio-1.webp'
                  }
                  alt={simpusForm.title}
                  className="w-16 h-14 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 space-y-1.5">
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#8b5cf6] text-white text-xs font-bold cursor-pointer">
                    <span>📁 Upload Preview Paket Web</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        handleUploadImageFile(file, (url) =>
                          setSimpusForm((prev) => ({ ...prev, image: url }))
                        );
                        e.target.value = '';
                      }}
                    />
                  </label>
                  <input
                    type="text"
                    value={simpusForm.image}
                    onChange={(e) => setSimpusForm({ ...simpusForm, image: e.target.value })}
                    className="w-full px-2.5 py-1 rounded-lg border border-[#322b5e] bg-[#1a1636] text-white text-[11px] font-mono"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSimpusModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 text-xs font-extrabold cursor-pointer"
                >
                  💾 Simpan Paket Website
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Tab Spesialisasi (cms-about) */}
      {aboutTabModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-modal-backdrop-in">
          <div className="rounded-2xl border border-[#2d2654] bg-[#13102a] text-white animate-modal-card-in max-w-lg w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#26204a]">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400">
                  ✏️ Edit Tab Spesialisasi (#about)
                </span>
                <h3 className="text-lg font-bold text-white">{aboutTabForm.tabLabel}</h3>
              </div>
              <button
                type="button"
                onClick={() => setAboutTabModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveAboutTab} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Label Tab</label>
                <input
                  type="text"
                  required
                  value={aboutTabForm.tabLabel}
                  onChange={(e) => setAboutTabForm({ ...aboutTabForm, tabLabel: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Judul Konten</label>
                <input
                  type="text"
                  required
                  value={aboutTabForm.title}
                  onChange={(e) => setAboutTabForm({ ...aboutTabForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Deskripsi</label>
                <textarea
                  rows={3}
                  required
                  value={aboutTabForm.description}
                  onChange={(e) =>
                    setAboutTabForm({ ...aboutTabForm, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Badge Keunggulan Tab
                </label>
                <input
                  type="text"
                  required
                  value={aboutTabForm.badge}
                  onChange={(e) => setAboutTabForm({ ...aboutTabForm, badge: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAboutTabModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 text-xs font-extrabold cursor-pointer"
                >
                  💾 Simpan Tab Spesialisasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Kartu Keunggulan (cms-about) */}
      {featureModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-modal-backdrop-in">
          <div className="rounded-2xl border border-[#2d2654] bg-[#13102a] text-white animate-modal-card-in max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#26204a]">
              <h3 className="text-lg font-bold text-white">✏️ Edit Kartu Keunggulan (#about)</h3>
              <button
                type="button"
                onClick={() => setFeatureModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveFeature} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Judul Kartu</label>
                <input
                  type="text"
                  required
                  value={featureForm.title}
                  onChange={(e) => setFeatureForm({ ...featureForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Deskripsi</label>
                <textarea
                  rows={3}
                  required
                  value={featureForm.description}
                  onChange={(e) =>
                    setFeatureForm({ ...featureForm, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#322b5e] bg-[#1a1636] text-white text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setFeatureModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 text-xs font-extrabold cursor-pointer"
                >
                  💾 Simpan Kartu Keunggulan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
