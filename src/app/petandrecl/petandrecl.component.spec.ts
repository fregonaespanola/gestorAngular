import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetandreclComponent } from './petandrecl.component';

describe('PetandreclComponent', () => {
  let component: PetandreclComponent;
  let fixture: ComponentFixture<PetandreclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetandreclComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetandreclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
