import { faker } from '@faker-js/faker';
import { sha256 } from 'js-sha256';
import prisma from '../prisma/client.js';

const MIN_POSTS = 5;
const MAX_POSTS = 10;

export async function createUser() {
	await prisma.user.create({
		data: {
			email: faker.internet.email().toLowerCase(),
			password: sha256('Password1'),
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			username: faker.internet.userName(),
			avatar: {
				create: {
					url: faker.image.avatar()
				}
			},
			posts: {
				create: Array.from({
					length: faker.datatype.number({ min: MIN_POSTS, max: MAX_POSTS })
				}).map(() => ({
					caption: faker.lorem.sentence(),
					media: {
						create: {
							url: process.env.DATABASE_URL?.includes('localhost')
								? `dummy/DummyImage-${faker.datatype.number(30)}.webp`
								: faker.image.image(800, 800)
						}
					}
				}))
			}
		}
	});
}
