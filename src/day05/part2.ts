export function part2(input: string): number {
  // LLM code.
  // Split and trim the input lines
  const lines = input
    .trim()
    .split("\n")
    .map((line) => line.trim());

  // Find the blank line separating rules from updates
  const blankLineIndex = lines.indexOf("");
  if (blankLineIndex < 0) {
    throw new Error("Input missing blank line between rules and updates.");
  }

  // Lines up to the blank line are rules: X|Y
  const ruleLines = lines.slice(0, blankLineIndex);

  // Lines after the blank line are updates: comma-separated page numbers
  const updateLines = lines.slice(blankLineIndex + 1);

  // Parse rules: each is "X|Y"
  const rules: Array<[number, number]> = [];
  for (const line of ruleLines) {
    const [left, right] = line.split("|").map(Number);
    rules.push([left, right]);
  }

  // Helper to check if an update is already in correct order
  function isCorrectlyOrdered(pages: number[]): boolean {
    for (const [x, y] of rules) {
      // Only consider a rule if both pages are present
      if (pages.includes(x) && pages.includes(y)) {
        // If x appears after y, rule is violated
        if (pages.indexOf(x) > pages.indexOf(y)) {
          return false;
        }
      }
    }
    return true;
  }

  // Helper to reorder an update using topological sort
  function reorder(pages: number[]): number[] {
    // We only care about constraints among pages actually in this update.
    // Build adjacency + indegree for these pages.
    const adjacency: Map<number, number[]> = new Map();
    const indegree: Map<number, number> = new Map();

    // Initialize adjacency and indegree for pages in this update
    for (const page of pages) {
      adjacency.set(page, []);
      indegree.set(page, 0);
    }

    // Fill adjacency and update indegree based on rules that apply
    for (const [x, y] of rules) {
      if (adjacency.has(x) && adjacency.has(y)) {
        // x -> y
        adjacency.get(x)!.push(y);
        // indegree[y]++
        indegree.set(y, (indegree.get(y) ?? 0) + 1);
      }
    }

    // Kahn's Algorithm for topological sort
    const queue: number[] = [];
    // Start with all pages that have indegree 0
    for (const [page, deg] of indegree.entries()) {
      if (deg === 0) {
        queue.push(page);
      }
    }

    const sorted: number[] = [];
    while (queue.length > 0) {
      const node = queue.shift()!;
      sorted.push(node);

      // Decrease indegree of neighbors
      for (const neighbor of adjacency.get(node) ?? []) {
        indegree.set(neighbor, (indegree.get(neighbor) ?? 1) - 1);
        if (indegree.get(neighbor) === 0) {
          queue.push(neighbor);
        }
      }
    }

    // If sorted.length < pages.length, there's a cycle (unlikely in valid puzzle input).
    // But we assume rules won't create a cycle for pages in a single update.
    return sorted;
  }

  let sumOfMiddles = 0;

  // Process each update
  for (const line of updateLines) {
    const pages = line.split(",").map(Number);

    // Check if this update is already correct
    if (!isCorrectlyOrdered(pages)) {
      // Reorder it (topological sort)
      const correctOrder = reorder(pages);

      // Find the middle index
      const middleIndex = Math.floor(correctOrder.length / 2);
      sumOfMiddles += correctOrder[middleIndex];
    }
  }

  return sumOfMiddles;
}
