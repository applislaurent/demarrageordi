import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AidecontenuComponent } from './aidecontenu.component';

describe('AidecontenuComponent', () => {
  let component: AidecontenuComponent;
  let fixture: ComponentFixture<AidecontenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AidecontenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AidecontenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
