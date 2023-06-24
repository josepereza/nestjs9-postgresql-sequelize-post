import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table, DataType } from 'sequelize-typescript';

interface RoleCreationAttrs {
	// поля, которые нужны для создания объекта из этого класса
	value: string;
	description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
	@ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@ApiProperty({ example: 'ADMIN', description: 'Название роли (уникальное)' })
	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: false,
	})
	value: string;

	@ApiProperty({
		example: 'Имеет доступ к админ панели и всему ее функционалу',
		description: 'Описание роли',
	})
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	description: string;
}
