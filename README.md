# NEXVORA Technologies — Fullstack Enterprise Company Profile (Next.js + Vercel Ready)

Website **Company Profile Profesional (Frontend + Backend API + Admin CMS)** berbasis **Next.js App Router, TypeScript, dan Tailwind CSS**, dirancang dengan antarmuka **Pro UI/UX** yang 100% responsif di semua perangkat (Smartphone, Tablet, Laptop, dan Monitor 4K) serta siap di-deploy ke **Vercel**.

---

## ✨ Fitur Utama (Fullstack Frontend & Backend)

1. **3 Mode Desain Visual Adaptif (Multi-Theme UI/UX)**:
   - **Royal Dark (Mode 1)**: Tema gelap modern SaaS dengan aksen Royal Blue & Indigo.
   - **Executive Gold/Emerald (Mode 3)**: Tema gelap mewah dengan aksen Emerald & Champagne Gold.
   - **Clean Corporate Light (Mode Terang)**: Tema terang korporat yang bersih dan kontras tinggi.
2. **Responsif Penuh di Semua Perangkat**:
   - **HP / Smartphone**: Drawer navigasi interaktif, filter horizontal bebas scroll, serta *Sticky Bottom Quick-Action Bar* (WhatsApp & Booking Konsultasi).
   - **Tablet & iPad**: Tata letak 2 kolom adaptif dan kartu portofolio proporsional.
   - **Desktop & Layar Lebar**: Bento grid modern, widget telemetri interaktif, dan panel kalkulator sticky.
3. **Interactive Project Cost & Quotation Simulator (`#estimator`)**:
   - Pengunjung dapat menghitung estimasi biaya proyek secara real-time berdasarkan jenis layanan, skala sistem, modul tambahan, dan target durasi, lalu mengirimkannya langsung ke Backend API.
4. **Sistem Booking Konsultasi Online (`#booking`)**:
   - Pemilihan topik diskusi, tanggal, jam konsultasi, serta platform pertemuan (Google Meet / Zoom / Tatap Muka) yang menghasilkan **Kode Referensi Booking (`NXV-XXXX`)** otomatis.
5. **Admin CMS & Executive Dashboard (`/admin`)**:
   - Kelola pesan masuk & permintaan proposal (RFP), jadwal booking konsultasi, tambah/hapus portofolio, tambah/hapus layanan, dan ubah profil perusahaan secara langsung.
   - **Login Demo Admin**:
     - Email: `admin@nexvora.co.id`
     - Password: `admin123`
6. **Hybrid Serverless Storage (`src/lib/db.ts`)**:
   - Menyimpan data ke `data/db.json` saat dijalankan di komputer lokal, dan secara otomatis menggunakan `/tmp` + *in-memory cache* saat berjalan di **Vercel Serverless** (sehingga fitur CRUD tetap berjalan lancar tanpa error *read-only filesystem*).

---

## 🚀 Cara Menjalankan di Lokal

1. Pastikan menggunakan **Node.js v18 / v20+** (atau klik dua kali file `start-dev.bat` di Windows).
2. Jalankan perintah berikut di terminal:
   ```bash
   npm install
   npm run dev
   ```
3. Buka browser di:
   - **Halaman Utama**: `http://localhost:3000`
   - **Halaman Admin CMS**: `http://localhost:3000/admin`

---

## ☁️ Cara Deploy ke Vercel

Proyek ini sudah dilengkapi dengan konfigurasi `vercel.json` dan siap di-deploy dalam hitungan detik:

### Opsi 1: Via GitHub / GitLab (Direkomendasikan)
1. Push folder proyek ini ke repositori GitHub Anda.
2. Buka [vercel.com/new](https://vercel.com/new) dan pilih repositori tersebut.
3. Klik **Deploy** (Framework Preset akan otomatis terdeteksi sebagai **Next.js**).

### Opsi 2: Via Vercel CLI
```bash
npx vercel
```
Untuk produksi:
```bash
npx vercel --prod
```
