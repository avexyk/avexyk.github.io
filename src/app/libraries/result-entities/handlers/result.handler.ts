import { Result } from '../models/result.model';

export function handleResult<S, E, R = void>(
  result: Result<S, E>,
  whenIsSuccess: (value: S) => R,
  whenHasError: (error: E) => R
): R {
  if (result.hasError) {
    return whenHasError(result.errorValue);
  }
  return whenIsSuccess(result.successValue);
}
