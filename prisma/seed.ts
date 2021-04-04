import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const tagsSeed = [{ name: 'diary' }, { name: 'health' }, { name: 'internal' }];

async function main() {
  for (let i = 0; i < tagsSeed.length; i++) {
    await prisma.tags.upsert({
      update: {
        name: tagsSeed[i].name,
      },
      where: {
        name: tagsSeed[i].name,
      },
      create: tagsSeed[i],
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
