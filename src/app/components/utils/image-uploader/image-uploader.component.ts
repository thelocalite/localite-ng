import {Component, OnInit} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {
  uploadPercent: Observable<number>;

  // You receive a url when the image has uploaded
  // append it with _500x500 or _1000x1000 for respective sizes
  downloadURL: Observable<string>;

  selectedFile = null;
  placeholderImg = '../../../../assets/upload.svg';

  // Flags used to change HTML behaviour
  isUploading = false;
  gotUrl = false;


  // Uses angular fire storage
  constructor(private storage: AngularFireStorage) {}

  ngOnInit() {}

  onFileSelected(event) {
    console.log("**** Triggered");
    console.log(event);
    this.selectedFile = event.target.files[0];
    // this.afStorage.upload('/upload/to/this-path', event.target.files[0]);
  }

  clickIt() {
    document.getElementById('fileInput').click();
  }

  uploadFile() {
    this.isUploading = true;

    // Please name the file uniquely, based on userID, Context, etc - Upload with an existing filename will be overritten
    const filePath = 'h3';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectedFile);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.gotUrl = true;
            console.log(this.downloadURL);
        } )
     )
    .subscribe();
  }
}
