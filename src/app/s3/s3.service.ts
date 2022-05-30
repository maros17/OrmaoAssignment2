import {EventEmitter, Injectable} from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import {ManagedUpload} from "aws-sdk/lib/s3/managed_upload";
import SendData = ManagedUpload.SendData;
import {rejects} from "assert";

@Injectable({
  providedIn: 'root'
})
export class S3Service {

  _accessKey: string = "";
  _secretAccessKey: string = "";
  _bucket: S3;
  readonly _bucketName: string = "exerciseormaotech";
  private _allFilesList: any[] = [];
  fileUploaded = new EventEmitter();

  get allFilesList(): any[] {
    return this._allFilesList;
  }

  set allFilesList(value: any[]) {
    this._allFilesList = value;
  }

  constructor() {
    this._bucket = new S3(
      {
        accessKeyId: 'ENTER ACCESS KEY HERE',
        secretAccessKey: 'ENTER SECRET ACCESS KEY HERE',
        region: 'eu-central-1',
      }
    );
  }

  /**
   * Uploads a file to the s3 bucket
   * @param file
   */
  uploadFile(file: File) {
    const contentType = file.type;
    const params = {
      Bucket: this._bucketName,
      Key: file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };
    this._bucket.upload(params, (err: Error, data: SendData) => {
      this.fileUploaded.emit(data.Key);
    });
    return this.getFile(file.name);
  }

  getFile(path: string) {
    let signedUrlExpireSeconds = 60 * 3;
    const params = {
      Bucket: this._bucketName,
      Key: path,
      Expires: signedUrlExpireSeconds
    };
    return this._bucket.getSignedUrl("getObject", params);
  }

  isInBucket(name: string) {
    let files: S3.ObjectList | undefined;
    this._bucket.listObjectsV2({Bucket: this._bucketName}, (err, data) => {
      files = data.Contents;
      console.log("ONE");
      console.log(files);
    });
    console.log("TWO");
    console.log(files);
    if (files !== undefined)
      for (let file of files) {
        if (file.Key === name)
          return true;
      }
    console.log(name);
    return false;

  }

  getFilesList() {
    const params = {
      Bucket: this._bucketName
    }
    this._bucket.listObjectsV2(params, (err, data) => {
      if (data.Contents !== undefined)
        this.allFilesList = data.Contents;
    })
  }

  async setCredsAndCheck(accessKey: string, secretAccessKey: string) {
    let success: boolean = false;
    this._accessKey = accessKey;
    this._secretAccessKey = secretAccessKey;
    this._bucket = new S3(
      {
        accessKeyId: this._accessKey,
        secretAccessKey: this._secretAccessKey,
        region: 'eu-central-1',
      }
    );
    try {

      await this._bucket.headBucket({Bucket: this._bucketName}, function (err, data) {
        if (data) {
          success = true;
          console.log("data");
          console.log(data);
          return true;
        }

          return false;
      }).promise().then((value) =>{return value})
        .catch((value)=> {
        console.log("error in catch " + value);
      })
      ;
    } catch (e) {

      console.log("error in s3");
    }
    return success;
  }
}
