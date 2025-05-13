export const add = (numbers: string): number => {
  if (numbers === "") {
    return 0;
  }

  let delimiter = ",";
  let numbersString: string = numbers
    .replace(/\\n/g, "\n")
    .replace(/\\\\/g, "\\");

  if (numbers.startsWith("//")) {
    const delimiterEndIndex = numbersString.indexOf("\n");

    if (delimiterEndIndex !== -1) {
      delimiter = numbersString.substring(2, delimiterEndIndex);
      numbersString = numbersString.substring(delimiterEndIndex + 1);
    }
  }
  console.log("delimiter ", { delimiter, numbersString });
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

  return numbersArray.reduce((sum, num) => sum + num, 0);
};
