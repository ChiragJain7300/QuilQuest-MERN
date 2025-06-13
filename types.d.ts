// export const books = pgTable("books", {
//   id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
//   title: varchar("title", { length: 255 }).notNull(),
//   author: varchar("author", { length: 255 }).notNull(),
//   genre: varchar("genre").notNull(),
//   rating: integer("rating").notNull(),
//   coverUrl: text("cover_url").notNull(),
//   coverColor: text("cover_color").notNull(),
//   description: text("description").notNull(),
//   totalCopies: integer("total_copies").notNull().default(1),
//   availableCopies: integer("available_copies").notNull().default(0),
//   videoUrl: text("video_url").notNull(),
//   summary: varchar("summary").notNull(),
//   createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
// });
interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  video?: string;
  summary?: string;
  createdAt: Date | null;
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}

interface BookParams {
  title: string;
  genre: string;
  author: string;
  rating: number;
  coverUrl: string;
  coverColor: string;
  description: string;
  totalCopies: number;
  videoUrl: string;
  summary: string;
}
interface BookParams {
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  coverColor: string;
  description: string;
  totalCopies: number;
  videoUrl: string;
  summary: string;
}

interface BorrowBookParams {
  bookId: string;
  userId: string;
}