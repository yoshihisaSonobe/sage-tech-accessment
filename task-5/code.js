Ext.define('App.DirectoryController', {
  extend : 'Ext.app.ViewController',
  alias  : 'controller.directory',

  // TODO #1: single, replaceable filter by name (case-insensitive substring).
  // The listener is also where you debounce — see the search field below.
  handleSearchChange : function (field, value) {
    var store = this.getView().getStore(),
        filters = store.getFilters(),
        filterId = 'employee-name-search';

    filters.removeAtKey(filterId);

    if (value) {
        filters.add({
            id            : filterId,
            property      : 'name',
            value         : value,
            anyMatch      : true,
            caseSensitive : false
        });
    }
},

  // TODO #2: raise salary by 10% for ALL records of the chosen dept,
  // batched so the view refreshes ONCE. Use record.set(...).
  handleRaise : function () {
    var store = this.getView().getStore(),
        dept  = this.lookup('deptCombo').getValue(); //reference for combobox

    store.beginUpdate();

    try {
        store.each(function (record) {
            if (record.get('department') === dept) {
                record.set(
                    'salary',
                    Math.round(record.get('salary') * 1.1)
                );
            }
        });
    } finally {
      // Just in case, something goes wrong, we still want to release the lock (lock might not be the collect word in this case, but it is the idea)
        store.endUpdate();
    }
},

  // TODO #3: pure, synchronous, HTML-encoding salary renderer.
  // Runs MANY times under buffered rendering — formatting only.
  salaryRenderer : function (value) {
      var formatted = '$' + Ext.util.Format.number(value, '0,000'), // 50000 -> "$50,000"
          encoded = Ext.String.htmlEncode(formatted);

      if (value > 50000) {
          return '<span style="color:red">' + encoded + '</span>';
      }

      return encoded;
  }
});


Ext.application({
  name : 'Fiddle',

  launch : function () {
      var departments = ['HR', 'Payroll', 'Engineering', 'Sales', 'Support'],
          data = [],
          i;

      for (i = 1; i <= 10000; i++) {
          data.push({
              id         : i,
              name       : 'Employee ' + i,
              department : departments[i % departments.length],
              salary     : 40000 + (i % 50) * 1000
          });
      }

      Ext.create('Ext.grid.Panel', {
          title      : 'Employee directory (' + data.length + ' rows)',
          renderTo   : Ext.getBody(),
          height     : 460,
          width      : 720,
          controller : 'directory',

          store : {
              fields : ['id', 'name', 'department', { name : 'salary', type : 'number' }],
              data   : data
          },

          tbar : [
              'Search:',
              {
                  xtype     : 'textfield',
                  emptyText : 'name contains…',
                  width     : 220,
                  // TODO #1: debounce this — e.g. { fn : 'handleSearchChange', buffer : 300 }
                  listeners : {
                    change : {
                      fn     : 'handleSearchChange',
                      buffer : 300
                    }
                  }
              },
              '->',
              'Dept:',
              {
                  xtype     : 'combobox',
                  reference : 'deptCombo',
                  width     : 140,
                  editable  : false,
                  queryMode : 'local',
                  value     : 'Engineering',
                  store     : departments
              },
              {
                  text    : 'Raise 10%',
                  handler : 'handleRaise'
              }
          ],

          columns : [
              { text : 'ID', dataIndex : 'id', width : 70 },
              { text : 'Name', dataIndex : 'name', flex : 1 },
              { text : 'Department', dataIndex : 'department', width : 130 },
              { text : 'Salary', dataIndex : 'salary', width : 130, renderer : 'salaryRenderer' }
          ]
      });
  }
});