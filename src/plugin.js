import Handlebars from 'handlebars';

const plugin = (editor) => {
  editor.addButton('reagent', {
    tooltip: 'Reagent',
    icon: 'reagent',

    onclick() {
      let window = editor.windowManager.open({
        height: 112,
        width: 460,
        title: 'Insert reagent',

        buttons: [{
          text: 'Ok',
          classes: 'widget btn primary',
          onclick() {
            window.submit();
          }
        }, {
          text: 'Cancel',
          onclick() {
            window.close();
          }
        }],

        body: [{
          type: 'textbox',
          name: 'reagent',
          label: 'Select reagent'
        }],

        onsubmit(e) {
          let value = e.data.reagent;
          editor.insertContent(`<span class="widget reagent">${value}</span>&nbsp;`);
        }
      });

      let input = $(`#${window._id} input.mce-textbox:first`);
      $.each(input.parents('.mce-container-body'), (_index, item) => {
        $(item).css('overflow', 'inherit');
      });

      input.css('left', 0);
      input.css('top', 0);

      input.typeahead({
        minLength: 1
      }, {
        display: 'title',
        templates: {
          empty: ['<span class="reagent">', 'Unable to find any reagents that match the query', '</span>'].join('\n'),
          suggestion: Handlebars.compile('<div><span class="reagent">{{title}}</span><span class="in">&nbsp;in</span><span class="inventory">&nbsp;{{inventory}}</span></div>')
        },
        source(query, syncCallback, asyncCallback) {
          let regex = new RegExp(query, 'im');
          let params = { include: 'inventory', reload: true };
          editor.settings.store.findAll('reagent', params).then(reagents => {
            reagents = reagents.filter(reagent => {
              return regex.test(reagent.get('title')) && !reagent.get('archived');
            }).map(reagent => {
              return { id: reagent.get('id'), title: reagent.get('title'), inventory: reagent.get('inventory.title') };
            });
            asyncCallback(reagents);
          });
        }
      });
    }
  });
};

export default plugin;
