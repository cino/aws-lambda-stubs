export const ipv4Regex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
export const ipv6Regex = /^[0-9a-fA-F]{1,4}(:[0-9a-fA-F]{1,4}){7}$/;
export const ipRegex = new RegExp(`${ipv4Regex.source}|${ipv6Regex.source}`);

export const instanceIdRegex = /^i-[0-9a-fA-F]{16}$/;

export const uuidv1Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export const uuidV4Regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

// Dates
export const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;
export const clfDateRegex = /^\d{2}\/\w{3}\/\d{4}:\d{2}:\d{2}:\d{2} \+\d{4}$/;
export const javaLoggingTimeStampFormatRegex =
  /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{1,2}),\s+(\d{4})\s+(\d{1,2}):(\d{2}):(\d{2})\s+(AM|PM)$/;

export const epochTimeRegex = /^\d{10,13}$/;

export const userAgentRegex = /\(.*?\)(\s|$)|.*?\/.*?(\s|$)/;
