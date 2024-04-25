<script setup>
  import { ref, onMounted } from 'vue';
  import HelloWorld from './components/HelloWorld.vue';
  import {api} from './utils';
  import AppBar from './components/AppBar.vue';

  const url = "/";
  //FIXME: this route has an issue
  /**
         * {
        "errors": [
          {
            "type": "field",
            "msg": "ID is required",
            "path": "id_biere",
            "location": "params"
          }
        ]
      }
   */
  const bar2BeersListURL = "/bieres/bar/2/biere"
  const allBarsUrl = "/bars";

const data = ref(null);
const bars = ref([]);

// create basic api helper so its easier to call all basic routes 

onMounted(async () => {
  try {
    const helloMessageResponse = await api(url);
    const barsResponse = await api(allBarsUrl);
    data.value = helloMessageResponse.data;

    bars.value = barsResponse.data;
  } catch (error) {
    console.log(error);
  }
});

</script>

<template>
  <nav>
    <AppBar/>
  </nav>

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
