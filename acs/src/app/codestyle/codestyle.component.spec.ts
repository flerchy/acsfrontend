import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CodeStyleComponent} from './codestyle.component';

describe('CodeStyleComponent', () => {
    let component: CodeStyleComponent;
    let fixture: ComponentFixture<CodeStyleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CodeStyleComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CodeStyleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
