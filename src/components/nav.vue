<template>

  <v-toolbar fixed>
    <v-toolbar-title >
      <router-link to="/">Tweet Now</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat v-if="isLoggedIn">
        <router-link to="/">
          <span v-for="userDetail in userDetails" :key="userDetail.userEmail">
            <span v-if="userDetail.userEmail == currentUser">
              <v-avatar class="imagealign">
                <v-img :src="userDetail.userPic" class="image-res imagealign"></v-img>
              </v-avatar>
              <sapn class="text-xs-center">
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" flat v-on="on">{{userDetail.userName}}</v-btn>
                  </template>

                  <v-list>
                    <v-list-tile >
                      <v-list-tile-title>  <router-link to="userprofile">User Profile</router-link></v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </sapn>
              <!-- <span> {{userDetail.userName}}</span> -->
            </span>
          </span>
          <!-- <span>{{currentUser}}  </span> -->
        </router-link>
      </v-btn>

      <v-btn flat v-if="isLoggedIn">
        <router-link to="addblog">Add Tweet</router-link>
      </v-btn>

      <v-btn flat v-if="!isLoggedIn">
        <router-link to="login">login</router-link>
      </v-btn>
      <v-btn flat v-if="!isLoggedIn">
        <router-link to="registration">registration</router-link>
      </v-btn>
      <v-btn flat @click="logout" v-if="isLoggedIn">Logout</v-btn>
    </v-toolbar-items>
    
     <v-menu class="hidden-md-and-up">
        <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              
              <v-list-tile-title flat v-if="isLoggedIn"> <router-link to="addblog">Add Tweet</router-link></v-list-tile-title>
              <v-list-tile-title  flat v-if="!isLoggedIn"> <router-link to="login">login</router-link></v-list-tile-title>
                 <v-list-tile-title  flat v-if="!isLoggedIn">  <router-link to="registration">Registration</router-link></v-list-tile-title>
                  <v-list-tile-title @click="logout" v-if="isLoggedIn">Logout</v-list-tile-title>
             </v-list-tile-content>
          </v-list-tile>   
        </v-list>
      </v-menu>
    <v-card-actions>
      <v-icon dark>fas fa-edit</v-icon>
    </v-card-actions>
  </v-toolbar>
</template>
<script>
import { fb, db } from "../db/index";
import firebase from "firebase";
import "../components/aboutus";
export default {
  data() {
    return {
     
      isLoggedIn: false,
      currentUser: false,
      userDetails: []
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
    db.collection("products")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data());
          this.products.push(doc.data());
        });
      });
    db.collection("userDetails")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data());
          this.userDetails.push(doc.data());
        });
      });
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    }
  }
};
</script>
<style scoped>
.v-btn .router-link-exact-active {
  color: red;
  text-decoration: none;
}
.imagealign {
  margin-right: 0px;
}
.application a {
    cursor: pointer;
    text-decoration: none;
}
</style>
