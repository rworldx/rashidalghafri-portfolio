/**
 * Whole years lived since an ISO birth date.
 *
 * The About page used to carry the age as a written number, which is a
 * statement that goes false once a year on a day nobody is thinking about
 * the website. Deriving it means the copy is correct on any build made
 * after the birthday, with nothing to remember.
 *
 * `today` is injectable for tests; the boundary (the day before a birthday
 * versus the day of it) is exactly the kind of thing worth pinning.
 */
export function ageFrom(birthDate: string, today: Date = new Date()): number {
  const [y, m, d] = birthDate.split('-').map(Number) as [number, number, number];
  let age = today.getUTCFullYear() - y;
  const birthdayPassed =
    today.getUTCMonth() + 1 > m || (today.getUTCMonth() + 1 === m && today.getUTCDate() >= d);
  if (!birthdayPassed) age -= 1;
  return age;
}
