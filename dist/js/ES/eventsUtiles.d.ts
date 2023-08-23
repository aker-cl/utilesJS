declare module "miModulo" {
    export function formatRut(input: HTMLInputElement): void;
    export function maxLengthCheck(input: HTMLInputElement): boolean;
    export function checkKeys(event: KeyboardEvent, validation: string | string[]): boolean;
    export function filterTable(tableId: string, input: HTMLInputElement): void;
}