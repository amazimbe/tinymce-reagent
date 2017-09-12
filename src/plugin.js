import _ from 'lodash';

const plugin = (editor) => {
  editor.addButton('reagent', {
    text: 'reagent',
    icon: false,
    onclick: () => {
      // Open window
      editor.windowManager.open({
        title: 'reagent plugin',
        body: [
          { type: 'textbox', name: 'title' }
        ],
        onsubmit(e) {
          // Insert content when the window form is submitted
          const kebabbyString = _.kebabCase(e.data.title);
          editor.insertContent(kebabbyString);
        }
      });
    }
  });
};

export default plugin;
