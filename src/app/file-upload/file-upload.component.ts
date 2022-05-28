import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {S3Service} from "../s3/s3.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  fileName = "";
  _file!: File;
  img: string = "";

  constructor(private _s3: S3Service, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  @Output() fileUploaded = new EventEmitter();

  onFileSelected(event: any) {
    if (event !== undefined) {
      this._file = event.target.files[0];
      this.fileName = this._file.name;
    }
  }

  /**
   * Because apparently there is a delay is AWS between the creation of the SignedURL and the
   * moment when the SignedURL is actually accessible, I had to add a delay between the actions
   */
  async uploadImage() {
    if (this._file !== undefined) {
      this._s3.uploadFile(this._file);
      await this.delay(1000);
      this.fileUploaded.emit(this._file.name);
    } else {
      this._snackBar.open('No file selected', 'OK', {duration: 3000});
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
