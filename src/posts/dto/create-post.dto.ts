export class CreatePostDto {
	title: string;
	content: string;
	userId: number; // по хорошему доставать из токена
}
