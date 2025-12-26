# 🚀 Next.js + React Native Template

Template สำหรับเริ่มต้นพัฒนา Web Application และ Mobile Application แบบ Monorepo พร้อม features พื้นฐานที่พร้อมใช้งาน

## ✨ Template นี้เหมาะกับใคร?

- 👨‍💻 **Developer** ที่ต้องการเริ่มโปรเจคใหม่เร็วๆ โดยไม่ต้อง setup เอง
- 🏢 **Startup/Company** ที่ต้องการโครงสร้างโปรเจคมาตรฐาน
- 🎓 **Student/Learner** ที่ต้องการเรียนรู้ Next.js + React Native
- ⚡ **Anyone** ที่ต้องการ template ที่มี features พร้อมใช้งาน

---

## 🎯 Features ที่มีใน Template

### ✅ **Core Features** (พร้อมใช้งาน)

- **SPA (Single Page Application)** - Client-side routing, Fixed Navigation, Auto-hide Navbar
- **Theme (Dark/Light Mode)** - พร้อม config เพื่อเปิด/ปิดได้
- **Database Setup** - PostgreSQL + Prisma ORM พร้อมใช้งาน
- **TypeScript** - Type safety พร้อม configuration
- **Tailwind CSS v4** - Modern styling framework

### 🔄 **Features ที่กำลังพัฒนา**

- Toast Notification (Sonner)
- SEO Optimization
- Error Handling
- และอื่นๆ (ดูรายละเอียดใน [FEATURES.md](./web/FEATURES.md))

---

## 📁 โครงสร้างโปรเจค

```
template/
├── web/                    # Next.js Web Application
│   ├── app/               # Next.js App Router
│   │   ├── components/   # Reusable components
│   │   ├── api/          # API Routes
│   │   └── ...
│   ├── lib/              # Utilities และ configurations
│   │   ├── contexts/    # React Contexts (Theme, etc.)
│   │   ├── config/      # Feature configurations
│   │   └── db/          # Prisma client
│   ├── prisma/          # Database schema และ migrations
│   └── public/          # Static assets
├── mobile/               # React Native + Expo Mobile App
│   ├── src/             # Source code
│   └── assets/          # Images และ icons
├── docker-compose.yml    # Docker services (PostgreSQL)
└── README.md            # เอกสารนี้
```

---

## 🚀 เริ่มต้นใช้งาน Template

### ขั้นตอนที่ 1: Clone หรือ Download Template

```bash
# Clone repository
git clone <repository-url>
cd template

# หรือ Download ZIP และ extract
```

### ขั้นตอนที่ 2: ตั้งชื่อโปรเจคใหม่ (Optional)

```bash
# เปลี่ยนชื่อ folder
mv template my-project-name
cd my-project-name

# แก้ไข package.json ใน root และ web/mobile
# เปลี่ยน "template-monorepo" เป็นชื่อโปรเจคของคุณ
```

---

### ขั้นตอนที่ 3: ตรวจสอบข้อกำหนดเบื้องต้น

ตรวจสอบว่าคุณมี tools เหล่านี้ติดตั้งแล้ว:

- **Node.js** >= 18.x ([Download](https://nodejs.org/))
- **Yarn** >= 1.22.x ([Install Guide](https://yarnpkg.com/getting-started/install))
- **Docker** และ **Docker Compose** ([Install Guide](https://docs.docker.com/get-docker/)) - สำหรับ PostgreSQL
- **Git** (สำหรับ version control)

---

## 📦 การติดตั้งและ Setup

### 1. ติดตั้ง Dependencies

```bash
# ติดตั้ง dependencies สำหรับ web
cd web
yarn install

# ติดตั้ง dependencies สำหรับ mobile (ถ้าต้องการ)
cd ../mobile
yarn install
```

---

## 🗄️ Database Setup (PostgreSQL)

### 1. เริ่มต้น PostgreSQL ด้วย Docker

```bash
# จาก root directory
docker-compose up -d
```

### 2. ตรวจสอบว่า PostgreSQL ทำงาน

```bash
docker-compose ps
```

ควรเห็น `app_postgres` ทำงานอยู่

### 3. (Optional) ปรับแต่ง Database Configuration

ถ้าต้องการเปลี่ยน username, password, หรือ database name:

```bash
# คัดลอกไฟล์ตัวอย่าง
cp docker-compose.override.example.yml docker-compose.override.yml

# แก้ไขค่าตามต้องการ
# docker-compose จะอ่านไฟล์ override อัตโนมัติ
```

**หมายเหตุ:** ถ้าเปลี่ยน database config ต้องอัพเดท `DATABASE_URL` ใน `.env` ด้วย

---

## 🌐 Web Application Setup

### 1. ตั้งค่า Environment Variables

สร้างไฟล์ `.env` ในโฟลเดอร์ `web/`:

```bash
cd web
touch .env
```

เพิ่มข้อมูลต่อไปนี้ใน `.env`:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app_db?schema=public"

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**หมายเหตุ:** 
- ถ้าใช้ `docker-compose.override.yml` ให้แก้ไข `DATABASE_URL` ให้ตรงกับค่าที่ตั้งไว้
- ไฟล์ `.env` จะไม่ถูก commit ไป Git (อยู่ใน `.gitignore`)

### 2. Setup Database Schema

```bash
cd web

# สร้าง Prisma Client
yarn generate

# Push schema ไปยัง database (สำหรับ development)
yarn push

# หรือใช้ migration (สำหรับ production/team work)
yarn migrate
```

**ความแตกต่าง:**
- `yarn push` - เร็ว, ไม่มี migration history (เหมาะสำหรับ development/prototyping)
- `yarn migrate` - มี migration history, track changes (เหมาะสำหรับ production/team work)

### 3. (Optional) Seed Database

```bash
yarn seed
```

### 4. เริ่มต้น Development Server

```bash
yarn dev
```

เปิด browser ไปที่ **http://localhost:3000** 🎉

---

## 📱 Mobile Application Setup (Optional)

**หมายเหตุ:** Mobile app ยังอยู่ในขั้นตอนพัฒนา

### เริ่มต้น Development Server

```bash
cd mobile
yarn start
```

จากนั้นเลือก platform:
- กด `i` สำหรับ iOS simulator
- กด `a` สำหรับ Android emulator
- Scan QR code ด้วย Expo Go app บนมือถือ

---

## 🎨 การปรับแต่ง Template

### 1. เปลี่ยนชื่อ App

แก้ไขไฟล์ `web/app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: "ชื่อ App ของคุณ", // เปลี่ยนตรงนี้
  description: "คำอธิบาย App ของคุณ",
};
```

### 2. ปรับแต่ง Theme

แก้ไขไฟล์ `web/lib/config/theme.ts`:
```typescript
export const themeConfig = {
  enabled: true, // เปลี่ยนเป็น false เพื่อปิด theme feature
  defaultTheme: 'light', // 'light' หรือ 'dark'
  storageKey: 'theme-preference',
}
```

### 3. ปรับแต่ง Navigation

แก้ไขไฟล์ `web/app/components/Navigation.tsx`:
- เปลี่ยน navigation items
- ปรับแต่ง styling
- เพิ่ม/ลบ menu items

### 4. ปรับแต่ง Database Schema

แก้ไขไฟล์ `web/prisma/schema.prisma`:
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  // เพิ่ม fields ตามต้องการ
}
```

จากนั้นรัน:
```bash
yarn generate
yarn push  # หรือ yarn migrate
```

---

## 📚 เอกสารเพิ่มเติม

## 🛠️ คำสั่งที่ใช้บ่อย

### Web App

| คำสั่ง | คำอธิบาย |
|--------|----------|
| `yarn dev` | เริ่ม development server |
| `yarn build` | Build สำหรับ production |
| `yarn start` | รัน production server |
| `yarn lint` | ตรวจสอบ code quality |
| `yarn generate` | สร้าง Prisma Client |
| `yarn push` | Push schema ไปยัง database (dev - ไม่มี migration history) |
| `yarn migrate` | สร้าง migration (production - มี migration history) |
| `yarn studio` | เปิด Prisma Studio (GUI) |
| `yarn seed` | รัน seed script |

**หมายเหตุ:** `yarn push` ใช้สำหรับ development/prototyping (เร็ว, ไม่ track changes) ส่วน `yarn migrate` ใช้สำหรับ production/team work (มี migration history, track changes)

### Mobile App

| คำสั่ง | คำอธิบาย |
|--------|----------|
| `yarn start` | เริ่ม Expo development server |
| `yarn android` | รันบน Android |
| `yarn ios` | รันบน iOS |
| `yarn web` | รันบน Web browser |

### Docker

| คำสั่ง | คำอธิบาย |
|--------|----------|
| `docker-compose up -d` | เริ่ม PostgreSQL |
| `docker-compose down` | หยุด PostgreSQL |
| `docker-compose ps` | ดูสถานะ services |
| `docker-compose logs postgres` | ดู logs ของ PostgreSQL |

---

## 📚 เอกสารเพิ่มเติม

- [Web App README](./web/README.md) - เอกสาร Next.js แบบละเอียด
- [Prisma Setup Guide](./web/README_PRISMA.md) - คู่มือ Prisma และ Database
- [Features List](./web/FEATURES.md) - รายการ features ทั้งหมด
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Expo Documentation](https://docs.expo.dev/)

---

## 🔧 แก้ไขปัญหาที่พบบ่อย

### PostgreSQL ไม่เชื่อมต่อได้

1. ตรวจสอบว่า Docker container ทำงาน:
   ```bash
   docker-compose ps
   ```

2. ตรวจสอบ logs:
   ```bash
   docker-compose logs postgres
   ```

3. ตรวจสอบ `DATABASE_URL` ใน `.env` ให้ถูกต้อง

4. ลอง restart Docker container:
   ```bash
   docker-compose down
   docker-compose up -d
   ```

### Prisma Client ไม่พบ

```bash
cd web
yarn generate
```

### Port 3000 ถูกใช้งานแล้ว

แก้ไข port ใน `web/package.json`:
```json
"dev": "next dev -p 3001"
```

### Theme ไม่ทำงาน

ตรวจสอบว่า:
1. `themeConfig.enabled` ใน `web/lib/config/theme.ts` เป็น `true`
2. `ThemeProvider` ถูก wrap ใน `web/app/layout.tsx`
3. ไม่มี error ใน browser console

### Build Error

```bash
# ลบ cache และ build ใหม่
cd web
rm -rf .next
yarn build
```

---

## 🚢 Deploy ไปยัง Production

### Web App

1. **Build สำหรับ Production:**
   ```bash
   cd web
   yarn build
   ```

2. **ตั้งค่า Environment Variables:**
   - บน hosting platform (Vercel, Netlify, etc.)
   - ตั้งค่า `DATABASE_URL` สำหรับ production database
   - ตั้งค่า `NEXT_PUBLIC_APP_URL` เป็น production URL

3. **Deploy:**
   - **Vercel:** เชื่อมต่อ GitHub repo → Auto deploy
   - **Netlify:** Drag & drop `web/.next` folder หรือใช้ Git integration
   - **Other platforms:** ตาม documentation ของแต่ละ platform

### Database

1. **ใช้ Managed PostgreSQL Service:**
   - [Supabase](https://supabase.com/) (แนะนำ - ฟรี tier)
   - [Railway](https://railway.app/)
   - [Neon](https://neon.tech/)
   - [AWS RDS](https://aws.amazon.com/rds/)

2. **Setup Production Database:**
   ```bash
   # อัพเดท DATABASE_URL ใน production environment
   # จากนั้นรัน migrations
   yarn migrate deploy
   ```

3. **Seed Production (ถ้าต้องการ):**
   ```bash
   yarn seed
   ```

---

## 💡 Tips & Best Practices

### 1. Version Control
- อย่า commit `.env` files
- Commit `prisma/migrations/` สำหรับ production
- ใช้ `.env.example` เป็น template

### 2. Development Workflow
- ใช้ `yarn push` สำหรับ development (เร็ว)
- ใช้ `yarn migrate` สำหรับ production (track changes)

### 3. Code Organization
- เก็บ components ใน `app/components/`
- เก็บ utilities ใน `lib/`
- เก็บ types ใน `lib/types/` หรือ `packages/types/`

### 4. Performance
- ใช้ Next.js Image component สำหรับ images
- Enable production optimizations
- Monitor bundle size

---

## 📝 License

MIT License - ใช้ได้ฟรีทั้ง commercial และ personal projects

---

## 🤝 Contributing

Template นี้เป็น open source! ถ้าต้องการ contribute:

1. Fork repository
2. สร้าง feature branch
3. Commit changes
4. Push และเปิด Pull Request

---

## 📞 Support & Questions

- 📖 อ่าน [Documentation](./web/README.md)
- 🐛 รายงาน Bug: เปิด [Issue](../../issues)
- 💡 แนะนำ Feature: เปิด [Discussion](../../discussions)
- ❓ ถามคำถาม: เปิด [Issue](../../issues) พร้อม label `question`

---

## 🎉 พร้อมเริ่มต้นแล้ว!

Template นี้พร้อมใช้งานแล้ว! เริ่มต้นพัฒนาโปรเจคของคุณได้เลย 🚀

**Happy Coding!** 💻✨
