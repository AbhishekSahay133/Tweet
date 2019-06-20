<template>
  <div>
    <input type="file" @change="uploadimage" class="form-control">
    <img :src="image">
  </div>
</template>

<script>
import { fb, db } from "../db/index";
export default {
    data(){
        return{
image:[]
        }
    },
  methods: {
    uploadimage(e) {
      let file = e.target.files[0];
      var storageRef = fb.storage().ref("images/" + file.name);
      let uploadTask = storageRef.put(file);
      // console.log(e.target.files[0]);
      // console.log(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot)=> {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          
          
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        ()=> {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.image = downloadURL;
            console.log("File available at", downloadURL);
          });
        }
      );
    }
  }
};
</script>

<style>
</style>
