export const mockResponse = () => {
  const res = {};

  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res;
};

export const mockRequest = (sessionData = {}, body = {}) => ({
  session: { data: sessionData },
  body,
});
