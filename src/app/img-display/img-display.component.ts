import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-img-display',
  templateUrl: './img-display.component.html',
  styleUrls: ['./img-display.component.css']
})
export class ImgDisplayComponent implements OnInit {
  private _imgSource: string = "";
  private _shortPath = "";

  get shortPath(): string {
    return this._shortPath;
  }

  get imgSource(): string {
    return this._imgSource;
  }

  @Input()
  set imgSource(value: string) {
    this._imgSource = value;
    this._shortPath = this.shortenPath(this._imgSource);
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  /**
   * Returns the path without the parameters of the GET request
   * @param path - A full path to shorten
   */
  shortenPath(path: string): string {
    if (path !== "")
      return path.split('?')[0];
    else return "";
  }
}
