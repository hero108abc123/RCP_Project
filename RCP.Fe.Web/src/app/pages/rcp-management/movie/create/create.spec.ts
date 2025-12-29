import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePhimRoom } from './create';


describe('CreatePhimRoom', () => {
  let component: CreatePhimRoom;
  let fixture: ComponentFixture<CreatePhimRoom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePhimRoom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePhimRoom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
