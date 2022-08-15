export type UserWithAvatar = import('@prisma/client').User & {
	avatar: import('@prisma/client').Media;
};

export type CommentWithAuthor = import('@prisma/client').Comment & {
	author: UserWithAvatar;
};
