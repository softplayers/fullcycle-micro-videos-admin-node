"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const domain_1 = require("@fc/micro-videos/category/domain");
async function bootstrap() {
    const category = new domain_1.Category({ name: 'Teste' });
    console.log('#######', category);
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map