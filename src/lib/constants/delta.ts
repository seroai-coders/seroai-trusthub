export const findDelta = <T extends { id: string }>(
  arr1: T[] = [],
  arr2: T[] = [],
) => ({
  create: arr2.filter((i) => !arr1.find(({ id }) => id === i.id)),
  delete: arr1.filter((i) => !arr2.find(({ id }) => id === i.id)),
  update: arr2.filter((i) => arr1.find(({ id }) => id === i.id)),
});
