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
    calculate(items, discountGlobalVal = 0, chargeServiceVal = 0) {
        let sumPriceNet = new decimal_js_1.default(0);
        let sumCostQty = new decimal_js_1.default(0);
        let sumPriceBaseQty = new decimal_js_1.default(0);
        let taxTotal = new decimal_js_1.default(0);
        const calculatedItems = items.map(item => {
            const quantity = new decimal_js_1.default(item.quantity || 0);
            const costUnit = new decimal_js_1.default(item.costUnit || 0);
            const markupPct = new decimal_js_1.default(item.markupPct || 0);
            const discountLinePct = new decimal_js_1.default(item.discountLinePct || 0);
            const taxRatePct = new decimal_js_1.default(item.taxRatePct || 0);
            const markupMultiplier = new decimal_js_1.default(1).plus(markupPct.div(100));
            const priceBase = costUnit.mul(markupMultiplier);
            const discountMultiplier = new decimal_js_1.default(1).minus(discountLinePct.div(100));
            const priceNet = priceBase.mul(quantity).mul(discountMultiplier);
            let cgstRate = new decimal_js_1.default(0);
            let sgstRate = new decimal_js_1.default(0);
            let igstRate = new decimal_js_1.default(0);
            if (item.cgstRatePct !== undefined || item.sgstRatePct !== undefined || item.igstRatePct !== undefined) {
                cgstRate = new decimal_js_1.default(item.cgstRatePct || 0);
                sgstRate = new decimal_js_1.default(item.sgstRatePct || 0);
                igstRate = new decimal_js_1.default(item.igstRatePct || 0);
            }
            else {
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
        const discountGlobal = new decimal_js_1.default(discountGlobalVal);
        const chargeService = new decimal_js_1.default(chargeServiceVal);
        const grandTotal = sumPriceNet.minus(discountGlobal).plus(taxTotal).plus(chargeService);
        let marginPct = new decimal_js_1.default(0);
        if (sumPriceNet.greaterThan(0)) {
            marginPct = sumPriceNet.minus(sumCostQty).div(sumPriceNet).mul(100);
        }
        let averageDiscountPct = new decimal_js_1.default(0);
        if (sumPriceBaseQty.greaterThan(0)) {
            averageDiscountPct = sumPriceBaseQty.minus(sumPriceNet).div(sumPriceBaseQty).mul(100);
        }
        return {
            items: calculatedItems,
            subtotal: sumPriceNet.toNumber(),
            taxTotal: taxTotal.toNumber(),
            discountGlobal: discountGlobal.toNumber(),
            chargeService: chargeService.toNumber(),
            grandTotal: grandTotal.toNumber(),
            marginPct: marginPct.toNumber(),
            averageDiscountPct: averageDiscountPct.toNumber()
        };
    }
};
exports.PricingService = PricingService;
exports.PricingService = PricingService = __decorate([
    (0, common_1.Injectable)()
], PricingService);
//# sourceMappingURL=pricing.service.js.map