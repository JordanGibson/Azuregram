import { sha256 } from 'js-sha256';
import { createSession, getUser } from './_auth';
import { responses } from './_responses';

export async function POST({ request }) {
	console.log("Getting request")
	const { email, hashedPassword } = await request.json();
	console.log("Getting request")
	const user = await getUser(email.toLowerCase());
	console.log("Getting request")
	if (!user) {
		return responses[400].invalidCredentials;
	}
	console.log("hashed password");
	if (user.password == hashedPassword) {
		const session = await createSession(user.id);
		console.log({ session });
		return responses[200].registeredSuccessfullyResponse(session.token);
	}
	return responses[400].invalidCredentials;
}
