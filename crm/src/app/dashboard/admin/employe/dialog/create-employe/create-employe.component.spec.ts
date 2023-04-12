import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompanieComponent } from './create-companie.component';

describe('CreateCompanieComponent', () => {
  let component: CreateCompanieComponent;
  let fixture: ComponentFixture<CreateCompanieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCompanieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCompanieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
