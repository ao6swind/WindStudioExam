import 'firebase/storage';

import firebase from 'firebase/app';

export class CkeditorUploadAdapter {

  constructor(private loader, private folder) { }

  upload() {
    return this.loader.file.then(
      file =>
        new Promise((resolve, reject) => {
          const storage = firebase.storage().ref(this.folder);
          const extension = file.name.split('.')[1];
          const uploadTask = storage.child(`${Date.now().toString()}.${extension}`).put(file);
          uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED, 
            (snapshot) => {
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: 
                  console.log("Upload is paused");
                  break;
                case firebase.storage.TaskState.RUNNING: 
                  console.log("Upload is running");
                  break;
              }
            },
            (error) => {
              switch (error.code) {
                case "storage/unauthorized":
                  reject(" User doesn't have permission to access the object");
                  break;

                case "storage/canceled":
                  reject("User canceled the upload");
                  break;

                case "storage/unknown":
                  reject(
                    "Unknown error occurred, inspect error.serverResponse"
                  );
                  break;
              }
            },
            () => {
              uploadTask.snapshot.ref
                .getDownloadURL()
                .then((url) => {
                  resolve({
                    default: url
                  });
                });
            }
          );
        })
    );
  }
}
