<template>
  <v-app>
    <v-content>
       <Nav/>     
       <router-view/>
    </v-content>
   <Footer/>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Nav from './components/nav'
import Footer from './components/footer'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Nav,
    Footer
  },
  data () {
    return {
      //
    }
  }
}
</script>
