import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoEnviarComponent } from './botao-enviar.component';

describe('BotaoEnviarComponent', () => {
  let component: BotaoEnviarComponent;
  let fixture: ComponentFixture<BotaoEnviarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoEnviarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoEnviarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
