import {AfterViewInit, Component} from '@angular/core';
import {S3Service} from "./s3/s3.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  get imgSource(): string {
    return this._imgSource;
  }

  set imgSource(value: string) {
    if (value.match('^https://.*\..*$'))
      this._imgSource = this._s3.getFile(value.substring(value.lastIndexOf('/') + 1));
    else
      this._imgSource = this._s3.getFile(value);
  }

  listOfFiles: any[] = [];

  ngAfterViewInit(): void {
  }

  constructor(private _s3: S3Service) {
  }

  _imgSource: string = "";
  title = 'OrmaoAssignment';

  fileUploaded(path: string) {
    this.imgSource = path;
  }

  pathToLoadSelected(path: any) {
    this.imgSource = path;
  }

  // Because the function of getting the list is async, we need separate the request to refresh and
  // the acquiring of the data
  getListOfFiles() {
    this._s3.getFilesList();
  }

  updateListOfFiles() {
    this.listOfFiles = this._s3.allFilesList;
  }


}
