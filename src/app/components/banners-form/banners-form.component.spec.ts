import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannersFormComponent } from './banners-form.component';

describe('BannersFormComponent', () => {
  let component: BannersFormComponent;
  let fixture: ComponentFixture<BannersFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BannersFormComponent]
    });
    fixture = TestBed.createComponent(BannersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
