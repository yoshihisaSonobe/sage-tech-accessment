# Concept

## function
- setter, apply, update -> convention-based lifecycle functions depends on definition of config attribute
Feels like PHP magic function
- callParent -> execute Class super()

##
two way bind
```
twoWayBindable : {
      value : 1
  },
```
value : 1 = value: true

---

# Flow
```
handler : function (btn) {
    // VM → component path; don't touch the starrating directly
    btn.lookupViewModel().set('rating', 5);
}
```
-> bind: '{rating}' -> setValue -> applyValue -> render

---

