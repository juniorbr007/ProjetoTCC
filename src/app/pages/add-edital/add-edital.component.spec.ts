import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditalComponent } from './add-edital.component';

describe('AddEditalComponent', () => {
  let component: AddEditalComponent;
  let fixture: ComponentFixture<AddEditalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
