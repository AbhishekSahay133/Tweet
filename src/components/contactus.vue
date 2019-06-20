<template>
   <div class="message">
 <p># {{ count }}</p>
 <button v-on:click.prevent="increment">+</button>
 <button v-on:click.prevent="decrement">-</button>
  </div>
</template>

<script>
export default {
    data() {
        return{
             count: 0
        }
      
    },
methods: {
      increment () {
      this.count++;
    },
    decrement () {
      if(this.count > 0){
        this.count-- ;
      }
    }
  
    }
}
</script>

<style>

</style>
