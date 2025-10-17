import { randomIpAddress } from 'src/common';
import { ipv4Regex, ipv6Regex } from 'tests/helpers';
import { describe, expect, it } from 'vitest';

describe('#utils', () => {
  describe('randomIpAddress', () => {
    it('should generate a valid IPv4 address', () => {
      const ip = randomIpAddress('ipv4');

      expect(ip).toMatch(ipv4Regex);
    });

    it('should generate a valid IPv6 address', () => {
      const ip = randomIpAddress('ipv6');

      expect(ip).toMatch(ipv6Regex);
    });
  });
});
