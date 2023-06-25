import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/users/users.model';

interface PostCreationAttrs {
	// поля, которые нужны для создания объекта из этого класса
	title: string;
	content: string;
	userId: number;
	image: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {
	@ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@ApiProperty({ example: 'JavaScript', description: 'Заголовок поста' })
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	title: string;

	@ApiProperty({ example: 'lorem*20', description: 'Контент поста' })
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	content: string;

	@ApiProperty({ example: '/uploads/static/kaka.png', description: 'Обложка поста' })
	@Column({ type: DataType.STRING })
	image: string;

	@ApiProperty({ example: 2, description: 'Идентификатор пользователя-автора поста' })
	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	userId: number;

	// это не хранится в базе данных!! (т.к. нет декоратора @Column), поэтому нужно указать userId как столбец, чтобы указать для postgres-a что это внешний ключ
	@BelongsTo(() => User) // один ко многим
	author: User;
}
