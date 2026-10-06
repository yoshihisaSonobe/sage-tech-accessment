# Concept

Ref: https://docs.sencha.com/extjs/7.5.1/modern/Ext.Deferred.html#static-method-all
```
Ext.Deferred.all([
    Api.loadProfile(),
    Api.loadPermissions()
])
```
≒ <br>
JavaScript
```
Promise.all([
    loadProfile(),
    loadPermissions()
])
```

- `.otherwise(...)` ≒ `.catch(..)` -> single error handler
- `.always(...)` ≒ `.finally(..)` -> cleanup


