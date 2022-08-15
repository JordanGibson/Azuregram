import type { Handle } from '@sveltejs/kit';
import { parse } from 'cookie';
import { getSession as getSessionFromApi } from './routes/auth/_auth';

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = parse(event.request.headers.get('cookie') || '');
	if (cookies.session_id) {
		const session = await getSessionFromApi(cookies.session_id);
		if (session) {
			event.locals.session = session;
			return resolve(event);
		}
	}
	if (event.url.pathname == '/' || event.url.pathname.startsWith('/auth')) {
		return resolve(event);
	}
	return Response.redirect(event.url.origin, 303);
};

export function getSession(request) {
	return request?.locals?.session;
}
