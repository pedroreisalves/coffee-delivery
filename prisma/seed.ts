import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      houseNumber: 1,
      name: 'admin_user',
      password: '$2a$10$JPL8wzYlT6KFB8NFHbG.gunyZfdFY.oP0t29yZSPGWIWQw2qc.CWq',
      phoneNumber: '3423468777',
      postalCode: '53250441',
      role: 'ADMIN',
      additionalInformation: 'additionalInformation',
    },
  });

  await prisma.user.create({
    data: {
      email: 'common@common.com',
      houseNumber: 1,
      name: 'common_user',
      password: '$2a$10$NyCOv4oxYSDrnaMmw/Q3VeIkKIZ9wgW1ckXZ7IYEqrbR4rHYnZof6',
      phoneNumber: '2125446277',
      postalCode: '64025230',
      role: 'COMMON',
      additionalInformation: 'additionalInformation',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
