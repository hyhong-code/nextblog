const extractCookieValue = (cookies, key) =>
  cookies
    ?.split(";")
    ?.find((co) => co.startsWith(`${key}=`))
    ?.split(`${key}=`)[1];

export default extractCookieValue;
