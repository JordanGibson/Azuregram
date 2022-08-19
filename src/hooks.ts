import type { Handle } from '@sveltejs/kit';
import { parse } from 'cookie';
import { getSession as getSessionFromApi } from './routes/auth/_auth.js';

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = parse(event.request.headers.get('cookie') || '');
	if (cookies.session_id) {
		const session = await getSessionFromApi(cookies.session_id);
		if (session) {
			event.locals.session = session;
		}
	}
	return resolve(event);
};

export function getSession(request) {
	return request?.locals?.session;
}
