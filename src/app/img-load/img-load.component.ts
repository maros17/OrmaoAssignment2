import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {S3Service} from "../s3/s3.service";

@Component({
  selector: 'app-img-load',
  templateUrl: './img-load.component.html',
  styleUrls: ['./img-load.component.css']
})
export class ImgLoadComponent implements OnInit {
  get listOfFiles(): any[] {
    return this._listOfFiles;
  }

  @Input()
  set listOfFiles(value: any[]) {
    this._listOfFiles = value;
  }

  private _listOfFiles: any[] = [];

  constructor(private _s3: S3Service) {
  }

  ngOnInit(): void {
  }

  @Output() fileSelectedEvent = new EventEmitter();
  @Output() needToRefreshFilesList = new EventEmitter();
  @Output() updateFilesList = new EventEmitter();
  pathToLoad: string = "";
  selectedOption: string = "";


  /**
   * Checks if the input is a full path, or just a name of a file in the bucket
   */
  displayImage() {
    if (this.pathToLoad !== "") {
      this.fileSelectedEvent.emit(this.pathToLoad);
    } else {
      if (this.selectedOption !== "")
        this.fileSelectedEvent.emit(this.selectedOption);
    }
  }

  refreshFilesList() {
    this.needToRefreshFilesList.emit();
  }

  /**
   * When user clicks the select component
   */
  onClickSelect() {
    this.updateFilesList.emit();
  }

}
