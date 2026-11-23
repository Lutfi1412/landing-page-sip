# Landing Page SIP DJKN

Landing page **Sistem Informasi Penilaian DJKN** dibuat dengan React 19, TypeScript, Vite, dan Tailwind CSS 4. Menu, tautan, dan deskripsi diatur dari satu berkas JSON, jadi tidak perlu mengubah kode.

## 1. Menjalankan proyek

Syarat: [Bun](https://bun.sh) terpasang.

```bash
bun install        # pasang dependensi
bun run dev        # mode pengembangan di http://localhost:5173
bun run build      # build produksi ke folder dist/
bun run preview    # coba hasil build
```

## 2. Struktur folder

```
public/
  data/modules.json     <- SUMBER DATA menu dan tautan (edit di sini)
  assets/               <- logo, ikon, dan gambar
src/
  App.tsx               <- halaman utama dan pengecekan error path
  types.ts              <- tipe data JSON
  index.css             <- warna tema dan animasi
  components/
    ModuleCard.tsx      <- kartu modul di halaman utama
    ModuleModal.tsx     <- modal daftar menu
    ErrorView.tsx       <- halaman error
```

## 3. Cara kerja `modules.json`

Berkas: `public/data/modules.json`. Isinya daftar (array) modul. Perilaku kartu ditentukan oleh field `link`:

| Kondisi `link` modul | Saat kartu diklik |
|---|---|
| Berisi URL (`"https://..."`) | Langsung membuka URL tersebut. Isi `child` diabaikan. |
| `null`, `""`, atau tidak ditulis | Membuka modal berisi daftar `child`. |

Di dalam modal, setiap `child` bekerja dengan aturan yang sama: jika `link` berisi URL, menu langsung membuka tautan itu. Jika `link` kosong, menu tampil redup dan tidak bisa diklik.

### Field modul

| Field | Wajib | Keterangan |
|---|---|---|
| `modul` | Ya | Nama modul. Harus unik karena dipakai sebagai kunci. |
| `deskripsi` | Tidak | Teks singkat di bawah nama modul. |
| `link` | Tidak | URL tujuan langsung, atau `null` untuk membuka modal. |
| `ikon` | Tidak | Path gambar ikon, contoh `/assets/ikon-basis-data.png`. |
| `child` | Tidak | Daftar menu di dalam modal. |

### Field `child`

| Field | Wajib | Keterangan |
|---|---|---|
| `nama` | Ya | Nama menu. Harus unik di dalam satu modul. |
| `deskripsi` | Tidak | Teks singkat di bawah nama menu. |
| `link` | Tidak | URL tujuan. Kosong berarti menu nonaktif. |
| `gambar` | Tidak | Path gambar kecil di sisi kiri menu. |

### Contoh

```json
[
  {
    "modul": "Basis Data",
    "deskripsi": "Data properti dan tanah.",
    "link": null,
    "ikon": "/assets/ikon-basis-data.png",
    "child": [
      { "nama": "Trend Harga Tanah", "link": "https://contoh.go.id/trend", "deskripsi": "Pergerakan harga tanah.", "gambar": "/assets/trend-harga-tanah.jpg" }
    ]
  },
  {
    "modul": "Permohonan",
    "deskripsi": "Ajukan permohonan penilaian.",
    "link": "https://contoh.go.id/permohonan",
    "ikon": "/assets/ikon-permohonan.png",
    "child": []
  }
]
```

## 4. Tugas yang sering dilakukan

**Mengganti tautan atau deskripsi.** Ubah nilai `link` atau `deskripsi` di `modules.json`, simpan, lalu muat ulang. Di mode `dev` perubahan terlihat langsung.

**Mengubah modul dari modal menjadi tautan langsung.** Isi `link` modul dengan URL. Kosongkan lagi (`null`) untuk mengembalikannya menjadi modal.

**Menambah menu di dalam modal.** Tambahkan objek baru ke array `child` milik modul tersebut.

**Menambah modul baru.** Tambahkan objek baru ke array utama. Susunan kartu mengikuti urutan di JSON dan tampil tiga kolom di layar lebar. Jika modul lebih dari tiga, kartu turun ke baris berikutnya.

**Menghapus modul atau menu.** Hapus objeknya dari JSON. Pastikan tanda koma antar objek tetap benar.

**Mengganti gambar atau ikon.**
1. Simpan berkas baru di `public/assets/`.
2. Ubah `ikon` atau `gambar` di JSON menjadi `/assets/nama-berkas-baru.png`.

Ukuran yang disarankan: ikon modul sekitar 480x480 px, gambar menu 111x103 px atau serupa (ditampilkan 56x56 px dan dipotong otomatis). Untuk mengganti logo, background, atau banner Hubungi Kami, timpa berkas dengan nama yang sama: `logo-sip.png`, `logo-kemenkeu.png`, `bg.jpg`, `hubungi-kami.png`.

**Mengubah warna.** Buka `src/index.css`, bagian `@theme`:

| Token | Hex | Dipakai untuk |
|---|---|---|
| `primary` | `#123A60` | Latar utama dan teks gelap |
| `brand` | `#175EA8` | Teks biru dan menu yang di-hover atau diklik |
| `accent` | `#F5C915` | Aksen kuning dan tombol |
| `soft` | `#E5EBF3` | Latar hover |

## 5. Halaman error

Halaman error (`ErrorView`) tampil pada tiga kondisi:
- **Path URL tidak dikenal**, misalnya `/halaman-salah`. Hanya `/` yang valid. Jika Anda menambah rute baru, ubah pengecekan path di `src/App.tsx`.
- **`modules.json` gagal dimuat**, karena hilang atau JSON-nya rusak (misalnya koma berlebih).
- **Error tak terduga saat render**, ditangkap oleh error boundary di `src/main.tsx`.

Teks dan gambar error diubah di `src/components/ErrorView.tsx` dan `public/assets/error.png`.

## 6. Deploy

Jalankan `bun run build`, lalu unggah isi folder `dist/` ke hosting statis. Karena halaman memeriksa path URL, atur server agar `/` melayani `index.html`. Untuk path lain Anda bisa memilih menampilkan 404 bawaan server atau mengarahkannya ke `index.html` agar halaman error tampil.

Folder `public/data/` ikut terbawa ke `dist/data/`. Anda bisa mengedit `modules.json` langsung di server tanpa build ulang.

## 7. Pemecahan masalah

| Gejala | Penyebab umum |
|---|---|
| Muncul halaman "Data layanan gagal dimuat" | JSON tidak valid (koma berlebih, tanda kutip kurang) atau berkas hilang. Cek dengan jsonlint. |
| Kartu langsung membuka tautan, padahal ingin modal | `link` modul masih berisi teks. Ubah menjadi `null`. |
| Gambar tidak muncul | Path salah. Harus diawali `/assets/` dan nama berkas sama persis, termasuk huruf besar-kecil. |
| Menu di modal redup dan tidak bisa diklik | `link` menu kosong. Isi dengan URL. |
