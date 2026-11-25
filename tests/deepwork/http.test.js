import { test } from 'node:test';
import assert from 'node:assert/strict';
import { throttleKey } from '../../server/deepwork/http.js';

test('an IPv4 address is counted on its own', () => {
  assert.equal(throttleKey('203.0.113.7'), '203.0.113.7');
  assert.equal(throttleKey('unknown'), 'unknown');
});

test('an IPv4 address wrapped in IPv6 form is counted as the IPv4 address', () => {
  assert.equal(throttleKey('::ffff:203.0.113.7'), '203.0.113.7');
});

test('IPv6 addresses in one /64 network share a key, however they are written', () => {
  const key = throttleKey('2001:db8:1:2::1');

  assert.equal(key, '2001:db8:1:2::/64');
  assert.equal(throttleKey('2001:0DB8:0001:0002:ffff:0:0:9'), key);
  assert.equal(throttleKey('2001:db8:1:2:aaaa:bbbb:cccc:dddd'), key);
});

test('IPv6 addresses in different networks get different keys', () => {
  assert.notEqual(throttleKey('2001:db8:1:3::1'), throttleKey('2001:db8:1:2::1'));
  assert.equal(throttleKey('::1'), '0:0:0:0::/64');
});
