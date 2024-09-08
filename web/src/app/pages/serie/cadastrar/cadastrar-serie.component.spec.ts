import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarSerieComponent } from './cadastrar-serie.component';

describe('CadastrarSerieComponent', () => {
  let component: CadastrarSerieComponent;
  let fixture: ComponentFixture<CadastrarSerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarSerieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
