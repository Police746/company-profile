import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, saveDatabase, resetDatabase } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDatabase();
    return NextResponse.json({
      success: true,
      data: db
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to load database', error: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, section, payload, id } = body;
    const db = await getDatabase();

    if (action === 'reset' || section === 'reset') {
      const fresh = await resetDatabase();
      return NextResponse.json({
        success: true,
        message: 'Database berhasil direset ke profil Jasa Pembuatan Website & Sistem Backend.',
        data: fresh
      });
    }

    if (section === 'company' && payload) {
      db.company = { ...db.company, ...payload };
    } else if (section === 'user') {
      if (action === 'create') {
        const nextId =
          db.user.length > 0 ? Math.max(...db.user.map((u) => u.id)) + 1 : 1;
        const nowStr = new Date().toISOString().slice(0, 19).replace('T', ' ');
        db.user.push({
          id: nextId,
          username: payload.username,
          email: payload.email,
          phone: payload.phone || '+62 812-0000-0000',
          image:
            payload.image ||
            'https://bootstrapmade.com/content/demo/AppDashboard/assets/img/profile-img.webp',
          password:
            payload.password ||
            '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
          role_id: Number(payload.role_id) || 1,
          is_active: payload.is_active !== undefined ? Number(payload.is_active) : 1,
          date_create: payload.date_create || nowStr
        });
      } else if (action === 'update' && id !== undefined) {
        db.user = db.user.map((u) =>
          u.id === Number(id)
            ? {
                ...u,
                username: payload.username ?? u.username,
                email: payload.email ?? u.email,
                phone: payload.phone ?? u.phone,
                image: payload.image ?? u.image,
                password: payload.password ?? u.password,
                role_id:
                  payload.role_id !== undefined ? Number(payload.role_id) : u.role_id,
                is_active:
                  payload.is_active !== undefined
                    ? Number(payload.is_active)
                    : u.is_active
              }
            : u
        );
      } else if (action === 'toggleActive' && id !== undefined) {
        db.user = db.user.map((u) =>
          u.id === Number(id) ? { ...u, is_active: u.is_active === 1 ? 0 : 1 } : u
        );
      } else if (action === 'delete' && id !== undefined) {
        db.user = db.user.filter((u) => u.id !== Number(id));
      }
    } else if (section === 'user_role') {
      if (action === 'create') {
        const nextId =
          db.user_role.length > 0
            ? Math.max(...db.user_role.map((r) => r.id)) + 1
            : 1;
        db.user_role.push({
          id: nextId,
          role: payload.role
        });
      } else if (action === 'update' && id !== undefined) {
        db.user_role = db.user_role.map((r) =>
          r.id === Number(id) ? { ...r, role: payload.role } : r
        );
      } else if (action === 'delete' && id !== undefined) {
        db.user_role = db.user_role.filter((r) => r.id !== Number(id));
      }
    } else if (section === 'user_menu') {
      if (action === 'create') {
        const nextId =
          db.user_menu.length > 0
            ? Math.max(...db.user_menu.map((m) => m.id)) + 1
            : 1;
        db.user_menu.push({
          id: nextId,
          menu: payload.menu
        });
        // Auto-grant Admin (role_id = 1) access to new menu
        const nextAccId =
          db.user_access_menu.length > 0
            ? Math.max(...db.user_access_menu.map((a) => a.id)) + 1
            : 1;
        db.user_access_menu.push({
          id: nextAccId,
          role_id: 1,
          menu_id: nextId
        });
      } else if (action === 'update' && id !== undefined) {
        db.user_menu = db.user_menu.map((m) =>
          m.id === Number(id) ? { ...m, menu: payload.menu } : m
        );
      } else if (action === 'delete' && id !== undefined) {
        db.user_menu = db.user_menu.filter((m) => m.id !== Number(id));
        db.user_access_menu = db.user_access_menu.filter(
          (a) => a.menu_id !== Number(id)
        );
        db.user_sub_menu = db.user_sub_menu.filter(
          (sm) => sm.menu_id !== Number(id)
        );
      }
    } else if (section === 'user_access_menu') {
      if (action === 'toggle') {
        const roleId = Number(payload.role_id);
        const menuId = Number(payload.menu_id);
        const exists = db.user_access_menu.find(
          (a) => a.role_id === roleId && a.menu_id === menuId
        );
        if (exists) {
          db.user_access_menu = db.user_access_menu.filter(
            (a) => !(a.role_id === roleId && a.menu_id === menuId)
          );
        } else {
          const nextId =
            db.user_access_menu.length > 0
              ? Math.max(...db.user_access_menu.map((a) => a.id)) + 1
              : 1;
          db.user_access_menu.push({
            id: nextId,
            role_id: roleId,
            menu_id: menuId
          });
        }
      } else if (action === 'create') {
        const nextId =
          db.user_access_menu.length > 0
            ? Math.max(...db.user_access_menu.map((a) => a.id)) + 1
            : 1;
        db.user_access_menu.push({
          id: nextId,
          role_id: Number(payload.role_id),
          menu_id: Number(payload.menu_id)
        });
      } else if (action === 'delete' && id !== undefined) {
        db.user_access_menu = db.user_access_menu.filter(
          (a) => a.id !== Number(id)
        );
      }
    } else if (section === 'user_sub_menu') {
      if (action === 'create') {
        const nextId =
          db.user_sub_menu.length > 0
            ? Math.max(...db.user_sub_menu.map((sm) => sm.id)) + 1
            : 1;
        db.user_sub_menu.push({
          id: nextId,
          menu_id: Number(payload.menu_id) || 1,
          title: payload.title,
          url: payload.url || 'command-center',
          icon: payload.icon || 'fas fa-fw fa-folder',
          is_active: payload.is_active !== undefined ? Number(payload.is_active) : 1
        });
      } else if (action === 'update' && id !== undefined) {
        db.user_sub_menu = db.user_sub_menu.map((sm) =>
          sm.id === Number(id)
            ? {
                ...sm,
                menu_id:
                  payload.menu_id !== undefined
                    ? Number(payload.menu_id)
                    : sm.menu_id,
                title: payload.title ?? sm.title,
                url: payload.url ?? sm.url,
                icon: payload.icon ?? sm.icon,
                is_active:
                  payload.is_active !== undefined
                    ? Number(payload.is_active)
                    : sm.is_active
              }
            : sm
        );
      } else if (action === 'toggleActive' && id !== undefined) {
        db.user_sub_menu = db.user_sub_menu.map((sm) =>
          sm.id === Number(id)
            ? { ...sm, is_active: sm.is_active === 1 ? 0 : 1 }
            : sm
        );
      } else if (action === 'delete' && id !== undefined) {
        db.user_sub_menu = db.user_sub_menu.filter((sm) => sm.id !== Number(id));
      }
    } else if (section === 'skills') {
      if (action === 'create') {
        db.skills.push({
          id: `sk-${Date.now()}`,
          name: payload.name,
          category: payload.category || 'Frontend & Web Modern',
          level: Number(payload.level) || 90,
          badge: payload.badge || 'Expert',
          description: payload.description || ''
        });
        db.activities.unshift({
          id: `act-${Date.now()}`,
          type: 'primary',
          text: 'Skill baru ditambahkan ke Database:',
          highlight: payload.name,
          time: 'Baru saja'
        });
      } else if (action === 'update' && id) {
        db.skills = db.skills.map((sk) =>
          sk.id === id
            ? {
                ...sk,
                name: payload.name ?? sk.name,
                category: payload.category ?? sk.category,
                level: payload.level !== undefined ? Number(payload.level) : sk.level,
                badge: payload.badge ?? sk.badge,
                description: payload.description ?? sk.description
              }
            : sk
        );
      } else if (action === 'delete' && id) {
        db.skills = db.skills.filter((sk) => sk.id !== id);
      }
    } else if (section === 'services') {
      if (action === 'create') {
        const nextNum = String(db.services.length + 1).padStart(2, '0');
        db.services.push({
          id: `srv-${Date.now()}`,
          number: payload.number || nextNum,
          title: payload.title,
          description: payload.description,
          icon: payload.icon || 'BarChart3'
        });
      } else if (action === 'update' && id) {
        db.services = db.services.map((s) =>
          s.id === id
            ? {
                ...s,
                number: payload.number ?? s.number,
                title: payload.title ?? s.title,
                description: payload.description ?? s.description,
                icon: payload.icon ?? s.icon
              }
            : s
        );
      } else if (action === 'delete' && id) {
        db.services = db.services.filter((s) => s.id !== id);
      }
    } else if (section === 'portfolio') {
      if (action === 'create') {
        db.portfolio.unshift({
          id: `port-${Date.now()}`,
          title: payload.title,
          subtitle: payload.subtitle || payload.category,
          category: payload.category || 'Company Profile',
          tags: Array.isArray(payload.tags)
            ? payload.tags
            : String(payload.tags || 'Next.js, MySQL, REST API')
                .split(',')
                .map((t: string) => t.trim()),
          image:
            payload.image ||
            'https://bootstrapmade.com/content/demo/Strive/assets/img/portfolio/portfolio-1.webp',
          link: payload.link || '/#portfolio',
          description: payload.description || ''
        });
        db.activities.unshift({
          id: `act-${Date.now()}`,
          type: 'success',
          text: 'Portofolio baru ditambahkan:',
          highlight: payload.title,
          time: 'Baru saja'
        });
      } else if (action === 'update' && id) {
        db.portfolio = db.portfolio.map((p) =>
          p.id === id
            ? {
                ...p,
                title: payload.title ?? p.title,
                subtitle: payload.subtitle ?? p.subtitle,
                category: payload.category ?? p.category,
                tags:
                  payload.tags !== undefined
                    ? Array.isArray(payload.tags)
                      ? payload.tags
                      : String(payload.tags)
                          .split(',')
                          .map((t: string) => t.trim())
                    : p.tags,
                image: payload.image ?? p.image,
                link: payload.link ?? p.link ?? '/#portfolio',
                description: payload.description ?? p.description
              }
            : p
        );
      } else if (action === 'delete' && id) {
        db.portfolio = db.portfolio.filter((p) => p.id !== id);
      }
    } else if (section === 'team') {
      if (action === 'create') {
        db.team.push({
          id: `tm-${Date.now()}`,
          name: payload.name,
          position: payload.position,
          bio: payload.bio,
          image:
            payload.image ||
            'https://bootstrapmade.com/content/demo/Strive/assets/img/person/person-m-8.webp',
          is_public: payload.is_public !== undefined ? Boolean(payload.is_public) : true,
          socials: { twitter: '#', linkedin: '#', github: '#' }
        });
      } else if (action === 'update' && id) {
        db.team = db.team.map((t) =>
          t.id === id
            ? {
                ...t,
                name: payload.name ?? t.name,
                position: payload.position ?? t.position,
                bio: payload.bio ?? t.bio,
                image: payload.image ?? t.image,
                is_public:
                  payload.is_public !== undefined
                    ? Boolean(payload.is_public)
                    : t.is_public !== undefined
                    ? t.is_public
                    : true
              }
            : t
        );
      } else if (action === 'togglePublic' && id) {
        db.team = db.team.map((t) =>
          t.id === id
            ? {
                ...t,
                is_public: t.is_public === false ? true : false
              }
            : t
        );
      } else if (action === 'setAllPublic') {
        const targetStatus = Boolean(payload?.is_public);
        db.team = db.team.map((t) => ({
          ...t,
          is_public: targetStatus
        }));
      } else if (action === 'delete' && id) {
        db.team = db.team.filter((t) => t.id !== id);
      }
    } else if (section === 'orders') {
      if (action === 'create') {
        const nextNum = `#WEB-00${db.orders.length + 1}`;
        const newOrd = {
          id: `ord-${Date.now()}`,
          orderNumber: payload.orderNumber || nextNum,
          customerName: payload.customerName,
          customerEmail: payload.customerEmail,
          customerAvatar:
            'https://bootstrapmade.com/content/demo/AppDashboard/assets/img/avatars/avatar-1.webp',
          product: payload.product || 'Jasa Pembuatan Website Full-Stack (Frontend + Backend)',
          amount: payload.amount || 'Rp 3.500.000',
          status: payload.status || 'Completed',
          createdAt: new Date().toISOString()
        };
        db.orders.unshift(newOrd);
        db.activities.unshift({
          id: `act-${Date.now()}`,
          type: 'success',
          text: 'Proyek / Order baru tercatat:',
          highlight: newOrd.orderNumber,
          time: 'Baru saja'
        });
      } else if (action === 'update' && id) {
        db.orders = db.orders.map((o) =>
          o.id === id
            ? {
                ...o,
                orderNumber: payload.orderNumber ?? o.orderNumber,
                customerName: payload.customerName ?? o.customerName,
                customerEmail: payload.customerEmail ?? o.customerEmail,
                product: payload.product ?? o.product,
                amount: payload.amount ?? o.amount,
                status: payload.status ?? o.status
              }
            : o
        );
      } else if (action === 'updateStatus' && id) {
        db.orders = db.orders.map((o) =>
          o.id === id ? { ...o, status: payload.status } : o
        );
      } else if (action === 'delete' && id) {
        db.orders = db.orders.filter((o) => o.id !== id);
      }
    } else if (section === 'messages') {
      if (action === 'update' && id) {
        db.messages = db.messages.map((m) =>
          m.id === id
            ? {
                ...m,
                name: payload.name ?? m.name,
                email: payload.email ?? m.email,
                subject: payload.subject ?? m.subject,
                message: payload.message ?? m.message
              }
            : m
        );
      } else if (action === 'delete' && id) {
        db.messages = db.messages.filter((m) => m.id !== id);
      }
    } else if (section === 'pricing') {
      if (!Array.isArray(db.pricing)) db.pricing = [];
      if (action === 'create') {
        const parsedFeatures = Array.isArray(payload.features)
          ? payload.features
          : String(payload.features || '')
              .split('\n')
              .map((f: string) => f.trim())
              .filter(Boolean);
        db.pricing.push({
          id: `plan-${Date.now()}`,
          name: payload.name || 'Paket Jasa Website Baru',
          price: payload.price || '2.5 Jt',
          period: payload.period || '/proyek',
          description: payload.description || '',
          suitableFor: payload.suitableFor || '',
          note: payload.note || '',
          features:
            parsedFeatures.length > 0
              ? parsedFeatures
              : ['Desain Frontend Modern & Responsif', 'Backend Dashboard Admin & Database'],
          featured: Boolean(payload.featured),
          badge: payload.badge || (payload.featured ? 'Paling Populer' : undefined),
          icon: payload.icon || (payload.featured ? 'stars' : 'star')
        });
        db.activities.unshift({
          id: `act-${Date.now()}`,
          type: 'primary',
          text: 'Paket Harga baru ditambahkan:',
          highlight: payload.name,
          time: 'Baru saja'
        });
      } else if (action === 'update' && id) {
        db.pricing = db.pricing.map((pl) => {
          if (pl.id !== id) return pl;
          const parsedFeatures =
            payload.features !== undefined
              ? Array.isArray(payload.features)
                ? payload.features
                : String(payload.features)
                    .split('\n')
                    .map((f: string) => f.trim())
                    .filter(Boolean)
              : pl.features;
          const isFeatured =
            payload.featured !== undefined ? Boolean(payload.featured) : pl.featured;
          return {
            ...pl,
            name: payload.name ?? pl.name,
            price: payload.price ?? pl.price,
            period: payload.period ?? pl.period,
            description: payload.description ?? pl.description,
            suitableFor:
              payload.suitableFor !== undefined ? payload.suitableFor : pl.suitableFor,
            note: payload.note !== undefined ? payload.note : pl.note,
            features: parsedFeatures,
            featured: isFeatured,
            badge:
              payload.badge !== undefined
                ? payload.badge || undefined
                : isFeatured
                  ? pl.badge || 'Paling Populer'
                  : undefined,
            icon: payload.icon ?? pl.icon
          };
        });
      } else if (action === 'delete' && id) {
        db.pricing = db.pricing.filter((pl) => pl.id !== id);
      }
    } else if (section === 'blogPosts') {
      if (!Array.isArray(db.blogPosts)) db.blogPosts = [];
      if (action === 'create') {
        db.blogPosts.unshift({
          id: `bp-${Date.now()}`,
          title: payload.title || 'Artikel Jasa Pembuatan Website Baru',
          excerpt: payload.excerpt || '',
          content: payload.content || '',
          category: payload.category || 'Jasa Pembuatan Website',
          date:
            payload.date ||
            new Date().toLocaleDateString('id-ID', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            }),
          author: payload.author || db.company.fullName || 'Syauqi Abduraffi',
          authorAvatar:
            payload.authorAvatar ||
            db.company.avatarImage ||
            'https://bootstrapmade.com/content/demo/Strive/assets/img/person/person-m-8.webp',
          readTime: payload.readTime || '5 Menit Baca',
          image:
            payload.image ||
            'https://bootstrapmade.com/content/demo/Strive/assets/img/blog/blog-post-7.webp',
          link: payload.link || '/#recent-posts',
          featured: Boolean(payload.featured)
        });
        db.activities.unshift({
          id: `act-${Date.now()}`,
          type: 'info',
          text: 'Artikel / Catatan IT baru dipublikasikan:',
          highlight: payload.title,
          time: 'Baru saja'
        });
      } else if (action === 'update' && id) {
        db.blogPosts = db.blogPosts.map((bp) =>
          bp.id === id
            ? {
                ...bp,
                title: payload.title ?? bp.title,
                excerpt: payload.excerpt ?? bp.excerpt,
                content: payload.content ?? bp.content,
                category: payload.category ?? bp.category,
                date: payload.date ?? bp.date,
                author: payload.author ?? bp.author,
                authorAvatar: payload.authorAvatar ?? bp.authorAvatar,
                readTime: payload.readTime ?? bp.readTime,
                image: payload.image ?? bp.image,
                link: payload.link ?? bp.link,
                featured:
                  payload.featured !== undefined ? Boolean(payload.featured) : bp.featured
              }
            : bp
        );
      } else if (action === 'delete' && id) {
        db.blogPosts = db.blogPosts.filter((bp) => bp.id !== id);
      }
    } else if (section === 'simpusBooks') {
      if (!Array.isArray(db.simpusBooks)) db.simpusBooks = [];
      if (action === 'create') {
        db.simpusBooks.unshift({
          id: `bk-${Date.now()}`,
          code: payload.code || `PKG-WEB-0${db.simpusBooks.length + 1}`,
          title: payload.title || 'Paket Pembuatan Website Baru (Frontend + Backend)',
          author: payload.author || 'Full-Stack Next.js + MySQL',
          category: payload.category || 'Company Profile',
          year: Number(payload.year) || 2026,
          stock: payload.stock !== undefined ? Number(payload.stock) : 5,
          shelf: payload.shelf || 'Stack A-01 (Frontend + Backend CMS)',
          rating: payload.rating || '5.0',
          image:
            payload.image ||
            'https://bootstrapmade.com/content/demo/Strive/assets/img/portfolio/portfolio-1.webp',
          link: payload.link || '/#pricing'
        });
        db.activities.unshift({
          id: `act-${Date.now()}`,
          type: 'success',
          text: 'Katalog Paket Website ditambahkan:',
          highlight: payload.title,
          time: 'Baru saja'
        });
      } else if (action === 'update' && id) {
        db.simpusBooks = db.simpusBooks.map((bk) =>
          bk.id === id
            ? {
                ...bk,
                code: payload.code ?? bk.code,
                title: payload.title ?? bk.title,
                author: payload.author ?? bk.author,
                category: payload.category ?? bk.category,
                year: payload.year !== undefined ? Number(payload.year) : bk.year,
                stock: payload.stock !== undefined ? Number(payload.stock) : bk.stock,
                shelf: payload.shelf ?? bk.shelf,
                rating: payload.rating ?? bk.rating,
                image: payload.image ?? bk.image,
                link: payload.link ?? bk.link
              }
            : bk
        );
      } else if (action === 'delete' && id) {
        db.simpusBooks = db.simpusBooks.filter((bk) => bk.id !== id);
      }
    } else if (section === 'aboutTabs') {
      if (!Array.isArray(db.aboutTabs)) db.aboutTabs = [];
      if (action === 'create') {
        db.aboutTabs.push({
          id: `abt-${Date.now()}`,
          tabLabel: payload.tabLabel || 'Keunggulan Baru',
          title: payload.title || '',
          description: payload.description || '',
          badge: payload.badge || 'Standar Rekayasa Perangkat Lunak'
        });
      } else if (action === 'update' && id) {
        db.aboutTabs = db.aboutTabs.map((tb) =>
          tb.id === id
            ? {
                ...tb,
                tabLabel: payload.tabLabel ?? tb.tabLabel,
                title: payload.title ?? tb.title,
                description: payload.description ?? tb.description,
                badge: payload.badge ?? tb.badge
              }
            : tb
        );
      } else if (action === 'delete' && id) {
        db.aboutTabs = db.aboutTabs.filter((tb) => tb.id !== id);
      }
    } else if (section === 'features') {
      if (!Array.isArray(db.features)) db.features = [];
      if (action === 'create') {
        db.features.push({
          id: `feat-${Date.now()}`,
          title: payload.title || 'Fitur Unggulan Baru',
          description: payload.description || '',
          icon: payload.icon || 'ShieldCheck'
        });
      } else if (action === 'update' && id) {
        db.features = db.features.map((ft) =>
          ft.id === id
            ? {
                ...ft,
                title: payload.title ?? ft.title,
                description: payload.description ?? ft.description,
                icon: payload.icon ?? ft.icon
              }
            : ft
        );
      } else if (action === 'delete' && id) {
        db.features = db.features.filter((ft) => ft.id !== id);
      }
    } else if (section === 'heroSlides') {
      if (!Array.isArray(db.heroSlides)) db.heroSlides = [];
      if (action === 'create') {
        db.heroSlides.push({
          id: `s-${Date.now()}`,
          image: payload.image,
          title: payload.title || '',
          subtitle: payload.subtitle || ''
        });
      } else if (action === 'update' && id) {
        db.heroSlides = db.heroSlides.map((sl) =>
          sl.id === id
            ? {
                ...sl,
                image: payload.image ?? sl.image,
                title: payload.title ?? sl.title,
                subtitle: payload.subtitle ?? sl.subtitle
              }
            : sl
        );
      } else if (action === 'delete' && id) {
        db.heroSlides = db.heroSlides.filter((sl) => sl.id !== id);
      }
    }

    const updated = await saveDatabase(db);
    return NextResponse.json({
      success: true,
      message: 'Data berhasil disimpan ke Database company_db.',
      data: updated
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal memperbarui data', error: String(error) },
      { status: 500 }
    );
  }
}
