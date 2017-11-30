var assert = require('assert')
const GameBoard = require('../game/game-board')
const Team = require('../game/team')
const Game = require('../game/game')
const House = require('../game/controllables/house')
const Shape = require('../game/shape')
const Player = require('./../game/player')
var should = require('chai').should()

describe('game: ', function () {
  const PLAYER_0_ID = 'qw12'
  const PLAYER_1_ID = 'xnr13'
  const PLAYER_2_ID = 'xLB94'
  var game

  beforeEach(() => {
    var board = new GameBoard(500, 500)
    var house0 = makeTestHouse()
    var house1 = makeTestHouse()
    var house2 = makeTestHouse()
    board.setControllables([
      house0,
      house1,
      house2
    ])
    var teams = [
      new Team('0', [
        house0,
        house1,
        house2
      ])
    ]
    aGame = new Game(teams, board)
  })

  it('should have a teams property', () => {
    aGame.should.have.property('teams').an('array')
  })
  
  it('should have a gameBoard property', () => {
    aGame.should.have.property('board').an('object')
  })

  describe('initalizePlayer: ', () => {
    it('should assign to spectator', () => {
      let player1 = new Player(PLAYER_1_ID)
      let player0 = new Player(PLAYER_0_ID)
      aGame.teams['spectators'].players.should.be.empty
      aGame.initializePlayer(player1)
      aGame.teams['spectators'].players.should.contain(player1)
      aGame.initializePlayer(player0)
      aGame.teams['spectators'].players.should.contain(player0)
      aGame.teams['spectators'].players.should.contain(player1)
    })
  })
  
  describe('joinTeam: ', () => {
    it('should remove player from old team', () => {
      let player1 = new Player(PLAYER_1_ID)
      let player0 = new Player(PLAYER_0_ID)
      aGame.initializePlayer(player1)
      aGame.initializePlayer(player0)
      aGame.joinTeam('0', player1)
      aGame.teams['spectators'].players.should.not.contain(player1)
      aGame.joinTeam('0', player0)
      aGame.teams['spectators'].players.should.not.contain(player0)
      aGame.joinTeam('spectators', player1)
      aGame.teams['0'].players.should.not.contain(player1)
      aGame.teams['spectators'].players.should.not.contain(player0)
    })
    
    it('should add player to new team', () => {
      let player1 = new Player(PLAYER_1_ID)
      let player0 = new Player(PLAYER_0_ID)
      aGame.initializePlayer(player1)
      aGame.initializePlayer(player0)
      aGame.joinTeam('0', player1)
      aGame.teams['0'].players.should.contain(player1)
      aGame.joinTeam('0', player0)
      aGame.teams['0'].players.should.contain(player0)
      aGame.teams['0'].players.should.contain(player1)
      aGame.joinTeam('spectators', player1)
      aGame.teams['0'].players.should.contain(player0)
      aGame.teams['spectators'].players.should.contain(player1)
      
    })
  })

  describe('terminatePlayer: ', () => {
    it('should remove player from their team', () => {
      let player1 = new Player(PLAYER_1_ID)
      aGame.initializePlayer(player1)
      aGame.terminatePlayer(player1)
      aGame.teams['spectators'].players.should.be.empty
      aGame.initializePlayer(player1)
      aGame.joinTeam('0', player1)
      aGame.terminatePlayer(player1)
      aGame.teams['0'].players.should.be.empty
    })
  })
  function makeTestHouse () {
    return new House(new Shape(0, 0, 0), 'red')
  };
})
