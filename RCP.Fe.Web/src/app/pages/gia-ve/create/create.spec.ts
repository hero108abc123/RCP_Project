import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateGiaVe } from './create';


describe('CreateGiaVe', () => {
  let component: CreateGiaVe;
  let fixture: ComponentFixture<CreateGiaVe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGiaVe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGiaVe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
