import { faker } from '@faker-js/faker';
import prisma from '../prisma/client.js';
import { createUser } from './createUser.js';

const USER_COUNT = 15;

async function seed() {
	await clearDatabase();
	Array.from({ length: USER_COUNT }).map(createUser);
	await hydratePostsWithComments();
}

async function clearDatabase() {
	await prisma.session.deleteMany();
	await prisma.comment.deleteMany();
	await prisma.post.deleteMany();
	await prisma.user.deleteMany();
	await prisma.media.deleteMany();
}

seed()
	.then(() => {})
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

async function hydratePostsWithComments() {
	const posts = await prisma.post.findMany();
	const users = await prisma.user.findMany();
	const promises = posts.map((post) =>
		prisma.comment.createMany({
			data: Array.from({
				length: faker.datatype.number({ min: 1, max: 10 })
			}).map(() => ({
				postId: post.id,
				content: faker.lorem.sentence(),
				authorId: faker.helpers.arrayElement(users).id
			}))
		})
	);
	await Promise.all(promises);
}
