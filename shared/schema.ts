import { pgTable, text, serial, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const trajectoryPoints = pgTable("trajectory_points", {
  id: serial("id").primaryKey(),
  particleId: integer("particle_id").notNull(),
  timestamp: timestamp("timestamp").notNull(),
  longitude: real("longitude").notNull(),
  latitude: real("latitude").notNull(),
  riskLevel: text("risk_level").notNull().default("low"),
});

export const particles = pgTable("particles", {
  id: serial("id").primaryKey(),
  particleId: integer("particle_id").notNull().unique(),
  name: text("name"),
  description: text("description"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertTrajectoryPointSchema = createInsertSchema(trajectoryPoints).omit({
  id: true,
});

export const insertParticleSchema = createInsertSchema(particles).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertTrajectoryPoint = z.infer<typeof insertTrajectoryPointSchema>;
export type TrajectoryPoint = typeof trajectoryPoints.$inferSelect;

export type InsertParticle = z.infer<typeof insertParticleSchema>;
export type Particle = typeof particles.$inferSelect;
