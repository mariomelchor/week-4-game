$(document).ready(function($) {

  // Setting up Variables
  var characters = ['Obi-Wan Kenobi', 'Luke Skywalker', 'Darth Sidious', 'Darth Maul'];
  var attack = 0;
  var health = [100, 120, 150, 180];

  $('#enemies-wrap, #fighting-wrap').hide();

  // Create div for each character
  $.each( characters, function( key, value ) {
    var character = $('<div>').attr('class', 'character');
    var healthSpan = $('<span class="health">').attr('class', 'health');

    attack = Math.floor(Math.random() * 10 ) + 2;

    character.attr('data-health', health[key] );
    character.attr('data-attack', attack );

    character.text( value );
    healthSpan.text( health[key] );

    $('#characters-wrap').append(character);
    character.append(healthSpan);
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
    console.log(enemyHealth);
    console.log(fighterAttack);

    enemyHealth = enemyHealth - fighterAttack;


    console.log(enemyHealth);

  });


});