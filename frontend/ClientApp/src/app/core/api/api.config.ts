export const apiUrl = 'http://localhost:3000/api';

export const apiUrlsConfig = {
  loginUrl: `${apiUrl}/auth`,
  usersUrl: `${apiUrl}/users`,
  currentUserUrl: `${apiUrl}/myuser`,
  mealsUrl: `${apiUrl}/users/:userId/meals`
};
