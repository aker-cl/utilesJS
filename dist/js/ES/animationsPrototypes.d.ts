declare global {
    interface Element {
        animateValue(start: number, end: number, textBefore?: string, textAfter?: string): void;
        elementTransition(action: 'show' | 'hide'): void;
    }

    interface NodeList {
        elementTransition(action: 'show' | 'hide'): void;
    }

    interface Array<T> {
        elementTransition(action: 'show' | 'hide'): void;
    }
}

declare global {
    interface HTMLButtonElement {
        loadingButton(action: 'start' | 'stop', text?: string | null): void;
    }

    interface HTMLAnchorElement {
        loadingButton(action: 'start' | 'stop', text?: string | null): void;
    }
}

export {};
