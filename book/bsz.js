module.exports = function(book, page) {
  /**
   * 在 package.json 中配置的默认值，这里可以直接使用
   * [config: config option]
   * @type {Object}
   */
  var config = book.config.get('pluginsConfig')['bsz'];

  var wrapIfMarkdown = function(input) {
    return input;
    if (!config.markdown) {
      return input;
    } else {
      return book.renderInline('markdown', input);
    }
  };

  // Gitbook Markdown rendering is asynchronous.
  return Promise.all([wrapIfMarkdown(config.copyright)]).then(function(labels) {
    var copyright = labels[0];
    page.content +=
      '\n\n' +
      [
        '<footer class="page-footer-ex">',
        '<span class="page-footer-ex-copyright">',
        copyright,
        '</span>',
        '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
        '<span class="page-footer-ex-footer-update">',
        '<span id="busuanzi_container_site_uv">本站总访问量&nbsp;<span id="busuanzi_value_site_uv"></span>&nbsp;次</span>',
        '</span>',
        '</footer>',
        '<script async="" src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>'
      ].join(' ');

    return page;
  });
};
