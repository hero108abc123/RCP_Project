import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatePhimRoom } from './update';



describe('UpdatePhimRoom', () => {
  let component: UpdatePhimRoom;
  let fixture: ComponentFixture<UpdatePhimRoom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePhimRoom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePhimRoom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
