type Report = number[];

/**
 * Returns true if `report` is strictly increasing with differences in [1..3].
 * E.g., [1,2,4,6] => diffs = [1,2,2] all in [1..3] => true
 */
function isStrictlyIncreasing(report: Report): boolean {
  // If fewer than 2 levels, can't check
  if (report.length < 2) return false;

  for (let i = 0; i < report.length - 1; i++) {
    const diff = report[i + 1] - report[i];
    // Must be in [1..3]
    if (diff < 1 || diff > 3) {
      return false;
    }
  }
  return true;
}

/**
 * Returns true if `report` is strictly decreasing with differences in [-3..-1].
 * E.g., [8,6,4,2] => diffs = [-2,-2,-2] all in [-3..-1] => true
 */
function isStrictlyDecreasing(report: Report): boolean {
  if (report.length < 2) return false;

  for (let i = 0; i < report.length - 1; i++) {
    const diff = report[i + 1] - report[i];
    // Must be in [-3..-1]
    if (diff > -1 || diff < -3) {
      return false;
    }
  }
  return true;
}

/**
 * Checks if `report` is safe (increasing OR decreasing) with NO removals.
 */
function isSafeNoRemoval(report: Report): boolean {
  // Edge case: if first two are equal, we can't determine inc or dec
  if (report.length >= 2 && report[0] === report[1]) {
    return false;
  }

  return isStrictlyIncreasing(report) || isStrictlyDecreasing(report);
}

/**
 * Checks if `report` can be made safe (increasing OR decreasing) by removing EXACTLY one element.
 * Strategy: try removing each element once, see if the resulting array is safe with no removal.
 */
function isSafeOneRemoval(report: Report): boolean {
  // If fewer than 2, can't check a trend
  if (report.length < 2) return false;

  for (let i = 0; i < report.length; i++) {
    // Remove element at index `i`
    const modified = [...report.slice(0, i), ...report.slice(i + 1)];

    if (isSafeNoRemoval(modified)) {
      return true; // Found a removal that yields a safe report
    }
  }

  return false;
}

/**
 * Checks if a report is safe by EITHER:
 * 1) Being strictly increasing or decreasing as-is (no removals),
 * 2) Or by removing exactly one level if a failure occurs (making it safe).
 *
 * Returns true if safe under either scenario, otherwise false.
 */
function checkReportSafetyDual(report: Report): boolean {
  // 1) Check if it's already safe (increasing or decreasing with no removals).
  if (isSafeNoRemoval(report)) {
    return true;
  }

  // 2) Otherwise, see if removing a single level anywhere makes it safe.
  if (isSafeOneRemoval(report)) {
    return true;
  }

  // 3) If neither condition is met, it's unsafe.
  return false;
}

export function part2(input: string): number {
  // Process input
  const lines = input.trim().split("\n");

  const reports: Report[] = [];
  for (let i = 0; i < lines.length; i++) {
    const strLevelVals = lines[i].split(" ");
    const levelVals = strLevelVals.map((strVal: string) => Number(strVal));

    reports.push(levelVals);
  }

  let safeReports = 0;
  for (let i = 0; i < reports.length; i++) {
    if (checkReportSafetyDual(reports[i])) {
      safeReports += 1;
    }
  }
  console.log("Number of safe reports are:", safeReports);

  //   console.log("reports after processing input are: ", reports);

  return safeReports;
}
