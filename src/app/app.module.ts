import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {S3Service} from "./s3/s3.service";

import {AppComponent} from './app.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatGridListModule} from "@angular/material/grid-list";
import {ImgDisplayComponent} from './img-display/img-display.component';
import {ImgLoadComponent} from './img-load/img-load.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Overlay} from "@angular/cdk/overlay";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {CredsComponent} from './creds/creds.component';
import {
  MAT_DIALOG_DATA,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialog,
  MatDialogModule, MatDialogRef
} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    ImgDisplayComponent,
    ImgLoadComponent,
    CredsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatGridListModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [S3Service, MatSnackBar, Overlay, MatDialog, {provide: MatDialogRef,useValue: {} }
    , {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: MAT_DIALOG_DATA, useValue: []}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
