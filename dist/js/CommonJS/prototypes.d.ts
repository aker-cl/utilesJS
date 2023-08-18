declare global {
    interface Array<T> {
        orderBy(): {
            string(attr: string, order: 'asc' | 'desc'): Array<T>;
            date(attr: string, order: 'asc' | 'desc'): Array<T>;
            number(attr: string, order: 'asc' | 'desc'): Array<T>;
        };
        groupByAttribute(attribute: string): { [key: string]: Array<T> };
        fusionByAttribute(attribute: string): Array<T>;
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
        getAllDataOptSelected(): { [key: string]: string };
        getValuesMultipleOpts(): string[];
        setValue(value: string | number): void;
        setMultipleValues(data: object[] | string[], attribute?: string | null): void;
        addRow(row: string, position: string | number, object?: object | null): void;
        deleteRow(): void;
        simulateKeyPress(value: string | number): void;
    }
}
  
export {};
  