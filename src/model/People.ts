import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity("people")
export class People {
  @ObjectIdColumn()
  id?: string;

  @Column()
  firstName?: string;

  @Column()
  lastName?: string;

  @Column()
  mobileNo?: string;

  @Column()
  email?: string;
}
