export enum TASK_STATUS {
  TODO = "TODO",
  DOING = "DOING",
  CODEREVIEW = "CODEREVIEW",
  DONE = "DONE",
  UNITTEST = "UNITTEST",
}

export function toEnum(value: string): TASK_STATUS {
  switch (value) {
    case "TODO":
      return TASK_STATUS.TODO;
    case "DOING":
      return TASK_STATUS.DOING;
    case "CODEREVIEW":
      return TASK_STATUS.CODEREVIEW;
    case "DONE":
      return TASK_STATUS.DONE;
    case "UNITTEST":
      return TASK_STATUS.UNITTEST;
    default:
      throw new Error("Invalid value");
  }
}
