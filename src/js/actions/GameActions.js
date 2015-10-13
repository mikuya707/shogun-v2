import GameConstants from '../constants/GameConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

const GameActions = {
  makeMove(from, to, capture, emitMove) {
    AppDispatcher.handleViewAction({
      actionType: GameConstants.MAKE_MOVE,
      from: from,
      to: to,
      capture: capture,
      emitMove: emitMove
    });
  },
  showMoves(unit, from, inRange) {
    AppDispatcher.handleViewAction({
      actionType: GameConstants.SHOW_MOVES,
      unit: unit,
      from: from,
      inRange: inRange
    });
  },
  draw() {
    AppDispatcher.handleViewAction({
      actionType: GameConstants.DRAW
    });
  },
  rematch() {
    AppDispatcher.handleViewAction({
      actionType: GameConstants.REMATCH
    });
  },
  gameOver(options) {
    AppDispatcher.handleViewAction({
      actionType: GameConstants.GAME_OVER,
      options: options
    });
  },
  changePromotion(promotion) {
    AppDispatcher.handleViewAction({
      actionType: GameConstants.CHANGE_PROMOTION,
      promotion: promotion
    });
  }
};

export default GameActions;