# proxy

语法： new Proxy(target,handle);

handle(obj,prop,value){
  set:function(){
    return ture
  }
}
```js
var mvvm = {
  names: "",
};

var proxyObj = new Proxy(mvvm, {
  set: function (obj, prop, value) {
    obj[prop] = value;
    return true;
  },
});

proxyObj.names = "ifredom";
console.log(mvvm);
```
