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
  public searchEightDirections(x: number, y: number, searchString: string): number {
    // Define the 8 possible directions as [dx, dy]
    const directions: [number, number][] = [
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
  public countAllOccurrences(searchString: string): number {
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
  #searchDirection(startX: number, startY: number, dx: number, dy: number, searchString: string): boolean {
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

  /**
   * Check if 'searchString' (of odd length) appears in an "X" shape
   * with its MIDDLE character at (x, y).
   *
   * X shape definition (length = 2n+1):
   *   - NW–SE diagonal (one diagonal) must match in EITHER normal OR reversed order.
   *   - NE–SW diagonal (the other diagonal) must also match in EITHER normal OR reversed order.
   */
  public searchX(x: number, y: number, searchString: string): boolean {
    // Must be an odd-length string to have a "middle"
    if (searchString.length % 2 === 0) return false;
    const length = searchString.length;
    const mid = Math.floor(length / 2);

    // Check NW–SE in either orientation
    const nwseNormal = this.#checkDiagonalNWSE(x, y, searchString, false);
    const nwseReverse = this.#checkDiagonalNWSE(x, y, searchString, true);
    const nwseOK = nwseNormal || nwseReverse;

    // Check NE–SW in either orientation
    const neswNormal = this.#checkDiagonalNESW(x, y, searchString, false);
    const neswReverse = this.#checkDiagonalNESW(x, y, searchString, true);
    const neswOK = neswNormal || neswReverse;

    return nwseOK && neswOK;
  }

  /**
   * Count how many times 'searchString' appears
   * in X shape ANYWHERE in the grid (with either diagonal orientation).
   */
  public countTotalX(searchString: string): number {
    let total = 0;
    for (let y = 0; y < this.rows.length; y++) {
      for (let x = 0; x < this.rows[y].length; x++) {
        if (this.searchX(x, y, searchString)) {
          total++;
        }
      }
    }
    return total;
  }

  /**
   * Private helper to check NW–SE diagonal (top-left to bottom-right).
   * If reversed is false: we match searchString in normal order.
   * If reversed is true: we match searchString in reverse order.
   *
   * Middle of searchString is at (x, y).
   */
  #checkDiagonalNWSE(x: number, y: number, searchString: string, reversed: boolean): boolean {
    const len = searchString.length;
    const mid = Math.floor(len / 2);

    for (let i = 0; i < len; i++) {
      const row = y - mid + i; // NW to SE, going "down-right"
      const col = x - mid + i;

      if (!this.#inBounds(row, col)) {
        return false;
      }

      const targetChar = reversed ? searchString[len - 1 - i] : searchString[i];

      if (this.rows[row][col] !== targetChar) {
        return false;
      }
    }
    return true;
  }

  /**
   * Private helper to check NE–SW diagonal (top-right to bottom-left).
   * If reversed is false: we match searchString in normal order.
   * If reversed is true: we match searchString in reverse order.
   *
   * Middle of searchString is at (x, y).
   */
  #checkDiagonalNESW(x: number, y: number, searchString: string, reversed: boolean): boolean {
    const len = searchString.length;
    const mid = Math.floor(len / 2);

    for (let i = 0; i < len; i++) {
      const row = y - mid + i; // NE to SW, going "down-left"
      const col = x + mid - i;

      if (!this.#inBounds(row, col)) {
        return false;
      }

      const targetChar = reversed ? searchString[len - 1 - i] : searchString[i];

      if (this.rows[row][col] !== targetChar) {
        return false;
      }
    }
    return true;
  }

  /**
   * Private helper to ensure (row, col) is within the grid.
   */
  #inBounds(row: number, col: number): boolean {
    if (row < 0 || row >= this.rows.length) return false;
    if (col < 0 || col >= this.rows[row].length) return false;
    return true;
  }
}

// Example exported function:
export function part2(input: string): number {
  const grid = new Grid(input);
  return grid.countTotalX("MAS");
}
