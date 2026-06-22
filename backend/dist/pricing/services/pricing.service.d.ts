export interface CalculatedItem {
    categoryName: string;
    description: string;
    quantity: number;
    costUnit: number;
    markupPct: number;
    discountLinePct: number;
    taxRatePct: number;
    priceBase: number;
    priceNet: number;
    cgst: number;
    sgst: number;
    igst: number;
    taxTotal: number;
}
export interface CalculationBreakdown {
    items: CalculatedItem[];
    subtotal: number;
    taxTotal: number;
    discountGlobal: number;
    chargeService: number;
    grandTotal: number;
    marginPct: number;
    averageDiscountPct: number;
}
export declare class PricingService {
    calculate(items?: any[], discountGlobalVal?: number, chargeServiceVal?: number): CalculationBreakdown;
}
