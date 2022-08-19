import prisma from '../../../prisma/client.js';

export async function POST({ request, locals }) {
	const { comment, postId } = await request.json();
	const authorId = locals.session.user.id;
	const created = await prisma.comment.create({
		data: {
			content: comment,
			parentPost: {
				connect: {
					id: postId
				}
			},
			author: {
				connect: {
					id: authorId
				}
			}
		}
	});
	return {
		status: 200,
		body: {
			id: created.id
		}
	};
}
