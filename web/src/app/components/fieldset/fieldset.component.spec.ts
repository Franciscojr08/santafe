import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FildsetComponent } from './fieldset.component';

describe('FildsetComponent', () => {
  let component: FildsetComponent;
  let fixture: ComponentFixture<FildsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FildsetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FildsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
