import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User) private userRepository: typeof User,
		private roleService: RolesService,
	) {}

	async createUser(dto: CreateUserDto): Promise<User> {
		const user = await this.userRepository.create(dto);
		const role = await this.roleService.getRoleByValue('ADMIN'); // для присваивания роли по дефолту
		await user.$set('roles', [role.id]); // позволяет перезаписать поле и обновить его внутри БД
		user.roles = [role]; // добавляем просто объекту поле ролей (нужно для того, чтобы дальше можно было вернуть user в методе регистрации и по итогу зашифровать в токен роль)
		return user;
	}

	async getAllUsers(): Promise<User[]> {
		const users = await this.userRepository.findAll({ include: { all: true } }); // подтягиваем все поля, ссылающиеся на другие таблицы
		return users;
	}

	async getUserByEmail(email: string) {
		const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });
		return user;
	}

	async addRole(addRoleDto: AddRoleDto) {
		const user = await this.userRepository.findByPk(addRoleDto.userId);
		const role = await this.roleService.getRoleByValue(addRoleDto.value);
		if (role && user) {
			await user.$add('roles', role.id); // добавляем к массиву еще одно значение
			return addRoleDto;
		}
		throw new HttpException('Пользователь или роль не сущесвуют', HttpStatus.NOT_FOUND);
	}

	async banUser(banUserDto: BanUserDto) {
		const user = await this.userRepository.findByPk(banUserDto.userId);
		if (!user) {
			throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
		}
		user.banned = true;
		user.banReason = banUserDto.banReason;
		await user.save(); // сохраняем обновленного пользователя в БД
		return user;
	}
}
