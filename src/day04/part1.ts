class Grid {
  rows: string[];
  constructor(multilineString: string) {
    // Split the string by newlines to get each row as a string
    this.rows = multilineString.split("\n");
  }

  /**
   * Count how many times 'searchString' appears in ALL 8 directions
   * from the single coordinate (x, y).
   *
   * Returns an integer (0-8).
   */
  searchEightDirections(x: number, y: number, searchString: string) {
    // Define the 8 possible directions as [dx, dy]
    const directions = [
      [0, 1], // Right
      [0, -1], // Left
      [1, 0], // Down
      [-1, 0], // Up
      [1, 1], // Down-Right
      [1, -1], // Down-Left
      [-1, 1], // Up-Right
      [-1, -1], // Up-Left
    ];

    let count = 0;

    for (const [dx, dy] of directions) {
      // If we find a match in this direction, increment count
      if (this.#searchDirection(x, y, dx, dy, searchString)) {
        count++;
      }
    }

    return count;
  }

  /**
   * Scan the ENTIRE grid, counting how many times 'searchString'
   * appears in any of the 8 directions from every (x, y).
   *
   * Returns a total integer count.
   */
  countAllOccurrences(searchString: string) {
    let totalCount = 0;

    for (let y = 0; y < this.rows.length; y++) {
      // Each row is a string, so length is the number of columns
      for (let x = 0; x < this.rows[y].length; x++) {
        // Count occurrences from (x, y) in all directions
        totalCount += this.searchEightDirections(x, y, searchString);
      }
    }

    return totalCount;
  }

  /**
   * Private helper method (ES2022+ private method syntax).
   * Searches in one direction (dx, dy) from (startX, startY).
   * If we can match *every character* of 'searchString' in that direction,
   * we return true. Otherwise, false.
   */
  #searchDirection(startX: number, startY: number, dx: number, dy: number, searchString: string) {
    for (let i = 0; i < searchString.length; i++) {
      const currentX = startX + i * dx;
      const currentY = startY + i * dy;

      // Check bounds
      if (currentY < 0 || currentY >= this.rows.length) return false;
      if (currentX < 0 || currentX >= this.rows[currentY].length) return false;

      // Check if character matches
      if (this.rows[currentY][currentX] !== searchString[i]) {
        return false;
      }
    }
    return true;
  }
}

export function part1(input: string): number {
  const grid = new Grid(input);
  const totalXmasOccurrences = grid.countAllOccurrences("XMAS");

  return totalXmasOccurrences;
}
