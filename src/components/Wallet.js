import React, { Component } from 'react'
import { connect } from 'react-redux';
import { deposit, withdraw } from '../actions/balance'

export class Wallet extends Component {
  state = { 
    balance: undefined
  }

  updateBalance = event => {
    this.setState ({ balance: parseInt(event.target.value, 10) })
  }

  deposit = () => this.props.deposit(this.state.balance)
  withdraw = () => this.props.withdraw(this.state.balance)

  render() {
    return (
      <div>
        <h3 className='balance'>Wallet Balance: {this.props.balance}</h3>
        <br />
        <input className='input-wallet' onChange={this.updateBalance}/>
        <button className='btn-deposit' onClick={this.deposit}>Deposit</button>
        <button className='btn-withdraw' onClick={this.withdraw}>Withdraw</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  //this comes from the root reducer
  balance: state.balance
});

/*
connect takes two params 
1.(function (mapStateToProps) which describes what part of the redux store we want to use on this component, 
2.the second one (mapDispatchToProps) describes what action creators we want to use on the component to send data to the redux store)
*/
export default connect(mapStateToProps, { deposit, withdraw })(Wallet)