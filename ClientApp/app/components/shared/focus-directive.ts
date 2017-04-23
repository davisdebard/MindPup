import { Directive, AfterViewInit, ElementRef, DoCheck } from '@angular/core';

@Directive({ selector: '[focus]' })
export class FocusDirective implements AfterViewInit, DoCheck {
    private lastVisible: boolean = false;
    private initialised: boolean = false;

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit() {
        console.log('inside FocusDirective.ngAfterViewInit()');
        this.initialised = true;
        this.ngDoCheck();
    }

    ngDoCheck() {

        console.log('inside FocusDirective.ngDoCheck()');

        if (!this.initialised) {
            return;
        }
        const visible = !!this.el.nativeElement.offsetParent;
        if (visible && !this.lastVisible) {
            setTimeout(() => {
                this.el.nativeElement.focus();
            }, 1);
        }
        this.lastVisible = visible;
    }
}