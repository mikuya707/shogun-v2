'use strict';

import React from 'react';
import CreateGameForm from './CreateGameForm';
import io from '../io';

const Index = React.createClass({
  
  propTypes: {
    io: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      link: '',
      hasExpired: false,
      time: '30',
      inc: '0'
    };
  },
  componentDidMount() {
    const io = this.props.io;

    io.on('created', data => {
      const {time, inc} = this.state;
      const loc = window.location;

      const origin = loc.origin || `${loc.protocol}//${loc.hostname}` +
        (loc.port ? ':' + loc.port : '');

      this.setState({
        // link: `${origin}/play/${data.token}/${time}/${inc}`,
        link: `${origin}/play/${data.token}`,
        hasExpired: false
      });
    });
    io.on('ready', () => {
      window.location = this.state.link;
    });
    io.on('token-expired', () => this.setState({hasExpired: true}));
  },
  render() {
    return (
      <div>
        <img src="/img/shougun.png"
             width="122"
             height="122"
             className="shougun" />
        <h1>Shogun</h1>

        <div id="create-game">
          <CreateGameForm
            link={this.state.link}
            time={this.state.time}
            inc={this.state.inc}
            onChangeForm={this._onChangeForm}
            createGame={this._createGame}
            create1PGame={this._create1PGame} />
            
          <p id="game-status">
            {this.state.hasExpired ?
              'Game link has expired, generate a new one'
            :this.state.link ?
              'Waiting for opponent to connect'
            :null}
          </p>
        </div>

        <p>
          Click the Create Room button to create a new game, then send the generated URL to a friend.
          The game will begin once your friend opens the link in his or her
          browser. Each player will be randomly assigned to be White or Black.
        </p>
        <p>
          <a href="/about" className="alpha">Read more about Shogun</a>
        </p>
      </div>
    );
  },

  _onChangeForm(e) {
    this.setState({[e.target.name]: e.target.value});
  },
  _createGame(e) {
    e.preventDefault();

    const {time, inc} = this.state;
    const isInvalid = [time, inc].some(val => {
      val = parseInt(val, 10);
      return isNaN(val) || val < 0 || val > 50;
    });

    if (isInvalid) {
      // fallback for old browsers
      return window.alert('Form is invalid. Enter numbers between 0 and 50.');
    } else {
      this.props.io.emit('start');
    }
  },

  _create1PGame(e) {
    e.preventDefault();
    // this.props.io.emit('start-1P');

    const loc = window.location;
    const origin = loc.origin || `${loc.protocol}//${loc.hostname}` +
      (loc.port ? ':' + loc.port : '');
    window.location = `${origin}/play/ai`;
  }


});

export default Index;