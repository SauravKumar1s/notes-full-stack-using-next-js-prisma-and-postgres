-- CreateEnum
CREATE TYPE "Mood" AS ENUM ('Personal', 'Work', 'Travel', 'Health');

-- CreateTable
CREATE TABLE "Entry" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mood" "Mood" NOT NULL,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);
