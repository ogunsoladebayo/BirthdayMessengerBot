import { Migration } from '@mikro-orm/migrations';

export class Migration20220217010633 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" drop constraint if exists "user_user_check";');
    this.addSql('alter table "user" alter column "user" type varchar(255) using ("user"::varchar(255));');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop constraint if exists "user_user_check";');
    this.addSql('alter table "user" alter column "user" type int using ("user"::int);');
  }

}
