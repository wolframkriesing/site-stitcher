/**
 * @param p1 {import('./Tidbit').Tidbit}
 * @param p2 {import('./Tidbit').Tidbit}
 * @return {number}
 */
export const sortByDateCreatedDescending = (p1, p2) => p1.dateCreated > p2.dateCreated ? -1 : 1;
