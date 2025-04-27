import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogDisplayComponent } from './dog-display.component';

describe('DogDisplayComponent', () => {
  let component: DogDisplayComponent;
  let fixture: ComponentFixture<DogDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DogDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
