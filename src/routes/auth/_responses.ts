import { serialize } from 'cookie';

export const responses = {
	200: {
		registeredSuccessfullyResponse(token: string) {
			return {
				status: 200,
				headers: {
					'Set-Cookie': serialize('session_id', token, {
						path: '/',
						httpOnly: true,
						sameSite: 'strict',
						secure: process.env.NODE_ENV === 'production',
						maxAge: 60 * 60 // one hour
					})
				},
				body: {
					message: 'Registration Successful'
				}
			};
		},
		loggedInSuccessfully: {
			status: 200,
			message: 'Logged in successfully'
		}
	},
	300: {
		redirectToHome: {
			status: 302,
			redirect: '/'
		},
		redirectToFeed: {
			status: 302,
			redirect: '/feed'
		}
	},
	400: {
		noUsersInDatabaseToGetDummyAvatar: {
			status: 400,
			body: {
				message:
					"No users in database to get dummy avatar. If you're seeing this in production - you shouldn't be."
			}
		},
		userWithThatEmailAlreadyExists: {
			status: 409,
			body: { message: 'User with that email already exists' }
		},
		invalidCredentials: {
			status: 401,
			body: {
				message: 'Invalid credentials'
			}
		}
	}
};
