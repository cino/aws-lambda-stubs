import { describe, expect, it } from 'vitest';
import { randomInstanceId, randomIpAddress } from '../../src';
import { ipv4Regex, ipv6Regex } from '../helpers';

describe('#utils', () => {
  describe('randomIpAddress', () => {
    it('should ensure the default is IPv4', () => {
      const ip = randomIpAddress();

      expect(ip).toMatch(ipv4Regex);
    });

    it('should generate a valid IPv4 address', () => {
      const ip = randomIpAddress('ipv4');

      expect(ip).toMatch(ipv4Regex);
    });

    it('should generate a valid IPv6 address', () => {
      const ip = randomIpAddress('ipv6');

      expect(ip).toMatch(ipv6Regex);
    });
  });

  describe('randomInstanceId', () => {
    it('should generate a valid EC2 Instance ID', () => {
      const instanceId = randomInstanceId();

      expect(instanceId).toMatch(/^i-[0-9a-f]{16}$/);
    });
  });
});
