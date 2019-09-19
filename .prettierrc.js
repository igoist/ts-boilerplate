module.exports = {
  'printWidth': 80, // 一行的字符数，如果超过会进行换行，默认为80
  'tabWidth': 2,
  'useTabs': false,
  'singleQuote': true,
  'semi': true,
  'trailingComma': 'none',
  'bracketSpacing': true, // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
  'parser': 'babylon' // 代码的解析引擎，默认为babylon，与babel相同。
}