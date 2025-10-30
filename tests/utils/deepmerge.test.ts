import { describe, expect, it } from 'vitest';
import { deepMerge } from '../../src/utils';

describe('#deepMerge', () => {
  it('merges two objects', () => {
    const object = deepMerge({ id: 'i-1234567890abcdef0' }, { id: 'i-0987654321fedcba0' });

    expect(object).toEqual({ id: 'i-0987654321fedcba0' });
  });

  it('deep merges two objects', () => {
    const object = deepMerge<{ nested: { key1?: string; key2?: string; key3?: string } }>(
      {
        nested: {
          key1: 'value1',
          key2: 'value2',
        },
      },
      {
        nested: {
          key2: 'newValue2',
          key3: 'value3',
        },
      }
    );

    expect(object).toEqual({
      nested: {
        key1: 'value1',
        key2: 'newValue2',
        key3: 'value3',
      },
    });
  });

  it('overwrites specified keys instead of deep merging them', () => {
    const object = deepMerge<{ nested: { key1?: string; key2?: string; key3?: string } }>(
      {
        nested: {
          key1: 'value1',
          key2: 'value2',
        },
      },
      {
        nested: {
          key2: 'newValue2',
          key3: 'value3',
        },
      },
      {
        overwriteKeys: ['nested'],
      }
    );

    expect(object).toEqual({
      nested: {
        key2: 'newValue2',
        key3: 'value3',
      },
    });
  });

  it('overwrites arrays instead of merging them', () => {
    const object = deepMerge<{ arr: string[] }>(
      {
        arr: ['value1', 'value2'],
      },
      {
        arr: ['newValue1', 'newValue2'],
      }
    );

    expect(object).toEqual({
      arr: ['newValue1', 'newValue2'],
    });
  });
});
