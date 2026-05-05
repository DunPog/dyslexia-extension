export function buildStyleString<T extends Record<string, (value: any) => string>>(
  dict: T,
  values: { [K in keyof T]: Parameters<T[K]>[0] }
) {
  return (Object.entries(dict) as [keyof T, T[keyof T]][])
    .map(([key, fn]) => fn(values[key]))
    .join(';\n') + ';'
}