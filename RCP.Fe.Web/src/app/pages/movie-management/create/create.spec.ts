import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePhim } from './create';

describe('CreatePhim', () => {
    let component: CreatePhim;
    let fixture: ComponentFixture<CreatePhim>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CreatePhim]
        }).compileComponents();

        fixture = TestBed.createComponent(CreatePhim);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
