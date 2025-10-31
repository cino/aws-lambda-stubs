interface deepMergeOptions {
  overwriteKeys?: string[];
}

export const deepMerge = <T extends object>(target: T, source: Partial<T>, options: deepMergeOptions = {}): T => {
  const result = { ...target };

  for (const key in source) {
    const sourceValue = source[key];
    const targetValue = result[key];

    if (sourceValue !== undefined) {
      if (
        typeof sourceValue === 'object' &&
        sourceValue !== null &&
        typeof targetValue === 'object' &&
        targetValue !== null &&
        !Array.isArray(sourceValue) &&
        !Array.isArray(targetValue) &&
        !(options.overwriteKeys?.includes(key))
      ) {
        result[key] = deepMerge(targetValue, sourceValue, options);
      } else {
        result[key] = sourceValue as T[Extract<keyof T, string>];
      }
    }
  }

  return result;
};
