import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateMonVaoMenu } from './create';






describe('CreateMonVaoMenu', () => {
  let component: CreateMonVaoMenu;
  let fixture: ComponentFixture<CreateMonVaoMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMonVaoMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMonVaoMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
