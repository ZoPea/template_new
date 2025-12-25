# Prisma + PostgreSQL Setup Guide

## 📋 ขั้นตอนการ Setup

### 1. ติดตั้ง Dependencies
```bash
cd web
yarn install
```

### 2. ตั้งค่า Environment Variables
สร้างไฟล์ `.env` จาก `.env.example`:
```bash
cp .env.example .env
```

แก้ไข `DATABASE_URL` ใน `.env` ให้ตรงกับ PostgreSQL ของคุณ:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app_db?schema=public"
```

### 3. เริ่มต้น PostgreSQL (Docker)
```bash
# จาก root directory
docker-compose up -d
```

### 4. สร้าง Prisma Client
```bash
yarn generate
```

### 5. Push Schema ไปยัง Database
```bash
yarn push
```

หรือใช้ Migration (แนะนำสำหรับ production):
```bash
yarn migrate
```

### 6. (Optional) Seed Database
```bash
yarn seed
```

### 7. เปิด Prisma Studio (GUI สำหรับดูข้อมูล)
```bash
yarn studio
```

---

## 📁 โครงสร้างที่สร้างไว้

```
web/
├── prisma/
│   ├── schema.prisma      # Prisma schema (models)
│   └── seed.ts            # Seed script
├── lib/
│   └── db/
│       └── prisma.ts      # Prisma client instance
└── app/
    └── api/
        └── users/         # Example API routes
            ├── route.ts   # GET, POST /api/users
            └── [id]/
                └── route.ts  # GET, PUT, DELETE /api/users/:id
```

---

## 🛠️ คำสั่งที่ใช้บ่อย

| คำสั่ง | คำอธิบาย |
|--------|----------|
| `yarn generate` | สร้าง Prisma Client |
| `yarn push` | Push schema ไปยัง database (dev) |
| `yarn migrate` | สร้าง migration (production) |
| `yarn studio` | เปิด Prisma Studio GUI |
| `yarn seed` | รัน seed script |

---

## ⚠️ ความแตกต่างระหว่าง `yarn push` และ `yarn migrate`

### `yarn push` (prisma db push)
- **เร็ว** - Push schema โดยตรงไปยัง database
- **ไม่สร้าง migration files** - ไม่มี migration history
- **เหมาะสำหรับ** - Development/Prototyping, ทดลอง schema ใหม่
- **ไม่เหมาะสำหรับ** - Production, Team work, Version control

**เมื่อไหร่ควรใช้:**
```bash
# ใช้ตอน development เมื่อต้องการทดลอง schema ใหม่
yarn push
```

### `yarn migrate` (prisma migrate dev)
- **สร้าง migration files** - มี migration history ใน `prisma/migrations/`
- **Track changes** - ทุกการเปลี่ยนแปลงถูกบันทึก
- **เหมาะสำหรับ** - Production, Team work, Version control
- **Rollback ได้** - สามารถ rollback migration

**เมื่อไหร่ควรใช้:**
```bash
# ใช้ตอน production หรือทำงานเป็นทีม
yarn migrate
# จะถามชื่อ migration
```

### ตารางเปรียบเทียบ

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

### Workflow ที่แนะนำ

1. **Development Phase** (ทดลอง schema):
   ```bash
   yarn push  # เร็ว ไม่ต้อง track
   ```

2. **เมื่อพร้อม Production**:
   ```bash
   yarn migrate  # สร้าง migration สำหรับ production
   ```

---

## 📝 การใช้งาน Prisma

### ใน API Routes
```typescript
import { prisma } from '@/lib/db/prisma'

// Get all users
const users = await prisma.user.findMany()

// Create user
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    name: 'John Doe',
  },
})

// Update user
const updated = await prisma.user.update({
  where: { id: 'user-id' },
  data: { name: 'Jane Doe' },
})

// Delete user
await prisma.user.delete({
  where: { id: 'user-id' },
})
```

### ใน Server Components
```typescript
import { prisma } from '@/lib/db/prisma'

export default async function UsersPage() {
  const users = await prisma.user.findMany()
  
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
```

---

## 🔧 แก้ไข Schema

1. แก้ไข `prisma/schema.prisma`
2. รัน `yarn push` (dev) หรือ `yarn migrate` (production)
3. รัน `yarn generate` เพื่ออัพเดท Prisma Client

---

## 📚 เอกสารเพิ่มเติม

- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js + Prisma Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)

