declare global {
    interface Array<T> {
        orderBy(): {
            string: (attr: string, order: string) => T[];
            date: (attr: string, order: string) => T[];
            number: (attr: string, order: string) => T[];
        };
        groupByAttribute(attribute: string): Record<string, T[]>;
        fusionByAttribute(attribute: string): Record<string, T>;
        removeItemsByIndex(indexes: number[]): void;
    }
  
    interface String {
        validateEmail(): boolean;
        capFirstLetter(): string;
        addLineBreak(charactersPerLine: number): string;
    }
  
    interface Number {
        formatPrice(): string;
        roundPrice(): number;
        discountPrice(discount: number): number;
    }
  
    interface HTMLSelectElement {
        getTextOptSelected(): string;
        getDataOptSelected(attribute: string): string | null;
        getAllDataOptSelected(): Record<string, string>;
        getValuesMultipleOpts(): string[];
        setValue(value: string | number): void;
        setMultipleValues(data: (string | Record<string, any>)[], attribute?: string | null): void;
        checkOnlyOpt(els: HTMLInputElement[]): void;
        simulateKeyPress(value: string | number): void;
        addRow(row: string, position: 'first' | 'last' | number, object?: Record<string, any> | null): void;
        deleteRow(): void;
    }
}
  
export {};