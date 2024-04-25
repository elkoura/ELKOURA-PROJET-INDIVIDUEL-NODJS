<template>

    <div class="bar-container">

      <li v-for="bar in bars" :key="bar.id" class="bar-card">
        <h3>{{ bar.name }} </h3>
        <p>{{ bar.adresse }} </p>
        <p>{{ bar.tel }} </p>
        <p>{{ bar.email }} </p>
        <p>{{ bar.description }} </p>
      </li>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const bars = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/bars', 
);
    bars.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des bars :', error);
  }
});
</script>

<style>

.bar-container {
    margin-top:40px;
    display:flex;
    flex-wrap: wrap;
    justify-content: center;
    gap:20px
    
}

.bar-card{
    width: 200px;
    list-style-type: none;
    background-color: gainsboro;
    border-radius: 5px;
}


</style>