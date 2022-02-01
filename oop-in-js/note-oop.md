# Note: OOP with JavaScript section

長いのでポイント絞って出力

## class-base と prototype-base

何が違うのか
JavaScript はプロトタイプベース言語である

プロトタイプとはあるオブジェクトの素となるオブジェクトのこと

クラスは class からインスタンスを生成することであらたなオブジェクトを生成するけれど
JavaScript はプロトタイプから新たなオブジェクトを生成していく

厳密にはインスタンス化ではない

class はインスタンス化の時の初期値による違いはあるがすべて class のコピーである
prototype では初期値の違いはあるが prototype のおかげで動的にメソッドを追加できるので
prototype で生成される「インスタンス」はそれぞれ同じメンバーを持つとは限らないのである

## JavaScript のコンストラクター

- コンストラクタのメソッドは最小限に、メソッドはなるべく Prototype を使うこと
- 関数コンストラクタのメンバはグローバル変数になってしまう危険性を持つ

```JavaScript
var Person = function(name, age) {
    this.name = name;
    this.age = age;
    this.sayHi = function(){
        console.log(`Hi! my name is ${this.name}`);
    }
}

var John = new Person('John', 28);
console.log(John.name); // John
```

`Person`がコンストラクター関数
コンストラクター関数は return しない。
new されることが前提
慣習としてイニシャルは大文字である

#### コンストラクタのメソッドは最小限に抑えること

理由は２つ

- インスタンスの数だけメモリを大きく消費するから
- Prototype メソッドは後から追加できるから

#### 関数コンストラクタのメンバはグローバル変数になってしまう危険性を持つ

関数コンストラクタを`new`しないでそのまま関数としてよびだすとどうなるか?

答えは、その`this`はグローバル変数を指すので
関数コンストラクタのメンバはグローバル変数として生成される

```JavaScript
// this is not strict mode
var Member = function (fName, lName) {
  this.lName = lName;
  this.fName = fName;
};

var m = Member('hoge', 'fuga');
console.log(m); // undefined
console.log(fName); // hoge
// console.log(m.fName); // cannot read property of undefined

var m2 = new Member('h', 'f');
console.log(m2);    // インスタンス
console.log(fName); // hoge
console.log(m2.fName); // h
```

ということは常に関数コンストラクタはそのまま関数として呼び出されてしまうと
やたらグローバル変数を生成してしまう危険性があるので
これは常に防がなくてはならないのでは？

```JavaScript
var Member = function (fName, lName) {
    if(!(this instanceOf Member)){
        return new Member(fName, lName);
    }
  this.lName = lName;
  this.fName = fName;
};
```

## Prototype

結論：インスタンスは`__proto__`経由でコンストラクタ関数の prototype を参照する

- インスタンスは元のオブジェクト（コンストラクタ関数）に属する prototype オブジェクトに対して、
  **暗黙的な参照**を持つ
- 暗黙的な参照:`__proto__`
- class ベースと prototype ベースの違いは前者はコピーであるが後者は「参照」を持つ点
- 暗黙的な参照はインスタンス側から変更できてしまい、その prototype オブジェクトを継承するすべてのインスタンスに影響する
- あとから prototype

次のようなプロトタイプの使い方ができる

```JavaScript
var Person = function (name, age) {
  this.name = name;
  this.age = age;
  this.sayHi = function () {
    console.log(`Hi! my name is ${this.name}`);
  };
};

Person.prototype.introduce = function () {
  console.log(`My nmae is ${this.name} and ${this.age} years old.`);
};

var John = new Person('John', 28);
John.favorite = function (favs) {
  console.log(`My favorite is ${favs}.`);
};
John.sayHi();
John.introduce();
// Johnインスタンス固有のメソッドが追加できた
John.favorite('to watch Marvel movie');

```

オブジェクトをインスタンス化したとき
インスタンスは元のオブジェクト（コンストラクタ関数）に属する prototype オブジェクトに対して、
**暗黙的な参照**を持つ

ここがクラスとプロトタイプベースの異なる部分で
つまりクラスは完全なコピーを持つけれど
プロトタイプベースだともとのオブジェクトの「参照」を持つのである

では
参照を持つというのならばインスタンス側から元のオブジェクトのプロパティを変更できるのか？

検証

```JavaScript
var Person = function (name, age) {
  this.name = name;
  this.age = age;
  this.sayHi = function () {
    console.log(`Hi! my name is ${this.name}`);
  };
};

Person.prototype.favorite = 'watching Marvel movie';

var John = new Person('John', 28);
var Scarlet = new Person('Scarlet', 17);
console.log(John.favorite);     // watching Marvel movie
console.log(Scarlet.favorite);  // watching Marvel movie

John.favorite = 'downhill by bike';
console.log(John.favorite);     // downhill by bike
console.log(Scarlet.favorite);  // watching Marvel movie

console.log(John.__proto__);
console.log(John.__proto__ === Person.prototype);   // true
console.log(John.__proto__.favorite);               // watching Marvel movie

John.__proto__.favorite = 'downhill by bike';

console.log(John.favorite);     // downhill by bike
console.log(Scarlet.favorite);  // downhill by bike

```

つまり
暗黙的な参照を使っての変更できない...かと思いきや、`__proto__`経由の参照だと変更できる

```JavaScript
var Person = function (name, age) {
  this.name = name;
  this.age = age;
  this.sayHi = function () {
    console.log(`Hi! my name is ${this.name}`);
  };
};

Person.prototype.favorite = 'watching Marvel movie';

var John = new Person('John', 28);
var Scarlet = new Person('Scarlet', 17);
console.log(John.favorite);
console.log(Scarlet.favorite);

// 参照経由でPerson.prototype.favoriteが変更されたのではなく
// 単にJohnのプロパティが追加されただけ
John.favorite = 'downhill by bike';
console.log(John.favorite);
console.log(Scarlet.favorite);

console.log(John.__proto__ === Person.prototype);   // true
// 継承されたfavoriteと後から追加したfavoriteの違い
console.log(John.__proto__.favorite);   // watching Marvel movie
console.log(John.favorite);             // downhill by bike

console.log(Scarlet)
console.log(John);
// Person {name: 'Scarlet', age: 17, sayHi: ƒ}
// Person {name: 'John', age: 28, favorite: 'downhill by bike', sayHi: ƒ}

// Person.prototype.favoriteを変更できる
John.__proto__.favorite = 'downhill by bike';

console.log(John.favorite);     // downhill by bike
console.log(Scarlet.favorite);  // downhill by bike
```

つまり
`John.favorite = 'downhill by bike';`は単に John のプロパティを追加しただけで
prototype として追加されたものは`__proto__`経由で参照されるので
つまりは別物である

ということで
「暗黙的な参照」とは`__proto__`経由の参照のことである

**Note**

先にみたとおり、

`__proto__`参照でコンストラクタ関数のプロパティを変更すると、そのインスタンスすべてに影響する

これは非常に危険である

`__proto__`参照は読み取りだけでつかうべきで変更を加えてはならない

#### 静的メソッド

静的メソッドは prototype プロパティに登録できない
静的メソッドはコンストラクタに直接追加する

```JavaScript
var Person = function (name, age) {
  this.name = name;
  this.age = age;
  this.sayHi = function () {
    console.log(`Hi! my name is ${this.name}`);
  };
};

Person.country = "USA";
Person.calTriangle = function(base, height) {
    return base * height;
}

console.log(`name: ${Person.name}`);    // Person
// Person.sayHi(); // typeerror
// Static property
console.log(`country: ${Person.country}`);      // country: USA
console.log(`triangle: ${Person.calcTriangle(10, 10)}`);    // 50


var John = new Person('John', 28);
console.log(John);


```

- 静的メソッドはインスタンスに一切追加されない
- 静的メソッドの this はコンストラクタを指す(静的メソッドで this は意味がない）

## Prorotype Chain

JavaScript では「継承」はどのように実現されるのか？
JavaScript では prototype をたどって継承元をさかのぼる仕組みになっていますね
なので prototype に継承元を突っ込んでやればいいわけです

```JavaScript
var Animal = function () {};

Animal.prototype = {
  howl: function () {
    console.log('bowwow');
  },
  myNameIs: function() {
      console.log(this.name);
  }
};

var Dog = function (name) {
  // 基底クラスのコンストラクタの呼び出し
  Animal.call(this);
    //  AnimalのthisがDogを指す
  this.name = name;
};

// 継承
Dog.prototype = new Animal();

var Ein = new Dog("Ein");
// Animal.prototype.howl()が使えるようになった
Ein.howl(); // bowwow
Ein.myNameIs(); // Ein
```

こんな感じでコンストラクタがコンストラクタを prototype によって「暗黙の参照」をできるようになっている
これが prorotype-chain である

あとから継承元を変更できるのか？

```JavaScript
var Animal = function () {};
Animal.prototype = {
  howl: function () {
    console.log('bowwow');
  },
  myNameIs: function() {
      console.log(this.name);
  }
};

var Beast = function() {};
Beast.prototype = {
    howl: function() {
        console.log("Roarrr");
    },
    myNameIs: function() {
      console.log(this.name);
    }
}

var Dog = function (){};
Dog.prototype = new Animal();

var Dax = new Dog("Dax");
Dax.howl();     // bowwow
Dax.myNameIs(); // Dax

Dog.prototype = new Beast();
Dax.howl();     // bowwow
Dax.myNameIs(); // Dax
```

**プロトタイプチェーンは、インスタンスが生成された時に固定され、あとから変更することはできない**

暗黙的な参照は動的なものであるが、ここばっかりは変更できない

## ES6 class

```JavaScript
class Member {
  constructor(fName, lName) {
    this.fName = fName;
    this.lName = lName;
  }

  // functionもいらなければ、thisもいらない
  getName() {
    return this.lName + this.fName;
  }
  getThis() {
    console.log(this);
  }
}

Member.prototype.fuga = function () {
  console.log('fuga');
};

var John = new Member('Johnathan', 'Joastar');
console.log(John.getName());
John.getThis(); // Member {fName: 'Johnathan', lName: 'Joastar'}

// いまだprototypeは利用できる
console.log(John.__proto__); // {fuga: ƒ, constructor: ƒ, getName: ƒ, getThis: ƒ}
console.log(John.__proto__ === Member.prototype); // true
John.fuga();    // fuga
```

さて ES6 class にはこれまでのコンストラクタ関数の常識は当てはまるのか？

#### 関数として呼び出しはできない

```JavaScript
var m = Member('hoge', 'fuga');     // error newなしで呼び出しはできない
```

関数呼び出しはできないのでプロパティがグローバル変数になる心配はない

#### static, get, set 修飾子を使える

#### `super`で基底クラスのメソッド、コンストラクタを呼び出す

`extends`すれば継承元のメソッドを使うことができる
ならだ`super`の存在意義は？
かならず呼び出さなくてはならないのか？（TypeScript ではどうなっているのだろうか）

https://teratail.com/questions/108542

つまり、
言語仕様のせいで、
基底クラスがあるのならば`super()`をよびだしてはじめて`this`が初期化される
仕様だかららしい

で、
extends しただけで継承元のメソッドを使えたりするのは「暗黙的に」親クラスのコンストラクタが呼び出されているから
だそうな

とにかく
super は明示して呼び出しましょう
