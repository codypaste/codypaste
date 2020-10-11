exports.errorCatchingMiddleware = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    if (e.isBoom) {
      const { output } = e;
      ctx.throw(output.statusCode, JSON.stringify(output.payload));
    }

    ctx.throw(e.status || 500, e);
  }
};
