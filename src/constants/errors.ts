export class RedirectError {
  to: string;

  constructor(to: string) {
    this.to = to;
  }

  toJSON() {
    return {
      to: this.to,
      type: 'RedirectError',
    };
  }
}
