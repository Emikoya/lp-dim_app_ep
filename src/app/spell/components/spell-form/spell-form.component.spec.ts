import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellFormComponent } from './spell-form.component';

describe('SpellFormComponent', () => {
  let component: SpellFormComponent;
  let fixture: ComponentFixture<SpellFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpellFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpellFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
