const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  //   app.use(
  //     "/apis",
  //     createProxyMiddleware({
  //       target: "https://healthcarekims.herokuapp.com",
  //       changeOrigin: true,
  //       pathRewrite: {
  //         "^/apis": "",
  //       },
  //     })
  //   );
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://cdndemo-api.co-vin.in/api",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/",
      },
    })
  );
};
