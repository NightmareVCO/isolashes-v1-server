import { ErrorHandlerService } from '@error-handler/error-handler.service';
import { Inject } from '@nestjs/common';

export function HandleError() {
  const injectErrorHandlerService = Inject(ErrorHandlerService);

  return (
    target: any,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor,
  ) => {
    injectErrorHandlerService(target, 'errorHandlerService');
    const originalMethod = propertyDescriptor.value;

    propertyDescriptor.value = async function (...arguments_: any[]) {
      try {
        return await originalMethod.apply(this, arguments_);
      } catch (error) {
        if (error instanceof Error) {
          const errorHandlerService: ErrorHandlerService =
            this.errorHandlerService;
          errorHandlerService.handle(error);
        }
      }
    };
  };
}
