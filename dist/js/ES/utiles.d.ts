declare module "UtilesJS" {
    interface UtilesFunctions {
        initPromise: (data?: any) => Promise<any>;
        fetchDataPromise: (url: string, method: string, headers: object, data?: any) => Promise<any>;
        arrayOrderBy: (array: any[]) => {
            string: (attr: string, order: string) => any[];
            date: (attr: string, order: string) => any[];
            number: (attr: string, order: string) => any[];
        };
        arrayGroupBy: (arr: any[], attribute: string) => Record<string, any[]>;
        arrayFusionByAttribute: (arrays: any[][], attribute: string) => any[];
        arrayRemoveItemsByIndex: (array: any[], indexes: number[]) => void;
        capFirstLetter: (str: string) => string;
        addLineBreak: (text: string, charactersPerLine: number) => string;
        validateEmail: (email: string) => boolean;
        formatPrice: (price: number) => string;
        roundPrice: (price: number) => number;
        discountPrice: (price: number, discount: number) => number;
        getTextOfSelect: (select: HTMLSelectElement) => string;
        getDataOfSelect: (select: HTMLSelectElement, attribute: string) => string | null;
        getAllDataOfSelect: (select: HTMLSelectElement) => Record<string, any>;
        getValuesSelectMultiple: (select: HTMLSelectElement) => string[];
        setValueOfSelect: (select: HTMLSelectElement, value: string | number) => void;
        setValuesSelectMultiple: (select: HTMLSelectElement, data: any[], attribute?: string | null) => void;
        addRowToTable: (tableID: string, row: string, position: 'first' | 'last' | number, array?: Record<string, any> | null) => void;
        deleteRowOfTable: (rowId: string) => void;
        getParamUrl: (parameter: string) => string | null;
        setParamUrl: (parameter: string, value: string) => void;
        deleteParamUrl: (parameter: string) => void;
        getHashUrl: () => string;
        setHashUrl: (hash: string) => void;
        deleteHashUrl: () => void;
        filterPage: (elClass: string, page: string, numPage?: number | null) => void;
        listenerInputsFilter: (elClass: string, page: string) => void;
        listenerNumberPage: (classLink: string, classFilter: string, url: string, idPageInput: string) => void;
        simulateKeyPress: (elementId: string, value: string | number) => void;
    }

    const UtilesJS: () => UtilesFunctions;
    export = UtilesJS;
}
