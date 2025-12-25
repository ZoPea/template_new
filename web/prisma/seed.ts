import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Example: Create a sample user
  const user = await prisma.user.upsert({
    where: { email: 'example@example.com' },
    update: {},
    create: {
      email: 'example@example.com',
      name: 'Example User',
    },
  })

  console.log('Seed data created:', user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

