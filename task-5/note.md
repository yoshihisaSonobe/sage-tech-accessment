# Concept

## Ext.js Filter
- https://docs.sencha.com/extangular/7.5.0/modern/Ext.util.Filter.html#cfg-id
<br />
Prevent stack filter key every execution


## Bulk mutation (single batch)
- https://docs.sencha.com/extjs/7.5.1/classic/Ext.data.TreeStore.html#method-beginUpdate
```
Automatic synchronization as configured by the autoSync flag is deferred until the endUpdate method is called, so multiple mutations can be coalesced into one synchronization operation.
```
- `store.suspendEvents() & store.resumeEvents()` might send multiple events after execution.

