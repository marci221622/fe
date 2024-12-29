export const parseJwt = (session: { accessToken: string; refreshToken: string }) => {
  try {
    return JSON.parse(atob(session.accessToken.split('.')[1])) as { exp?: number; sub?: string };
  } catch (err) {
    return {};
  }
};
