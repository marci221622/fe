import { uniq } from './uniq';

describe('uniq', () => {
  it('should convert correctly', () => {
    expect(uniq('ce307ab0-8892-4fc4-bfd7-e440f8ed0987')).toBe('ce307ab0-8892-4fc4-bfd7-e440dda83fef');
    expect(uniq('45c987d0-b1b5-4a28-95bb-e641482af062')).toBe('45c987d0-b1b5-4a28-95bb-e6d63889da62');
    expect(uniq('0791039d-bbee-4a95-ad9f-7d4045b37f28')).toBe('0791039d-bbee-4a95-ad9f-0d4472b97f28');
  });
});
