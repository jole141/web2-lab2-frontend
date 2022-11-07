const proxy = require("http-proxy-middleware").createProxyMiddleware;

module.exports = function (app) {
  app.use(
    proxy(`/api/**`, {
      target: process.env.REACT_APP_API_URL || "http://localhost:8000",
    })
  );
};
