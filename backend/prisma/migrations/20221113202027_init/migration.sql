-- CreateTable
CREATE TABLE "account" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(60) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avatar" (
    "id" SERIAL NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "path" VARCHAR(50) NOT NULL,
    "last_modified" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "avatar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banner" (
    "id" SERIAL NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "path" VARCHAR(50) NOT NULL,
    "last_modified" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "banner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "following" (
    "follower" INTEGER NOT NULL,
    "recipient" INTEGER NOT NULL,
    "followed_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "follower_recipient_pkey" PRIMARY KEY ("follower","recipient")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "bio" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_modified" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "displayname" VARCHAR(50) NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tweet" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR(280),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_modified" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author" INTEGER,

    CONSTRAINT "tweet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tweet_image" (
    "id" SERIAL NOT NULL,
    "path" VARCHAR(50) NOT NULL,
    "last_modified" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tweet_id" INTEGER NOT NULL,

    CONSTRAINT "tweet_image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_username_key" ON "account"("username");

-- CreateIndex
CREATE UNIQUE INDEX "account_email_key" ON "account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "account_password_key" ON "account"("password");

-- CreateIndex
CREATE INDEX "fki_avatar_profile_id_profile_id_fkey" ON "avatar"("profile_id");

-- CreateIndex
CREATE INDEX "fki_banner_profile_id_profile_id" ON "banner"("profile_id");

-- CreateIndex
CREATE INDEX "fki_following_follower_profile_id_fkey" ON "following"("follower");

-- CreateIndex
CREATE INDEX "fki_following_recipient_profile_id_fkey" ON "following"("recipient");

-- CreateIndex
CREATE UNIQUE INDEX "username_unique" ON "profile"("username");

-- CreateIndex
CREATE INDEX "fki_profile_username_account_username_fkey" ON "profile"("username");

-- CreateIndex
CREATE INDEX "fki_tweet_author_profile_id" ON "tweet"("author");

-- AddForeignKey
ALTER TABLE "avatar" ADD CONSTRAINT "avatar_profile_id_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "banner" ADD CONSTRAINT "banner_profile_id_profile_id" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "following" ADD CONSTRAINT "following_follower_profile_id_fkey" FOREIGN KEY ("follower") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "following" ADD CONSTRAINT "following_recipient_profile_id_fkey" FOREIGN KEY ("recipient") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_username_account_username_fkey" FOREIGN KEY ("username") REFERENCES "account"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tweet" ADD CONSTRAINT "tweet_author_profile_id" FOREIGN KEY ("author") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tweet_image" ADD CONSTRAINT "tweet_image_tweet_id_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
