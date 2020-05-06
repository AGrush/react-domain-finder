export const max_number = numbers => {
  const max_id = numbers.length > 0 ? Math.max(...numbers) : 0;
  return max_id
}

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


