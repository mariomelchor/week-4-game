$(document).ready(function($) {

  // Setting up Variables
  var characters = [
    { name:"Han Solo", health: 100, image: 'han-solo.jpg' },
    { name:"Yoda", health: 120, image: 'yoda.jpg' },
    { name:"Darth Maul", health: 150, image: 'darth-maul.jpg' },
    { name:"Darth Vader", health: 180, image: 'darth-vader.jpg' }
  ];
  var attack = 0;

  $('#enemies-wrap, #fighting-wrap').hide();

  // Create div for each character
  $.each( characters, function( key, character ) {
    var characterItem = $('<div>').attr('class', 'character');
    var healthSpan = $('<span class="health">').attr('class', 'health');
    var characterImage = $('<img>').attr('src', 'images/characters/' + character.image + '' );
    var charInfo = $('<div class="character-info">');

    attack = Math.floor(Math.random() * 10 ) + 2;

    characterItem.attr('data-health', character.health );
    characterItem.attr('data-attack', attack );

    healthSpan.text( character.health );
    charInfo.text( character.name );
    charInfo.append( healthSpan );

    characterItem.append(characterImage);
    characterItem.append(charInfo);

    $('#characters-wrap').append( characterItem );

  });

  // Click event for characters
  $('.character').on('click', function(e) {
    // console.log( $(this).attr('data-health' ) );
    $(this).addClass('character-active');

    var enemies =  $('.character').not( '.character-active' );
    enemies.addClass('character-enemy');
    enemies.removeClass('character');

    $('#enemies-wrap').show().append(enemies);
    $('#pick-character').text('Your Charater');
  });

  // Had to use document for elements that were moved.
  $(document).on('click', '.character-enemy', function(e) {

    var fighter = $(this);
    fighter.addClass('character-fight');
    fighter.removeClass('character-active');

    $('#fighting-wrap').show().append( fighter );

  });

  // Click event for fight btn
  $('#fight-btn').on('click', function(e) {

    var fighter = $('.character-active');
    var enemy = $('.character-fight');

    var fighterHealth = fighter.attr('data-health');
    var fighterAttack = fighter.attr('data-attack');

    var enemyHealth = enemy.attr('data-health');
    var enemyAttack = enemy.attr('data-attack');

    fighterHealth = parseInt(fighterHealth);
    fighterAttack = parseInt(fighterAttack);
    enemyHealth = parseInt(enemyHealth);
    enemyAttack = parseInt(enemyAttack);

    fighterAttack += fighterAttack++;
    enemyAttack += enemyAttack++;

    fighterHealth = fighterHealth - enemyAttack;
    enemyHealth = enemyHealth - fighterAttack;

    console.log('Fighter Health : ' + fighterHealth);
    console.log('Fighter Attack : ' + fighterAttack);
    console.log('Enemy Health : ' + enemyHealth);
    console.log('Enemy Attack : ' + enemyAttack);

    // Update data attributes
    fighterHealth = fighter.attr('data-health', fighterHealth );
    fighterAttack = fighter.attr('data-attack', fighterAttack );
    enemyHealth = enemy.attr('data-health', enemyHealth );
    enemyAttack = enemy.attr('data-attack', enemyAttack);

  });


});