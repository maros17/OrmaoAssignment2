import {Component, Inject, OnInit, Output} from '@angular/core';
import {S3Service} from "../s3/s3.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

interface DialogData {
}

@Component({
  selector: 'app-creds',
  templateUrl: './creds.component.html',
  styleUrls: ['./creds.component.css']
})
export class CredsComponent implements OnInit {

  credsForm!: FormGroup;
  success: boolean = false;

  constructor(private _s3: S3Service, private fb: FormBuilder, public dialogRef: MatDialogRef<CredsComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,) {
  }

  ngOnInit(): void {
    this.credsForm! = this.fb.group({
      accessKey: ['', [Validators.required]],
      secretAccessKey: ['', [Validators.required]]
    })

  }

  get accessKey() {
    return this.credsForm.get("accessKey");
  }

  get secretAccessKey() {
    return this.credsForm.get("secretAccessKey");
  }

  submit() {
    this._s3.setCredsAndCheck(this.accessKey?.value, this.secretAccessKey?.value)
      .then((success) => {
        if (success) {
          this.success = success;
          this.dialogRef.close()
        }
        console.log(success);
      }).catch((value) => {
      console.log("Error in creds comp " + value)
    })
    ;

  }
}
