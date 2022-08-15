import prisma from '../../../prisma/client';
export async function POST({ locals, request }) {
	const user = locals.session.user;
	const { url, caption } = await request.json();
	const post = await prisma.post.create({
		data: {
			author: {
				connect: {
					id: user.id
				}
			},
			caption: caption,
			media: {
				create: {
					url: url
				}
			}
		}
	});
	return {
		status: 200,
		body: {
			id: post.id
		}
	};
}
