import { Board, Engineer, isAssigned, WorkItem, assignWorkToFreeEngineers } from "./sim";

describe("isNotAssigned", () => {
    const engineer1 = new Engineer(1);
    const engineer2 = new Engineer(2);

    const board = new Board(
        [],
        [new WorkItem(10, [engineer2])],
        [],
    )

    it("returns true when not assigned to any WIP item", () => {
        expect(isAssigned(engineer1, board)).toBe(false);
    })

    it("returns false when assigned to any WIP item", () => {
        expect(isAssigned(engineer2, board)).toBe(true);
    })

})

describe("assignWorkToFreeEngineers", () => {
    it("assigns work to engineers", () => {
        const e1 = new Engineer(1);
        const e2 = new Engineer(2);
        const engineers = [e1, e2]

        const wi1 = new WorkItem(10);
        const wi2 = new WorkItem(20);
        const wi3 = new WorkItem(30);

        const board = new Board(
            [wi1, wi2, wi3], //todo
            [], //inProgress
            [], //done
        )

        assignWorkToFreeEngineers(engineers, board);

        expect(board.todo).toEqual([wi3]);
        expect(board.inProgress).toEqual([wi1, wi2]);
        expect(wi1.engineersAssigned).toEqual([e1]);
        expect(wi2.engineersAssigned).toEqual([e2]);
    })
})
