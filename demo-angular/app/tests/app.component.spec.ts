import {inject, TestBed} from '@angular/core/testing';
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import * as appSettings from 'application-settings';
import {Page} from 'ui/page';
import {AppComponent} from '../app.component';

describe('LoginComponent', () => {

    // provide our implementations or mocks to the dependency injector
    beforeEach(() => {
        appSettings.clear();
        TestBed.configureTestingModule({
            imports: [
                NativeScriptModule,
            ],
            providers: [
                Page,
                AppComponent
            ]
        });
    });

    it('should init', inject([AppComponent], (appComponent: AppComponent) => {
        // expect(appComponent).toBeDefined();
    }));

    it('should work on click', inject([AppComponent], (appComponent: AppComponent) => {
        appComponent.onTap();
    }));

});
