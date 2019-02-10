<template>
  <div id="app">
  <notes></notes>
  <pie></pie>
  </div>
</template>

<script>
import notes from './components/todo.vue';
import pie from './components/pie.vue';
export default {
  name: 'app',
  components: {
    notes,
    pie,
  },
  data(){
    return{
   
      
    }
  },
  methods: {

  }
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-top: 60px;
}
</style>
