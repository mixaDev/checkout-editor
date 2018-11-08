import Vue from 'vue'
import VueResource from 'vue-resource'
import CheckoutEditor from './checkout-editor.vue'

Vue.config.productionTip = false

Vue.use(VueResource)

new Vue({
  render: h => h(CheckoutEditor)
}).$mount('#checkout-editor')
