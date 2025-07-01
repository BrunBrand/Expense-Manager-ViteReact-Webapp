import { getExpenseById } from "../services/expense-service";
import { useEffect, useState } from "react";
import type { Expense } from "../../model/Expense";

const useExpenseById = (expenseId: string) => {
  const [expense, setExpense] = useState<Expense | undefined>();
  const [errors, setErrors] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (expenseId) {
      setIsLoading(true);
      getExpenseById(expenseId)
        .then((response) => setExpense(response.data))
        .catch((error) => {
          setErrors(error.message);
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  return { expense, errors, isLoading };
};
export default useExpenseById;
