export type SuccessResult<S> = {
  readonly hasError: false;
  readonly successValue: S;
};

export type ErrorResult<E> = {
  readonly hasError: true;
  readonly errorValue: E;
};

export type Result<S, E = string> = SuccessResult<S> | ErrorResult<E>;

export function success<S>(value: S): SuccessResult<S> {
  return {
    hasError: false,
    successValue: value,
  };
}

export function failure<E = string>(error: E): ErrorResult<E> {
  return {
    hasError: true,
    errorValue: error,
  };
}
