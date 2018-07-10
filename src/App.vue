<template>
  <div id="app">
    <div class="wrapper">
      <div class="html">
        <h3>HTML</h3>
        <codemirror v-model="codeHtml" :options="cmOptionHtml" @blur="onCmBlur"></codemirror>
      </div>
      <div class="css">
        <h3>CSS</h3>
        <codemirror v-model="codeCss" :options="cmOptionCss" @blur="onCmBlur"></codemirror>
      </div>
      <div class="js">
        <h3>JS</h3>
        <codemirror v-model="codeJs" :options="cmOptionJs" @blur="onCmBlur"></codemirror>
      </div>
      <div class="result">
        <pre class="pre"><code>{{ result }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  import VueCodemirror from 'vue-codemirror'

  Vue.use(VueResource)
  Vue.use(VueCodemirror)

  import 'codemirror/lib/codemirror.css'

  // language
  import 'codemirror/mode/javascript/javascript.js'
  import 'codemirror/mode/css/css.js'
  import 'codemirror/mode/xml/xml.js'

  // theme css
//  import 'codemirror/theme/monokai.css'
  import 'codemirror/theme/twilight.css'
//  import 'codemirror/theme/paraiso-light.css'
//  import 'codemirror/theme/ambiance.css'

  // require active-line.js
  import'codemirror/addon/selection/active-line.js'

  // foldGutter
  import'codemirror/addon/fold/foldgutter.css'
  import'codemirror/addon/fold/brace-fold.js'
  import'codemirror/addon/fold/comment-fold.js'
  import'codemirror/addon/fold/foldcode.js'
  import'codemirror/addon/fold/foldgutter.js'
  import'codemirror/addon/fold/indent-fold.js'
  import'codemirror/addon/fold/markdown-fold.js'
  import'codemirror/addon/fold/xml-fold.js'

  // autoCloseTags
  import'codemirror/addon/edit/closetag.js'

export default {
  name: 'app',
  data(){
    return {
      codeJs: '',
      codeCss: '',
      codeHtml: '',
      cmOption: {
        tabSize: 2,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        theme: "twilight",
        lineWrapping: true,
      }
    }
  },
  computed: {
    cmOptionJs(){
      return {
        ...this.cmOption,
        mode: 'text/javascript',
      }
    },
    cmOptionCss(){
      return {
        ...this.cmOption,
        mode: 'text/css',
      }
    },
    cmOptionHtml(){
      return {
        ...this.cmOption,
        mode: 'text/html',
        autoCloseTags: true,
      }
    },
    result(){
      return `
<!DOCTYPE html>
<html>
<head>
<meta charset=utf-8>
<meta name=viewport content="width=device-width,initial-scale=1">
<title>checkout</title>
<style>
${this.codeCss}
</style>
<link href=https://rawgit.com/cloudipsp/checkout-vue/latest/dist/checkout.css rel=stylesheet>
</head>
<body>
${this.codeHtml}
<script type=text/javascript src=https://rawgit.com/cloudipsp/checkout-vue/latest/dist/checkout.js><\/script>
<script type=text/javascript src=https://rawgit.com/cloudipsp/checkout-vue/latest/dist/i18n/ru.js><\/script>
<script type=text/javascript src=https://rawgit.com/cloudipsp/checkout-vue/latest/dist/i18n/uk.js><\/script>
<script>
${this.codeJs}
<\/script>
</body>
</html>
`
    }
  },
  created() {
    this.$http.get('style.css').then(response => {
      this.codeCss = response.body
    });
    this.$http.get('script.js').then(response => {
      this.codeJs = response.body
    });
    this.$http.get('body.html').then(response => {
      this.codeHtml = response.body
    });
  },
  methods: {
    onCmBlur() {
      console.log('onCmBlur')
    }

  }
}
</script>

<style>
  .CodeMirror {
    height: 50vh;
  }
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
  h3 {
    margin: 0;
    background: #141414;
    color: #fff;
    line-height: 25px;
    padding-left: 42px;
  }
  pre {
    margin: 0;
    word-break: break-all;
    word-wrap: break-word;
  }
  code {
    white-space: pre-wrap;
  }
  .wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 10px;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    background: #343436;
  }
  .html,
  .css,
  .js {
    grid-row: 1;
  }
  .html {
    grid-column: 1;
  }
  .css {
    grid-column: 2;
  }
  .js {
    grid-column: 3;
  }
  .result {
    background: #fff;
    grid-column: 1/4;
    grid-row: 2;
    overflow-y: scroll;
  }
</style>