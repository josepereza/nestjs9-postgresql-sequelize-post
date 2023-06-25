import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
	@ApiProperty({ example: 'kakawka@mail.ru', description: 'Уникальный email' })
	@IsString({ message: 'Должно быть строкой' })
	@IsEmail({}, { message: 'Некорректный формат email' })
	email: string;

	@ApiProperty({ example: 'qwe123', description: 'Пароль' })
	@IsString({ message: 'Должно быть строкой' })
	@Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
	password: string;
}
