/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, gamePlaying, previousRoll, winScore;

init();  // 0 will be the first player, 1 will be the second player.


// To change the content inside a selected query, we use the textContent method.
// document.querySelector('#current-' + activePlayer).textContent = dice;

// To change the HTML inside a selected query, we use the innerHTML method.
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'

// Store the contents of #score-0 into the variable x.
var x = document.querySelector('#score-0').textContent;



//////////////////////////////////////////////////
//     WHEN THE ROLL DICE BUTTON IS CLICKED     //
//////////////////////////////////////////////////

document.querySelector('.btn-roll').addEventListener('click', function() {
    // Check if the game is playing.
    if (gamePlaying) {
        
        // 1. Random number.
        var dice = Math.floor(Math.random() * 6) + 1;
    
        // 2. Display the result.
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'style/dice-' + dice + '.png';
    
        // 3. Update the round score IFF the rolled number was NOT a 1.
        if (dice !== 1) {

            // If player rolls two 6's in a roll.
            if (dice === 6 && previousRoll === 6) {
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                nextPlayer();
            } else {
                // Add score
                roundScore += dice;
                previousRoll = dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }
        } else {
            // Next player
            nextPlayer();
    
        }
    }
});

//////////////////////////////////////////////////
//        WHEN THE HOLD BUTTON IS CLICKED       //
//////////////////////////////////////////////////

document.querySelector('.btn-hold').addEventListener('click', function() {
    // Check if the game is playing
    if (gamePlaying) {
        // Add roundScore to Global Score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= winScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // Next Player
            nextPlayer();
        }
    }
});


//////////////////////////////////////////////////
//      WHEN THE NEW GAME BUTTON IS CLICKED     //
//////////////////////////////////////////////////

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    winScore = 100;
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    previousRoll = 0;

    // Change the CSS of some element. (This changes the inline of the given query with the dice class)
    document.querySelector('.dice').style.display = 'none';


    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
    }

function nextPlayer() {
            // Next player
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        
            roundScore = 0;
            previousRoll = 0;
            document.getElementById('current-0').textContent = '0';
            document.getElementById('current-1').textContent = '0';
    
            // Toggle the 'active' class in the selected classes in querySelector
            document.querySelector('.player-0-panel').classList.toggle('active');
            document.querySelector('.player-1-panel').classList.toggle('active');
    
            document.querySelector('.dice').style.display = 'none';
}