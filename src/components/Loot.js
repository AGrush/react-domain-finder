import React, {Component} from 'src/components/node_modules/react';
import { connect } from 'src/components/node_modules/react-redux';
import { fetchBitcoin } from '../actions/bitcoin';

export class Loot extends Component {
  componentDidMount() {
    this.props.fetchBitcoin();
  }

  computeBitcoin () {
    const { bitcoin } = this.props;
    //guard clause
    if(Object.keys(bitcoin).length === 0) return '';

    return this.props.balance / parseInt(bitcoin.bpi.USD.rate.replace(',', ''), 10);
  }

  render() {
    return (
      <h3>Bitcoin balance: {this.computeBitcoin()}</h3>
    )
  }
}

export default connect(state => state, { fetchBitcoin })(Loot)