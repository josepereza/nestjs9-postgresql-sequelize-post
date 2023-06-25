import { IsString, IsNumber } from 'class-validator';

export class AddRoleDto {
	@IsString({ message: 'Должно быть строкой' })
	value: string;

	@IsNumber({}, { message: 'Должно быть числом' })
	userId: number;
}
