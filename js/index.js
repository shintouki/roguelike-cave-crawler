"use strict";

// bug - when 2 enemies are in a line next to each other, killing near one will kill both and move player extra cell
// Also see why when enemy is killed, "floor" part is run

// Template Class
var ClassName = React.createClass({
  displayName: "ClassName",

  render: function render() {
    return React.createElement("div", null);
  }
});

// ###########################

var ModalRestartGameButton = React.createClass({
  displayName: "ModalRestartGameButton",

  handleRestartButton: function handleRestartButton() {
    this.props.restartLevelButtonClicked();
  },

  render: function render() {
    return React.createElement("input", {
      id: "restartGameButton",
      type: "button",
      onClick: this.handleRestartButton,
      value: "Restart Game" });
  }
});

var ModalContent = React.createClass({
  displayName: "ModalContent",

  render: function render() {
    return React.createElement(
      "div",
      { className: "modal-content" },
      React.createElement(
        "p",
        null,
        this.props.modalContentText
      ),
      React.createElement(ModalRestartGameButton, {
        restartLevelButtonClicked: this.props.restartLevelButtonClicked })
    );
  }
});

var ModalBackground = React.createClass({
  displayName: "ModalBackground",

  render: function render() {
    return React.createElement(
      "div",
      { className: "modal", style: this.props.modalStatus },
      React.createElement(ModalContent, {
        modalContentText: this.props.modalContentText,
        restartLevelButtonClicked: this.props.restartLevelButtonClicked })
    );
  }
});

var HealthDisplay = React.createClass({
  displayName: "HealthDisplay",

  render: function render() {
    return React.createElement(
      "p",
      { className: "displayText" },
      "Health: ",
      this.props.health
    );
  }
});

var WeaponDisplay = React.createClass({
  displayName: "WeaponDisplay",

  render: function render() {
    return React.createElement(
      "p",
      { className: "displayText" },
      "Weapon: ",
      this.props.weapon
    );
  }
});

var AttackDisplay = React.createClass({
  displayName: "AttackDisplay",

  render: function render() {
    return React.createElement(
      "p",
      { className: "displayText" },
      "Attack: ",
      this.props.attack
    );
  }
});

var LevelDisplay = React.createClass({
  displayName: "LevelDisplay",

  render: function render() {
    return React.createElement(
      "p",
      { className: "displayText" },
      "Level: ",
      this.props.level
    );
  }
});

var NextLevelDisplay = React.createClass({
  displayName: "NextLevelDisplay",

  render: function render() {
    return React.createElement(
      "p",
      { className: "displayText" },
      "Next Level: ",
      this.props.xpToNext
    );
  }
});

var ToggleDarknessButton = React.createClass({
  displayName: "ToggleDarknessButton",

  handleToggleDarknessButton: function handleToggleDarknessButton() {
    this.props.darknessButtonClicked();
  },

  render: function render() {
    return React.createElement("input", {
      id: "toggleDarknessButton",
      type: "button",
      onClick: this.handleToggleDarknessButton,
      value: "Toggle Darkness" });
  }
});

var TopDisplay = React.createClass({
  displayName: "TopDisplay",

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(HealthDisplay, {
        health: this.props.health }),
      React.createElement(WeaponDisplay, {
        weapon: this.props.weapon }),
      React.createElement(AttackDisplay, {
        attack: this.props.attack }),
      React.createElement(LevelDisplay, {
        level: this.props.level }),
      React.createElement(NextLevelDisplay, {
        xpToNext: this.props.xpToNext }),
      React.createElement(ToggleDarknessButton, {
        darknessButtonClicked: this.props.darknessButtonClicked })
    );
  }
});

var SingleCell = React.createClass({
  displayName: "SingleCell",

  render: function render() {
    var cellStatus = this.props.cellStatusIndivCell;
    var visibleCellStatus = this.props.visibleIndivCell;

    return React.createElement("div", { className: visibleCellStatus });
  }
});

var CellRow = React.createClass({
  displayName: "CellRow",

  render: function render() {
    var numCols = this.props.numCols;
    var singleRow = [];
    for (var i = 0; i < numCols; i++) {
      var cellStatusIndivCell = this.props.cellStatusRow[i];
      var visibleIndivCell = this.props.visibleCellsRow[i];
      singleRow.push(React.createElement(SingleCell, {
        visibleIndivCell: visibleIndivCell,
        cellStatusIndivCell: cellStatusIndivCell,
        rowNum: this.props.rowNum,
        colNum: i,
        key: "singlecell" + i }));
    }

    return React.createElement(
      "div",
      { className: "cellRow" },
      singleRow
    );
  }
});

var GameScreen = React.createClass({
  displayName: "GameScreen",

  render: function render() {
    var numRows = this.props.numRows;
    var multipleRows = [];
    for (var i = 0; i < numRows; i++) {
      var cellStatusRow = this.props.cellStatus[i];
      var visibleCellsRow = this.props.visibleCellsArr[i];

      multipleRows.push(React.createElement(CellRow, {
        visibleCellsRow: visibleCellsRow,
        cellStatusRow: cellStatusRow,
        numCols: this.props.numCols,
        rowNum: i,
        key: "cellrow" + i }));
    }
    return React.createElement(
      "div",
      { id: "gameScreen" },
      multipleRows
    );
  }
});

var HelpButton = React.createClass({
  displayName: "HelpButton",

  handleHelpButton: function handleHelpButton() {},

  render: function render() {
    return React.createElement("input", {
      id: "helpButton",
      type: "button",
      onClick: this.handleHelpButton,
      value: "Help" });
  }
});

var FullApp = React.createClass({
  displayName: "FullApp",

  getInitialState: function getInitialState() {
    return this.setUpGame();
  },

  setUpGame: function setUpGame() {
    var rows = 60;
    var cols = 120;

    var startingHealth = 500;
    var startingWeapon = 1;
    var startingAttack = 10;
    var startingLevel = 1;
    var startingXpToNextLevel = 50;

    var cellStatusObject = this.newMapCellStatus(rows, cols);
    var cellStatusArray = cellStatusObject.cellStatusArray;
    var playerCoords = cellStatusObject.playerCoord;

    // Start with darkness on
    var visibleCellsArr = this.drawMapWithDarkness(rows, cols, playerCoords[0], playerCoords[1], cellStatusArray);

    return {
      modalStatus: { display: "none" },
      modalContentText: null,
      numRows: rows,
      numCols: cols,
      playerRow: playerCoords[0],
      playerCol: playerCoords[1],
      cellStatusArr: cellStatusArray,
      visibleCells: visibleCellsArr,
      health: startingHealth,
      weapon: startingWeapon,
      attack: startingAttack,
      level: startingLevel,
      xpToNext: startingXpToNextLevel,
      enemies: [],
      bossHealth: 300,
      darknessOn: true
    };
  },

  componentWillMount: function componentWillMount() {
    // This is needed so keydown
    // window.focus();
    document.addEventListener("keydown", this.handleArrowKeys, false);

    // Disable page scroll using keys
    document.addEventListener("keydown", function (e) {
      // 32 is space, rest are arrow keys
      if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
      }
    }, false);
  },

  componentWillUnmount: function componentWillUnmount() {
    document.removeEventListener("keydown", this.handleArrowKeys, false);
  },

  handleArrowKeys: function handleArrowKeys(e) {
    var row = this.state.playerRow;
    var col = this.state.playerCol;
    var cellStatus = this.state.cellStatusArr;

    if (e.keyCode === 38) {
      // Move up
      // Check if not at topmost row and up is not a wall
      if (row > 0 && cellStatus[row - 1][col] != "wall") {
        var newCellStatus = cellStatus[row - 1][col];
        this.moveToNewCell(row - 1, col, newCellStatus);
      }
    } else if (e.keyCode === 40) {
      // Move down
      if (row < this.state.numRows - 1 && cellStatus[row + 1][col] != "wall") {
        var newCellStatus = cellStatus[row + 1][col];
        this.moveToNewCell(row + 1, col, newCellStatus);
      }
    } else if (e.keyCode === 37) {
      // Move left
      if (col > 0 && cellStatus[row][col - 1] != "wall") {
        var newCellStatus = cellStatus[row][col - 1];
        this.moveToNewCell(row, col - 1, newCellStatus);
      }
    } else if (e.keyCode === 39) {
      // Move right
      if (col < this.state.numCols - 1 && cellStatus[row][col + 1] != "wall") {
        var newCellStatus = cellStatus[row][col + 1];
        this.moveToNewCell(row, col + 1, newCellStatus);
      }
    }
  },

  moveToNewCell: function moveToNewCell(newRow, newCol, newCellStatus) {

    function playerLose(that, playerHealth) {
      // Turn keydown event off
      document.removeEventListener("keydown", that.handleArrowKeys, false);
      that.setState({
        modalStatus: { display: "block" },
        modalContentText: "You Lose!",
        health: playerHealth
      });
    };

    function attackRandomRange(attack) {
      var percentageOfAttack = attack * 0.2;
      var randomDamage = Math.floor(Math.random() * percentageOfAttack) + 1;
      return attack + randomDamage;
    };

    var cellStatusArray = this.state.cellStatusArr;
    if (newCellStatus === "floor") {
      console.log("floor");
      cellStatusArray[newRow][newCol] = "player";
      cellStatusArray[this.state.playerRow][this.state.playerCol] = "floor";

      var visibleCellsArr = undefined;
      if (this.state.darknessOn === true) {
        // If darkness is on, draw map with darkness
        visibleCellsArr = this.drawMapWithDarkness(this.state.numRows, this.state.numCols, newRow, newCol, cellStatusArray);
      } else {
        // If darkness is off, don't draw map with darkness
        visibleCellsArr = cellStatusArray;
      }
      this.setState({
        playerRow: newRow,
        playerCol: newCol,
        cellStatusArr: cellStatusArray,
        visibleCells: visibleCellsArr
      });
    } else if (newCellStatus === "enemy") {
      console.log("enemy");
      var playerAttack = this.state.attack;
      var playerHealth = this.state.health;
      var enemyAttack = 20;
      var playerAttackRange = attackRandomRange(playerAttack);
      var enemyAttackRange = attackRandomRange(enemyAttack);

      var enemyInList = false;
      var enemyList = this.state.enemies;
      var visibleCellsArr = undefined;
      if (this.state.darknessOn === true) {
        // Draw map with darkness, but with current player row and col since we didn't move yet because enemy is still alive
        visibleCellsArr = this.drawMapWithDarkness(this.state.numRows, this.state.numCols, this.state.playerRow, this.state.playerCol, cellStatusArray);
      } else {
        visibleCellsArr = cellStatusArray;
      }

      for (var i = 0; i < enemyList.length; i++) {
        if (enemyList[i].row === newRow && enemyList[i].col == newCol) {
          enemyInList = true;
          var currentEnemy = enemyList[i];
          currentEnemy.health -= playerAttackRange;
          if (currentEnemy.health <= 0) {
            var xpReward = 40;
            var xpPerLevel = 50;
            var hpGainForLevelUp = 100;
            var attackGainForLevelUp = 10;

            var xpToNextLevel = this.state.xpToNext;
            var playerLevel = this.state.level;
            xpToNextLevel -= xpReward;
            if (xpToNextLevel <= 0) {
              // Level up
              playerLevel++;
              var totalXpNeededForNextLevel = playerLevel * xpPerLevel;
              xpToNextLevel += totalXpNeededForNextLevel;
              playerHealth += hpGainForLevelUp;
              playerAttack += attackGainForLevelUp;
            }
            // Set cell where player used to be to floor
            cellStatusArray[this.state.playerRow][this.state.playerCol] = "floor";
            // Enemy is dead so move player to where enemy used to be.
            cellStatusArray[newRow][newCol] = "player";

            if (this.state.darknessOn === true) {
              // If darkness is on, draw map with darkness
              visibleCellsArr = this.drawMapWithDarkness(this.state.numRows, this.state.numCols, newRow, newCol, cellStatusArray);
            } else {
              // If darkness is off, don't draw map with darkness
              visibleCellsArr = cellStatusArray;
            }

            // Set player coords to where enemy used to be only if enemy is dead
            this.setState({
              playerRow: newRow,
              playerCol: newCol,
              level: playerLevel,
              xpToNext: xpToNextLevel,
              health: playerHealth,
              attack: playerAttack
            });
            // Remove current enemy from enemy list array
            enemyList.splice(i, 1);
          }
        }
      }
      if (!enemyInList) {
        var enemyHealth = 50 - playerAttackRange;
        var newEnemy = {
          row: newRow,
          col: newCol,
          health: enemyHealth
        };
        enemyList.push(newEnemy);
      }
      playerHealth -= enemyAttackRange;
      if (playerHealth <= 0) {
        playerLose(this, playerHealth);
      } else {
        this.setState({
          cellStatusArr: cellStatusArray,
          visibleCells: visibleCellsArr,
          health: playerHealth,
          enemies: enemyList
        });
      }
    } else if (newCellStatus === "boss") {
      console.log("boss");
      var playerAttack = this.state.attack;
      var playerHealth = this.state.health;
      var bossAttack = 50;
      var playerAttackRange = attackRandomRange(playerAttack);
      var bossAttackRange = attackRandomRange(bossAttack);
      var bossHealth = this.state.bossHealth - playerAttackRange;
      var bossDead = false;

      var visibleCellsArr = undefined;
      if (this.state.darknessOn === true) {
        visibleCellsArr = this.drawMapWithDarkness(this.state.numRows, this.state.numCols, this.state.playerRow, this.state.playerCol, cellStatusArray);
      } else {
        visibleCellsArr = cellStatusArray;
      }

      if (bossHealth <= 0) {
        bossDead = true;
        // Turn keydown event off
        document.removeEventListener("keydown", that.handleArrowKeys, false);
        // Set cell where player used to be to floor
        cellStatusArray[this.state.playerRow][this.state.playerCol] = "floor";
        // Boss is dead so move player to where boss used to be.
        cellStatusArray[newRow][newCol] = "player";

        if (this.state.darknessOn === true) {
          // If darkness is on, draw map with darkness
          visibleCellsArr = this.drawMapWithDarkness(this.state.numRows, this.state.numCols, newRow, newCol, cellStatusArray);
        } else {
          // If darkness is off, don't draw map with darkness
          visibleCellsArr = cellStatusArray;
        }

        // Set player coords to where boss used to be only if boss is dead
        this.setState({
          modalStatus: { display: "block" },
          modalContentText: "You Win!",
          playerRow: newRow,
          playerCol: newCol
        });
      }
      if (!bossDead) {
        playerHealth -= bossAttackRange;
        if (playerHealth <= 0) {
          playerLose(this, playerHealth);
        } else {
          this.setState({
            cellStatusArr: cellStatusArray,
            visibleCells: visibleCellsArr,
            health: playerHealth,
            bossHealth: bossHealth
          });
        }
      }
    } else if (newCellStatus === "health") {
      console.log("health");
      cellStatusArray[newRow][newCol] = "player";
      cellStatusArray[this.state.playerRow][this.state.playerCol] = "floor";
      var healthLevel = this.state.health + 50;

      var visibleCellsArr = undefined;
      if (this.state.darknessOn === true) {
        // If darkness is on, draw map with darkness
        visibleCellsArr = this.drawMapWithDarkness(this.state.numRows, this.state.numCols, newRow, newCol, cellStatusArray);
      } else {
        // If darkness is off, don't draw map with darkness
        visibleCellsArr = cellStatusArray;
      }

      this.setState({
        playerRow: newRow,
        playerCol: newCol,
        cellStatusArr: cellStatusArray,
        visibleCells: visibleCellsArr,
        health: healthLevel
      });
    } else if (newCellStatus === "weapon") {
      console.log("weapon");
      cellStatusArray[newRow][newCol] = "player";
      cellStatusArray[this.state.playerRow][this.state.playerCol] = "floor";
      var weaponLevel = this.state.weapon + 1;
      var attackLevel = this.state.attack + 10;

      var visibleCellsArr = undefined;
      if (this.state.darknessOn === true) {
        // If darkness is on, draw map with darkness
        visibleCellsArr = this.drawMapWithDarkness(this.state.numRows, this.state.numCols, newRow, newCol, cellStatusArray);
      } else {
        // If darkness is off, don't draw map with darkness
        visibleCellsArr = cellStatusArray;
      }

      this.setState({
        playerRow: newRow,
        playerCol: newCol,
        cellStatusArr: cellStatusArray,
        visibleCells: visibleCellsArr,
        weapon: weaponLevel,
        attack: attackLevel
      });
    }
  },

  newMapCellStatus: function newMapCellStatus(numRow, numCol) {
    var cellStatusArr = [];
    // Create empty map filled with walls
    for (var i = 0; i < numRow; i++) {
      var row = [];
      for (var j = 0; j < numCol; j++) {
        row.push("wall");
      }
      cellStatusArr.push(row);
    }

    // Draw floor by digging from middle
    var midRow = Math.round(numRow / 2);
    var midCol = Math.round(numCol / 2);
    // Total number of floor cells
    var numFloorCells = Math.round(numRow * numCol / 3);

    // Start with a floor cell in the middle
    cellStatusArr[midRow][midCol] = "floor";
    numFloorCells--;

    var currRow = midRow;
    var currCol = midCol;
    while (numFloorCells > 0) {
      var randNum = Math.floor(Math.random() * 4);

      if (randNum === 0 && currRow > 0) {
        // Move up
        currRow--;
        if (cellStatusArr[currRow][currCol] !== "floor") {
          cellStatusArr[currRow][currCol] = "floor";
          numFloorCells--;
        }
      } else if (randNum === 1 && currCol < numCol - 1) {
        // Move right
        currCol++;
        if (cellStatusArr[currRow][currCol] !== "floor") {
          cellStatusArr[currRow][currCol] = "floor";
          numFloorCells--;
        }
      } else if (randNum === 2 && currRow < numRow - 1) {
        // Move down
        currRow++;
        if (cellStatusArr[currRow][currCol] !== "floor") {
          cellStatusArr[currRow][currCol] = "floor";
          numFloorCells--;
        }
      } else if (randNum === 3 && currCol > 0) {
        // Move left
        currCol--;
        if (cellStatusArr[currRow][currCol] !== "floor") {
          cellStatusArr[currRow][currCol] = "floor";
          numFloorCells--;
        }
      }
    }

    // Place different cells
    function placeCells(type, numCells) {
      while (numCells > 0) {
        currRow = Math.floor(Math.random() * numRow);
        currCol = Math.floor(Math.random() * numCol);
        if (cellStatusArr[currRow][currCol] === "floor") {
          cellStatusArr[currRow][currCol] = type;
          numCells--;
        }
      }
    }

    // Place player cell and return player coords
    function placePlayerCell(numCells) {
      var playerCoords = [];
      while (numCells > 0) {
        currRow = Math.floor(Math.random() * numRow);
        currCol = Math.floor(Math.random() * numCol);
        if (cellStatusArr[currRow][currCol] === "floor") {
          cellStatusArr[currRow][currCol] = "player";
          playerCoords.push(currRow);
          playerCoords.push(currCol);
          numCells--;
        }
      }
      return playerCoords;
    }

    // Place different cells
    var playerCoordinates = placePlayerCell(1);
    placeCells("boss", 1);
    placeCells("enemy", 20);
    placeCells("health", 10);
    placeCells("weapon", 5);

    var dataToReturn = {
      playerCoord: playerCoordinates,
      cellStatusArray: cellStatusArr
    };

    return dataToReturn;
  },

  drawMapWithDarkness: function drawMapWithDarkness(rows, cols, playerRow, playerCol, cellStatusArray) {
    var visibleCellsArr = [];
    // Draw map with all black cells
    for (var i = 0; i < rows; i++) {
      var row = [];
      for (var j = 0; j < cols; j++) {
        row.push("darkness");
      }
      visibleCellsArr.push(row);
    }
    // Draw only the visible part around player
    var visibleBoxLength = 8;
    for (var i = 0; i <= visibleBoxLength; i++) {
      for (var j = 0; j < visibleBoxLength; j++) {
        if (cellStatusArray[playerRow + i] !== undefined && cellStatusArray[playerRow + i][playerCol + j] !== undefined) {
          visibleCellsArr[playerRow + i][playerCol + j] = cellStatusArray[playerRow + i][playerCol + j];
        }
        if (cellStatusArray[playerRow - i] !== undefined && cellStatusArray[playerRow - i][playerCol - j] !== undefined) {
          visibleCellsArr[playerRow - i][playerCol - j] = cellStatusArray[playerRow - i][playerCol - j];
        }
        if (cellStatusArray[playerRow + i] !== undefined && cellStatusArray[playerRow + i][playerCol - j] !== undefined) {
          visibleCellsArr[playerRow + i][playerCol - j] = cellStatusArray[playerRow + i][playerCol - j];
        }
        if (cellStatusArray[playerRow - i] !== undefined && cellStatusArray[playerRow - i][playerCol + j] !== undefined) {
          visibleCellsArr[playerRow - i][playerCol + j] = cellStatusArray[playerRow - i][playerCol + j];
        }
      }
    }
    return visibleCellsArr;
  },

  restartLevelButtonClicked: function restartLevelButtonClicked() {
    this.setState(this.setUpGame());
    // Turn keys back on
    document.addEventListener("keydown", this.handleArrowKeys, false);
  },

  darknessButtonClicked: function darknessButtonClicked() {

    if (this.state.darknessOn === true) {
      // Turn darkness off by setting visible cells array to the cell array with no darkness
      var visibleCellsArray = this.state.cellStatusArr;
      this.setState({
        darknessOn: false,
        visibleCells: visibleCellsArray
      });
    } else {
      // Turn darkness on
      var visibleCellsArray = this.drawMapWithDarkness(this.state.numRows, this.state.numCols, this.state.playerRow, this.state.playerCol, this.state.cellStatusArr);
      this.setState({
        darknessOn: true,
        visibleCells: visibleCellsArray
      });
    }
  },

  render: function render() {
    return React.createElement(
      "div",
      { id: "fullApp" },
      React.createElement(ModalBackground, {
        modalStatus: this.state.modalStatus,
        modalContentText: this.state.modalContentText,
        restartLevelButtonClicked: this.restartLevelButtonClicked }),
      React.createElement(TopDisplay, {
        health: this.state.health,
        weapon: this.state.weapon,
        attack: this.state.attack,
        level: this.state.level,
        xpToNext: this.state.xpToNext,
        darknessButtonClicked: this.darknessButtonClicked }),
      React.createElement(GameScreen, {
        numRows: this.state.numRows,
        numCols: this.state.numCols,
        visibleCellsArr: this.state.visibleCells,
        cellStatus: this.state.cellStatusArr })
    );
  }
});

ReactDOM.render(React.createElement(FullApp, null), document.getElementById('app'));