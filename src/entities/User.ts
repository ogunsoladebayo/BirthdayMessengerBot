import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { Message } from ".";

@Entity()
export class User extends BaseEntity {
	@Property({ unique: true })
	user!: number;

	@Property({ unique: true })
	name!: string;

	@OneToMany(() => Message, (message) => message.user, { orphanRemoval: true, nullable: true })
	messages = new Collection<Message>(this);

	constructor(user: number, name: string) {
		super();
		this.user = user;
		this.name = name;
	}
}
