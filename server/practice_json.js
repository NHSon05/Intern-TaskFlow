const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- THỰC HÀNH JSON VÀ ARRAY VỚI PRISMA & POSTGRESQL ---');

  // 1. Cập nhật Preferences (JSON) cho một User
  console.log('\n1. Đang thêm tuỳ chọn (preferences) cho User đầu tiên...');
  
  const firstUser = await prisma.user.findFirst();
  
  if (firstUser) {
    const updatedUser = await prisma.user.update({
      where: { id: firstUser.id },
      data: {
        preferences: {
          theme: 'dark',
          notifications: {
            email: true,
            push: false
          },
          language: 'vi'
        }
      }
    });
    console.log('✅ Đã cập nhật User:', updatedUser.name);
    console.log('📦 Preferences hiện tại:', updatedUser.preferences);
  }

  // 2. Lọc User theo giá trị nằm sâu bên trong JSON
  console.log('\n2. Tìm tất cả user đang dùng "dark" theme...');
  const darkThemeUsers = await prisma.user.findMany({
    where: {
      preferences: {
        path: ['theme'],
        equals: 'dark'
      }
    }
  });
  console.log(`🔍 Tìm thấy ${darkThemeUsers.length} user dùng dark theme.`);

  // 3. Cập nhật Tags (Array) cho một Task
  console.log('\n3. Đang thêm Tags (Array) cho Task đầu tiên...');
  const firstTask = await prisma.task.findFirst();
  
  if (firstTask) {
    const updatedTask = await prisma.task.update({
      where: { id: firstTask.id },
      data: {
        tags: ['Khẩn cấp', 'Frontend', 'Lỗi UI']
      }
    });
    console.log('✅ Đã gắn thẻ cho Task:', updatedTask.title);
    console.log('🏷️  Tags:', updatedTask.tags);
  }

  // 4. Lọc Task theo phần tử trong Array
  console.log('\n4. Tìm tất cả các Task có chứa tag "Khẩn cấp"...');
  const urgentTasks = await prisma.task.findMany({
    where: {
      tags: {
        has: 'Khẩn cấp'
      }
    }
  });
  console.log(`🔍 Tìm thấy ${urgentTasks.length} task Khẩn cấp.`);
  if (urgentTasks.length > 0) {
    console.log('   -> Ví dụ:', urgentTasks[0].title);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });