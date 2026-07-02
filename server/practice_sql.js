const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Bắt đầu truy vấn SQL thuần...");

  const result = await prisma.$queryRaw`
    SELECT 
      "User".name, 
      COUNT("Task".id) as total_tasks 
    FROM "User"
    LEFT JOIN "Task" ON "User".id = "Task"."userId"
    GROUP BY "User".id
  `;

  console.log(result);
}

main().finally(() => prisma.$disconnect());