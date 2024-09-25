/*
  Warnings:

  - You are about to alter the column `bio` on the `profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(160)`.
  - A unique constraint covering the columns `[profile_id]` on the table `avatar` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profile_id]` on the table `banner` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "location" VARCHAR(30),
ALTER COLUMN "bio" SET DATA TYPE VARCHAR(160);

-- CreateIndex
CREATE UNIQUE INDEX "avatar_profile_id_key" ON "avatar"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "banner_profile_id_key" ON "banner"("profile_id");
