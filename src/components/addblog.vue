<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Add Tweet</v-toolbar-title>
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
                  <v-text-field
                    prepend-icon="person"
                    name="Title"
                    label="Title"
                    type="text"
                    required
                   
                    v-model="addProductData.title"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="map"
                    name="fullname"
                    label="Full Name"
                    type="text"
                    required
                    v-model="addProductData.name"
                  ></v-text-field>
                 
                  <v-text-field
                    prepend-icon="person"
                    name="Title"
                    label="Date"
                    type="text"
                    disabled
                    class="hidden"
                    required
                    v-model="addProductData.currentDate"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="person"
                    name="Title"
                    label="Time"
                    type="text"
                    disabled
                    class="hidden"
                    required
                    v-model="addProductData.Times"
                  ></v-text-field>
                   <v-text-field
                    prepend-icon="person"
                    name="Title"
                    label="Time"
                    type="text"
                    disabled
                  
                    required
                    v-model="addProductData.datetime"
                  ></v-text-field>
 <v-text-field
                    prepend-icon="person"
                    name="Email"
                    label="Current User Email"
                    type="text"
                    disabled
                  
                    required
                    v-model="addProductData.currentUserEmail"
                  ></v-text-field>
                  <v-textarea
                    prepend-icon="map"
                    name="input-7-1"
                    label="Description"
                    value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                    hint="Hint text"
                    required
                    v-model="addProductData.description"
                  ></v-textarea>
                  <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                    <img :src="image" height="150" v-if="image">
                   <v-progress-circular 
      :rotate="360"
      :size="100"
      :width="15"
      :value="progress"
      color="teal"
      v-if="uploading && !uploadEnd"
    >
      {{ progress }}
    </v-progress-circular>
                    <v-text-field
                      label="Select Image"
                      ref="image"
                      id="imagePath"
                      @click="pickFile"
                      v-model="addProductData.imagepath"
                      required
                      prepend-icon="attach_file"
                    ></v-text-field>
                    <input
                      type="file"
                      style="display: none"
                      ref="image"
                      accept="image/*"
                      @change="uploadimage"
                    >
                  </v-flex>
                
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="onadd" type="submit" color="primary">Submit</v-btn>
                <v-btn type="submit" color="error">
                  <router-link to="/" class="white--text">Cancel</router-link>

                    {{ message }}
                </v-btn>
                <!-- <p>{{addProductData.currentUserEmail}}</p> -->
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
// import db from "@/db";

import { fb, db } from "../db/index";
import firebase from 'firebase';
export default {
  name: "App",

  data() {
    return {
      	orderby:'',
       uploading: false,
      uploadEnd: false,
       progress: 0,
      products: [],
      addProductData: {
         datetime: new Date().toUTCString(),
        imagepath: "",
        userName: "",
        name: "",
        description: "",
        title: "",
        currentUserEmail:"",
        currentDate: new Date().toString().substr(0, 10),
        Times: new Date().toLocaleTimeString()
      },

      date: new Date(),

      //image_src: require("imageUrl"),
      image: [],
      
    };
  },

  created() {
     
    this.getproducts();

     if(firebase.auth().currentUser){
        this.isLoggedIn = true;
        this.addProductData.currentUserEmail = firebase.auth().currentUser.email;
    }
  },

  methods: {
    
    getproducts() {
      db.collection("products")
        .get()
        .then(querySnapshot => {
          const products = [];
          querySnapshot.forEach(doc => {
            //  console.log(doc.data())
            products.push(doc.data());
          });
          this.products = products;
        });
    },
    onadd() {
      db.collection("products")
        .add(this.addProductData)
        .then(this.getproducts, this.$router.push("/"));    
    },

    addimages() {
      var storage = firebase.storage();
      var file = e.target.files[0];
      console.log(file);
      var storageref = storage.ref("images/" + file.name);
      storageref.put(file);
    },
    pickFile() {
      this.$refs.image.click();
    },
    // onFilePicked(e) {
    //   const files = e.target.files;
    //   if (files[0] !== undefined) {
    //     this.imageName = files[0].name;
    //     if (this.imageName.lastIndexOf(".") <= 0) {
    //       return;
    //     }
    //     const fr = new FileReader();
    //     fr.readAsDataURL(files[0]);
    //     fr.addEventListener("load", () => {
    //       this.imageUrl = fr.result;
    //       console.log("imageUrl");
    //       this.imageFile = files[0]; // this is an image file that can be sent to server...
    //       //this.getImages();
    //     });
    //   } else {
    //     this.imageName = "";
    //     this.imageFile = "";
    //     this.imageUrl = "";
    //   }
    // }

    uploadimage(e) {
      let file = e.target.files[0];
      var storageRef = fb.storage().ref("images/" + file.name);
      let uploadTask = storageRef.put(file);
      // console.log(e.target.files[0]);
      // console.log(uploadTask);
      uploadTask.on(
        "state_changed",
        snapshot => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          this.uploading = true
        var progress = Math.floor(snapshot.bytesTransferred / snapshot.totalBytes * 100);
    console.log('Upload is ' + progress + '% done');
    this.progress = progress;
     
        },
        error => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.image = downloadURL;
            //  let imagepath = downloadURL;
            this.addProductData.imagepath = downloadURL;
             this.uploading = false
          });
        }
      );
    }
  },
 
};
</script>

<style scoped>
.hidden {
  display: none;
}
.image-res {
  width: 100%;
}

</style>
