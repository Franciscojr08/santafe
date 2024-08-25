import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalRegistrosComponent } from './total-registros.component';

describe('TotalRegistrosComponent', () => {
  let component: TotalRegistrosComponent;
  let fixture: ComponentFixture<TotalRegistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalRegistrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
