declare module 'UtilesJS' {
    type Order = 'asc' | 'desc';
  
    interface UtilesJS {
      initPromise<T>(data?: T | null): Promise<T>;
      fetchDataPromise<T>(
        url: string,
        method: string,
        headers: object,
        data?: any
      ): Promise<T>;
      
      arrayOrderBy<T>(array: T[]): {
        string(attr: keyof T, order: Order): T[];
        date(attr: keyof T, order: Order): T[];
        number(attr: keyof T, order: Order): T[];
      };
  
      arrayGroupBy<T>(arr: T[], attribute: keyof T): Record<string, T[]>;
      arrayFusionByAttribute<T>(
        arrays: T[][],
        attribute: keyof T
      ): Record<string, T>;
  
      arrayRemoveItemsByIndex<T>(array: T[], indexes: number[]): void;
  
      capFirstLetter(str: string): string;
      addLineBreak(text: string, charactersPerLine: number): string;
      validateEmail(email: string): boolean;
  
      formatPrice(price: number): string;
      roundPrice(price: number): number;
      discountPrice(price: number, discount: number): number;
  
      getTextOfSelect(select: HTMLSelectElement): string;
      getDataOfSelect(
        select: HTMLSelectElement,
        attribute: string
      ): string | null;
      getAllDataOfSelect(select: HTMLSelectElement): Record<string, string>[];
      getValuesSelectMultiple(select: HTMLSelectElement): string[];
      setValueOfSelect(select: HTMLSelectElement, value: string | number): void;
      setValuesSelectMultiple(
        select: HTMLSelectElement,
        data: any[],
        attribute?: string | null
      ): void;
      addRowToTable(
        tableID: string,
        row: string,
        position: 'first' | 'last' | number,
        array?: Record<string, any> | null
      ): void;
      deleteRowOfTable(rowId: string): void;
      getParamUrl(parameter: string): string | null;
      setParamUrl(parameter: string, value: string): void;
      deleteParamUrl(parameter: string): void;
      getHashUrl(): string;
      setHashUrl(hash: string): void;
      deleteHashUrl(): void;
      filterPage(elClass: string, page: string, numPage?: number): void;
      listenerInputsFilter(elClass: string, page: string): void;
      listenerNumberPage(
        classLink: string,
        classFilter: string,
        url: string,
        idPageInput: string
      ): void;
      simulateKeyPress(elementId: string, value: any): void;
    }
  
    const UtilesJS: UtilesJS;
    export = UtilesJS;
}
  