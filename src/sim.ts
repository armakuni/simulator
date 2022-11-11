import { isPromise } from "util/types";
import { getDefaultNormalizer } from "@testing-library/react";

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

function assignWorkToFreeEngineers(engineers: Engineer[], board: Board): void {
    const availableEngineers = engineers.filter((engineer) => !isAssigned(engineer, board))

    throw new Error("todo")
}
