import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThongKeKho } from './thong-ke';






describe('ThongKeKho', () => {
  let component: ThongKeKho;
  let fixture: ComponentFixture<ThongKeKho>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThongKeKho]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThongKeKho);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
