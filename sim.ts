class Engineer {
    skill: number

    constructor(skill) {
        this.skill = skill;
    }
}

type State = "BACKLOG" | "WIP" | "DONE" | "ACCEPTED";

class WorkItem {
    effort: number
    amountEffortSpentCumulative: number
    state: State
    engineersAssigned: Engineer[]

    constructor(effort) {
        this.effort = effort;
    }

}

class WIP {
    workitem: WorkItem
    engineers: Engineer[]
}

function sim() {
    var wi = new WorkItem(10);

    var engineer = new Engineer(2);

    var workitems : WorkItem[] = [];
    workitems.push(wi);

    var wip : WIP[] = [];

    while (!checkWorkItemsAreDone(workitems)) {
        assignWorkToFreeEngineers();
        progressWork();
        updateWorkItemState();
    }
}

function checkWorkItemsAreDone (workItems : WorkItem[]) : boolean {
    return workItems.every((wi) => wi.state == "DONE");
}

function assignWorkToFreeEngineers(engineers: Engineer[], workitems: WorkItem[], wip: WIP[]) {

}