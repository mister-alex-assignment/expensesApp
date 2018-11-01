import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ButtonToolbar, Button, ControlLabel, Col } from 'react-bootstrap';
import { observer } from 'mobx-react';

class ExpenseForm extends Component {
  render() {
    const { currentItem, currencies, expenseTypes, updateCurrentItem, addExpense, saveExpense, editClicked } = this.props.store;

    return (
      <div>
        <Form horizontal>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Date
            </Col>
            <Col sm={10}>
              <FormControl
                type="date"
                placeholder="Date"
                onChange={(e) => updateCurrentItem({ expenseDate: new Date(e.target.value) })}
                value={currentItem.expenseDate.toISOString().substring(0, 10)}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Amount
            </Col>
            <Col sm={10}>
              <FormControl
                type="number"
                placeholder="Amount"
                step="0.01"
                onChange={(e) => updateCurrentItem({ amount: e.target.value })}
                value={currentItem.amount}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Recipient
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                placeholder="Recipient"
                onChange={(e) => updateCurrentItem({ recipient: e.target.value })}
                value={currentItem.recipient}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Currency
            </Col>
            <Col sm={10}>
              <FormControl
                componentClass="select"
                placeholder="Currency"
                onChange={(e) => updateCurrentItem({ currency: e.target.value })}
                value={currentItem.currency}
              >
                { currencies.map(x => (<option key={x.ISO} value={x.ISO}>{x.Name}</option>))}
              </FormControl>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Expense type
            </Col>
            <Col sm={10}>
              <FormControl
                componentClass="select"
                placeholder="Expense type"
                onChange={(e) => updateCurrentItem({ expenseTypeId: e.target.value })}
                value={currentItem.expenseTypeId}
              >
                { expenseTypes.map(x => (<option key={x.id} value={x.id}>{x.Name}</option>))}
              </FormControl>
            </Col>
          </FormGroup>

          <ButtonToolbar>
            { editClicked ?
              <Button
                bsStyle="primary"
                onClick={() => saveExpense()}
              >
                Save expense
              </Button>
              :
              <Button
                bsStyle="primary"
                onClick={() => addExpense()}
              >
                Add expense
              </Button>
            }
          </ButtonToolbar>
        </Form>
      </div>
    );
  }
}

export default observer(ExpenseForm);
