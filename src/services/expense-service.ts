import apiClient from "../config/api-client";
import type { Expense } from "../model/Expense";

export const getExpenses = () => {
  return apiClient.get<Expense[]>("/expenses");
};

export const getExpenseById = (expenseId: string) => {
  return apiClient.get<Expense>(`/expenses/${expenseId}`);
};

export const deleteExpenseById = (expenseId: string) => {
  return apiClient.delete<void>(`/expenses/${expenseId}`);
};
