import prisma from '../../../prisma/client.js';
export async function POST({ locals }) {
	const userId = Number(locals.session.user.id);
	await prisma.session.delete({
		where: {
			userId: userId
		}
	});
	return {
		status: 200,
		body: {
			message: 'Logged out successfully'
		}
	};
}
