import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarKitLivroComponent } from './cadastrar-kit-livro.component';

describe('CadastrarKitLivroComponent', () => {
  let component: CadastrarKitLivroComponent;
  let fixture: ComponentFixture<CadastrarKitLivroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarKitLivroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarKitLivroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
