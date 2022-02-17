import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { User } from ".";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Message extends BaseEntity {
	@ManyToOne(() => User, { wrappedReference: true, nullable: false })
	user!: User;

	@Property()
	mid!: string;

	@Property()
	text!: string;

	constructor(mid: string, text: string) {
		super();
		this.mid = mid;
		this.text = text;
	}
}
