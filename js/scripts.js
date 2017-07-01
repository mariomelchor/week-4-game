$(document).ready(function($) {

  // Setting up Variables
  var characters = ['Obi-Wan Kenobi', 'Luke Skywalker', 'Darth Sidious', 'Darth Maul'];
  var health = [100, 120, 150, 180];

  $('#enemies-wrap, #fighting-wrap').hide();

  // Create div for each character
  $.each( characters, function( key, value ) {
    var character = $('<div>').attr('class', 'character');
    character.attr('data-health', health[key] );
    character.text(value + ' - '+ health[key] );

    $('#characters-wrap').append(character);
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
    $('#fighting-wrap').show().append( fighter );

  });


});