$(document).ready(function($) {

  // Setting up Variables
  var characters = [
    { name:"Stormtrooper", health: 80, image: 'stormtrooper.jpg' },
    { name:"Han Solo", health: 100, image: 'han-solo.jpg' },
    { name:"Yoda", health: 120, image: 'yoda.jpg' },
    { name:"Darth Maul", health: 150, image: 'darth-maul.jpg' },
    { name:"Darth Vader", health: 180, image: 'darth-vader.jpg' }
  ];
  var attack = 0;
  var attackCounter = 0;
  var hasEnemy = false;

  // Hide from the DOM
  $('#enemies-wrap, #fighting-wrap, #game-stats, #restart-btn, .game-stats-loose, .game-stats-win').hide();

  // Create div for each character
  $.each( characters, function( key, character ) {
    var characterItem = $('<div>').attr('class', 'character');
    var healthSpan = $('<span class="health">').attr('class', 'health');
    var characterImage = $('<img>').attr('src', 'images/characters/' + character.image + '' );
    var charInfo = $('<div class="character-info">');

    attack = Math.floor(Math.random() * 21 ) + 5;

    characterItem.attr('data-health', character.health );
    characterItem.attr('data-attack', attack );

    healthSpan.text( character.health );
    charInfo.text( character.name );
    charInfo.append( healthSpan );

    characterItem.append( characterImage );
    characterItem.append( charInfo );

    $('#characters-wrap').append( characterItem );

  });

  // Click event for characters
  $('.character').on('click', function(e) {
    $(this).addClass('character-active');

    var enemies =  $('.character').not( '.character-active' );
    enemies.addClass('character-enemy');
    enemies.removeClass('character');

    $('#enemies-wrap').show().append(enemies);
    $('#pick-character').text('Your Character');
  });

  // Had to use document for elements that were moved.
  $(document).on('click', '.character-enemy', function(e) {

    if ( ! hasEnemy ) {
      var enemy = $(this);
      enemy.addClass('character-fight');
      enemy.removeClass('character-active');

      $('.game-container').addClass('game-container-split');

      $('#fighting-wrap').show().append( enemy );
      $('#game-stats').show();

      hasEnemy = true;
    }

  });

  // Click event for fight btn
  $('#fight-btn').on('click', function(e) {

    $('.game-stats-loose').hide();
    $('.game-stats-win').hide();

    var stats = $('.attack-stats');
    var fighter = $('.character-active');
    var enemy = $('.character-fight');

    var fighterHealth = fighter.attr('data-health');
    var fighterAttack = fighter.attr('data-attack');
    var enemyHealth = enemy.attr('data-health');
    var enemyAttack = enemy.attr('data-attack');

    var statsHtml = '';

    // if no character is available to fight
    if ( ! hasEnemy ) {

      statsHtml = '<p>Choose a new Enemy</p>';
      stats.html(statsHtml);

    } else {

      fighterHealth = parseInt(fighterHealth);
      fighterAttack = parseInt(fighterAttack);
      enemyHealth = parseInt(enemyHealth);
      enemyAttack = parseInt(enemyAttack);

      attackCounter += fighterAttack++;

      fighterHealth = fighterHealth - enemyAttack;
      enemyHealth = enemyHealth - attackCounter;

      // Update data attributes
      fighter.attr('data-health', fighterHealth );
      enemy.attr('data-health', enemyHealth );

      // Update health stats in DOM
      fighter.find('.health').text(fighterHealth);
      enemy.find('.health').text(enemyHealth);

      // Attack Stats
      statsHtml = '<p>You Attacked for ' + attackCounter + ' damage </p>';
      statsHtml += '<p>Attacked you back for ' + enemyAttack + ' damage</p>';
      stats.html(statsHtml);

      // You Loose
      if ( fighterHealth <= 0 ) {
        $('.game-stats-loose').show();
        fighter.remove();
        $('#restart-btn').show();
      }

      // You Win
      if ( enemyHealth <= 0 ) {
        $('.game-stats-win').show();
        enemy.remove();
        hasEnemy = false;
      }

      // If no enemies
      if ( $('.character-enemy').length == 0 ) {
        $('#restart-btn').show();
      }

    }

  });

  // Reset Game
  $('#restart-btn').on('click', function(e) {
    location.reload();
  });

});