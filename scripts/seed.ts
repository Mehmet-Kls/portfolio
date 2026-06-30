import "dotenv/config";
import { db } from "../src/db";
import { admins, profile, skills, projects } from "../src/db/schema";
import bcrypt from "bcryptjs";

async function main() {
  const username = process.env.SEED_ADMIN_USERNAME || "mehmet";
  const password = process.env.SEED_ADMIN_PASSWORD || "changeme123";

  const existing = await db.select().from(admins).limit(1);
  if (existing.length === 0) {
    const passwordHash = await bcrypt.hash(password, 10);
    await db.insert(admins).values({ username, passwordHash });
    console.log(`✓ Admin oluşturuldu: ${username} / ${password}`);
    console.log("  ÖNEMLİ: Giriş yaptıktan sonra şifreni değiştirmeyi unutma.");
  } else {
    console.log("• Admin zaten var, atlanıyor.");
  }

  const existingProfile = await db.select().from(profile).limit(1);
  if (existingProfile.length === 0) {
    await db.insert(profile).values({
      name: "Mehmet Kls",
      title: "Elektrik Teknisyeni / Program Geliştirici",
      tagline: "Elektrik Kamera Ve Güvenlik Sistemleri — Discord Bot, Web Tasarım, Yapay Zeka",
      bio: "Hem fiziksel hem dijital dünyada çalışan biri. Gündüz elektrik, akşam kod. Kendi projelerini sıfırdan inşa etmeyi seven bir geliştirici.",
      githubUrl: "https://github.com/Mehmet-Kls",
      discordUrl: "https://discord.gg/j68Jawdmv6",
      instagramUrl: "https://www.instagram.com/kls.mehmet_",
    });
    console.log("✓ Profil bilgisi eklendi.");
  } else {
    console.log("• Profil zaten var, atlanıyor.");
  }

  const existingSkills = await db.select().from(skills).limit(1);
  if (existingSkills.length === 0) {
    await db.insert(skills).values([
      { name: "Python", category: "language", icon: "🐍", level: 85, orderIndex: 1 },
      { name: "Node.js", category: "language", icon: "🟢", level: 85, orderIndex: 2 },
      { name: "JavaScript", category: "language", icon: "🟨", level: 80, orderIndex: 3 },
      { name: "HTML5", category: "language", icon: "🌐", level: 90, orderIndex: 4 },
      { name: "CSS3", category: "language", icon: "🎨", level: 85, orderIndex: 5 },
      { name: "VS Code", category: "tool", icon: "💻", level: 95, orderIndex: 6 },
      { name: "Windows", category: "platform", icon: "🪟", level: 90, orderIndex: 7 },
      { name: "Linux", category: "platform", icon: "🐧", level: 75, orderIndex: 8 },
    ]);
    console.log("✓ Yetenekler eklendi.");
  } else {
    console.log("• Yetenekler zaten var, atlanıyor.");
  }

  const existingProjects = await db.select().from(projects).limit(1);
  if (existingProjects.length === 0) {
    await db.insert(projects).values([
      {
        title: "Velmora — Discord Yönetim Botu",
        description: "Moderasyon, ekonomi, seviye sistemi, automod, müzik ve ticket modülleri içeren kapsamlı Discord.js v14 botu.",
        tags: ["Node.js", "discord.js", "PostgreSQL"],
        featured: true,
        orderIndex: 1,
      },
      {
        title: "FiveM Topluluk Botu",
        description: "GTA roleplay sunucusu için sıfırdan inşa edilmiş, kapsamlı slash komut sistemine sahip topluluk yönetim botu.",
        tags: ["discord.js v14", "Node.js"],
        featured: true,
        orderIndex: 2,
      },
      {
        title: "Jarvis AI Asistan",
        description: "Ollama, Whisper STT ve edge-tts ile çalışan Windows için sesli yapay zeka asistanı, sistem metrikleri paneli içerir.",
        tags: ["Python", "Ollama", "Whisper"],
        orderIndex: 3,
      },
    ]);
    console.log("✓ Örnek projeler eklendi.");
  } else {
    console.log("• Projeler zaten var, atlanıyor.");
  }

  console.log("\nSeed tamamlandı.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => process.exit(0));
