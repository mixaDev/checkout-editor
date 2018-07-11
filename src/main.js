import Vue from 'vue'
import CheckoutEditor from './checkout-editor.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(CheckoutEditor)
}).$mount('#checkout-editor')
