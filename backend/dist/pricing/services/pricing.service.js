"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingService = void 0;
const common_1 = require("@nestjs/common");
const decimal_js_1 = require("decimal.js");
let PricingService = class PricingService {
    calculate(items = [], discountGlobalVal = 0, chargeServiceVal = 0) {
        let sumPriceNet = new decimal_js_1.Decimal(0);
        let sumCostQty = new decimal_js_1.Decimal(0);
        let sumPriceBaseQty = new decimal_js_1.Decimal(0);
        let taxTotal = new decimal_js_1.Decimal(0);
        const calculatedItems = items.map((item) => {
            const quantity = new decimal_js_1.Decimal(item.quantity || 0);
            const costUnit = new decimal_js_1.Decimal(item.costUnit || 0);
            const markupPct = new decimal_js_1.Decimal(item.markupPct || 0);
            const discountLinePct = new decimal_js_1.Decimal(item.discountLinePct || 0);
            const taxRatePct = new decimal_js_1.Decimal(item.taxRatePct || 0);
            const priceBase = costUnit.mul(new decimal_js_1.Decimal(1).plus(markupPct.div(100)));
            const priceNet = priceBase.mul(quantity).mul(new decimal_js_1.Decimal(1).minus(discountLinePct.div(100)));
            let cgstRate;
            let sgstRate;
            let igstRate;
            if (item.cgstRatePct !== undefined || item.sgstRatePct !== undefined || item.igstRatePct !== undefined) {
                cgstRate = new decimal_js_1.Decimal(item.cgstRatePct || 0);
                sgstRate = new decimal_js_1.Decimal(item.sgstRatePct || 0);
                igstRate = new decimal_js_1.Decimal(item.igstRatePct || 0);
            }
            else {
                cgstRate = taxRatePct.div(2);
                sgstRate = taxRatePct.div(2);
                igstRate = new decimal_js_1.Decimal(0);
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
                description: item.description || '',
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
        const discountGlobal = new decimal_js_1.Decimal(discountGlobalVal);
        const chargeService = new decimal_js_1.Decimal(chargeServiceVal);
        const grandTotal = sumPriceNet.minus(discountGlobal).plus(taxTotal).plus(chargeService);
        const marginPct = sumPriceNet.gt(0)
            ? sumPriceNet.minus(sumCostQty).div(sumPriceNet).mul(100)
            : new decimal_js_1.Decimal(0);
        const averageDiscountPct = sumPriceBaseQty.gt(0)
            ? sumPriceBaseQty.minus(sumPriceNet).div(sumPriceBaseQty).mul(100)
            : new decimal_js_1.Decimal(0);
        return {
            items: calculatedItems,
            subtotal: sumPriceNet.toDecimalPlaces(2).toNumber(),
            taxTotal: taxTotal.toDecimalPlaces(2).toNumber(),
            discountGlobal: discountGlobal.toDecimalPlaces(2).toNumber(),
            chargeService: chargeService.toDecimalPlaces(2).toNumber(),
            grandTotal: grandTotal.toDecimalPlaces(2).toNumber(),
            marginPct: marginPct.toDecimalPlaces(2).toNumber(),
            averageDiscountPct: averageDiscountPct.toDecimalPlaces(2).toNumber(),
        };
    }
};
exports.PricingService = PricingService;
exports.PricingService = PricingService = __decorate([
    (0, common_1.Injectable)()
], PricingService);
//# sourceMappingURL=pricing.service.js.map