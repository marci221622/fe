export function getSpaLocation() {
  if (typeof window !== 'undefined') {
    return `${window.location.pathname}${window.location.search}`;
  }

  return '';
}

export function prepareToGTM(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(prepareToGTM);
  }

  if (typeof obj === 'string') {
    return obj;
  }

  if (typeof obj === 'number') {
    return String(obj);
  }

  return Object.keys(obj).reduce((acc, key) => {
    switch (typeof obj[key]) {
      case 'boolean': {
        acc[key] = obj[key] ? '1' : '0';
        break;
      }

      case 'number': {
        acc[key] = String(obj[key]);
        break;
      }

      case 'object': {
        acc[key] = prepareToGTM(obj[key]);

        break;
      }

      case 'undefined': {
        break;
      }

      default: {
        acc[key] = obj[key];
      }
    }

    return acc;
  }, {} as Record<string, any>);
}
