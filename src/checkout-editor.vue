<template>
  <div class="wrapper">
    <div class="html" :class="{ full: full.html }">
      <h3>HTML
        <button-full :full.sync="full.html"></button-full>
      </h3>
      <codemirror v-model="codeHtml" :options="cmOptionHtml"></codemirror>
    </div>
    <div class="css" :class="{ full: full.css }">
      <h3>CSS
        <button-full :full.sync="full.css"></button-full>
      </h3>
      <codemirror v-model="codeCss" :options="cmOptionCss"></codemirror>
    </div>
    <div class="js" :class="{ full: full.js }">
      <h3>JS
        <button-full :full.sync="full.js"></button-full>
        <button type="button" @click="renderCheckout()">render</button>
      </h3>
      <codemirror v-model="codeJs" :options="cmOptionJs"></codemirror>
    </div>
    <div class="iframe" :class="{ full: full.iframe }">
      <button-full :full.sync="full.iframe"></button-full>
      <iframe ref="iframe"></iframe>
    </div>
    <div class="result">
      <codemirror :value="result" :options="cmOptionResult"></codemirror>
    </div>
  </div>
</template>

<script>
  import { codemirror } from 'vue-codemirror'
  import ButtonFull from '@/components/button-full.vue'

  import 'codemirror/lib/codemirror.css'

  // language
  import 'codemirror/mode/javascript/javascript.js'
  import 'codemirror/mode/css/css.js'
  import 'codemirror/mode/xml/xml.js'

  // theme css
  import 'codemirror/theme/twilight.css'

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
  name: 'checkout-editor',
  components: {
    ButtonFull,
    codemirror
  },
  data(){
    return {
      full: {},
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
//    fullClass: (type) => () => {
//      full: this.full[type]
//    },
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
    cmOptionResult(){
      return {
        ...this.cmOption,
        mode: 'text/html',
        readOnly: true,
        theme: "default",
      }
    },
    result(){
      return `<!DOCTYPE html>
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
  mounted() {
    Promise.all([
      this.$http.get('body.html'),
      this.$http.get('style.css'),
      this.$http.get('script.js')
    ]).then((response) => {
      this.codeHtml = response[0].body
      this.codeCss = response[1].body
      this.codeJs = response[2].body

      this.$nextTick(function () {
        this.ifrw = (this.$refs.iframe.contentWindow) ? this.$refs.iframe.contentWindow : (this.$refs.iframe.contentDocument.document) ? this.$refs.iframe.contentDocument.document : this.$refs.iframe.contentDocument
        this.renderCheckout()
      })
    });
  },
  methods: {
    renderCheckout() {
      this.ifrw.document.open();
      this.ifrw.document.write(this.result);
      this.ifrw.document.close();
    }
  }
}
</script>

<style>
  iframe {
    display: block;
    border: 0;
    width: 100%;
    height: 100%;
  }
  .CodeMirror {
    height: 50vh;
  }
  .result .CodeMirror {
    height: calc(50vh - 35px);
  }
  .full .CodeMirror {
    height: calc(100vh - 35px);
  }
  .CodeMirror-wrap pre {
    word-break: break-all;
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
  .iframe{
    background: #fff;
    position: relative;
    grid-column: 1/3;
    grid-row: 2;
  }
  .iframe button {
    position: absolute;
  }
  .result {
    grid-column: 3/4;
    grid-row: 2;
  }
  .full {
    position: relative;
    z-index: 10;
    grid-column: 1/4;
    grid-row: 1/3;
  }
</style>