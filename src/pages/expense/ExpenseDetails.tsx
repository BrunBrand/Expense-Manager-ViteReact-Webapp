import { Link, useNavigate, useParams } from "react-router-dom";
import CurrencyUtils from "../../utils/CurrencyUtils";
import DateUtils from "../../utils/DateUtils";

import useExpenseById from "../../hooks/useExpenseById";
import { useState } from "react";
import ConfirmDialog from "../../components/ConfirmDialog";
import { deleteExpenseById } from "../../services/expense-service";

const ExpenseDetails = () => {
  const navigate = useNavigate();
  const { expenseId } = useParams();
  const [showDialog, setShowDialog] = useState<boolean>(false);

  if (!expenseId) return <p className="text-danger">Invalid Expense Id</p>;

  const { expense, errors, isLoading, setIsLoading, setErrors } =
    useExpenseById(expenseId);

  const handleDeleteCancel = () => {
    setShowDialog(false);
  };
  const handleDeleteConfirm = () => {
    setIsLoading(true);
    deleteExpenseById(expenseId)
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
        setErrors(error);
      })
      .finally(() => {
        setIsLoading(false);
        setShowDialog(false);
      });
  };

  return (
    <div className="container mt-2">
      {isLoading && <p>Loading...</p>}
      {errors && <p className="text-danger">{errors}</p>}
      <div className="d-flex flex-row-reverse mv-2">
        <button
          className="btn btn-sm btn-danger"
          onClick={() => setShowDialog(true)}
        >
          Delete
        </button>
        <button
          className="btn btn-sm btn-warning mx-2"
          onClick={() => navigate(`/edit/${expenseId}`)}
        >
          Edit
        </button>
        <Link className="btn btn-sm btn-secondary" to="/">
          Back
        </Link>
      </div>
      <div className="card">
        <div className="card-body p-3">
          <table className="table table-borderless table-responsive">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{expense ? expense.name : "N/A"}</td>
              </tr>
              <tr>
                <th>Category</th>
                <td>{expense ? expense.category : "N/A"}</td>
              </tr>
              <tr>
                <th>Amount</th>
                <td>
                  {expense ? CurrencyUtils.formatToINR(expense.amount) : "N/A"}
                </td>
              </tr>
              <tr>
                <th>Date</th>
                <td>
                  {expense ? DateUtils.formatDateString(expense.date) : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmDialog
        title="Confirm Delete"
        message="Sure you want to delete this item"
        show={showDialog}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ExpenseDetails;
