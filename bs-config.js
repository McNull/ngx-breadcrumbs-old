
module.exports = {
  "server": {
    "baseDir": ["src/demo", "out-tsc/demo"],
    "routes": {
      "/node_modules": "node_modules",
      "/quickstart-lib": "src/lib",
      "/quickstart-lib-js": "out-tsc/lib"
    },
    middleware: [function (req, res, next) {
      req.url = req.url.replace(/^\/quickstart-lib\/(.*\.(js|map))/, '/quickstart-lib-js/$1');
      return next();
    }]
  }
};
