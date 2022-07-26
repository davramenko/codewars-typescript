enum LiftDirection {
  up = 1,
  down = 2,
}

interface ILiftState {
  capacity: number,
  currentFloor: number;
  peopleOnboarded: number[];
  movementDirection: LiftDirection;
  forceReverse: boolean;
}

function doCheckOut(state: ILiftState): void {
  let i = 0;
  while (i < state.peopleOnboarded.length) {
    if (state.peopleOnboarded[i] === state.currentFloor) {
      state.peopleOnboarded.splice(i, 1);
    } else {
      i++;
    }
  }
}

function doCheckIn(queue: number[], state: ILiftState): void {
  let i = 0;
  while (i < queue.length) {
    if (shouldCheckIn(queue[i], state)) {
      if (state.peopleOnboarded.length < state.capacity) {
        state.peopleOnboarded.push(queue[i]);
        queue.splice(i, 1);
      } else {
        break;
      }
    } else {
      i++;
    }
  }
}

function shouldCheckIn(person: number, state: ILiftState): boolean {
  if (state.movementDirection === LiftDirection.up && person > state.currentFloor) {
    return true;
  } else if (state.movementDirection === LiftDirection.down && person < state.currentFloor) {
    return true;
  }
  return false;
}

function isThereCheckInBoth(queue: number[], state: ILiftState, floor: number): boolean {
  if (!isThereCheckIn(queue, state, floor, false)) {
    // console.log(`Looking for reverse checkIn: floor=${floor}`);
    return isThereCheckIn(queue, state, floor, true);
  }
  return true;
}

function isThereCheckIn(queue: number[], state: ILiftState, floor: number, reverse: boolean): boolean {
  let direction = state.movementDirection;
  if (reverse) {
    direction = (direction === LiftDirection.up) ? LiftDirection.down : LiftDirection.up;
  }
  for (let i = 0; i < queue.length; i++) {
    // console.log('isThereCheckIn: direction=' + direction + '; need=' + queue[i] + '; floor=' + floor);
    if (direction === LiftDirection.up && queue[i] > floor) {
      state.forceReverse = reverse;
      return true;
    } else if (direction === LiftDirection.down && queue[i] < floor) {
      state.forceReverse = reverse;
      return true;
    }
  }
  return false;
}

function isThereCheckOut(state: ILiftState, floor: number): boolean {
  for (let i = 0; i < state.peopleOnboarded.length; i++) {
    if (state.peopleOnboarded[i] === floor) {
      return true;
    }
  }
  return false;
}

// Priorities:
// NON- : Check-out
// EMPTY: Check-in the fellow traveller
// -------------------------------------
// EMPTY: Check-in the farthest back traveller (once checked in, reverse the direction)
function getNextFloor(queues: number[][], state: ILiftState): number {
  state.forceReverse = false;
  if (state.movementDirection === LiftDirection.up) {
    for (let i = state.currentFloor + 1; i < queues.length; i++) {
      if (isThereCheckOut(state, i) || isThereCheckIn(queues[i], state, i, false)) {
        return i;
      }
    }
    if (state.peopleOnboarded.length == 0) {
      for (let i = state.currentFloor + 1; i < queues.length; i++) {
        if (isThereCheckIn(queues[i], state, i, true)) {
          let foundCheckIn = i;
          for (let j = i + 1; j < queues.length; j++) {
            if (isThereCheckIn(queues[j], state, j, true)) foundCheckIn = j;
          }
          return foundCheckIn;
        }
      }
    }
  } else {
    for (let i = state.currentFloor - 1; i >= 0; i--) {
      if (isThereCheckOut(state, i) || isThereCheckIn(queues[i], state, i, false)) {
        return i;
      }
    }
    if (state.peopleOnboarded.length == 0) {
      for (let i = state.currentFloor - 1; i >= 0; i--) {
        if (isThereCheckIn(queues[i], state, i, true)) {
          let foundCheckIn = i;
          for (let j = i - 1; j >= 0; j--) {
            if (isThereCheckIn(queues[j], state, j, true)) foundCheckIn = j;
          }
          return foundCheckIn;
        }
      }
    }
  }
  // Reverse check out
  // if (state.movementDirection === LiftDirection.up) {
  //   for (let i = state.currentFloor - 1; i >= 0; i--) {
  //     if (isThereCheckOut(state, i)) return i;
  //   }
  // } else {
  //   for (let i = state.currentFloor + 1; i < queues.length; i++) {
  //     if (isThereCheckOut(state, i)) return i;
  //   }
  // }
  return -1;
}

export const theLift = (queues: number[][], capacity: number): number[] => {
  const liftState: ILiftState = {
    capacity,
    currentFloor: 0,
    peopleOnboarded: [],
    movementDirection: LiftDirection.up,
    forceReverse: false,
  };
  const result = [0];
  doCheckIn(queues[liftState.currentFloor], liftState);
  while (true) {
    // console.log('QUEUES: ', queues, "\nSTATE: ", liftState, "\nRESULT: ", result);
    // console.log(`Looking for the next floor: direction=${liftState.movementDirection}`)
    let nextFloor = getNextFloor(queues, liftState);
    // if (nextFloor >= 0) console.log(`Next floor found: ${nextFloor}`)
    if (nextFloor < 0) {
      // console.log('Reversing direction')
      liftState.movementDirection = (liftState.movementDirection === LiftDirection.up) ? LiftDirection.down : LiftDirection.up;
      doCheckIn(queues[liftState.currentFloor], liftState);
      // console.log(`Looking for the next floor: direction=${liftState.movementDirection}`)
      nextFloor = getNextFloor(queues, liftState);
      // if (nextFloor >= 0) console.log(`Next floor found: ${nextFloor}`)
      if (nextFloor < 0) {
        // console.log('No more lift deliveries')
        break;
      }
    }
    if (result.length > 1 || nextFloor !== 0) {
      result.push(nextFloor);
      liftState.currentFloor = nextFloor;
    }
    doCheckOut(liftState);
    // console.log('AFTER CHECKOUT: STATE: ', liftState);
    if (liftState.forceReverse) {
      liftState.movementDirection = (liftState.movementDirection === LiftDirection.up) ? LiftDirection.down : LiftDirection.up;
    }
    doCheckIn(queues[liftState.currentFloor], liftState);
  }
  if (result.length > 1 && result[result.length - 1] !== 0) {
    result.push(0);
  }
  // console.log("RESULT: ", result);
  return result;
}
