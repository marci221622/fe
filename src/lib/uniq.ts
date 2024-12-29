import { parse, stringify } from 'uuid';

export function uniq(id: string) {
  const bytes = parse(id);
  const checksum = [];
  const offset = (+`0x${bytes[9]}` % 3) + 10;

  for (let i = 0; i < 4; i++) {
    checksum.push(bytes[i] ^ (bytes[7 - i] ^ bytes[9]));
  }

  for (let i = 0; i < checksum.length; i++) {
    bytes[i + offset] = checksum[i];
  }

  return stringify(bytes);
}
