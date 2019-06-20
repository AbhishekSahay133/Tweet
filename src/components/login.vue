<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn icon large target="_blank" v-on="on">
                      <v-icon large>code</v-icon>
                    </v-btn>
                  </template>
                  <span>Source</span>
                </v-tooltip>
              
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="username" label="User Name" id='email' type="text" required v-model="email"></v-text-field>
                  <v-text-field prepend-icon="code" name="password" label="Password" type="password"  id='password' required v-model="password"></v-text-field>
        
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" v-on:click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
import firebase from 'firebase';
export default {
name:'login',
data(){
    return{
      email:'',
      password:''
    };
  },
  methods:{
    login:function(e){
      firebase.auth().signInWithEmailAndPassword(this.email , this.password)
      .then(user => {
        // alert(`You Are logged in as ${user.email}`);
        // this.$router.push('/');
        this.$router.go({path: this.$router.path});
      },
      err => {
        alert(err.message);
      }     
      );
      // console.log('register');
      e.preventDefault();
    }
  }

}
</script>

<style>

</style>
