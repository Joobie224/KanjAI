-- CreateTable
CREATE TABLE "Kanji" (
    "id" TEXT NOT NULL,
    "character" TEXT NOT NULL,
    "meaning" TEXT[],
    "kunReading" TEXT[],
    "onReading" TEXT[],
    "strokeCount" INTEGER,
    "favorited" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Kanji_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kanji_character_key" ON "Kanji"("character");
