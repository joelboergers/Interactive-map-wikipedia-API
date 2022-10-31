import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePaysComponent } from './liste-pays.component';

describe('ListePaysComponent', () => {
  let component: ListePaysComponent;
  let fixture: ComponentFixture<ListePaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListePaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListePaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
