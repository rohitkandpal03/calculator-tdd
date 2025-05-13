import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import StringCalculator, { add } from "./StringCalculator";

// Unit tests for the add function
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
});

// Component tests
describe("StringCalculator component", () => {
  test("renders the calculator with initial empty state", () => {
    render(<StringCalculator />);

    // Check if the component renders correctly
    expect(screen.getByText("String Calculator")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter comma-separated numbers")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /calculate/i })
    ).toBeInTheDocument();

    // Result should not be visible initially
    expect(screen.queryByText(/Result:/)).not.toBeInTheDocument();
  });

  test("calculates and displays the result when button is clicked", () => {
    render(<StringCalculator />);

    // Enter input
    const input = screen.getByPlaceholderText("Enter comma-separated numbers");
    fireEvent.change(input, { target: { value: "1,2,3" } });

    // Click calculate button
    const button = screen.getByRole("button", { name: /calculate/i });
    fireEvent.click(button);

    // Check if result is displayed correctly
    expect(screen.getByText("Result: 6")).toBeInTheDocument();
  });
});
