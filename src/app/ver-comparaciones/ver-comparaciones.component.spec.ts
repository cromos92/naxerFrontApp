import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerComparacionesComponent } from './ver-comparaciones.component';

describe('VerComparacionesComponent', () => {
  let component: VerComparacionesComponent;
  let fixture: ComponentFixture<VerComparacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerComparacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerComparacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
