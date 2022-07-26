export function sumPairs(ints: number[], s: number): [number, number] | void {
  const exSet = new Set();
  exSet.add(ints[0]);
  for (let i = 1; i < ints.length; i++) {
    const valNeeded = s - ints[i];
    if (exSet.has(valNeeded)) {
      return [valNeeded, ints[i]];
    }
    exSet.add(ints[i]);
  }
  return undefined // your code here...
}
