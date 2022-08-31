import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMatchComponent } from './add-edit-match.component';

describe('AddEditMatchComponent', () => {
  let component: AddEditMatchComponent;
  let fixture: ComponentFixture<AddEditMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditMatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
