import { ErrorHandlerService } from '@error-handler/error-handler.service';
import { Logger, Module } from '@nestjs/common';

@Module({
  providers: [ErrorHandlerService, Logger],
  exports: [ErrorHandlerService],
})
export class ErrorHandlerModule {}
