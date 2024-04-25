<script setup>
import { ref, onMounted } from 'vue'
import { api, store } from '../utils'

const BASE_BIERE_URL = '/bieres';
const biereId = ref(2);
const barId = ref(null)
const BIERE_URL = ref(`${BASE_BIERE_URL}/${biereId.value}`);

onMounted(async () => {
  try {
    const response = await api(BIERE_URL.value);
    store.selectedBiere = response.data;
  } catch (error) {
    console.log(error);
  }

});

const setBarId = (event) => {
    BIERE_URL.value = `${BASE_BIERE_URL}/bar/${biereId.value}/biere`;
}

const handleSubmit = (event) => {
    console.log(event);
    biereId.value = event.target.value;
    console.log(barId.value);
}

</script>

<template>
  <div class="card">
    <h2># Bieres</h2>
    <!-- <div>
        <form @submit.prevent="handleSubmit">
            <label for="BarID">Bar ID</label>
        <input id="BarId" name="BarID" type="number" onchange="setBarId($event)"/>
        <button type="submit">submit</button>
        </form>
        
    </div> -->
    <div v-if="store.selectedBiere" >
        <div v-for="(value, key) in store.selectedBiere" :key="key">
               <p>{{ key }}: {{ value }}</p>
        </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #e2e8f0;
  border-radius: 0.5em;
  padding: 1em;
  margin-top: 1em;
}

.card ul {
    display: flex;
    justify-content: center;
    gap: 12px;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.card ul li {
  width: auto;
}

.selected {
    color: red;
    border: 1px solid #e2e8f0;
    border-radius: 0.5em;
    cursor: pointer;
}
</style>
