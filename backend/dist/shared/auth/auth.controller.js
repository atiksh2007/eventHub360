"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const public_decorator_1 = require("./public.decorator");
let AuthController = class AuthController {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    getDevToken(role = 'sales_exec') {
        const payload = {
            userId: 1,
            email: 'alex@eventhub360.com',
            role,
            company_id: 'default-tenant-hub',
            tenant_id: 'default-tenant-hub',
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('token'),
    __param(0, (0, common_1.Query)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getDevToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('dev'),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map