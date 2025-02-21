import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsigRutasPage } from './asig-rutas.page';

describe('AsigRutasPage', () => {
  let component: AsigRutasPage;
  let fixture: ComponentFixture<AsigRutasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsigRutasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
