import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgLoadComponent } from './img-load.component';

describe('ImgLoadComponent', () => {
  let component: ImgLoadComponent;
  let fixture: ComponentFixture<ImgLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgLoadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
