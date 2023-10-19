export const sendToken = (
  user?: any,
  statusCode?: number,
  res?: any,
  message?: string
) => {
  const token = user.getJWTToken();

  // OPTION FOR COOKIES
  const cookieExpire = process.env.COOKIE_EXPIRE
    ? parseInt(process.env.COOKIE_EXPIRE, 10)
    : 1;
  const option = {
    expires: new Date(Date.now() + cookieExpire),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, option).json({
    success: true,
    user,
    token,
    message: message,
  });
};
