# Concept compare

Ext.js
```
widget : {
    xtype : 'button',

    handler : function () {
        var rec = this.getWidgetRecord(),
            active = !rec.get('active');

        rec.set('active', active);
        this.setText(active ? 'Deactivate' : 'Activate');
    }
}
```
≒
Tanstack Table
```
{
  accessorKey: 'active',

  cell: ({ row }) => {
    const employee = row.original; // Reference for the data model on each record

    return (
      <button
        onClick={() => {
          console.log(employee);
        }}
      >
        Toggle
      </button>
    );
  }
}
```

# This
- `this` inside widget object is `button` element 

# Direct Problem
- `col._lastRecord = rec;` is holding a reference for the last record on local memory onWidgetAttach function is executed


# What I fixed
- 1 Deleted `Ext.defer` function block from `onWidgetAttach` function block, quick scroll behavior makes UI buggy in this case.
- 2 Deleted `col._lastRecord = rec;` according to `getWidgetRecord` function returns reference of record with data.
- 3 Call `getWidgetRecord` function on each cell (button) and assign its reference data model to rec.
- 4 Updated record state with `rec.set()`

Ref: https://docs.sencha.com/extjs/7.5.0/classic/Ext.grid.column.Widget.html#method-getWidgetRecord


# Concern
- When handler finish execution, local memory will be collected by Ext.jS to cleanup so won't face performance impact.