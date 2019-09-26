# ts-boilerplate

...

* 项目架构说明
* 全局状态与状态
* 单元测试、集成测试
* 备忘
* 遇到的问题
* build 注意事项


## 项目架构说明

*样式 sass，编译后的 css，图片 img，以及可能用到的字体 font，json map 等都放置于 public，通过执行 script/link，软链接到 dist 目录，特别说明 sass 编译：*

```
// 前置条件全局安装 sass，cd 至 public 目录
sass sass/main.scss:css/main.css --watch
```


*主文件代码目录 src，下分目录 components, contexts, layouts, pages，通过 webpack alias 及 tsconfig 配置，可以参照如下使用：*

```tsx
import { Promotion } from '@Components';
import { Provider as AppProvider } from '@Contexts';
import { Header } from '@Layouts';
import { HB } from '@Utils';
```

## 全局状态与状态

若要新增全局应用状态，通过在 contexts 中新建相应对象，并将对应 Provider 登记在 contexts/providers 中，最后会通过 ProvidersComposer 进行整合

使用时如下

```tsx
...

const { useContext } = React
import { Store } from '@Contexts';

const someHookComponent = () => {
  const store = useContext(Store.Context);

  ...
};
```


## 单元测试、集成测试

（不好意思，暂无）


## 备忘

实际上有些包是不需要被编译打包的，如 electron、react、react-dom，到时候在 html 中直接引用 lib.min.js

编译过程移除的问题后续考虑


## 遇到的问题


### build 注意事项

目前，从 dev 到 prod，需要手动调整 index.js 中 win 指定 index.html

webpack.prod.js 中 publicPath 需要指定为 './'

另外已经在 webpack 设置 external，将 React、ReactDOM 编译移除，通过直接引用 lib/*.min.js

至于 electron，不需要刻意设置 external 去 exclude，通过 target 设置为 electron-renderer 就已处理
