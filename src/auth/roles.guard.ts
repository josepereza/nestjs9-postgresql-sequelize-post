import {
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private jwtService: JwtService, private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		try {
			const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
				// getAllAndOverride позволяет комбинировать метаданные декораторов для всего контроллера (getClass()) и для одного маршрута(getHandler())
				context.getHandler(),
				context.getClass(),
			]);

			console.log(requiredRoles);
			if (!requiredRoles) {
				return true;
			}

			const req = context.switchToHttp().getRequest();
			const authHeader = req.headers.authorization;
			const bearer = authHeader.split(' ')[0];
			const token = authHeader.split(' ')[1];

			if (bearer !== 'Bearer' || !token) {
				throw new UnauthorizedException({
					message: 'В заголовках авторизации нет токена или тип токена не Bearer',
				});
			}

			const user = this.jwtService.verify(token); // раскодировали токен в объек user
			req.user = user; // помещаем пользовтеля в объект запроса
			return user.roles.some((role) => requiredRoles.includes(role.value));
		} catch (e) {
			throw new HttpException(
				'Пользователь не обладает достаточным количеством прав',
				HttpStatus.FORBIDDEN,
			);
		}
	}
}
