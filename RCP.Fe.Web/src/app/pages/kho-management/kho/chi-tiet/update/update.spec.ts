import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateNhapHang } from './update';






describe('UpdateNhapHang', () => {
  let component: UpdateNhapHang;
  let fixture: ComponentFixture<UpdateNhapHang>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateNhapHang]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateNhapHang);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
