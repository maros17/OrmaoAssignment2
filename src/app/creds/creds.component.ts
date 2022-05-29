import {Component, OnInit, Output} from '@angular/core';
import {S3Service} from "../s3/s3.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-creds',
  templateUrl: './creds.component.html',
  styleUrls: ['./creds.component.css']
})
export class CredsComponent implements OnInit {

  credsForm!: FormGroup;
  success: boolean = false;

  constructor(private _s3: S3Service, private fb: FormBuilder) {
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
    try {
      this._s3.setCredsAndCheck(this.accessKey?.value, this.secretAccessKey?.value).then((success) => {
        this.success = success;
        console.log(success);
      });

    } catch (e) {
      console.log("error in fred comp");
    }
  }
}
