import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateMonVaoMenu } from './update';






describe('UpdateMonVaoMenu', () => {
  let component: UpdateMonVaoMenu;
  let fixture: ComponentFixture<UpdateMonVaoMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMonVaoMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMonVaoMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
