import {Component} from '@angular/core';
import * as Toast from 'nativescript-toast';

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
})
export class AppComponent {
    public counter: number = 16;

    public message(): void {
        let msg: string;
        if (this.counter > 0) {
            msg = this.counter + ' taps left';
        } else {
            msg = 'Hoorraaay! \nYou are ready to start building!';
        }
        Toast.makeText(msg).show();
    }

    public onTap() {
        this.counter--;
        this.message();
    }
}
