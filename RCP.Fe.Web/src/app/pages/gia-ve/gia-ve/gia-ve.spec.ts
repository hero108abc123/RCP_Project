import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GiaVe } from './gia-ve';






describe('GiaVe', () => {
  let component: GiaVe;
  let fixture: ComponentFixture<GiaVe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiaVe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiaVe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
