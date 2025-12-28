import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateRCP } from './create';


describe('CreateRCP', () => {
  let component: CreateRCP;
  let fixture: ComponentFixture<CreateRCP>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRCP]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRCP);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
