const players = [
  {
    name: "Test Player 1",
    clientID: "abc123",
    turn: false,
    hand: [
      {
        id: 1,
        value: 2,
        suit: "Hearts",
      },
      {
        id: 2,
        value: 3,
        suit: "Hearts",
      },
    ],
    chips: 10000,
    fold: false,
  },
  {
    name: "Test Player 2",
    clientID: "def456",
    turn: false,
    hand: [
      {
        id: 3,
        value: 4,
        suit: "Hearts",
      },
      {
        id: 5,
        value: 6,
        suit: "Hearts",
      },
    ],
    chips: 10000,
    fold: false,
  },
];

module.exports = players;
