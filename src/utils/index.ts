export function isEmailValidRFC822(email: string): boolean {
  if (typeof email !== "string") {
    return false;
  }
  const regex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  // We do the matching with lower cases because the regex only contains lower cases
  return Boolean(email.toLowerCase().match(regex));
}
