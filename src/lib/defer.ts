export type Defer<R> = {
  req: Promise<R>;
  rs: (data: R) => void;
  rj: (error: unknown) => void;
};

export function createDefer<R>() {
  const defer: Partial<Defer<R>> = {};

  defer.req = new Promise((rs, rj) => {
    defer.rs = rs;
    defer.rj = rj;
  });

  return defer as Defer<R>;
}
