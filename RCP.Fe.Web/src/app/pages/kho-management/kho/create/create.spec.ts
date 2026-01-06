import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateKho } from './create';






describe('CreateKho', () => {
  let component: CreateKho;
  let fixture: ComponentFixture<CreateKho>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateKho]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateKho);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
