/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Therapist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Therapist_email_key" ON "Therapist"("email");
