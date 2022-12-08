function sum(numbers: number[]) {
  let result = 0

  for (let number of numbers) {
    result += number
  }

  return result
}

module.exports = sum