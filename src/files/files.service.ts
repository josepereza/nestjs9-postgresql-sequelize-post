import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { existsSync, mkdir, writeFile, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { v4 } from 'uuid';
import { path } from 'app-root-path';

@Injectable()
export class FilesService {
	async createFile(file): Promise<string> {
		// ЛУЧШЕ ЮЗАТЬ АСИНХРОННЫЕ варианты функций этих (т.к. можно заддосить если грузить слишком большие файлы)
		// возвращает строку названия файла
		try {
			const fileName = v4() + '.jpg';
			// const filePath = resolve(__dirname, '..', 'static'); // склеиваем путь до папки с загрузками (статичными)
			const filePath = `${path}/uploads`;
			// \dist\static
			console.log(path);
			if (!existsSync(filePath)) {
				await mkdir(filePath, { recursive: true }, (err) => {
					if (err) {
						throw new HttpException('Ошибка при создании папки', HttpStatus.BAD_REQUEST);
					}
				}); // создаем папку если по эому пути ничего не существует (второй параметр - если какой-то папки в этом пути нет, то она буде создана)
			}
			await writeFile(join(filePath, fileName), file.buffer, (err) => {
				if (err) {
					throw new HttpException('Ошибка при записи файла в папку', HttpStatus.BAD_REQUEST);
				}
			}); // создаем файл
			return fileName;
		} catch (e) {
			throw new HttpException('Ошибка при сохранении файла', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
