import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ghe } from './ghe';





describe('Ghe', () => {
  let component: Ghe;
  let fixture: ComponentFixture<Ghe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ghe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ghe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
