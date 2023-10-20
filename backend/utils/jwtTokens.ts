export const sendToken = (
  user?: any,
  statusCode?: number,
  res?: any,
  message?: string
) => {
  const token = user.getJWTToken();

  // OPTION FOR COOKIES

  const expirationDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
  const option = {
    expires: expirationDate,
    httpOnly: true,
  };
  res
    .status(statusCode)
    .cookie("token", token, option)
    .json({
      success: true,
      user: statusCode === 201 ? user : null,
      token,
      message: message,
    });
};
