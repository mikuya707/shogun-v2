'use strict';

import React from 'react/addons';
import GameStore from '../stores/GameStore';
import GameActions from '../actions/GameActions';
//import ChessPieces from '../constants/ChessPieces';
//import onGameChange from '../mixins/onGameChange';
//import maybeReverse from '../mixins/maybeReverse';
import behavior from '../game/behavior';
import omit from 'lodash.omit';
import cx from 'classnames';

const GameBoard = React.createClass({
	propTypes: {

	},
	mixins: [],
	getInitialState() {
		//return null;
		this.state = GameStore.getGameboardState();
		console.log("state? ", this.state);
		return this.state;
		// {
		// 	board: state.board;
		// }
	},
	componentDidMount() {
		GameStore.addChangeListener(this._onChange);
	},
	componentWillUnmount() {
		GameStore.removeChangeListener(this._onChange);
	},
	_onChange() {
	
		this.setState({
			lightup: GameStore.getGameboardState().lightup
		});
	},
	render() {
		var {state, props} = this, {board} = state, {size} = props;
		var {board, lightup} = state;


		var cellArray = [];
		for (var i=0; i<size; i++) {
			var row = [];
			for (var j=0; j<size; j++) {
				row.push({x:j, y:i})
			}
			cellArray.push(row);
		}
		return (

			<table className="board">
			{cellArray.map((row, idx1) => 
				<tr>
					{row.map((cell, idx2) =>
						<td position={`[${idx2}, ${idx1}]`}>
							<Cell ref={`[${idx2}, ${idx1}]`}								
							 position={`[${idx2}, ${idx1}]`} 
								unit={board[`[${idx2}, ${idx1}]`] ? board[`[${idx2}, ${idx1}]`].unit : null} 
								color={board[`[${idx2}, ${idx1}]`] ? board[`[${idx2}, ${idx1}]`].color : null}
								litup={lightup[`[${idx2}, ${idx1}]`]}
								onClick={this._onCellClick}/>
						</td>
					)}
				</tr>
				)}
		</table>
		);
	}

});


const Cell = React.createClass({
	propTypes: {
	},
	getInitialState: function() {
    	 return {
    	 	side: 'front',
    	 	isSelected: false
    	 };
  	},
  	componentDidMount() {

		 //console.log("position is ", this.props.position);
		
	},

	componentWillMount() {
		
		
		
	},
	mixins: [],

	_onClickSquare() {

		const {unit, position, color} = this.props;
		const {side, isSelected} = this.state;
		var boardState = GameStore.getGameboardState();
		var {board, lightup, selected} = boardState;

		console.log("what things are before click: ", "unit ", unit, "position ", position, 'color ', color, 'side ', side, "isSelected ", isSelected, "selected", selected);
		if (unit) {
			if (!isSelected) {
				//check if the onclick unit has the same color as the player
				//then selected = true;
				//if(color === )
				
				this.setState({isSelected: true});	
<<<<<<< HEAD
=======
				console.log('board select')
>>>>>>> 8b85c7bd5a9f262c5ded76ecafd0d55ae5344785

				var ranges = [];
				var moves = behavior[unit][side];
				var pos = JSON.parse(position);
				Object.keys(moves).map(function(move){
					move = JSON.parse(move);
					var x =  pos[0] + move[0], 
						y =  pos[1] + move[1];
					ranges.push({x: x, y: y});
				});
				//console.log(behavior[unit]);

			}
			else {
				console.log('board deselect')
				this.setState({isSelected: false});
			}
			GameActions.showMoves({ unit: unit, color: color }, pos, ranges);
			//this._flip();
		}
		//this is the condition where the player selects its own unit, and try to move to existing valid position
		else {
			console.log("we got here", selected);
			if (selected && Object.keys(lightup).length) {
				if(lightup[position]){
					console.log("what is selected? ", selected);

					console.log("what is current unit and position? ", unit, position);
					Object.keys(lightup).forEach(function(unit) { 
						console.log("what is looping ", lightup[unit]);
						lightup[unit] = false });
					
					console.log("after remove color", lightup);
					GameActions.makeMove(selected.position, position, false);

					selected = null;
					this._flip();
					this.setState({isSelected: false});	
					console.log("after deselected for isSelected", isSelected);
					console.log("after deselected", selected);

					this._flip();

				}
			//check if current position is in lightup
			//if it does, then remove the current unit and add it to designated position
			//set selected as false
			//this.state.side change to back (if it's front, vice versa)
			//clear lightup
			}
		}
	},

	_flip() {
		this.setState({ side: (this.state.side === 'front') ? 'back' : 'front' });
	},


	render(){
		var {unit, color, litup} = this.props;

		var {side} = this.state;


		var cxObj = {	
			unit: !!unit,
			litup: litup
		};
		cxObj[side] = true;
		if (unit) {
			cxObj[unit] = true;
			cxObj[color] = true;
		}
		
		return (
			<div>
				<div className={cx(cxObj)}
					onClick={this._onClickSquare}>
				</div>
			</div>
		);
	}

});

export default {Board: GameBoard, Cell: Cell};