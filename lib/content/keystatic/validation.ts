/**
 * Note that validation assumes `isRequired: true`.
 *
 * @see https://github.com/Thinkmill/keystatic/issues/1261
 */

export const email = { regex: /.+?@.+?/, message: "Must be a valid email address." };
