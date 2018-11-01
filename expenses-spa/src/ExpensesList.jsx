import React, { Component } from 'react';
import { Table, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { observer } from 'mobx-react';

class ExpensesList extends Component {
  getCurrencyName(ISO) {
    const currency = this.props.store.currencies.find(x => x.ISO === ISO);
    return currency ? currency.Name : null;
  }

  getExpenseTypeName(id) {
    const expenseType = this.props.store.expenseTypes.find(x => x.id === id);
    return expenseType ? expenseType.Name : null;
  }

  render() {
    const { expenses } = this.props.store;

    return (
      <div>
        <Table responsive striped bordered condensed hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Recipient</th>
              <th>Currency</th>
              <th>Expense type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map(x => (
              <tr key={x.id}>
                <td>{new Date(x.ExpenseDate).toLocaleDateString()}</td>
                <td>{x.Amount}</td>
                <td>{x.Recipient}</td>
                <td>{this.getCurrencyName(x.Currency)}</td>
                <td>{this.getExpenseTypeName(x.ExpenseTypeId)}</td>
                <td>
                  <ButtonToolbar>
                    <ButtonGroup>
                      <Button
                        bsStyle="primary"
                        onClick={() => this.props.store.editExpense(x.id)}
                      >
                        Edit
                      </Button>
                      <Button onClick={() => this.props.store.removeExpense(x.id)} bsStyle="danger">Remove</Button>
                    </ButtonGroup>
                  </ButtonToolbar>
                </td>
              </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    );
  }
}

export default observer(ExpensesList);
