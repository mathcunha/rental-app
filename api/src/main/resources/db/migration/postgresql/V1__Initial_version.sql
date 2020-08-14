CREATE TABLE "public"."users" (
    "id" bigint NOT NULL,
    "email" character varying(50),
    "name" character varying(50),
    "password" character varying(100),
    "username" character varying(50),
    CONSTRAINT "uk_users_email" UNIQUE ("email"),
    CONSTRAINT "uk_users_username" UNIQUE ("username"),
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

CREATE TABLE "public"."apartment" (
    "id" BIGSERIAL NOT NULL,
    "available" boolean NOT NULL,
    "created_date" timestamp,
    "apt_size" real NOT NULL,
    "description" character varying(300),
    "lat" double precision NOT NULL,
    "lng" double precision NOT NULL,
    "name" character varying(100),
    "price" real NOT NULL,
    "room" integer NOT NULL,
    "updated_date" timestamp,
    "version" bigint NOT NULL,
    "user_id" bigint NOT NULL,
    CONSTRAINT "apartment_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "uk_apartment_name" UNIQUE ("name"),
    CONSTRAINT "fkilnhaxs1389ei8d9npfy3q3xu" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE NOT DEFERRABLE
) WITH (oids = false);


CREATE TABLE "public"."rents" (
    "id" BIGSERIAL NOT NULL,
    "apartment_id" bigint NOT NULL,
    "name" character varying(255) NOT NULL,
    "price" real NOT NULL,
    "created_date" timestamp,
    "move_date" date NOT NULL,
    "updated_date" timestamp,
    "version" bigint NOT NULL,
    "user_id" bigint NOT NULL,
    CONSTRAINT "rents_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "fk3pf0l216l390r3ya1pk8wvxe9" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE NOT DEFERRABLE
) WITH (oids = false);


CREATE TABLE "public"."roles" (
    "id" bigint NOT NULL,
    "name" character varying(60),
    CONSTRAINT "roles_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "uk_nb4h0p6txrmfc0xbrd1kglp9t" UNIQUE ("name")
) WITH (oids = false);


CREATE TABLE "public"."user_roles" (
    "user_id" bigint NOT NULL,
    "role_id" bigint NOT NULL,
    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("user_id", "role_id"),
    CONSTRAINT "fkh8ciramu9cc9q3qcqiv4ue8a6" FOREIGN KEY (role_id) REFERENCES roles(id) NOT DEFERRABLE,
    CONSTRAINT "fkhfh9dx7w3ubf1co1vdev94g3f" FOREIGN KEY (user_id) REFERENCES users(id) NOT DEFERRABLE
) WITH (oids = false);