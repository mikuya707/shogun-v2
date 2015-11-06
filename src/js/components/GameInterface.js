'use strict';

import React from 'react/addons';
import GameHeader from './GameHeader';
import Chat from './Chat';
import Modal from './Modal';
import GameActions from '../actions/GameActions';
import GameStore from '../stores/GameStore';
import ChessboardInterface from './ChessboardInterface';
import GameboardInterface from './GameboardInterface';
import {Map} from 'immutable';
import {Board} from './GameBoard';

const GameInterface = React.createClass({
  
  propTypes: {
    io: React.PropTypes.object.isRequired,
    params: React.PropTypes.array.isRequired
  },

  getInitialState() {
    return {
      isOpponentAvailable: false,
      color: 'white',
      modal: Map({
        open: false,
        message: '',
        type: 'info',
        callbacks: {
          hide: this._hideModal,
          accept: this._acceptRematch,
          decline: this._declineRematch
        }
      }),
      gameOver: GameStore.getState().gameOver
    };
  },
  componentDidMount() {
    const {io, params} = this.props;

    io.on('token-invalid', () => this.setState({
      modal: this.state.modal
        .set('open', true)
        .set('message', 'Game link is invalid or has expired.')
        .set('type', 'info')
    }));

    io.emit('join', {
      token: params[0],
      time: params[1] * 60,
      inc: params[2]
    });

    io.on('joined', data => {
      if (data.color === 'black') {
        this.setState({color: 'black'});
      }
    });

    io.on('both-joined', () =>
      this.setState({isOpponentAvailable: true}, () => {
        if (this.state.color === 'white') {
          io.emit('clock-run', {
            token: params[0],
            color: 'white'
          });
        }
      }));

    io.on('full', () => {
      window.alert(
        'This game already has two players. You have to create a new one.');
      window.location = '/';
    });

    io.on('swal-gameover', data => {
      // data.color = player who made the winning move
      GameActions.gameOver({
        type: 'defeat',
        winner: data.color === 'white' ? 'White' : 'Black'
      });

      const iWin = this.state.color === data.color;
      swal({
         title: iWin ? 'You win!' : 'You lose!',
         text: iWin ? 'yay' : 'Better luck next time!',
         imageUrl: iWin? 'http://orig08.deviantart.net/b83d/f/2013/272/7/9/happy_puppy_by_laki10-d6oi4nt.png' : 'https://iampierremenard.files.wordpress.com/2014/02/sad-dog.jpg'
      });
    });

    io.on('player-resigned', data => {
      // data.color = player who resigned
      const resignGuy = data.color === 'white' ? 'White' : 'Black',
            winner = data.color === 'white' ? 'Black' : 'White';

      GameActions.gameOver({
        type: 'resign',
        winner
      });

      const iWin = this.state.color !== data.color;
      swal({
         title: iWin ? `${resignGuy} has resigned!` : 'You have resigned!',
         text: iWin ? 'Guess you win lol ¯\\_(ツ)_/¯' : 'boo',
         imageUrl: iWin? 'http://orig08.deviantart.net/b83d/f/2013/272/7/9/happy_puppy_by_laki10-d6oi4nt.png' : 'https://iampierremenard.files.wordpress.com/2014/02/sad-dog.jpg'
      });      
    });

    io.on('rematch-offered', () =>
      this._openModal('offer', 'Your opponent has sent you a rematch offer.'));

    io.on('rematch-declined', () =>
      this._openModal('info', 'Rematch offer has been declined.'));

    io.on('rematch-accepted', () => {
      GameActions.rematch();
      this.setState({
        color: this.state.color === 'white' ? 'black' : 'white',
        modal: this.state.modal.set('open', false)
      }, () => {
        if (this.state.color === 'white') {
          io.emit('clock-run', {
            token: this.props.params[0],
            color: 'white'
          });
        }
      });
    });

    io.on('opponent-disconnected', () =>  {
      if (!this.state.gameOver.get('status')) {
        this._openModal('info', 'Your opponent has disconnected.');
      }

      this.setState({isOpponentAvailable: false});
    });

    GameStore.on('change', this._onGameChange);
  },
  componentWillUnmount() {
    GameStore.off('change', this._onGameChange);
  },




  render() {
    const {io, params} = this.props;
    const {color, gameOver, isOpponentAvailable} = this.state;
    const commonProps = {
      io: io,
      color: color,
      openModal: this._openModal,
      isOpponentAvailable: isOpponentAvailable
    };

    return (
      <div>
        <GameHeader
          {...commonProps}
          params={params}
          gameOver={gameOver.get('status')} />

        <Chat
          {...commonProps}
          token={params[0]} />

          <GameboardInterface 
            {...commonProps}
            token={params[0]}
            gameOver={gameOver} />

        <Modal data={this.state.modal} />
      </div>
    );
  },




  _onGameChange() {
    this.setState({gameOver: GameStore.getState().gameOver});
  },
  _openModal(type, message) {
    this.setState({
      modal: this.state.modal
        .set('open', true)
        .set('message', message)
        .set('type', type)
    });
  },
  _hideModal() {
    this.setState({modal: this.state.modal.set('open', false)});
  },
  _acceptRematch() {
    const {io, params} = this.props;

    io.emit('rematch-accept', {
      token: params[0],
      time: params[1] * 60,
      inc: params[2]
    });
    this._hideModal();
  },
  _declineRematch() {
    const {io, params} = this.props;

    io.emit('rematch-decline', {
      token: params[0]
    });
    this._hideModal();
  },
  _toggleSounds(e) {
    this.setState({
      soundsEnabled: !this.state.soundsEnabled
    });
  },
});

export default GameInterface;