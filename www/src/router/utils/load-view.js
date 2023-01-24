/**
 * Lazy loads components via route-based chunks
 * @param {String} view Name of the file the view lives in
 * @return {Function}
 */
function loadView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${view}`);
}

export default loadView;
