# Web Application (Next.js)

Next.js 16 Web Application พร้อม Prisma และ PostgreSQL

## 🚀 Quick Start

### 1. ติดตั้ง Dependencies

```bash
yarn install
```

### 2. ตั้งค่า Environment Variables

สร้างไฟล์ `.env` ในโฟลเดอร์ `web/`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app_db?schema=public"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. เริ่มต้น PostgreSQL

```bash
# จาก root directory
docker-compose up -d
```

### 4. Setup Database

```bash
# สร้าง Prisma Client
yarn generate

# Push schema ไปยัง database
yarn push

# หรือใช้ migration (สำหรับ production)
yarn migrate
```

### 5. เริ่มต้น Development Server

```bash
yarn dev
```

เปิด [http://localhost:3000](http://localhost:3000) ใน browser

---

## 📋 Available Scripts

| Script | คำอธิบาย |
|--------|----------|
| `yarn dev` | เริ่ม development server |
| `yarn build` | Build สำหรับ production |
| `yarn start` | รัน production server |
| `yarn lint` | ตรวจสอบ code quality |
| `yarn generate` | สร้าง Prisma Client |
| `yarn push` | Push schema ไปยัง database (dev) |
| `yarn migrate` | สร้าง migration (production) |
| `yarn studio` | เปิด Prisma Studio GUI |
| `yarn seed` | รัน seed script |

### ⚠️ ความแตกต่างระหว่าง `yarn push` และ `yarn migrate`

| คุณสมบัติ | `yarn push` | `yarn migrate` |
|----------|-------------|----------------|
| **ความเร็ว** | เร็ว | ช้ากว่า (ต้องสร้างไฟล์) |
| **Migration Files** | ไม่สร้าง | สร้างไฟล์ใน `prisma/migrations/` |
| **Migration History** | ไม่มี | มี (track ทุกการเปลี่ยนแปลง) |
| **Version Control** | ไม่เหมาะ | เหมาะสำหรับ Git |
| **Rollback** | ไม่ได้ | ได้ (สามารถ rollback) |
| **Production** | ไม่แนะนำ | แนะนำ |
| **Development** | เหมาะสำหรับทดลอง | ใช้ได้ |
| **Team Work** | ไม่เหมาะ | เหมาะ (มี migration history) |

**เมื่อไหร่ควรใช้:**
- **`yarn push`** - ใช้ตอน development/prototyping เมื่อต้องการทดลอง schema ใหม่โดยไม่ต้อง track changes
- **`yarn migrate`** - ใช้ตอน production หรือทำงานเป็นทีม เมื่อต้องการ track changes และมี migration history

---

## 🗂️ โครงสร้างโปรเจค

```
web/
├── app/
│   ├── api/              # API Routes
│   │   └── users/       # Example: User API endpoints
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── lib/
│   └── db/
│       └── prisma.ts     # Prisma client instance
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed script
├── public/               # Static files
└── package.json
```

---

## 🔧 เทคโนโลยีที่ใช้

- **Next.js 16.1.1** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Prisma** - Database ORM
- **PostgreSQL** - Database

---

## 📚 เอกสารเพิ่มเติม

- [Prisma Setup Guide](./README_PRISMA.md) - คู่มือ Prisma และ Database
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

---

## 🐛 Troubleshooting

### Prisma Client ไม่พบ

```bash
yarn generate
```

### Database ไม่เชื่อมต่อ

1. ตรวจสอบว่า PostgreSQL ทำงาน:
   ```bash
   docker-compose ps
   ```

2. ตรวจสอบ `DATABASE_URL` ใน `.env`

### Port 3000 ถูกใช้งานแล้ว

แก้ไข port ใน `package.json`:
```json
"dev": "next dev -p 3001"
```
