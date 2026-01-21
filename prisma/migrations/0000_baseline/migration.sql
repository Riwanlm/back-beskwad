-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "public"."event_registrations" (
    "id" BIGSERIAL NOT NULL,
    "id_user" BIGINT NOT NULL,
    "id_event" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."events" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL,
    "id_user" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" BIGSERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_registrations_event" ON "public"."event_registrations"("id_event" ASC);

-- CreateIndex
CREATE INDEX "idx_registrations_user" ON "public"."event_registrations"("id_user" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "unique_user_event_registration" ON "public"."event_registrations"("id_user" ASC, "id_event" ASC);

-- CreateIndex
CREATE INDEX "idx_events_date" ON "public"."events"("date" ASC);

-- CreateIndex
CREATE INDEX "idx_events_id_user" ON "public"."events"("id_user" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "unique_email" ON "public"."users"("email" ASC);

-- AddForeignKey
ALTER TABLE "public"."event_registrations" ADD CONSTRAINT "event_registrations_id_event_fkey" FOREIGN KEY ("id_event") REFERENCES "public"."events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."event_registrations" ADD CONSTRAINT "event_registrations_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."events" ADD CONSTRAINT "fk_events_id_user" FOREIGN KEY ("id_user") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

