const logMethodConsoleStyles =
  "color: #000; font-size: 11px; background: #9e9e9e; padding: 3px 5px;";

export function LogMethod(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<any>
): TypedPropertyDescriptor<any> | void {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    console.debug(
      `%c[${target.constructor.name}.${String(
        propertyKey
      )}] Calling before with arguments:`,
      logMethodConsoleStyles,
      args
    );
    const result = await Promise.resolve(originalMethod.apply(this, args));
    console.debug(
      `%c[${target.constructor.name}.${String(propertyKey)}] Result`,
      logMethodConsoleStyles,
      result
    );
    return result;
  };

  return descriptor;
}
