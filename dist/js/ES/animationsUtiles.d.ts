declare function animateValue(element: Element, start: number, end: number, textBefore?: string, textAfter?: string): void;
declare function elementTransition(element: Element | Element[], action: 'show' | 'hide'): void;
declare function loadingButton(btn: HTMLButtonElement, action: 'start' | 'stop', text?: string | null): void;

export { animateValue, elementTransition, loadingButton };
