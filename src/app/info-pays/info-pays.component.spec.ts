import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPaysComponent } from './info-pays.component';

describe('InfoPaysComponent', () => {
  let component: InfoPaysComponent;
  let fixture: ComponentFixture<InfoPaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoPaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
