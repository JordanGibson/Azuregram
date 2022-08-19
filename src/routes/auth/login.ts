import { createSession, getUser } from './_auth';
import { responses } from './_responses';

export async function POST({ request }) {
	const { email, hashedPassword } = await request.json();
	const user = await getUser(email.toLowerCase());
	if (!user) {
		return responses[400].invalidCredentials;
	}
	if (user.password == hashedPassword) {
		const session = await createSession(user.id);
		return responses[200].registeredSuccessfullyResponse(session.token);
	}
	return responses[400].invalidCredentials;
}
