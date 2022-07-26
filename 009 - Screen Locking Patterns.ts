// Screen Locking Patterns

interface IPassOver {
    target: string,
    condition: string,
}

const board = new Map<string, string[]>([
    ['A', ['B', 'D', 'E', 'F', 'H']],
    ['C', ['B', 'F', 'E', 'D', 'H']],
    ['I', ['F', 'H', 'E', 'D', 'B']],
    ['G', ['D', 'H', 'E', 'F', 'B']],
    ['B', ['A', 'C', 'E', 'D', 'F', 'G', 'I']],
    ['F', ['C', 'I', 'E', 'B', 'H', 'G', 'A']],
    ['H', ['G', 'I', 'E', 'D', 'F', 'C', 'A']],
    ['D', ['A', 'G', 'E', 'B', 'H', 'C', 'I']],
    ['E', ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'I']],
]);

const passOver = new Map<string, IPassOver[]>([
    ['A', [{target: 'C', condition: 'B'}, {target: 'I', condition: 'E'}, {target: 'G', condition: 'D'},]],
    ['C', [{target: 'A', condition: 'B'}, {target: 'G', condition: 'E'}, {target: 'I', condition: 'F'},]],
    ['I', [{target: 'C', condition: 'F'}, {target: 'A', condition: 'E'}, {target: 'G', condition: 'H'},]],
    ['G', [{target: 'A', condition: 'D'}, {target: 'C', condition: 'E'}, {target: 'I', condition: 'H'},]],
    ['B', [{target: 'H', condition: 'E'},]],
    ['H', [{target: 'B', condition: 'E'},]],
    ['D', [{target: 'F', condition: 'E'},]],
    ['F', [{target: 'D', condition: 'E'},]],
]);

export function calculateCombinations(startPosition: string, patternLength: number): number {
    if (patternLength <= 0 || patternLength > 9) return 0;
    const visited = [false, false, false, false, false, false, false, false, false];
    return calc(visited, startPosition, patternLength);
}

function calc(visited: boolean[], start: string, length: number) {
    if (length == 0) return 0;
    if (length == 1) return 1;
    let result = 0;
    visited[toIndex(start)] = true;
    const neighbours = board.get(start);
    if (neighbours) {
        for (let i = 0; i < neighbours.length; ++i) {
            if (!visited[toIndex(neighbours[i])]) {
                result += calc(visited, neighbours[i], length - 1); // recursion
            }
        }
    }
    const passOvers = passOver.get(start);
    if (passOvers) {
        for (let i = 0; i < passOvers.length; i++) {
            if (visited[toIndex(passOvers[i].condition)] && !visited[toIndex(passOvers[i].target)]) {
                result += calc(visited, passOvers[i].target, length - 1); // recursion
            }
        }
    }

    visited[toIndex(start)] = false;
    return result;
}

function toIndex(ch: string): number {
    return ch.charCodeAt(0) - 65;
}
