import { Inject, Logger } from '@nestjs/common';

export function LogResponse() {
  const injectLogger = Inject(Logger);

  return (
    target: any,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor,
  ) => {
    injectLogger(target, 'logger');
    const originalMethod = propertyDescriptor.value;

    propertyDescriptor.value = async function (...arguments_: any[]) {
      const result = await originalMethod.apply(this, arguments_);
      const logger: Logger = this.logger;
      logger.log(
        `[${target.constructor.name} - ${propertyKey}] Response:`,
        result,
      );
      return result;
    };

    return propertyDescriptor;
  };
}
