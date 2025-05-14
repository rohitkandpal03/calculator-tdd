export const add = (numbers: string): number => {
  if (numbers === "") {
    return 0;
  }

  let delimiter = ",";
  let numbersString: string = numbers
    .replace(/\\n/g, "\n")
    .replace(/\\\\/g, "\\");

  if (numbers.startsWith("//")) {
    const newLineIndex = numbersString.indexOf("\n");
    if (newLineIndex !== -1) {
      const header = numbersString.substring(0, newLineIndex); // Full line e.g. "//[***]" or "//;"
      const potentialNumbers = numbersString.substring(newLineIndex + 1);

      if (header.startsWith("//[") && header.endsWith("]")) {
        const customDelimiter = header.substring(3, header.length - 1);
        if (customDelimiter) {
          // Delimiter must not be empty
          delimiter = customDelimiter;
          numbersString = potentialNumbers;
        } else {
          // Case: "//[]\n" - numbers start after \n, default delimiter.
          numbersString = potentialNumbers;
        }
      } else if (header.startsWith("//") && header.length > 2) {
        // Old format like "//;\n" or potentially "//***\n"
        // Takes whatever is between "//" and "\n" as delimiter
        const customDelimiter = header.substring(2);
        if (customDelimiter) {
          // Delimiter must not be empty
          delimiter = customDelimiter;
          numbersString = potentialNumbers;
        } else {
          // Case "//\n" where customDelimiter would be empty
          numbersString = potentialNumbers;
        }
      } else if (header === "//") {
        // Case "//\n" specifically (if not caught by previous branches)
        numbersString = potentialNumbers;
      }
      // If numbers.startsWith("//") but no newline, or invalid format, numbersString is not changed here by delimiter logic,
      // and default delimiter is used.
    }
  }
  numbersString = numbersString.replace(/\n/g, delimiter);

  const numbersArray = numbersString
    .split(delimiter)
    .map((num) => parseInt(num.trim(), 10));

  // Check for negative numbers
  const negativeNumbers = numbersArray.filter((num) => num < 0);
  if (negativeNumbers.length > 0) {
    throw new Error(
      `negative numbers not allowed ${negativeNumbers.join(",")}`
    );
  }

  return numbersArray
    .filter((num) => num <= 1000)
    .reduce((sum, num) => sum + num, 0);
};
