import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarKitLivroComponent } from './editar-kit-livro.component';

describe('EditarKitLivroComponent', () => {
  let component: EditarKitLivroComponent;
  let fixture: ComponentFixture<EditarKitLivroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarKitLivroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarKitLivroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
