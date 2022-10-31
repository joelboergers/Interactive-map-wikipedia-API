import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPaysComponent } from './form-pays.component';

describe('FormPaysComponent', () => {
  let component: FormPaysComponent;
  let fixture: ComponentFixture<FormPaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
