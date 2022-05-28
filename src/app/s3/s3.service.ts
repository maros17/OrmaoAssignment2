import {EventEmitter, Injectable} from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import {ManagedUpload} from "aws-sdk/lib/s3/managed_upload";
import SendData = ManagedUpload.SendData;

@Injectable({
  providedIn: 'root'
})
export class S3Service {

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
}
