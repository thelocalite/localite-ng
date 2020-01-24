import {Component, OnInit} from '@angular/core';
import {UploaderServiceService} from 'src/app/services/utils/uploader-service.service';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {
  imageObj: File;
  imageUrl = '../../../../assets/upload.svg';
  isUploading = false;

  constructor(private uploaderService: UploaderServiceService) {}

  ngOnInit() {}

  onImagePicked(event: Event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    this.imageObj = FILE;
  }

  onImageUpload() {
    const imageForm = new FormData();
    imageForm.append('image', this.imageObj);
    this.isUploading = true;
    this.uploaderService.imageUpload(imageForm).subscribe(res => {
      console.log(res);

      this.imageUrl = 'https://aklimgbucket.s3.amazonaws.com/' + res['image'];
      this.isUploading = false;
    });
  }

  clickIt() {
    document.getElementById('fileInput').click();
  }
}
