import { Injectable } from '@nestjs/common';
import Decimal from 'decimal.js';

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

@Injectable()
export class PricingService {
  calculate(
    items: any[],
    discountGlobalVal: number = 0,
    chargeServiceVal: number = 0
  ): CalculationBreakdown {
    let sumPriceNet = new Decimal(0);
    let sumCostQty = new Decimal(0);
    let sumPriceBaseQty = new Decimal(0);
    let taxTotal = new Decimal(0);
    
    const calculatedItems = items.map(item => {
      const quantity = new Decimal(item.quantity || 0);
      const costUnit = new Decimal(item.costUnit || 0);
      const markupPct = new Decimal(item.markupPct || 0);
      const discountLinePct = new Decimal(item.discountLinePct || 0);
      const taxRatePct = new Decimal(item.taxRatePct || 0);
      
      // Price_base = Cost_unit * (1 + Markup%)
      const markupMultiplier = new Decimal(1).plus(markupPct.div(100));
      const priceBase = costUnit.mul(markupMultiplier);
      
      // Price_net = Price_base * Quantity * (1 - Discount%_line)
      const discountMultiplier = new Decimal(1).minus(discountLinePct.div(100));
      const priceNet = priceBase.mul(quantity).mul(discountMultiplier);
      
      // Individual taxes CGST/SGST/IGST
      let cgstRate = new Decimal(0);
      let sgstRate = new Decimal(0);
      let igstRate = new Decimal(0);
      
      if (item.cgstRatePct !== undefined || item.sgstRatePct !== undefined || item.igstRatePct !== undefined) {
        cgstRate = new Decimal(item.cgstRatePct || 0);
        sgstRate = new Decimal(item.sgstRatePct || 0);
        igstRate = new Decimal(item.igstRatePct || 0);
      } else {
        cgstRate = taxRatePct.div(2);
        sgstRate = taxRatePct.div(2);
      }
      
      const cgst = priceNet.mul(cgstRate.div(100));
      const sgst = priceNet.mul(sgstRate.div(100));
      const igst = priceNet.mul(igstRate.div(100));
      const itemTaxTotal = cgst.plus(sgst).plus(igst);
      
      sumPriceNet = sumPriceNet.plus(priceNet);
      sumCostQty = sumCostQty.plus(costUnit.mul(quantity));
      sumPriceBaseQty = sumPriceBaseQty.plus(priceBase.mul(quantity));
      taxTotal = taxTotal.plus(itemTaxTotal);
      
      return {
        categoryName: item.categoryName || 'Custom Requirements',
        description: item.description,
        quantity: quantity.toNumber(),
        costUnit: costUnit.toNumber(),
        markupPct: markupPct.toNumber(),
        discountLinePct: discountLinePct.toNumber(),
        taxRatePct: taxRatePct.toNumber(),
        priceBase: priceBase.toNumber(),
        priceNet: priceNet.toNumber(),
        cgst: cgst.toNumber(),
        sgst: sgst.toNumber(),
        igst: igst.toNumber(),
        taxTotal: itemTaxTotal.toNumber(),
      };
    });
    
    const discountGlobal = new Decimal(discountGlobalVal);
    const chargeService = new Decimal(chargeServiceVal);
    
    // Grand Total: Total_grand = (Sum(Price_net) - Discount_global) + Tax_total + Charge_service
    const grandTotal = sumPriceNet.minus(discountGlobal).plus(taxTotal).plus(chargeService);
    
    // Margin %: Margin% = ((Sum(Price_net) - Sum(Cost_unit * Quantity)) / Sum(Price_net)) * 100
    let marginPct = new Decimal(0);
    if (sumPriceNet.greaterThan(0)) {
      marginPct = sumPriceNet.minus(sumCostQty).div(sumPriceNet).mul(100);
    }
    
    let averageDiscountPct = new Decimal(0);
    if (sumPriceBaseQty.greaterThan(0)) {
      averageDiscountPct = sumPriceBaseQty.minus(sumPriceNet).div(sumPriceBaseQty).mul(100);
    }
    
// Inside src/qtn-module/services/pricing.service.ts -> at the very bottom of calculate()

return {
  items: calculatedItems,
  subtotal: +sumPriceNet.toFixed(2),
  taxTotal: +taxTotal.toFixed(2),
  discountGlobal: +discountGlobal.toFixed(2),
  chargeService: +chargeService.toFixed(2),
  grandTotal: +grandTotal.toFixed(2),
  marginPct: +marginPct.toFixed(2),
  averageDiscountPct: +averageDiscountPct.toFixed(2)
};
  }
}
