// randomNumbers returns an array of unique random numbers given a limit and number of numbers.
export const randomNumbers = (limit, numOfNumbers) => {
  const nums = new Set();
  while (nums.size < numOfNumbers) {
    nums.add(Math.floor(Math.random() * limit) + 1);
  }

  return Array.from(nums);
};
