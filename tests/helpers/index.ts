export const ipv4Regex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
export const ipv6Regex = /^[0-9a-fA-F]{1,4}(:[0-9a-fA-F]{1,4}){7}$/;
export const ipRegex = new RegExp(`${ipv4Regex.source}|${ipv6Regex.source}`);

export const instanceIdRegex = /^i-[0-9a-fA-F]{16}$/;

export const isUuidV4Regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
