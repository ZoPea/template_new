# Template Monorepo

Monorepo สำหรับพัฒนา Web Application (Next.js) และ Mobile Application (React Native + Expo) พร้อม PostgreSQL และ Prisma

## 📁 โครงสร้างโปรเจค

```
template/
├── web/                    # Next.js Web Application
│   ├── app/               # Next.js App Router
│   ├── lib/               # Utilities และ Prisma client
│   ├── prisma/            # Prisma schema และ migrations
│   └── public/            # Static assets
├── mobile/                # React Native + Expo Mobile App
│   ├── src/              # Source code
│   └── assets/           # Images และ icons
├── docker-compose.yml     # Docker services (PostgreSQL)
└── README.md             # เอกสารนี้
```

---

## 🚀 เริ่มต้นใช้งาน

### ข้อกำหนดเบื้องต้น

- **Node.js** >= 18.x
- **Yarn** >= 1.22.x
- **Docker** และ **Docker Compose** (สำหรับ PostgreSQL)
- **Git**

---

## 📦 การติดตั้ง

### 1. Clone Repository

```bash
git clone <repository-url>
cd template
```

### 2. ติดตั้ง Dependencies

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

### 3. (Optional) ใช้ docker-compose.override.yml

ถ้าต้องการเปลี่ยน username, password, หรือ database name:

```bash
# คัดลอกไฟล์ตัวอย่าง
cp docker-compose.override.example.yml docker-compose.override.yml

# แก้ไขค่าตามต้องการ
# docker-compose จะอ่านไฟล์ override อัตโนมัติ
```

---

## 🌐 Web Application (Next.js)

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

**หมายเหตุ:** ถ้าใช้ `docker-compose.override.yml` ให้แก้ไข `DATABASE_URL` ให้ตรงกับค่าที่ตั้งไว้

### 2. Setup Prisma

```bash
cd web

# สร้าง Prisma Client
yarn generate

# Push schema ไปยัง database (สำหรับ development)
yarn push

# หรือใช้ migration (สำหรับ production)
yarn migrate
```

### 3. (Optional) Seed Database

```bash
yarn seed
```

### 4. เริ่มต้น Development Server

```bash
yarn dev
```

Web app จะรันที่ **http://localhost:3000**

---

## 📱 Mobile Application (React Native + Expo)

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

- [Web App README](./web/README.md) - เอกสาร Next.js
- [Prisma Setup Guide](./web/README_PRISMA.md) - คู่มือ Prisma และ Database
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Expo Documentation](https://docs.expo.dev/)

---

## 🗂️ โครงสร้าง Web App

```
web/
├── app/
│   ├── api/              # API Routes
│   │   └── users/       # Example API endpoints
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── lib/
│   └── db/
│       └── prisma.ts    # Prisma client instance
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Seed script
└── public/              # Static files
```

---

## 🔧 Troubleshooting

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

### Prisma Client ไม่พบ

```bash
cd web
yarn generate
```

### Port 3000 ถูกใช้งานแล้ว

แก้ไข port ใน `package.json`:
```json
"dev": "next dev -p 3001"
```

---

## 🚢 Production Deployment

### Web App

1. Build:
   ```bash
   cd web
   yarn build
   ```

2. ตั้งค่า environment variables บน hosting platform

3. Deploy ไปยัง Vercel, Netlify, หรือ platform อื่นๆ

### Database

- ใช้ managed PostgreSQL service (เช่น Supabase, Railway, Neon)
- อัพเดท `DATABASE_URL` ใน production environment
- รัน migrations:
  ```bash
  yarn migrate deploy
  ```

---

## 📝 License

MIT

---

## 👥 Contributors

- Your name here

---

## 📞 Support

ถ้ามีคำถามหรือพบปัญหา กรุณาเปิด issue ใน repository

