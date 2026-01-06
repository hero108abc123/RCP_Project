import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateMon } from './create';






describe('CreateMon', () => {
  let component: CreateMon;
  let fixture: ComponentFixture<CreateMon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
