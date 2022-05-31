import {AfterViewInit, Component} from '@angular/core';
import {S3Service} from "./s3/s3.service";
import {MatDialog} from "@angular/material/dialog";
import {CredsComponent} from "./creds/creds.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'OrmaoAssignment';

  isDialogOpen = false;

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

  constructor(private _s3: S3Service, public dialog: MatDialog) {
  }

  openDialog(): void {

    if (!this._s3.success && !this.isDialogOpen) {
      const dialogRef = this.dialog.open(CredsComponent, {
        width: '250px',
        hasBackdrop: true,
        panelClass: "full-panel",
        backdropClass: 'custom-backdrop',
        disableClose: true
      });
      this.isDialogOpen = true;
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.isDialogOpen = false;
      });
    }
  }


  _imgSource: string = "";

  fileUploaded(path: string) {
    this.imgSource = path;
  }

  pathToLoadSelected(path: any) {
    this.imgSource = path;
  }

  // Because the function of getting the list is async, we need separate the request to refresh and
  // the acquiring of the data
  getListOfFiles() {
    this._s3.filesListUpdated.subscribe((value) => {
      this.listOfFiles = value;
    })
    this._s3.getFilesList();
  }
}
