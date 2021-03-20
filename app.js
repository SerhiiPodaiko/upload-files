import firebase from "firebase/app";
import 'firebase/storage';
import { upload } from "./upload";

const firebaseConfig = {
    apiKey: "AIzaSyACyR5CLcD5yJTdmw6xYypClZgSRl5gLfE",
    authDomain: "fe-upload-dec7a.firebaseapp.com",
    projectId: "fe-upload-dec7a",
    storageBucket: "fe-upload-dec7a.appspot.com",
    messagingSenderId: "3100608095",
    appId: "1:3100608095:web:2c257ee4da2f8553d27dea"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();


upload("#file", {
    multi: true,
    accept: ['.png', '.jpg', '.jpeg', '.gif'],
    onUpload(files, blocks) {
        files.forEach((file, index) => {
            const ref = storage.ref(`images/${file.name}`);
            const task = ref.put(file);

            task.on('state_changed', snapshot => {
                const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
                const block = blocks[index].querySelector('.preview-info-progress');
                block.textContent = percentage;
                block.style.width = percentage + '%';
            }, error => {
                console.log(error)
            }, () => {
                console.log('Completed')
            })
        })
    }
});