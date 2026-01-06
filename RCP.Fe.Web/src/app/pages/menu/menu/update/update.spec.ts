import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateMenu } from './update';







describe('UpdateMenu', () => {
  let component: UpdateMenu;
  let fixture: ComponentFixture<UpdateMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
