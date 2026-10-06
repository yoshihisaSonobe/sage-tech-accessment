// =========================================================================
//  TODO: implement this component. It must be a proper two-way bindable
//  control built on the Ext JS config system.
// =========================================================================
Ext.define('App.ux.StarRating', {
  extend : 'Ext.Component',
  xtype  : 'starrating',

  config : {
      value    : 0,
      maxStars : 5
  },

  defaultBindProperty : 'value',

   // TODO: make `value` the default bind target and two-way bindable.
  twoWayBindable : {
      value : 1
  },

  baseCls : 'app-starrating',

  // TODO: applyValue  — normalize/clamp to an integer in [0, maxStars]
  applyValue : function (value) {
        value = Number(value);

        if (!isFinite(value)) {
        // Let's add some logic on production code?? depends on data-value attribute on <span>
        return;
        }

        return Ext.Number.constrain(value, 0, this.getMaxStars()); // Compatible Math.min
    },
  // TODO: updateValue — re-render stars when the value changes (guard render)

  updateValue : function (value, oldValue) {
        // debug purpose
        // console.log('updateValue:', {
        //     oldValue : oldValue,
        //     newValue : value,
        //     rendered : this.rendered
        // });

        if (!this.rendered) {
            return;
        }

        this.renderStars();
    }, 

  afterRender : function () {
        this.callParent(arguments);

        this.renderStars();

        this.el.on('click', this.onStarClick, this, {
            delegate : '.app-starrating-star'
        });
        // this.setValue(7); testing purpose: should clamp to maxStars (5)
        // this.setValue(-3); testing purpose: should clamp to 0 but default value won't change so this won't execute updateValue function
    },

    renderStars : function () {
        var value = this.getValue(),
            maxStars = this.getMaxStars(),
            html = [],
            i;

        for (i = 1; i <= maxStars; i++) {
            html.push(
                '<span class="app-starrating-star" data-value="' + i + '">' +
                    (i <= value ? '★' : '☆') +
                '</span>'
            );
        }

        this.setHtml(html.join(''));
    },

    // TODO: render the stars and handle clicks → setValue(n)
    onStarClick : function (event, target) {
    var value = parseInt(target.getAttribute('data-value'), 10);

    this.setValue(value); // Concept compatible: React setState
    },
});


Ext.application({
  name : 'Fiddle',

  launch : function () {
      Ext.create('Ext.form.Panel', {
          title      : 'Performance review',
          renderTo   : Ext.getBody(),
          width      : 420,
          bodyPadding: 16,

          viewModel : {
              data : { rating : 2 }
          },

          items : [
              {
                  xtype      : 'starrating',
                  fieldLabel : 'Overall rating',   // cosmetic; Component ignores it
                  reference  : 'stars',
                  bind       : '{rating}' //default to html: https://docs.sencha.com/extjs/7.5.0/modern/Ext.Editor.html?utm_source=chatgpt.com#property-defaultBindProperty
              },
              {
                  xtype  : 'displayfield',
                  margin : '10 0 0 0',
                  bind   : 'You rated: {rating} / 5'
              }
          ],

          buttons : [
              {
                  text    : 'Reset to 5',
                  handler : function (btn) {
                      // VM → component path; don't touch the starrating directly
                      btn.lookupViewModel().set('rating', 5);
                  }
              },
              {
                  text : 'Save',
                  bind : { disabled : '{!rating}' },
                  handler : function (btn) {
                      Ext.Msg.alert('Saved', 'Stored rating = ' + btn.lookupViewModel().get('rating'));
                  }
              }
          ]
      });
  }
});