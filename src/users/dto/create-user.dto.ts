import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
	@ApiProperty({ example: 'kakawka@mail.ru', description: 'Уникальный email' })
	email: string;

	@ApiProperty({ example: 'qwe123', description: 'Пароль' })
	password: string;
}
