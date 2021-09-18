import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      password: '123',
      role: 'USER',
      profile: {
        create: {
          name: 'Alice',
          bio: `This is Alice's bio`,
        },
      },
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      password: '123',
      role: 'ADMIN',
      profile: {
        create: {
          name: 'Bob',
          bio: `This is Bob's bio`,
        },
      },
    },
  });

  console.log({ alice, bob });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
