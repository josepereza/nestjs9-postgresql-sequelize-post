import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
	constructor(private rolesService: RolesService) {}

	@Post()
	create(@Body() dto: CreateRoleDto) {
		this.rolesService.createRole(dto);
	}

	@Get()
	getByValue(@Query('value') value) {
		if (value) {
			return this.rolesService.getRoleByValue(value);
		}
	}
}
