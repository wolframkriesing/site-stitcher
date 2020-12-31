/**
 * @typedef {import('./Tidbit').Tidbit} Tidbit
 */

/**
 * @param p1 {Tidbit}
 * @param p2 {Tidbit}
 * @return {number}
 */
export const sortByDateCreatedDescending = (p1, p2) => p1.dateCreated > p2.dateCreated ? -1 : 1;
