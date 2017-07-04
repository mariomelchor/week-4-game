$(document).ready(function($) {

  // Setting up Variables
  var characters = [
    { name:"Han Solo", health: 100, image: 'han-solo.jpg' },
    { name:"Yoda", health: 120, image: 'yoda.jpg' },
    { name:"Darth Maul", health: 150, image: 'darth-maul.jpg' },
    { name:"Darth Vader", health: 180, image: 'darth-vader.jpg' }
  ];
  var attack = 0;

  // Hide from the DOM
  $('#enemies-wrap, #fighting-wrap, #game-stats, .game-stats-loose, .game-stats-win').hide();

  // Create div for each character
  $.each( characters, function( key, character ) {
    var characterItem = $('<div>').attr('class', 'character');
    var healthSpan = $('<span class="health">').attr('class', 'health');
    var characterImage = $('<img>').attr('src', 'images/characters/' + character.image + '' );
    var charInfo = $('<div class="character-info">');

    attack = Math.floor(Math.random() * 12 ) + 1;

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

    var enemy = $(this);
    enemy.addClass('character-fight');
    enemy.removeClass('character-active');

    $('.game-container').addClass('split');

    $('#fighting-wrap').show().append( enemy );
    $('#game-stats').show();

  });

  // Click event for fight btn
  $('#fight-btn').on('click', function(e) {

    var fighter = $('.character-active');
    var enemy = $('.character-fight');
    var stats = $('.attack-stats');

    var fighterHealth = fighter.attr('data-health');
    var fighterAttack = fighter.attr('data-attack');

    var enemyHealth = enemy.attr('data-health');
    var enemyAttack = enemy.attr('data-attack');

    fighterHealth = parseInt(fighterHealth);
    fighterAttack = parseInt(fighterAttack);
    enemyHealth = parseInt(enemyHealth);
    enemyAttack = parseInt(enemyAttack);

    fighterAttack += fighterAttack++;

    fighterHealth = fighterHealth - enemyAttack;
    enemyHealth = enemyHealth - fighterAttack;

    // Update data attributes
    fighter.attr('data-health', fighterHealth );
    fighter.attr('data-attack', fighterAttack );
    enemy.attr('data-health', enemyHealth );
    enemy.attr('data-attack', enemyAttack);

    // Update health stats in DOM
    fighter.find('.health').text(fighterHealth);
    enemy.find('.health').text(enemyHealth);

    // Attack Stats
    var statsHtml = '<p>You Attacked for ' + fighterAttack + ' damage </p>';
    statsHtml += '<p>Attacked you back for ' + enemyAttack + ' damage</p>';
    stats.html(statsHtml);

    console.log('Fighter Health: ' + fighterHealth);
    console.log('Enemy Health: ' + enemyHealth);

    // You Loose
    if ( fighterHealth <= 0 ) {
      console.log('You Loose');
      $('.game-stats-loose').show();
      fighter.remove();
    }

    // You Win
    if ( enemyHealth <= 0 ) {
      console.log('You Win');
      $('.game-stats-win').show();
      enemy.remove();
    }

  });

});