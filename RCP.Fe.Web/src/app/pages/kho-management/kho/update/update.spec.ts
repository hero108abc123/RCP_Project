import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateKho } from './update';






describe('UpdateKho', () => {
  let component: UpdateKho;
  let fixture: ComponentFixture<UpdateKho>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateKho]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateKho);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
