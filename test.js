function multiplication(num1, num2) {
  return num1 * num2;
}

describe("TEST Function Multiplication", () => {
  it("Multiplication => Should Pass", () => {
    const result = multiplication(2, 3);
    const expectations = 6;

    // Check whether the results are in line with expectations
    expect(result).toBe(expectations);
  });
});
