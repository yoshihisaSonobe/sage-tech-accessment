# Concept

```
- store.each -> iterates stores.entries.data: [...]
- get : function (store) {...} -> recieving argument as result of like "this.getViewModel().getStore('entries')"
```


# totalHours

added `deep: true` to track editing the hour.
```
bind : {
  bindTo : '{entries}',
  deep   : true
},
```