import Vue from 'vue'
import App from './App'
import {myRequest} from "./utils/api.js"
import {uploadFile} from "./utils/api.js"
import {chooseImage} from "./utils/api.js"
import {formatDate} from './utils/formatDate.js'
import {formatTime} from './utils/formatDate.js'


// Api函数polyfill（目前为实验版本，如不需要，可删除！）';
import Polyfill from './polyfill/polyfill';
Polyfill.init();

// 全局mixins，用于实现setData等功能';
import Mixin from './polyfill/mixins';
Vue.mixin(Mixin);

Vue.prototype.$myRequest = myRequest
Vue.prototype.$uploadFile = uploadFile
Vue.prototype.$chooseImage = chooseImage
Vue.prototype.$formatDate = formatDate
Vue.prototype.$formatTime = formatTime
Vue.config.productionTip = false

import {loading} from './components/loading/loading.vue'
Vue.component('loading',loading)

import springTabs from './components/springTabs/springTabs'
Vue.component('springTabs',springTabs)

import Tabs from './components/Tabs/Tabs'
Vue.component('Tabs',Tabs)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
