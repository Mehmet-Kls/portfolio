# Mehmet Kls — Portfolyo Sitesi

Next.js + Neon (PostgreSQL) + kendi admin panelin ile çalışan, "elektrik teknisyeni / hacker" temalı kişisel portfolyo sitesi.

## Özellikler

- **Kamuya açık site**: Hakkımda, Projeler, Yetenekler, Blog, İletişim — devre şeması temalı animasyonlu arka plan
- **Admin paneli** (`/admin`): Projeler, yetenekler, blog yazıları ekle/düzenle/sil, görsel ve CV dosyası yükle
- **Ziyaretçi takibi**: Her sayfa görüntülemesi kaydedilir, admin panelinde grafik ve istatistik olarak görünür (toplam, günlük, en çok ziyaret edilen sayfalar, cihaz dağılımı)
- **İletişim formu**: Gelen mesajlar admin panelinde okunabilir

## Kurulum

### 1. Neon veritabanı oluştur
neon.tech üzerinden ücretsiz bir hesap aç, yeni bir proje oluştur. Verilen `DATABASE_URL` bağlantı dizesini kopyala.

### 2. Ortam değişkenlerini ayarla
Proje kök dizininde `.env.local` dosyası oluştur:

```
DATABASE_URL=postgresql://...neon.tech/...
JWT_SECRET=rastgele-uzun-bir-metin-buraya
```

`JWT_SECRET` için terminalde şunu çalıştırıp çıktısını kullanabilirsin:
```bash
openssl rand -base64 32
```

### 3. Bağımlılıkları kur
```bash
npm install
```

### 4. Veritabanı tablolarını oluştur
```bash
npm run db:push
```

### 5. İlk admin kullanıcını ve örnek verileri oluştur
```bash
SEED_ADMIN_USERNAME=mehmet SEED_ADMIN_PASSWORD=guclu-bir-sifre npm run db:seed
```
Bu, `/admin/login` adresinden giriş yapabileceğin bir admin hesabı oluşturur.

### 6. Geliştirme sunucusunu başlat
```bash
npm run dev
```
Site: http://localhost:3000
Admin panel: http://localhost:3000/admin

## Vercel'e Deploy

1. Bu projeyi bir GitHub reposuna push et.
2. vercel.com üzerinden "Import Project" ile repoyu bağla.
3. Vercel proje ayarlarında Environment Variables kısmına `DATABASE_URL` ve `JWT_SECRET` değerlerini ekle.
4. Dosya yükleme (görsel, CV) için: Vercel projende Storage sekmesinden bir "Blob" store oluştur — bu otomatik olarak `BLOB_READ_WRITE_TOKEN` ortam değişkenini ekler, başka bir şey yapmana gerek yok.
5. Deploy et. İlk deploy sonrası yerel makinende `DATABASE_URL`'i Vercel'deki ile aynı yaparak `npm run db:push` ve `npm run db:seed` komutlarını bir kez daha çalıştır.

Her `git push` sonrası Vercel otomatik olarak yeni sürümü yayınlar.

## İçerik Yönetimi

`/admin` adresine giriş yaptıktan sonra:
- Projeler: portfolyo kartlarını ekle/düzenle/sil, görsel yükle, öne çıkan işaretleme
- Yetenekler: dil/araç/platform kategorisinde, seviye çubuklu beceri listesi
- Blog Yazıları: taslak/yayında durumlu yazılar, otomatik URL (slug) oluşturma
- Mesajlar: iletişim formundan gelen mesajları oku, okundu işaretle, sil
- Profil: isim, unvan, hakkımda metni, sosyal medya linkleri, CV dosyası
- Genel Bakış: ziyaretçi istatistikleri (toplam, bugün, son 7 gün, günlük grafik, en çok görüntülenen sayfalar, cihaz dağılımı)

## Teknik Yapı

- `src/app` — Next.js App Router sayfaları (kamu sitesi + admin panel + API rotaları)
- `src/components` — React bileşenleri (kamu sitesi bölümleri + admin arayüzü)
- `src/db/schema.ts` — Veritabanı tabloları (Drizzle ORM)
- `src/lib/auth.ts` — JWT tabanlı admin oturum yönetimi
- `scripts/seed.ts` — İlk kurulum verisi
