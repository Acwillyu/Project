class Dice {
    static roll() 
    {
      return Math.floor(Math.random() * 6) + 1;
    }
  }
  

  class Player {
    constructor() 
    {
      this.reset();
    }
  
    reset() 
    {
      this.score = 0;
      this.roundScore = 0;
      this.diceValues = [0, 0];
    }
  
    rollDice()
     {
      this.diceValues = [Dice.roll(), Dice.roll()];
      this.calculateRoundScore();
    }
  
    calculateRoundScore() 
    {
      const [die1, die2] = this.diceValues;
      if (die1 == 1 || die2 == 1) 
      {
        this.roundScore = 0;
      } else if (die1 == die2) 
      {
        this.roundScore = (die1 + die2) * 2;
      } else {
        this.roundScore = die1 + die2;
      }
      this.score += this.roundScore;
    }
  }
  

  class Game 
  {
    constructor(player, computer) 
    {
      this.player = player;
      this.computer = computer;
      this.round = 0;
    }
  
    newRound() {

        this.player.rollDice();
        this.computer.rollDice();
      

        this.animateDice(() => 
        {

          this.updateUI();
          this.round++;
          this.updateRoundDisplay();
      
          if (this.round >= 3) {
            this.endGame();
          }
        });
      }

    updateRoundDisplay() 
    {
        $('#displayRound').text(`Round: ${this.round}`);
    }

    animateDice(callback) {

        $('.dice').addClass('rolling'); 
      

        setTimeout(() => {
          $('.dice').removeClass('rolling');
          

          callback();
        }, 1000); 
      }

    resetGame() 
    {
        this.player.reset();
        this.computer.reset();
        this.round = 0;
    
        $('#playerScore').text('0');
        $('#playerRoundScore').text('0');
        $('#computerScore').text('0');
        $('#computerRoundScore').text('0');
        $('#roundInfo').text('Press ROLL to start');
        $('#winnerInfo').text('');
        $('#playerDice1').attr('src', 'images/dice_blank.png');
        $('#playerDice2').attr('src', 'images/dice_blank.png');
        $('#computerDice1').attr('src', 'images/dice_blank.png');
        $('#computerDice2').attr('src', 'images/dice_blank.png');
    

        $('#rulesMenu').show(); 

        $('#rollButton').prop('disabled', false);
    }
    
  
    updateUI(isReset = false) 
    {
 
    $('#playersDice1').attr('src', `images/dice_${this.player.diceValues[0]}.png`);
    $('#playersDice2').attr('src', `images/dice_${this.player.diceValues[1]}.png`);
        
    $('#playerScore').text(this.player.score);
    $('#playerRoundScore').text(this.player.roundScore);
  

    $('#computersDice1').attr(`src`,`images/dice_${this.computer.diceValues[0]}.png`);
    $('#computersDice2').attr(`src`,`images/dice_${this.computer.diceValues[1]}.png`);
    $('#computerScore').text(this.computer.score);
    $('#computerRoundScore').text(this.computer.roundScore);
  

      $('#roundInfo').text(`Round: ${this.round}`);
  

      if (isReset) 
      {
        $('.dice').attr('src', 'images/dice_blank.png');
        $('.score').text('0');
        $('#roundInfo').text('Press ROLL to start');
        $('#winnerInfo').text('');
        $('#rollButton').prop('disabled', false);
      }
    }
  
    endGame() 
    {
        let winnerText = ''; 

        if (this.player.score > this.computer.score) 
        {
            winnerText = 'Player wins!';
        } else if (this.player.score < this.computer.score)
         {
            winnerText = 'Computer wins!';
        } else {
            winnerText = 'It\'s a tie!';
        }

        $('#winnerInfo').text(winnerText);


        $('#rollButton').prop('disabled', true);
    }
    
  }
  

  $(document).ready(function() 
  {
    const player   = new Player();
    const computer = new Player();
    const game     = new Game(player, computer);

    $('#toggleRulesButton').click(function() {
        $('#rulesWindow').slideToggle(); 
    });
  
    $('#rollButton').on('click', function() {
      game.newRound();
    });
  
    $('#newGameButton').on('click', function() {
      game.resetGame();
    });

  });


  