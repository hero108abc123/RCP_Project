import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhimRoomRcp } from './movie';




describe('PhimRoomRcp', () => {
  let component: PhimRoomRcp;
  let fixture: ComponentFixture<PhimRoomRcp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhimRoomRcp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhimRoomRcp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
