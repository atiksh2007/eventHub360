export declare class AddLineItemDto {
    categoryName: string;
    description: string;
    quantity: number;
    costUnit: number;
    markupPct: number;
    discountLinePct: number;
    taxRatePct: number;
    cgstRatePct?: number;
    sgstRatePct?: number;
    igstRatePct?: number;
}
export declare class AddLineItemsDto {
    items: AddLineItemDto[];
}
