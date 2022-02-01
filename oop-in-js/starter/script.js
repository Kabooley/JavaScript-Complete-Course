'use strict';

// var Person = function (name, age) {
//   this.name = name;
//   this.age = age;
//   this.sayHi = function () {
//     console.log(`Hi! my name is ${this.name}`);
//   };
// };

// Person.prototype.introduce = function () {
//   console.log(`My nmae is ${this.name} and ${this.age} years old.`);
// };

// var John = new Person('John', 28);
// John.favorite = function (favs) {
//   console.log(`My favorite is ${favs}.`);
// };
// John.sayHi();
// John.introduce();
// John.favorite('watch Marvel movie');

// ---------------------------------------------------------------

// var Person = function (name, age) {
//   this.name = name;
//   this.age = age;
//   this.sayHi = function () {
//     console.log(`Hi! my name is ${this.name}`);
//   };
// };

// Person.prototype.favorite = 'watching Marvel movie';

// var John = new Person('John', 28);
// var Scarlet = new Person('Scarlet', 17);
// console.log(John.favorite);
// console.log(Scarlet.favorite);

// John.favorite = 'downhill by bike';
// console.log(John.favorite);
// console.log(Scarlet.favorite);

// console.log(John.__proto__);
// console.log(John.__proto__ === Person.prototype);
// console.log(John.__proto__.favorite); // watching Marvel movie
// console.log(John.favorite); // downhill by bike

// John.__proto__.favorite = 'downhill by bike';

// console.log(John.favorite);
// console.log(Scarlet.favorite);

// ---------------------------------------------------------------

// var Person = function (name, age) {
//   this.name = name;
//   this.age = age;
//   this.sayHi = function () {
//     console.log(`Hi! my name is ${this.name}`);
//   };
// };

// Person.country = 'USA';
// Person.calcTriangle = function (base, height) {
//   return base * height / 2;
// };

// console.log(`name: ${Person.name}`);
// // TypeError : sayHi is not a function
// // Person.sayHi();
// // Static property
// console.log(`country: ${Person.country}`);
// console.log(`triangle: ${Person.calcTriangle(10, 10)}`);

// var John = new Person('John', 28);
// console.log(John);
// // Person {name: 'John', age: 28, sayHi: ƒ}でcountryもcalcTriangleも追加されていない
// // (当然__proto__にも追加はされていない)
// // console.log(John.calcTriangle(10, 10)); // typeerror

// ---------------------------------------------------------------

// var Animal = function () {};

// Animal.prototype = {
//   howl: function () {
//     console.log('bowwow');
//   },
//   myNameIs: function() {
//       console.log(this.name);
//   }
// };

// var Dog = function (name) {
//   // 基底クラスのコンストラクタの呼び出し
//   Animal.call(this);
//     //  AnimalのthisがDogを指す
//   this.name = name;
// };

// // 継承
// Dog.prototype = new Animal();

// var Ein = new Dog("Ein");
// // Animal.prototype.howl()が使えるようになった
// Ein.howl(); // bowwow
// Ein.myNameIs(); // Ein

// var Animal = function () {};
// Animal.prototype = {
//   howl: function () {
//     console.log('bowwow');
//   },
// };

// var Beast = function () {};
// Beast.prototype = {
//   howl: function () {
//     console.log('Roarrr');
//   },
// };

// var Dog = function () {};
// Dog.prototype = new Animal();

// var Dax = new Dog('Dax');
// Dax.howl(); // bowwow

// Dog.prototype = new Beast();
// Dax.howl(); // bowwow

// ---------------------------------------------------------------

// var Member = function (fName, lName) {
//   this.lName = lName;
//   this.fName = fName;
// };

// var m = Member('hoge', 'fuga');
// console.log(m); // undefined
// console.log(fName); // hoge
// // console.log(m.fName); // cannot read property of undefined

// var m2 = new Member('h', 'f');
// console.log(m2);
// console.log(fName);
// console.log(m2.fName);

// ---------------------------------------------------------------

// ES6 Class

class Member {
  constructor(fName, lName) {
    this.fName = fName;
    this.lName = lName;
  }

  getName() {
    return this.lName + this.fName;
  }
  getThis() {
    console.log(this);
  }
}

// prototypeはいまだ使える
Member.prototype.fuga = function () {
  console.log('fuga');
};

var John = new Member('Johnathan', 'Joastar');
console.log(John.getName());
John.getThis(); // Member {fName: 'Johnathan', lName: 'Joastar'}
console.log(John.__proto__); // {fuga: ƒ, constructor: ƒ, getName: ƒ, getThis: ƒ}
John.fuga();  // fuga

// 関数として呼び出しはできない
// var m = Member('h', 'f');   // TypeError: new なしで呼び出しはできないよ

class BusinessMember extends Member {
  work() {
    return this.getName() + 'is now working';
  }
}

var bm = new BusinessMember('Bill', 'Gates');
// super()をよんでいないけどちゃんと継承元のプロパティ引き継いでいる
console.log(bm.getName());  // Bill Gates
console.log(bm.work());     // Bill Gates is now working
