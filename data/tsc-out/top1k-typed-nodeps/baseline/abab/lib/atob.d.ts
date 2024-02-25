export = atob;
/**
 * Implementation of atob() according to the HTML and Infra specs, except that
 * instead of throwing INVALID_CHARACTER_ERR we return null.
 */
declare function atob(data: any, ...args: any[]): string;
