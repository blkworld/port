# Website Portofolio Foto: Panduan Lengkap

Dokumen ini menjelaskan cara memakai, mengubah, merilis, dan merawat website ini. Ditulis untuk orang yang bukan programmer.

> Disusun berdasarkan kondisi project per **12 Oktober 2026**: menu Photos, Films, Gallery, About; Blog sudah dihapus; konten dikelola lewat `/admin`; tampilan dan menu ada di kode. Kalau ada hal di project yang berbeda dari yang tertulis di sini, yang berlaku adalah kondisi project. Bagian yang belum pernah diuji atau datanya bisa berubah ditandai **(belum diverifikasi)**.

**Cara memakai dokumen ini**

- Mau menulis atau menambah foto/film: Bagian 4.
- Mau mengubah sesuatu yang terlihat di layar (nama, menu, warna, font, ukuran): Bagian 5. Di akhirnya ada tabel pencarian cepat.
- Mau menjalankan, menguji, dan mengirim perubahan ke website live: Bagian 6.
- Ada yang rusak: Bagian 9.

---

## Daftar isi

1. [Gambaran umum](#1-gambaran-umum)
2. [Informasi project](#2-informasi-project)
3. [Peta folder dan file](#3-peta-folder-dan-file)
4. [Mengelola konten lewat admin](#4-mengelola-konten-lewat-admin)
5. [Mengubah tampilan dan teks lewat kode](#5-mengubah-tampilan-dan-teks-lewat-kode)
6. [Menjalankan, menguji, dan merilis](#6-menjalankan-menguji-dan-merilis)
7. [Pengaturan akun dan layanan](#7-pengaturan-akun-dan-layanan)
8. [Batas paket, biaya, dan pemeliharaan](#8-batas-paket-biaya-dan-pemeliharaan)
9. [Pemecahan masalah](#9-pemecahan-masalah)
10. [Lampiran](#10-lampiran)

---

## 1. Gambaran umum

### 1.1 Isi website

| Bagian | Alamat | Isi |
|---|---|---|
| Photos (Home) | `/` | Grid foto: 3 kolom di desktop, 2 di tablet, 1 di HP. Klik foto untuk membukanya besar (lightbox). |
| Films | `/films` | Kartu film. Klik kartu untuk membuka halaman film dengan pemutar YouTube. |
| Gallery | `/gallery` | Daftar album (misalnya Tokyo). Klik album untuk melihat grid fotonya, juga dengan lightbox. |
| About | `/about` | Teks tentang Anda, satu foto (bisa disembunyikan), dan kontak. |
| Admin | `/admin` | Panel untuk menambah dan mengubah konten (Sanity Studio). |

Sidebar kiri berisi nama website, menu, dan ikon sosial di bagian bawah. Di HP, sidebar berubah menjadi bar atas dengan tombol hamburger yang membuka menu layar penuh.

### 1.2 Cara kerjanya

```
Anda ──(/admin)──► Sanity            (menyimpan teks dan foto)
                      │
                      ▼  dibaca website tiap kira-kira 60 detik
Pengunjung ◄── Website (Next.js di Vercel) ◄── GitHub (kode)
                                                  ▲
                                   Codespaces (tempat Anda mengedit kode)
```

- **Konten** (foto, judul, link YouTube) disimpan di Sanity. Anda mengubahnya lewat `/admin`, tanpa menyentuh kode.
- **Kode** (tampilan, menu, nama website) disimpan di GitHub. Mengubahnya butuh edit file di Codespaces, lalu push. Vercel otomatis membangun ulang website setelah push.
- **Foto** tidak disimpan di GitHub. Foto ada di server Sanity (`cdn.sanity.io`). Itu sebabnya repository tetap ringan.
- **Codespaces** hanya tempat mengedit dan menguji. Untuk posting sehari-hari Anda tidak perlu membukanya.

### 1.3 Dua jenis perubahan

| Mau mengubah | Lewat mana | Perlu push ke GitHub? |
|---|---|---|
| Foto Home | `/admin` → Photos (homepage) | Tidak |
| Album Gallery | `/admin` → Galleries | Tidak |
| Film YouTube | `/admin` → Films | Tidak |
| Teks About | `app/about/page.tsx` | Ya |
| Foto About | `public/about.jpg` | Ya |
| Nama website, email, sosmed | `lib/site.ts` | Ya |
| Menu (nama, urutan, tambah, hapus) | `components/Sidebar.tsx` | Ya |
| Warna, font, ukuran, jarak | kode (Bagian 5) | Ya |
| Favicon, gambar preview link | folder `app` | Ya |

### 1.4 Teknologi

- **Next.js 16** (App Router), React 19, TypeScript
- **Tailwind CSS 4** untuk gaya tampilan
- **Sanity Studio 6** dengan `next-sanity` sebagai panel admin dan penyimpanan konten
- **Font Chivo** (Google Fonts, lewat `next/font`)
- **GitHub** untuk menyimpan kode, **Vercel** untuk hosting, **GitHub Codespaces** untuk mengedit
- Tanpa langganan bulanan selama masih dalam batas paket gratis (lihat Bagian 8)

---

## 2. Informasi project

Isi atau koreksi tabel ini kalau ada yang berubah.

| Hal | Nilai |
|---|---|
| Nama website saat ini | BLUEHOUR CINEMA (diatur di `lib/site.ts`) |
| Alamat website | `https://portdelta.vercel.app` |
| Alamat admin | `https://portdelta.vercel.app/admin` |
| Repository GitHub | `github.com/blkworld/port` (branch `main`) |
| Folder project di dalam repository | `portofolio-foto` |
| Sanity Project ID | `p17mqa73` |
| Sanity Dataset | `production` |
| Dashboard Sanity | `sanity.io/manage` → project **Port** |
| Dashboard Vercel | `vercel.com` → project **port** |
| Tempat mengedit kode | GitHub Codespaces |

### Environment variables

Tiga variabel yang dibutuhkan, di dua tempat: file `.env.local` (komputer/Codespaces) dan **Settings → Environment Variables** di Vercel.

| Nama | Nilai |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `p17mqa73` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SITE_URL` | `https://portdelta.vercel.app` (atau domain sendiri; tanpa garis miring di akhir) |

Ketiganya bukan rahasia (awalan `NEXT_PUBLIC_` berarti nilainya memang terlihat oleh pengunjung). Tapi file `.env.local` **tidak** ikut ke GitHub, jadi simpan salinan isinya di tempat lain. Kalau Codespace dihapus, file itu hilang.

### Akun yang terlibat

- **GitHub**: menyimpan kode.
- **Vercel**: hosting. Bisa masuk dengan akun GitHub, tapi akunnya bisa berbeda nama dari akun GitHub.
- **Sanity**: login `/admin` (Google atau GitHub).

Catat email yang dipakai untuk masing-masing akun.

---

## 3. Peta folder dan file

Semua perintah dan file di dokumen ini relatif terhadap folder `portofolio-foto`.

```
portofolio-foto/
├── .env.local                    ← 3 variabel (TIDAK di GitHub)
├── .vscode/settings.json         ← opsional: terminal Codespaces langsung di folder project
├── next.config.ts                ← pengaturan Next.js (izin gambar dari cdn.sanity.io)
├── postcss.config.mjs            ← pengaktif Tailwind (jangan diubah)
├── sanity.config.ts              ← isi dan urutan menu di /admin
├── package.json                  ← daftar paket dan perintah (npm run dev, build)
│
├── public/
│   └── about.jpg                 ← foto di halaman About
│
├── app/                          ← halaman-halaman website
│   ├── layout.tsx                ← kerangka semua halaman: font Chivo, judul tab, SEO dasar
│   ├── globals.css               ← warna latar dan gaya dasar
│   ├── page.tsx                  ← Home (Photos)
│   ├── favicon.ico               ← ikon di tab browser
│   ├── opengraph-image.jpg       ← gambar preview saat link dibagikan
│   ├── twitter-image.jpg         ← sama, untuk X/Twitter
│   ├── robots.ts                 ← aturan untuk mesin pencari
│   ├── sitemap.ts                ← daftar halaman untuk Google
│   ├── about/page.tsx            ← halaman About
│   ├── admin/[[...tool]]/page.tsx ← pintu masuk /admin
│   ├── films/page.tsx            ← daftar film
│   ├── films/[slug]/page.tsx     ← halaman satu film
│   ├── gallery/page.tsx          ← daftar album
│   └── gallery/[slug]/page.tsx   ← grid foto satu album
│
├── components/                   ← potongan tampilan yang dipakai berulang
│   ├── Sidebar.tsx               ← sidebar desktop dan menu HP (menu ada di sini)
│   ├── SiteShell.tsx             ← tata letak: sidebar + isi + footer
│   ├── Footer.tsx                ← teks © di bawah
│   ├── SocialIcons.tsx           ← ikon Instagram, YouTube, dan lainnya
│   ├── PhotoGrid.tsx             ← menyiapkan foto untuk grid
│   ├── PhotoGridClient.tsx       ← grid kolom + membuka lightbox
│   ├── Lightbox.tsx              ← tampilan foto besar
│   ├── ThumbCard.tsx             ← kartu album (rasio 3:2)
│   ├── FilmCard.tsx              ← kartu film (rasio 16:9)
│   ├── YouTubePlayer.tsx         ← pemutar (thumbnail + tombol play)
│   └── PosterImage.tsx           ← thumbnail YouTube dengan cadangan ukuran
│
├── lib/
│   ├── site.ts                   ← nama, email, sosmed, deskripsi
│   └── youtube.ts                ← membaca link YouTube dan alamat thumbnail
│
└── sanity/
    ├── env.ts                    ← membaca 3 variabel di atas
    ├── lib/
    │   ├── client.ts             ← koneksi ke Sanity
    │   ├── image.ts              ← membuat alamat foto yang diperkecil
    │   └── queries.ts            ← cara website mengambil data dari Sanity
    └── schemaTypes/              ← bentuk isian di /admin
        ├── index.ts              ← daftar semua jenis konten
        ├── homepage.ts           ← Photos (homepage)
        ├── photoGallery.ts       ← Galleries
        └── film.ts               ← Films
```

### Tiga istilah yang sering muncul

- **Komponen**: potongan tampilan, misalnya sidebar. Satu file komponen dipakai di banyak halaman.
- **Query**: perintah yang menanyakan data ke Sanity ("berikan semua film, urut dari yang terbaru").
- **Skema (schema)**: daftar kolom isian di `/admin`. Mengubah skema berarti mengubah bentuk formulir di Studio.

---
