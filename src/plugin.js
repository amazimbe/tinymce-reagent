import Handlebars from 'handlebars';
import Widget from './widget';

const plugin = (editor) => {
  const widget = new Widget({
    editor: editor,
    elementClass: 'reagent',
    html: '<span class="widget reagent">{{selection}}</span>',

    default: (html) => {
      let window = editor.windowManager.open({
        height: 112,
        width: 460,
        title: 'Insert reagent',

        buttons: [{
          text: 'Ok',
          classes: 'widget btn primary',
          onclick: function() {
            window.submit();
          }
        }, {
          text: 'Cancel',
          onclick: function() {
            window.close();
          }
        }],

        body: [{
          type: 'textbox',
          name: 'reagent',
          label: 'Select reagent'
        }],

        onsubmit: function(e) {
          let value = e.data.reagent;
          html = html.replace('{{selection}}', value) + '&nbsp;';
          editor.insertContent(html);
        }
      });

      let modal = $('#' + window._id);
      let input = $(modal.find('input.mce-textbox').get(0));

      $.each(input.parents('.mce-container-body'), (index, item) => {
        return $(item).css('overflow', 'inherit');
      });

      input.css('left', 0);
      input.css('top', 0);

      input.typeahead({
        minLength: 1
      }, {
        displayKey: 'title',
        templates: {
          suggestion: Handlebars.compile(['<span class="reagent">{{title}}</span> ', '<span class="in">in</span> ', '<span class="inventory">{{inventory}}</span>'].join(''))
        },
        source: (query, callback) => {
          let regex = new RegExp(query, 'im');
          return editor.settings.store.findAll('inventory').then(() => {
            return editor.settings.store.findAll('reagent').then(reagents => {
              reagents = reagents.filter(reagent => {
                return regex.test(reagent.get('title')) && !reagent.get('archived');
              }).map(reagent => {
                return {
                  id: reagent.get('id'),
                  title: reagent.get('title'),
                  inventory: reagent.get('inventory.title')
                };
              });
              return callback(reagents);
            });
          });
        }
      });
    }
  });

  editor.addButton('reagent', {
    tooltip: 'Reagent',
    icon: 'reagent',
    text: 'reagent',
    onclick: () => {
      widget.insertContent();
    }
  });
};

export default plugin;
