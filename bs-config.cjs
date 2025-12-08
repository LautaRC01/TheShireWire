module.exports = {
  proxy: "http://localhost:3000",
  files: [
    "public/css/**/*.css",
    "public/js/**/*.js",
    "views/**/*.ejs"
  ],
  port: 3001,
  injectChanges: true,
  reloadDebounce: 200,
  notify: false,
  serveStatic: ["public"],  // sirve CSS/JS
  snippetOptions: {
    rule: {
      match: /<\/body>/i,
      fn: function (snippet, match) {
        return snippet + match;
      }
    }
  }
};

