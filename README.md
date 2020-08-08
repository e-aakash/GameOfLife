# GameOfLife

This is an implementation of [Conwasy's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) in a finite grid. This implementation has time complexity of O(m\*n) and space complexity of O(1), where the grid is of size m\*n

This project is live at https://e-aakash.github.io/GameOfLife/home. Initial grid is randomly intialized.

The following rules are implemented in [Grid component](https://github.com/e-aakash/GameOfLife/blob/master/src/app/grid/grid.component.ts#L43):

1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

## Implementation

The grid is updated in place, with special notations for change of state in previous generation. 

- State 0: Cell is dead
- State 1: Cell is alive
- State -1: Cell was alive in previous generation, but dead in current generation. Sign signifies that it is now dead
- State 2: Cell was dead in previous generation, but alive in current generation.

Addition of -1 and 2 state allows us to implement game of life in O(1) space, without the need for duplicating the grid.
