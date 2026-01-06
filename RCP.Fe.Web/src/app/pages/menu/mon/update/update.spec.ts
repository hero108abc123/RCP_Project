import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateMon } from './update';






describe('UpdateMon', () => {
  let component: UpdateMon;
  let fixture: ComponentFixture<UpdateMon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
