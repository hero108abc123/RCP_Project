import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RCP } from './rcp';




describe('RCP', () => {
  let component: RCP;
  let fixture: ComponentFixture<RCP>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RCP]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RCP);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
