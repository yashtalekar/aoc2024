type Report = number[];

function checkReportSafety(report: Report): boolean {
  // Edge case where neither increasing or decreasing.
  if (report[0] == report[1]) {
    return false;
  }

  // First check whether it is a increasing or decreasing report by looking at the first and second values.
  // trend is true if increasing, else false for decreasing
  let trend;
  if (report[1] - report[0] > 0) {
    trend = true;
  } else {
    trend = false;
  }

  for (let i = 0; i < report.length - 1; i++) {
    // for increasing.
    if (trend) {
      if (report[i + 1] - report[i] <= 3 && report[i + 1] - report[i] >= 1) {
        continue;
      } else {
        return false;
      }
    } else {
      // for decreasing
      if (report[i] - report[i + 1] <= 3 && report[i] - report[i + 1] >= 1) {
        continue;
      } else {
        return false;
      }
    }
  }

  return true;
}

export function part1(input: string): number {
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
    if (checkReportSafety(reports[i])) {
      safeReports += 1;
    }
  }
  console.log("Number of safe reports are:", safeReports);

  //   console.log("reports after processing input are: ", reports);

  return safeReports;
}
