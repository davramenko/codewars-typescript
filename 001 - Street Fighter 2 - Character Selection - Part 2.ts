export function superStreetFighterSelection(fighters: Array<string[]>, position: number[], moves: string[]) {
  const result = [];
  let i, pos;
  moves.forEach(move => {
    switch (move.toLowerCase()) {
      case 'up':
        if (position[0] > 0 && fighters[position[0] - 1][position[1]]) position[0]--;
        break;
      case 'down':
        if (position[0] < (fighters.length - 1) && fighters[position[0] + 1][position[1]]) position[0]++;
        break;
      case 'left':
        for (pos = position[1], i = 0; i < fighters[0].length; i++) {
          if (pos <= 0) pos = fighters[0].length - 1;
          else pos--;
          if (fighters[position[0]][pos]) break;
        }
        if (i < fighters[0].length && fighters[position[0]][pos]) position[1] = pos;
        break;
      case 'right':
        for (pos = position[1], i = 0; i < fighters[0].length; i++) {
          pos++;
          if (pos >= fighters[0].length) pos = 0;
          if (fighters[position[0]][pos]) break;
        }
        if (i < fighters[0].length && fighters[position[0]][pos]) position[1] = pos;
        break;
    }
    result.push(fighters[position[0]][position[1]])
  });

  return result;
}
