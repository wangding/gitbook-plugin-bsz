module.exports = {
    book: {
        assets: "./book",
        js: ["bsz.js"],
        css: ["bsz.css"]
    },

    hooks: {
        "page:before": function(page) {
          var footer = require('./book/bsz');
          return footer(this, page);
        },
    }
};
