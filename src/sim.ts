/* eslint-disable max-classes-per-file */

export class Engineer {
  constructor(public skill: number) {
  }
}

export class WorkItem {
  public amountEffortSpentCumulative = 0;

  constructor(
    public effort: number,
    public engineersAssigned: Engineer[] = [],
  ) {
  }
}

export class Board {
  constructor(
    public todo: WorkItem[] = [],
    public inProgress: WorkItem[] = [],
    public done: WorkItem[] = [],
  ) {
  }

  public allWorkItemsAreDone(): boolean {
    return !(this.todo.length || this.inProgress.length);
  }
}

export function isAssigned(engineer: Engineer, board: Board) {
  return board.inProgress.some((item) => item.engineersAssigned.includes(engineer));
}

export function assignWorkToFreeEngineers(engineers: Engineer[], board: Board): void {
  const availableEngineers = engineers.filter((engineer) => !isAssigned(engineer, board));

  for (const engineer of availableEngineers) {
    const wi = board.todo.shift();
    if (wi) {
      board.inProgress.push(wi);
      wi.engineersAssigned.push(engineer);
    }
  }
}

export function progressWork(board: Board) {
  for (const wi of board.inProgress) {
    wi.amountEffortSpentCumulative += wi.engineersAssigned
      .map((engineer) => engineer.skill)
      .reduce((a, b) => a + b);
  }
}

export function updateWorkItemState(board: Board) {
  const tmp = [];
  for (const workItem of board.inProgress) {
    if (workItem.amountEffortSpentCumulative >= workItem.effort) {
      board.done.push(workItem);
    } else {
      tmp.push(workItem);
    }
  }
  // eslint-disable-next-line no-param-reassign
  board.inProgress = tmp;
}

function step(engineers: Engineer[], board: Board) {
  assignWorkToFreeEngineers(engineers, board);
  progressWork(board);
  updateWorkItemState(board);
}

export function sim() {
  const board = new Board();

  const engineer = new Engineer(2);
  const engineers = [engineer];

  const wi = new WorkItem(10);
  board.todo.push(wi);

  let t = 0;
  while (!board.allWorkItemsAreDone()) {
    t += 1;
    step(engineers, board);
    // eslint-disable-next-line no-console
    console.log('============== t = %d ==============', t);
    // eslint-disable-next-line no-console
    console.log(board);
  }
}

sim();
