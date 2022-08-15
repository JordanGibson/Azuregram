import { Prisma } from '@prisma/client';
import prisma from '../../../prisma/client';

export async function GET({ params }) {
	const post = await prisma.post.findFirstOrThrow({
		where: {
			id: Number(params.id)
		},
		include: {
			author: {
				include: {
					avatar: true
				}
			},
			media: true,
			comments: {
				include: {
					author: {
						include: {
							avatar: true
						}
					}
				},
				orderBy: {
					id: Prisma.SortOrder.desc
				}
			}
		}
	});
	console.log({ post });
	return {
		status: 200,
		headers: {},
		body: {
			post
		}
	};
}
