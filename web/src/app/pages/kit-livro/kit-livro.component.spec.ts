import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitLivroComponent } from './kit-livro.component';

describe('KitLivroComponent', () => {
  let component: KitLivroComponent;
  let fixture: ComponentFixture<KitLivroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitLivroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitLivroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
