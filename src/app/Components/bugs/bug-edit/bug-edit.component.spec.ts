import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugEditComponent } from './bug-edit.component';

describe('BugEditComponent', () => {
  let component: BugEditComponent;
  let fixture: ComponentFixture<BugEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BugEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BugEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
