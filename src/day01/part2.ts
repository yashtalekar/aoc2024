class DefaultDict<K, V> {
  private map = new Map<K, V>();
  constructor(private defaultValue: () => V) {}

  get(key: K): V {
    if (!this.map.has(key)) {
      this.map.set(key, this.defaultValue());
    }
    return this.map.get(key)!;
  }

  set(key: K, value: V): void {
    this.map.set(key, value);
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  entries(): IterableIterator<[K, V]> {
    return this.map.entries();
  }
}

/**
 * Part 2 solution function
 * @param filePath - Full path to the day's input file
 */
export function part2(input: string): number {
  const lines = input.trim().split("\n");
  // Example logic: multiply all lines interpreted as numbers
  const list1: number[] = [];
  const list2: number[] = [];
  const pairs = lines.map((line) => line.split("   "));
  // console.log("pairs is: ", pairs);
  for (let i = 0; i < pairs.length; i++) {
    list1.push(Number(pairs[i][0]));
    list2.push(Number(pairs[i][1]));
  }

  const rightListOccurrences = new DefaultDict<number, number>(() => 0);

  for (let i = 0; i < list2.length; i++) {
    const currenctOccurrences = rightListOccurrences.get(list2[i]);
    rightListOccurrences.set(list2[i], currenctOccurrences + 1);
  }

  return list1.reduce((sum, num) => sum + num * rightListOccurrences.get(num), 0);
}
