<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Registration form</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn  icon large target="_blank" v-on="on">
                      <v-icon large>code</v-icon>
                    </v-btn>
                  </template>
                  <span>Source</span>
                </v-tooltip>              
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="UserName" label="User Name" type="text"  v-model="userdetails.userName"></v-text-field>
                  <v-text-field prepend-icon="person" name="UserEmail" label="User Email" type="email" v-model="userdetails.userEmail"></v-text-field>
                  <v-text-field
                    prepend-icon="person"
                    name="Title"
                    label="Time"
                    type="text"
                    disabled
                    class="hidden"
                    required
                    v-model="userdetails.currentTimes"
                  ></v-text-field>
                    <v-text-field
                    prepend-icon="person"
                    name="Title"
                    label="Date"
                    type="text"
                    disabled
                    class="hidden"
                    required
                    v-model="userdetails.currentDate"
                  ></v-text-field>
                  <v-text-field prepend-icon="code" name="password" label="Password" type="password" v-model="userdetails.userPassword"></v-text-field>
        <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                    <img :src="image" height="150" class="iamgecircle" v-if="image">
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
                      label="Select User Pic"
                      ref="image"
                      id="imagePath"
                      @click="pickFile"
                      v-model="userdetails.userPic"
                      required
                      prepend-icon="attach_file" 
                    ></v-text-field>
                    <input
                      type="file"
                      style="display: none"
                      ref="image"
                      accept="image/*"
                      @change="uploadUserimage"
                    >
                  </v-flex>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="register">submit</v-btn>
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
import { fb, db } from "../db/index";
export default {
  name:"register",
  data(){
    return{
       	 
       uploading: false,
      uploadEnd: false,
      progress: 0,
      userdaetil:[],
       userdetails: {
        userName: "",
        userEmail: "",
        userPassword: "",
        userPic: "",
        currentDate: new Date().toString().substr(0, 10),
        currentTimes: new Date().toLocaleTimeString()
      },


      email:'',
      password:'',
      image: [],
      image:''
    };
  },
  methods:{
     getuserdata() {
      db.collection("userDetails")
        .get()
        .then(querySnapshot => {
          const userdaetil = [];
          querySnapshot.forEach(doc => {
            //  console.log(doc.data())
            userdaetil.push(doc.data());
          });
          this.userdaetil = userdaetil;
        });
    },
     onuseradd() {
      db.collection("userDetails")
        .add(this.userdetails)
        .then(this.getuserdata);    
    },
    register:function(e){
      firebase.auth().createUserWithEmailAndPassword(this.userdetails.userEmail , this.userdetails.userPassword)
      .then(user => {
        // alert(`account created for ${user.email}`);
        // this.$router.push('/');
         this.$router.go({path: this.$router.path});
         
      },
      err => {
        alert(err.message);
      }     
      );
      // console.log('register');
      e.preventDefault();
       this.onuseradd();
    },
     pickFile() {
      this.$refs.image.click();
    },
     uploadUserimage(e) {
      let file = e.target.files[0];
      var storageRef = fb.storage().ref("userimages/" + file.name);
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
            this.userdetails.userPic = downloadURL;
             this.uploading = false
          });
        }
      );
    }
  }

}
</script>

<style scoped>
.iamgecircle{
  border-radius: 50%;
    height: 150px;
    width: 150px;
}
.hidden {
  display: none;
}
</style>
