import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateRCP } from './update';





describe('UpdateRCP', () => {
  let component: UpdateRCP;
  let fixture: ComponentFixture<UpdateRCP>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateRCP]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRCP);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
