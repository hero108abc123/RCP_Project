import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateLichChieu } from './update';







describe('UpdateLichChieu', () => {
  let component: UpdateLichChieu;
  let fixture: ComponentFixture<UpdateLichChieu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateLichChieu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLichChieu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
