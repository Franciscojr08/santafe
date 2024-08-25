import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoCadastrarComponent } from './botao-cadastrar.component';

describe('BotaoCadastrarComponent', () => {
  let component: BotaoCadastrarComponent;
  let fixture: ComponentFixture<BotaoCadastrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoCadastrarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
