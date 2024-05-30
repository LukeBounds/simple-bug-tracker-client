export enum BugPriority {
    Low,
    Medium,
    High,
}

export const BugPriorityList: number[]
    = Object.values(BugPriority)
    .filter((value) => typeof value === "number")
    .map((value) => (value as number));