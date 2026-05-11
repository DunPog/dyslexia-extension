export function buildStyleString<T extends Record<string, (value: any) => string | undefined>>(
  dict: T,
  values: { [K in keyof T]?: Parameters<T[K]>[0] }
) {
  return (Object.entries(dict) as [keyof T, T[keyof T]][])
    .flatMap(([key, fn]) => {
      const value = values[key];

      if (value === undefined) return [];

      const result = fn(value);
      return result ? [result] : [];
    })
    .join(';\n') + (Object.keys(values).length ? ';' : '');
}