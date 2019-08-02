# pinit-aloha

...


## 备忘

实际上有些包是不需要被编译打包的，如 electron、react、react-dom，到时候在 html 中直接引用 lib.min.js

编译过程移除的问题后续考虑

* ...
* build 事项


## 遇到的问题



# ...


### build 注意事项

目前，从 dev 到 prod，需要手动调整 index.js 中 win 指定 index.html

webpack.prod.js 中 publicPath 需要指定为 './'

另外已经在 webpack 设置 external，将 React、ReactDOM 编译移除，通过直接引用 lib/*.min.js

至于 electron，不需要刻意设置 external 去 exclude，通过 target 设置为 electron-renderer 就已处理
