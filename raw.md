/* ---------------- Middleware System ---------------- */

const middlewares = [];

// Register middleware
function use(fn) {
  middlewares.push(fn);
}

// Execute middleware chain
function runMiddlewares(req, res, index = 0) {
  if (index < middlewares.length) {
    middlewares[index](req, res, () =>
      runMiddlewares(req, res, index + 1)
    );
  }
}

/* ---------------- Example Middleware ---------------- */

// Log request URL
use((req, res, next) => {
  console.log(`URL: ${req.url}`);
  next();
});
