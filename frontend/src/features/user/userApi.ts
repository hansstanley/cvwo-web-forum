import { User } from '../../types';

const users: User[] = [{ userId: 1, username: 'stanley' }];

export async function handleUserLogin(username: string) {
	if (username.length < 6)
		throw new Error('Username should be at least 6 characters in length.');

	const user = users.find((u) => u.username === username);
	if (!user) throw new Error('Username not found.');

	await new Promise<void>((resolve, reject) => {
		setTimeout(() => resolve(), 1000);
	});
	return user;
}
