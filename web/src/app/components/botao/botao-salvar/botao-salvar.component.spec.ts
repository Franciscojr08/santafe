import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoSalvarComponent } from './botao-salvar.component';

describe('BotaoSalvarComponent', () => {
  let component: BotaoSalvarComponent;
  let fixture: ComponentFixture<BotaoSalvarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoSalvarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoSalvarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
