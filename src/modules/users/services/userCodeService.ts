import { getUsers } from './usersService';

export const generateUserCode = () => {
  const users = getUsers();
  const existingCodes = users.map((user) => user.code);
  let index = 1;

  while (true) {
    const candidate = `USR-${index.toString().padStart(3, '0')}`;
    if (!existingCodes.includes(candidate)) {
      return candidate;
    }
    index += 1;
  }
};
