# Note : Section5: Developer Skills & Editor Setup

講師的VSCode環境設定 best practice

自動保存ON

## Prettier

拡張機能からまたは
```Bash
$ npm install --save-dev --save-exact prettier
```

ユーザ設定からDefault FormatterをPrettierにする


特定の言語に対してはPrettierを無効にしたいとき
- `.prettierignore`ファイルを作成して設定する
- VSCodeの`editor.defaultFormatter`設定をいじる

例
```JSON
{
  "editor.defaultFormatter": null,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

Usage

（推奨）ローカル・プロジェクトに対してPrettierを設定すること
グローバル設定を有効にすることもできる

ローカル・プロジェクト限定にPrettierを設定するなら
`.prettierrc.json`ファイルをプロジェクトのrootに作成する

ここに設定を記述していけばいい

## TODO-HIGHTLIGHT

コメントで特定のキーワードをハイライトしてくれる

```JavaScript
// BUG
// FIXME
```