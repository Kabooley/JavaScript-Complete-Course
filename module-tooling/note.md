# Note about Modules, Tooling, Functional

昔と比較して現代は非常に大きな JavaScript ファイルを扱うのが当たり前になってきた。

それゆえ現代は必要な機能を必要な時に引っ張ってくる仕組みが当たり前になってきた

一方、`import`や`export`をつかう module 機能はいまだすべてのブラウザに採用されているわけではない機能である

なので現代の JavaScript 開発は、様々なブラウザに普遍的に動作できるようにするために

バンドル&トランスパイルされる

こうして module が一つのファイルに、ES5 の文法に変換されて

ブラウザはそのファイルを JavaScript として取り込むのである

## モジュールとは？

まずモジュールとは JavaScript ファイルのことではない

モジュールと通常の JavaScript ファイルは区別される

たとえば HTML のスクリプト・タグ上では`type`を指定するときに違いがある

```HTML
<!-- 通常のJavaScript -->
<script type="text/javascript" src="index.js"></script>
<!-- module script -->
<script type="module" src="main.js"></script>
```

このようにモジュールは HTML に対してこのスクリプトがモジュールであることを宣言しないとならない

## module のスコープ範囲

module ファイル内のグローバル変数は
export 先でもグローバル変数にはならない

理由は import されない限り、module ファイル内部の変数は
export 先からはスコープできないからである

つまり import,
export されない限りそれは「グローバル」にはならない

一方、
import されたものは、そこのファイル内ではグローバルになる

## module は同期的に import される
