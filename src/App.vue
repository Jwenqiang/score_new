<template>
  <div id="app">
    <div class="warp">
      <!-- <transition name="fade"> -->
      <!-- 			<keep-alive>
				<router-view></router-view>
			</keep-alive> -->
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Meta from 'vue-meta'
import { version } from '@/../package.json'

Vue.use(Meta)

export default {
  name: 'app',

  methods: {
    async checkVersion() {
      const { data: res } = await this.$axios.get(
        'index.html?r=' + Date.now(),
        { baseURL: '' }
      )
      if (!res || typeof res != 'string') return

      const matche = res.match(/<meta name="?version"? content="?([\d\.]+)"?/)
      if (matche && matche[1] != version) {
        location.href = 'index.html?v=' + version + location.hash
      }
    }
  },

  mounted() {
    if (process.env.NODE_ENV === 'production') {
      this.checkVersion()
    }
  }
}
</script>

<style>
@import '~@/assets/css/style.css';
@import '~@/assets/css/animate.min.css';
</style>
