export default class {
  constructor(options) {
    this.editor = options.editor;
    this.html = options.html;
    this.default = options.default;
    this.elementClass = options.elementClass;
  }

  insertContent() {
    let content, html, selected;

    selected = this.editor.selection.getNode();
    content = this.editor.selection.getContent();

    if ($(selected).hasClass(this.elementClass)) {
      this.editor.dom.remove(selected);
      html = $(selected).text();
    } else if (!content) {
      if (typeof this.default === 'function') {
        return this.default(this.html);
      } else {
        html = this.html.replace('{{selection}}', this.default) + '&nbsp;';
      }
    } else {
      html = this.html.replace('{{selection}}', content);
    }
    html = html.replace('{{elementClass}}', this.elementClass);
    this.editor.insertContent(html + '&nbsp;');
  };
}
