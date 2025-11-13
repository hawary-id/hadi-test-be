import { config } from 'dotenv';
config();
import { PrismaClient } from '../generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding');

  const roles = [
    { name: 'superadmin' },
    { name: 'kadiv' },
    { name: 'dept.head' },
    { name: 'staff' },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: { name: role.name },
    });
  }

  const companies = [
    { code: 'COM001', name: 'PT PSI' },
    { code: 'COM002', name: 'PT PCI' },
  ];

  for (const company of companies) {
    await prisma.company.upsert({
      where: { code: company.code, name: company.name },
      update: {},
      create: { code: company.code, name: company.name },
    });
  }

  const countries = [
    { name: 'Indonesia' },
    { name: 'Malaysia' },
    { name: 'Singapore' },
  ];

  for (const country of countries) {
    await prisma.country.upsert({
      where: { name: country.name },
      update: {},
      create: { name: country.name },
    });
  }

  const provinces = [
    { name: 'Jawa Barat' },
    { name: 'Banten' },
    { name: 'DKI Jakarta' },
  ];

  for (const province of provinces) {
    await prisma.province.upsert({
      where: { name: province.name },
      update: {},
      create: { name: province.name },
    });
  }

  const cities = [
    { name: 'Tangerang' },
    { name: 'Banten' },
    { name: 'DKI Jakarta' },
  ];

  for (const city of cities) {
    await prisma.city.upsert({
      where: { name: city.name },
      update: {},
      create: { name: city.name },
    });
  }

  const positions = [{ name: 'QA' }, { name: 'BE Dev' }, { name: 'FE Dev' }];

  for (const position of positions) {
    await prisma.position.upsert({
      where: { name: position.name },
      update: {},
      create: { name: position.name },
    });
  }

  console.log('seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
