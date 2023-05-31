<template>
  <the-header></the-header>
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
  <the-footer></the-footer>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'

export default {
  components: { TheHeader, TheFooter },
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey')
    if (userAccessKey) {
      // this.$store.commit('updateAccessKey');
      this.updateAccessKey(userAccessKey)
    }
    // this.$store.dispatch('loadCart');
    this.loadCart()
  },
  methods: {
    ...mapActions(['loadCart']),
    ...mapMutations(['updateAccessKey']),
  },
}
</script>

<style>
.route-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
