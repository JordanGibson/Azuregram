import prisma from '../../../prisma/client';
import { createSession as createSessionForUser } from './_auth';
import { responses } from './_responses';

export async function POST({ request }) {
	const { firstName, lastName, username, email, hashedPassword, avatarUrl } = await request.json();
	const existingUser = await prisma.user.findUnique({ where: { email: email } });
	if (existingUser) {
		return responses[400].userWithThatEmailAlreadyExists;
	}
	const newUser = await createUser(email, hashedPassword, firstName, lastName, username, avatarUrl);
	const session = await createSessionForUser(newUser.id);
	return responses[200].registeredSuccessfullyResponse(session.token);
}

async function createUser(
	email: string,
	hashedPassword: string,
	firstName: string,
	lastName: string,
	username: string,
	avatarUrl: string
) {
	return await prisma.user.create({
		data: {
			email: email.toLowerCase(),
			password: hashedPassword,
			firstName: firstName,
			lastName: lastName,
			username: username,
			avatar: {
				create: { url: avatarUrl }
			}
		}
	});
}
