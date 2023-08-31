declare module "miModulo" {
    export function formatRut(input: HTMLInputElement): void;
    export function maxLengthCheck(input: HTMLInputElement): boolean;
    export function checkKeys(event: KeyboardEvent, validation: string | string[]): boolean;
    export function filterTable(tableId: string, input: HTMLInputElement): void;
    type ScrollTransitionOptions = {
        elementToMove: string;
        scrollFocusElement: "window" | string;
        topElement: string | null;
        bottomElement: string | null;
        topSeparation: number;
        bottomSeparation: number;
    };
    export function scrollTransition(opts: ScrollTransitionOptions): void;
}