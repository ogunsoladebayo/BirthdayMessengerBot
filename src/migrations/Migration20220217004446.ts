import { Migration } from '@mikro-orm/migrations';

export class Migration20220217004446 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" drop constraint if exists "user_name_check";');
    this.addSql('alter table "user" alter column "name" type varchar(255) using ("name"::varchar(255));');
    this.addSql('alter table "user" alter column "name" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop constraint if exists "user_name_check";');
    this.addSql('alter table "user" alter column "name" type varchar(255) using ("name"::varchar(255));');
    this.addSql('alter table "user" alter column "name" set not null;');
  }

}
