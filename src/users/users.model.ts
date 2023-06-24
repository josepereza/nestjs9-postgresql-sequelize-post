import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table, DataType } from 'sequelize-typescript';

interface UserCreationAttrs {
	// поля, которые нужны для создания объекта из этого класса
	email: string;
	password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
	@ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@ApiProperty({ example: 'kakawka@mail.ru', description: 'Уникальный email' })
	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: false,
	})
	email: string;

	@ApiProperty({ example: 'qwe123', description: 'Пароль' })
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	password: string;

	@ApiProperty({ example: true, description: 'Индикатор того, забанен ли пользователь' })
	@Column({
		type: DataType.BOOLEAN,
		defaultValue: false,
	})
	banned: boolean;

	@ApiProperty({ example: 'За хулиганство', description: 'Причина бана/блокировки' })
	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	banReason: string;
}
