import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../utils/roles/roles.enum';
import { FCMToken } from '../../firebase/fcm-tokens/models/fcm-token.model';
import { Album } from '../../albums/models/album.model';
import { User } from '../../users/models/user.model';

@Entity()
export class Artist {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	image: string;

	@Column()
	name: string;

	@ManyToMany(() => Artist)
	@JoinTable()
	similarArtists: Artist[];

	@OneToMany(() => Album, (album) => album.artist)
	albums: Album[];

	@ManyToMany(() => User, (user) => user.subscriptions)
	subscribers: User[];
}
