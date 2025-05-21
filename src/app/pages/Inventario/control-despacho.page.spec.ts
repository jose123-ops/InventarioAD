import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlDespachoPage } from './control-despacho.page';

describe('ControlDespachoPage', () => {
  let component: ControlDespachoPage;
  let fixture: ComponentFixture<ControlDespachoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlDespachoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
