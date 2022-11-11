export class Engineer {
    constructor(public skill: number) {
    }
}

export class WorkItem {
    public amountEffortSpentCumulative: number = 0;

    constructor(
        public effort: number,
        public engineersAssigned: Engineer[] = []
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
        return !(this.todo.length || this.inProgress.length)
    }
}

function sim() {
    const board = new Board()

    const engineer = new Engineer(2);
    const engineers = [engineer];

    const wi = new WorkItem(10);
    board.todo.push(wi);

    while (!board.allWorkItemsAreDone()) {
        assignWorkToFreeEngineers(engineers, board);
        // progressWork();
        // updateWorkItemState();
    }
}


export function isAssigned(engineer: Engineer, board: Board) {
    return board.inProgress.some((item) => item.engineersAssigned.includes(engineer));
}

export function assignWorkToFreeEngineers(engineers: Engineer[], board: Board): void {
    const availableEngineers = engineers.filter((engineer) => !isAssigned(engineer, board))

    for (const engineer of availableEngineers) {
        const wi = board.todo.shift();
        if (wi) {
            board.inProgress.push(wi);
            wi.engineersAssigned.push(engineer)
        }
    }
}
