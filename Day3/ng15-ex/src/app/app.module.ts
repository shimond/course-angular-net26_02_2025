import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

class Test {
    print() {

    }
}


class Test2 {
    print() {

    }
}


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [Test],
    bootstrap: [AppComponent]
})
export class AppModule { }



interface Dog {
    name: string;
    age: number;
}


interface Person {
    name: string;
    age: number;
}



function test(a: Dog) {

}

