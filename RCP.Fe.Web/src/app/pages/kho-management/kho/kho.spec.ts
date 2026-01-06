import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Kho } from './kho';





describe('Kho', () => {
  let component: Kho;
  let fixture: ComponentFixture<Kho>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Kho]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Kho);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
