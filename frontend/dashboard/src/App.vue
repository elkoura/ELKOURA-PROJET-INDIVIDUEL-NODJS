<script setup>
  import { ref, onMounted } from 'vue';
  import { api, store } from './utils';
  import AppBar from './components/AppBar.vue';
import Bars from './components/Bars.vue';
import Bieres from './components/Bieres.vue';

  const url = "/";
  const bar2BeersListURL = `/bieres/bar/${2}/biere`
  const allBarsUrl = "/bars";

const data = ref(null);

// create basic api helper so its easier to call all basic routes 

onMounted(async () => {
  try {
    const helloMessageResponse = await api(url);
    data.value = helloMessageResponse.data;
  } catch (error) {
    console.log(error);
  }
});

</script>

<template>
  <div>
     <nav>
    <AppBar/>
  </nav>

  <div v-if="data && store.selectedAppBarIndex === 0"> {{ data.message }}</div>
  <Bars  v-if="data && store.selectedAppBarIndex === 1"/>
  <Bieres v-if="store.selectedAppBarIndex === 2"/>

    
  </div>
 
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
