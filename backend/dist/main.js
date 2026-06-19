"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const logger = new common_1.Logger('EventHub360-Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true
    }));
    app.setGlobalPrefix('api/v1');
    const port = process.env.PORT || 3000;
    await app.listen(port);
    logger.log(`🚀 QTN Backend Engine running locally at http://localhost:${port}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map