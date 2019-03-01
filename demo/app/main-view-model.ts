import { Observable } from 'data/observable';
import * as Toast from "nativescript-toast";

export class HelloWorldModel extends Observable {
    private toast: Toast.Toast = null;

    constructor() {
        super();
    }


    public showToast() {
        this.toast = Toast.makeText('Happy to create a toast');
        this.toast.show();
    }

    public hideToast() {
        this.toast.cancel();
    }
}
