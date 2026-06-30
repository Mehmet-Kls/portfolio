import { pgTable, serial, text, varchar, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core";

// Admin kullanıcı (tek kişi - site sahibi)
export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 64 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Site genel ayarları / profil bilgisi (tek satır, key-value yerine sabit kolonlar)
export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 128 }).notNull().default("Mehmet Kls"),
  title: varchar("title", { length: 256 }).notNull().default(""),
  tagline: text("tagline").notNull().default(""),
  bio: text("bio").notNull().default(""),
  email: varchar("email", { length: 256 }).default(""),
  githubUrl: varchar("github_url", { length: 256 }).default(""),
  discordUrl: varchar("discord_url", { length: 256 }).default(""),
  instagramUrl: varchar("instagram_url", { length: 256 }).default(""),
  cvFileUrl: text("cv_file_url").default(""),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Projeler (portfolyo)
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description").notNull(),
  tags: jsonb("tags").$type<string[]>().default([]),
  imageUrl: text("image_url").default(""),
  projectUrl: text("project_url").default(""),
  githubUrl: text("github_url").default(""),
  featured: boolean("featured").default(false),
  orderIndex: integer("order_index").default(0),
  status: varchar("status", { length: 32 }).default("published"), // published | draft
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Yetenekler / Skills
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  category: varchar("category", { length: 64 }).default("general"), // language, tool, platform
  icon: varchar("icon", { length: 16 }).default(""),
  level: integer("level").default(80), // 0-100
  orderIndex: integer("order_index").default(0),
});

// Blog yazıları
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 256 }).notNull().unique(),
  title: varchar("title", { length: 256 }).notNull(),
  excerpt: text("excerpt").default(""),
  content: text("content").notNull(),
  coverImageUrl: text("cover_image_url").default(""),
  status: varchar("status", { length: 32 }).default("draft"), // draft | published
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// İletişim formu mesajları
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  subject: varchar("subject", { length: 256 }).default(""),
  body: text("body").notNull(),
  read: boolean("read").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Ziyaretçi / sayfa görüntüleme kayıtları
export const pageViews = pgTable("page_views", {
  id: serial("id").primaryKey(),
  path: varchar("path", { length: 512 }).notNull(),
  referrer: text("referrer").default(""),
  country: varchar("country", { length: 8 }).default(""),
  device: varchar("device", { length: 32 }).default(""), // desktop | mobile | tablet
  sessionId: varchar("session_id", { length: 64 }).default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Genel dosya yükleme kayıtları (admin'in eklediği/sildiği dosyalar - resim, cv, vs.)
export const files = pgTable("files", {
  id: serial("id").primaryKey(),
  filename: varchar("filename", { length: 512 }).notNull(),
  url: text("url").notNull(),
  type: varchar("type", { length: 64 }).default(""),
  sizeBytes: integer("size_bytes").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
