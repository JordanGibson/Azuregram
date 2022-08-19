import prisma from '../../../prisma/client.js';

export async function GET() {
	const posts = await prisma.post.findMany({
		orderBy: {
			id: 'desc'
		},
		include: {
			author: {
				include: {
					avatar: true
				}
			},
			media: true,
			comments: true
		}
	});
	return {
		body: {
			posts
		}
	};
}
