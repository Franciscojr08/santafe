import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroLivroKitLivroComponent } from './filtro-livro-kit-livro.component';

describe('FiltroLivroKitLivroComponent', () => {
  let component: FiltroLivroKitLivroComponent;
  let fixture: ComponentFixture<FiltroLivroKitLivroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroLivroKitLivroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroLivroKitLivroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
