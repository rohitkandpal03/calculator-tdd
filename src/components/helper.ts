const optimizeInput = (input: string): string => {
  return input.replace(/\\n/g, "\n").replace(/\\\\/g, "\\");
};

const extractMultipleDelimiters = (header: string): string[] => {
  const delimiterMatches = header.match(/\[(.*?)\]/g);
  if (!delimiterMatches || delimiterMatches.length === 0) {
    return [];
  }

  return delimiterMatches
    .map((d) => d.slice(1, -1))
    .filter((d) => d.length > 0);
};

const extractSingleDelimiter = (header: string): string => {
  return header.substring(2);
};

const processCustomDelimiters = (
  input: string
): { processedString: string; delimiter: string } => {
  const defaultDelimiter = ",";
  let processedString = optimizeInput(input);

  if (!input.startsWith("//")) {
    return { processedString, delimiter: defaultDelimiter };
  }

  const newLineIndex = processedString.indexOf("\n");
  if (newLineIndex === -1) {
    return { processedString, delimiter: defaultDelimiter };
  }

  const header = processedString.substring(0, newLineIndex);
  const numbersSection = processedString.substring(newLineIndex + 1);

  if (header.startsWith("//[") && header.includes("]")) {
    const delimiters = extractMultipleDelimiters(header);
    if (delimiters.length > 0) {
      const sortedDelimiters = [...delimiters].sort(
        (a, b) => b.length - a.length
      );
      let result = numbersSection;

      sortedDelimiters.forEach((d) => {
        let currentResult = "";
        let remainingString = result;
        let delimiterIndex = remainingString.indexOf(d);
        if (delimiterIndex === -1) {
          return;
        }
        while (delimiterIndex !== -1) {
          currentResult += remainingString.substring(0, delimiterIndex);
          currentResult += defaultDelimiter;
          remainingString = remainingString.substring(
            delimiterIndex + d.length
          );
          delimiterIndex = remainingString.indexOf(d);
        }
        currentResult += remainingString;
        result = currentResult;
      });

      return { processedString: result, delimiter: defaultDelimiter };
    }
  } else if (header.startsWith("//") && header.length > 2) {
    const customDelimiter = extractSingleDelimiter(header);
    if (customDelimiter) {
      return { processedString: numbersSection, delimiter: customDelimiter };
    }
  }

  return { processedString: numbersSection, delimiter: defaultDelimiter };
};

const parseNumbers = (processedString: string, delimiter: string): number[] => {
  const normalizedString = processedString.replace(/\n/g, delimiter);

  return normalizedString
    .split(delimiter)
    .map((num) => parseInt(num.trim(), 10));
};

const validateNegativeNumbers = (numbers: number[]): void => {
  const negativeNumbers = numbers.filter((num) => num < 0);
  if (negativeNumbers.length > 0) {
    throw new Error(
      `negative numbers not allowed ${negativeNumbers.join(",")}`
    );
  }
};

const calculateSum = (numbers: number[]): number => {
  return numbers
    .filter((num) => num <= 1000)
    .reduce((sum, num) => sum + num, 0);
};

export const add = (numbers: string): number => {
  if (numbers === "") {
    return 0;
  }

  const { processedString, delimiter } = processCustomDelimiters(numbers);
  const numbersArray = parseNumbers(processedString, delimiter);
  validateNegativeNumbers(numbersArray);
  return calculateSum(numbersArray);
};
