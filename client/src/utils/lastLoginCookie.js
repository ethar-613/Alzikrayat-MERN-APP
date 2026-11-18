/**
 * this file saves the "last login" information of this browser in a cookie for 7 days
 * the cookie contains only the first name and the time (never the password or the token)
 */

const COOKIE_NAME = 'alzikrayat_last_login';
const SEVEN_DAYS_IN_SECONDS = 7 * 24 * 60 * 60;

// save the last login in a cookie that expires after 7 days
// parameter "user" is the public user data that came from the server
export function saveLastLogin(user) {
  const info = {
    firstName: user.firstName,
    time: new Date().toISOString(),
  };
  const value = encodeURIComponent(JSON.stringify(info));
  document.cookie = `${COOKIE_NAME}=${value}; max-age=${SEVEN_DAYS_IN_SECONDS}; path=/; SameSite=Lax`;
}

// read the last login from the cookie
// Returns object {firstName, time} or null if there is no cookie (or it expired)
export function getLastLogin() {
  const match = document.cookie
    .split('; ')
    .find((item) => item.startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;

  try {
    return JSON.parse(decodeURIComponent(match.slice(COOKIE_NAME.length + 1)));
  } catch {
    return null;
  }
}
