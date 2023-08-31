declare module "miModulo" {
    function formatRut(input: { value: string }): void;
    function maxLengthCheck(input: { value: string; maxLength: number }): boolean;
    function checkKeys(event: KeyboardEvent, validation: string | string[]): boolean;
    function filterTable(tableId: string, input: { value: string }): void;
    interface ScrollTransitionOptions {
        elementToMove: string;
        scrollFocusElement: 'window' | string;
        topElement: string | null;
        bottomElement: string | null;
        topSeparation: number;
        bottomSeparation: number;
    }
    function scrollTransition(opts: ScrollTransitionOptions): void;
    
    export { formatRut, maxLengthCheck, checkKeys, filterTable, scrollTransition};
}
  