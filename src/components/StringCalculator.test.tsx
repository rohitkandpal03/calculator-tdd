import "@testing-library/jest-dom";
import { add } from "./helper";

describe("add function", () => {
  // Test case for empty string
  test("empty string should return 0", () => {
    expect(add("")).toBe(0);
  });

  // Test case for single number
  test("single number should return the number itself", () => {
    expect(add("1")).toBe(1);
  });

  // Test case for two numbers
  test("two numbers should return their sum", () => {
    expect(add("1,5")).toBe(6);
  });

  // Test case for multiple numbers
  test("multiple numbers should return their sum", () => {
    expect(add("1,2,3,4,5")).toBe(15);
  });

  // Test case for numbers with spaces
  test("numbers with spaces should be handled correctly", () => {
    expect(add("1, 2, 3")).toBe(6);
  });

  // Test case for newlines as delimiters
  test("newlines should be treated as delimiters", () => {
    expect(add("1\n2,3")).toBe(6);
  });

  // Test case for custom delimiters
  test("custom delimiters should be supported", () => {
    expect(add("//;\n1;2")).toBe(3);
  });

  // Test case for mixed delimiters
  test("mixed delimiters should work correctly", () => {
    expect(add("//|\n1|2\n3")).toBe(6);
  });

  // Test case for negative numbers
  test("should throw an exception for a single negative number", () => {
    expect(() => add("-1,2")).toThrow("negative numbers not allowed -1");
  });

  // Test case for multiple negative numbers
  test("should throw an exception with all negative numbers listed", () => {
    expect(() => add("1,-2,-3,4,-5")).toThrow(
      "negative numbers not allowed -2,-3,-5"
    );
  });

  // Test case for negative numbers with custom delimiter
  test("should handle negative numbers with custom delimiter", () => {
    expect(() => add("//;\n1;-2;3;-4")).toThrow(
      "negative numbers not allowed -2,-4"
    );
  });

  // Test case for numbers greater than 1000
  test("should ignore numbers greater than 1000", () => {
    expect(add("2,1001")).toBe(2);
    expect(add("2,1001,3")).toBe(5);
  });

  // Test case for delimiters of any length
  test("should support delimiters of any length", () => {
    expect(add("//[***]\n1***2***3")).toBe(6);
  });

  // Test case for multiple delimiters
  test("should support multiple delimiters", () => {
    expect(add("//[*][%]\n1*2%3")).toBe(6);
  });

  // Test case for multiple delimiters with varying lengths
  test("should support multiple delimiters with varying lengths", () => {
    expect(add("//[**][%%%]\n1**2%%%3")).toBe(6);
  });
});
