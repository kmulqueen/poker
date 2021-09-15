// randomNumbers returns an array of unique random numbers given a limit and number of numbers.
export const randomNumbers = (limit, numOfNumbers) => {
  const nums = new Set();
  while (nums.size < numOfNumbers) {
    nums.add(Math.floor(Math.random() * limit) + 1);
  }

  return Array.from(nums);
};

// randomCards returns an array with a determined number of random cards which have not been dealt.
export const randomCards = (deck, numOfCards) => {
  const deckSize = Object.keys(deck).length;
  const cardIDs = new Set();

  while (cardIDs.size < numOfCards) {
    let cardID = Math.floor(Math.random() * deckSize);
    if (cardID !== 0) {
      if (!deck[cardID].isDealt) {
        cardIDs.add(cardID);
      }
    }
  }

  const cards = [];
  cardIDs.forEach((value) => {
    cards.push(deck[value]);
  });

  return cards;
};
