import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateLichChieu } from './create';






describe('CreateLichChieu', () => {
  let component: CreateLichChieu;
  let fixture: ComponentFixture<CreateLichChieu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLichChieu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLichChieu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
