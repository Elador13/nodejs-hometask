import React from 'react';
import {getFights} from "../../services/domainRequest/fightRequest";

class FightsHistory extends React.Component {
  state = {
    history: [],
  };

  async componentDidMount() {
    const history = await getFights();
    if(history && !history.error) {
      this.setState({ history });
    }
  }

  render() {
    return (
      <div>
        <h2>History</h2>
        <ul>
          {this.state.history.map(fight => (
            <li>
              <div>{`${new Date(fight.createdAt).toLocaleString()}`}</div>
              <div>{fight.fighter1} VS {fight.fighter2} - winner: {fight.winner}</div>
              <hr/>
            </li>
          ))}
        </ul>

      </div>
    );
  }
}

export default FightsHistory;
