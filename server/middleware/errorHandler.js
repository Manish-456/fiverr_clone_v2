export const errorHandler = (err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something went wrong!";
  return res.status(errStatus).send(errMessage);
};
