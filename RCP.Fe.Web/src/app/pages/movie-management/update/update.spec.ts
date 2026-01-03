import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatePhim } from './update';

describe('UpdatePhim', () => {
    let component: UpdatePhim;
    let fixture: ComponentFixture<UpdatePhim>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UpdatePhim]
        }).compileComponents();

        fixture = TestBed.createComponent(UpdatePhim);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
