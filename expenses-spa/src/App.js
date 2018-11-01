import React, { Component } from 'react';
import './App.css';
import { Row, Col, Grid, PageHeader } from 'react-bootstrap';
import ExpensesList from './ExpensesList';
import ExpenseForm from './ExpenseForm';
import { observer } from 'mobx-react';

class App extends Component {
  componentDidMount() {
    this.props.store.fetchCurrencies();
    this.props.store.fetchExpenseTypes();
    this.props.store.fetchExpenses();
  }

  render() {
    const store = this.props.store;

    return (
      <div className="app">
        <PageHeader>
          Expenses tracker
        </PageHeader>
        <Grid fluid>
          <Row className="show-grid">
            <Col xs={12} md={8}>
              <ExpensesList store={store} />
            </Col>
            <Col xs={6} md={4}>
              <ExpenseForm store={store}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default observer(App);
