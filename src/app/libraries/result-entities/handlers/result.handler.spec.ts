import { describe, expect, it } from 'vitest';
import { failure, handleResult, success } from '../index';

describe('result.handler', () => {
  it('invoca whenIsSuccess cuando el resultado es exitoso', () => {
    const result = success(42);
    const output = handleResult(
      result,
      (val) => `ok:${val}`,
      (err) => `err:${err}`
    );
    expect(output).toBe('ok:42');
  });

  it('invoca whenHasError cuando el resultado contiene error', () => {
    const result = failure('fallo');
    const output = handleResult(
      result,
      (val) => `ok:${val}`,
      (err) => `err:${err}`
    );
    expect(output).toBe('err:fallo');
  });
});
