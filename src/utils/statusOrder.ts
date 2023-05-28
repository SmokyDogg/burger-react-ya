export const statusName = (status: string): string | undefined => {
    if (status === "done") {
      return "Выполнен";
    } else if (status === "created") {
      return "Создан";
    } else if (status === "pending") {
      return "Готовится";
    }
  };
  