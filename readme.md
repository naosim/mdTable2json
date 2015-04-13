# mdTable2json
markdownのテーブルからjsonを生成する

## 例
入力

name | age
-----|-----
mike | 20
kate | 30

item   | value
-------|-------
potion | 5
knife  | 8

出力
```json
[
  [
    {"name": "mike", "age": "20"},
    {"name": "kate", "age": "30"}
  ],
  [
    {"item": "potion", "value": "5"},
    {"item": "knife", "value": "8"}
  ]
]
```
