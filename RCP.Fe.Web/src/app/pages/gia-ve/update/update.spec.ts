import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateGiaVe } from './update';



describe('UpdateGiaVe', () => {
  let component: UpdateGiaVe;
  let fixture: ComponentFixture<UpdateGiaVe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateGiaVe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateGiaVe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
