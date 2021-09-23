import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      password: '$2b$10$1XVF0bILGrFGHPMQbtp/betn.OojId7b1omrrqNp1el8AEcBSXquO', // FirstPassword123
      role: 'USER',
      detail: {
        create: {
          firstName: 'Alice',
          lastName: 'Parker',
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
      password: '$2b$10$EpreVGbl.d0qzfmGZwWb3.gdiDD4biBMs4kP5PJWCt3wveclHzoV2', // SecondPassword123
      role: 'ADMIN',
      detail: {
        create: {
          firstName: 'Bob',
          lastName: 'Jones',
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
