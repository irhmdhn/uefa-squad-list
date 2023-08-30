import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UefaPage } from './uefa.page';

describe('UefaPage', () => {
  let component: UefaPage;
  let fixture: ComponentFixture<UefaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UefaPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UefaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
