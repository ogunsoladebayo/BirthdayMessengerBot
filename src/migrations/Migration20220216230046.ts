import { Migration } from '@mikro-orm/migrations';

export class Migration20220216230046 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null default now(), "user" int not null, "name" varchar(255) not null);');
    this.addSql('alter table "user" add constraint "user_user_unique" unique ("user");');
    this.addSql('alter table "user" add constraint "user_name_unique" unique ("name");');

    this.addSql('create table "message" ("id" serial primary key, "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null default now(), "user_id" int not null, "mid" varchar(255) not null, "text" varchar(255) not null);');

    this.addSql('alter table "message" add constraint "message_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "message" drop constraint "message_user_id_foreign";');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "message" cascade;');
  }

}
