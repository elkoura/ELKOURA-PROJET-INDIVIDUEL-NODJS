<script setup>
import { ref } from 'vue'
import { store } from '../utils'

const tabList = [
    { name: 'Dashboard', index: 0},
    { name: 'Bars', index: 1},
    { name: 'Bieres', index: 2},
    { name: 'Commandes', index: 3},
    { name: 'BiereCommandes', index: 4},
]


const setSelectedTabIndex = (index) => {
    store.selectedAppBarIndex = index;
}

</script>

<template>
  <h1>Welcome to the dashboard</h1>
  <div class="card">
    <ul>
        <li v-for="(tab, index) in tabList" :key="index">
            <button 
                @click="setSelectedTabIndex(index)"    
                :class="{ 'selected': store.selectedAppBarIndex === index }">
                    {{ tab.name }}
            </button>
        </li>
    </ul>
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
