export const ipv4Regex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
export const ipv6Regex = /^[0-9a-fA-F]{1,4}(:[0-9a-fA-F]{1,4}){7}$/;
export const ipRegex = new RegExp(`${ipv4Regex.source}|${ipv6Regex.source}`);
