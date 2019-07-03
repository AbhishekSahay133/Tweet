<template>
  <div class="md-4">
    <v-layout v-for="product in products" :key="product.userId">
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-title primary-title>
            <v-img :src="product.imagepath" class="image-res"></v-img>
            
            <v-card-title primary-title>
              <div class="width100" >
                <div class="headline">
                  <div v-for="userDetail in userDetails" :key="userDetail.userEmail">
                    <div v-if="userDetail.userEmail == product.currentUserEmail">
                    <v-img :src="userDetail.userPic" class="image-res imagealign"></v-img>                 
                    </div>                    
                  </div>
                  <div class="">
                    <span>{{product.title}}</span> 
                  </div>
                    
                </div>
                <h5>
                   <span v-for="userDetail in userDetails" :key="userDetail.userEmail">
                       <span v-if="userDetail.userEmail == product.currentUserEmail">
                  {{userDetail.userName}} /
                  </span>
                   </span>
                  <em>{{product.name}}</em>
                   <span class="grey--text">{{String(product.currentDate)}} {{String(product.Times)}}</span>
                </h5>
               
              </div>
            </v-card-title>

            <v-slide-y-transition>
              <v-card-text>{{product.description}}</v-card-text>
            </v-slide-y-transition>
          </v-card-title>

          
          <v-card-actions>
            <v-spacer></v-spacer>
           
            <v-btn flat icon color="blue lighten-2" @click="countlike+=1">
              <v-icon>thumb_up</v-icon>
            </v-btn>
          
            <span class="alignli">{{ countlike }}</span>
            <v-btn flat icon color="red lighten-2" @click="countdislike+=1">
              <v-icon>thumb_down</v-icon>
            </v-btn><span class="alignli">{{ countdislike }}</span>
            <v-btn flat icon color="green lighten-2">
              <v-icon>share</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

   
  </div>
</template>

<script>
import { fb, db } from "../db/index";
import firebase from 'firebase';
export default {
  data() {
    return {
       countlike: 0,
       countdislike: 0,
    
      userDetails: [],
      products: [],
      show: false,
      Times: new Date().toLocaleTimeString()
    };
  },
  methods: {
    addToCount: function() {
      this.count = this.count + parseInt(this.addValue);
    }
  },
  created() {
    
    db.collection("products")
.orderBy("datetime", "desc")
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
       if(firebase.auth().currentUser){
        this.isLoggedIn = true;
        this.currentUser = firebase.auth().currentUser.email;
    }
  }
};
</script>

<style scoped >
.layout {
  margin: 50px 0;
}
.float-right {
  float: right;
}
.image-res {
  width: 100%;
}
.imagealign{
      width: 70px;
    float: left;
    height: 70px;
    border-radius: 50%;
    margin-right: 13px;
}
.grey--text{
  margin-left: 10px;
}

.width100{
      width: 100%;
    display: block;
}
.v-card__title--primary{
  width: 100%;
}
.alignli{
 
}
</style>


