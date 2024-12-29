import { phoneIsValid, digestPhone, formatPhone, createRangeLabel } from './string';

describe('lib/string', () => {
  describe('phoneIsValid', () => {
    it('should be validate correctly', () => {
      expect(phoneIsValid('79951120767')).toBe(true);
      expect(phoneIsValid('89951120767')).toBe(true);
      expect(phoneIsValid('9951120767')).toBe(true);
      expect(phoneIsValid('995112076')).toBe(false);
      expect(phoneIsValid('7895768654')).toBe(false);
      expect(phoneIsValid('7995112076')).toBe(false);
      expect(phoneIsValid('7995112')).toBe(false);
    });
  });

  describe('digestPhone', () => {
    it('should be replace non number chars', () => {
      expect(digestPhone('+7 995 112-07-67')).toBe('79951120767');
    });
  });

  describe('formatPhone', () => {
    it('should be format digest phone number', () => {
      expect(formatPhone('79951120767')).toBe('+7 995 112 07 67');
    });
  });

  describe('createRangeLabel', () => {
    it('should be format price label', () => {
      expect(createRangeLabel({ title: 'range', selectedRange: {}, maxRange: {} })).toBe('range');
      expect(createRangeLabel({ title: 'range', selectedRange: { min: '100000', max: '500000' }, maxRange: {} })).toBe(
        '1 000 ₽ - 5 000 ₽',
      );
      expect(createRangeLabel({ title: 'range', selectedRange: { min: '100000', max: '100000' }, maxRange: {} })).toBe(
        '1 000 ₽',
      );
      expect(
        createRangeLabel({
          title: 'range',
          selectedRange: { min: '100000', max: '400000' },
          maxRange: { max: '500000', min: '100000' },
        }),
      ).toBe('до 4 000 ₽');
      expect(
        createRangeLabel({
          title: 'range',
          selectedRange: { min: '200000', max: '500000' },
          maxRange: { max: '500000', min: '100000' },
        }),
      ).toBe('от 2 000 ₽');
    });
  });
});
