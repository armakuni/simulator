import { Board, Engineer, isAssigned, WorkItem } from "./sim";

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
