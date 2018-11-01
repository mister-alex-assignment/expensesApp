import { decorate, observable, action } from 'mobx';
import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:3000/v1'
});

const defaultItem = {
  expenseDate: new Date(),
  amount: 0,
  recipient: '',
};

class ExpensesStore {
  expenses = [];
  currencies = [];
  expenseTypes = [];
  editClicked = false;
  currentItem = {
    ...defaultItem,
    currency: '',
    expenseTypeId: '',
  };

  addExpense = () => {
    return httpClient.post('/expenses', this.currentItem)
      .then(() => this.fetchExpenses())
      .then(() => {
        this.currentItem = { ...this.currentItem, ...defaultItem };
      })
      .catch(err => console.log(err));
  };

  removeExpense = (id) => {
    return httpClient.delete(`/expenses/${id}`)
      .then(this.fetchExpenses)
      .catch(err => console.log(err));
  };

  editExpense = (editId) => {
    const { id, ExpenseDate, Amount, Recipient, Currency, ExpenseTypeId } = this.expenses.find(e => e.id === editId);

    this.currentItem = {
      id: `${id}`,
      expenseDate: new Date(ExpenseDate),
      amount: Amount,
      recipient: Recipient,
      currency: Currency,
      expenseTypeId: `${ExpenseTypeId}`,
    };

    this.editClicked = true;
  }

  saveExpense = () => {
    return httpClient.put('/expenses', this.currentItem)
      .then(() => this.fetchExpenses())
      .then(() => {
        this.editClicked = false;
        this.currentItem = { ...this.currentItem, ...defaultItem };
      })
      .catch(err => console.log(err));
  }

  fetchCurrencies = () => {
    httpClient.get('/currencies')
      .then((res) => {
        this.currencies = res.data.data;
        this.currentItem.currency = this.currencies[0].ISO;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchExpenseTypes = () => {
    httpClient.get('/expenseTypes')
      .then((res) => {
        this.expenseTypes = res.data.data;
        this.currentItem.expenseTypeId = this.expenseTypes[0].id.toString();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchExpenses = () => {
    httpClient.get('/expenses')
      .then((res) => {
        this.expenses = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updateCurrentItem = (newItem) => {
    this.currentItem = { ...this.currentItem, ...newItem};
  }
}

decorate(ExpensesStore, {
  expenses: observable,
  currencies: observable,
  expenseTypes: observable,
  editClicked: observable,
  currentItem: observable,
  updateCurrentItem: action,
  editExpense: action,
  fetchCurrencies: action,
  fetchExpenseTypes: action,
  fetchExpenses: action,
});

const store = new ExpensesStore();
export default store;