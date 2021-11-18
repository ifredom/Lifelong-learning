function Foo() {
  console.log("here");
  return this;
}
Foo.getName = function () {
  console.log("1");
};
Foo.prototype.getName = function () {
  console.log("2");
};

new Foo.getName(); // -> 1
new Foo().getName(); // -> 2
