exports.errorCatchingMiddleware = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    if (e.isJoi) {
      ctx.throw(422, `Validation error: ${JSON.stringify(e.details)}`);
    }

    ctx.throw(e.status || 500, e);
  }
};
