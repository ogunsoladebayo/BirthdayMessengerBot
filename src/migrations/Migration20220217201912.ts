import { Migration } from '@mikro-orm/migrations';

export class Migration20220217201912 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "birthdate" timestamptz(0) null;');
    this.addSql('alter table "user" drop constraint "user_name_unique";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "birthdate";');
    this.addSql('alter table "user" add constraint "user_name_unique" unique ("name");');
  }

}
