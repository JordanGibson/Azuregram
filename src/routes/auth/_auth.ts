import type { Media, Prisma, Session, User } from '@prisma/client';
import { randomUUID } from 'crypto';
import { now } from 'lodash';
import prisma from '../../../prisma/client';

export async function getUser(user: number | string): Promise<User | null> {
	return await prisma.user.findFirst({
		where: getWhereQuery(user)
	});
}

type UserSession = Session & {
	user: User & {
		avatar: Media;
	};
};

function getWhereQuery(user: string | number): Prisma.UserWhereInput {
	return typeof user == 'string'
		? {
				email: {
					equals: user,
					mode: 'insensitive'
				}
		  }
		: {
				id: {
					equals: user
				}
		  };
}

export async function getSession(session_token: string): Promise<UserSession | null> {
	return prisma.session.findFirst({
		where: { token: session_token },
		include: { user: { include: { avatar: true } } }
	});
}

async function clearAllExistingOrExpiredUserSessions(userId: number) {
	const time = new Date(now());
	await prisma.session.deleteMany({
		where: {
			OR: [{ userId: { equals: userId } }, { expiry: { lt: time } }]
		}
	});
}

export async function createSession(userId: number): Promise<Session> {
	await getUser(userId);
	await clearAllExistingOrExpiredUserSessions(userId);
	return await prisma.session.create({
		data: {
			userId: userId,
			token: randomUUID()
		}
	});
}
