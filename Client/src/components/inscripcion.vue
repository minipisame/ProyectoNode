<template>
<div>
        <input  v-model="message" class="form-control input-lg" type="text">
            <span class="input-group-btn">
                <button v-on:click="add()" class="btn btn-lg btn-primary">Send</button>
             </span>
</div>
</template>

<script>

export default {
  name: 'inscripcion',
  props:['n'],
  data(){
      return{
      message:'',
      }
  },
   methods: {
    add: function () {      
        
                this.n=false;
    }

}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
