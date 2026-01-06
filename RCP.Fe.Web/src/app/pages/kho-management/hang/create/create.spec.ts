import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateHang } from './create';






describe('CreateHang', () => {
  let component: CreateHang;
  let fixture: ComponentFixture<CreateHang>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateHang]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHang);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
