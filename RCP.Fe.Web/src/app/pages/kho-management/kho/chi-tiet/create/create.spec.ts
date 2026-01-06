import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateNhapHang } from './create';






describe('CreateNhapHang', () => {
  let component: CreateNhapHang;
  let fixture: ComponentFixture<CreateNhapHang>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNhapHang]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNhapHang);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
