$(document).ready(function () {
    'use strict';

    var deck;

    function createCard(name) {
        var index = name.lastIndexOf('_'),
            shape = name.substring(0, index),
            number = parseInt(name.substring(index + 1), 10),

            card = $('<div>').attr('id', name).addClass('card');

        for (var i = 0; i < number; i++) {
            card.append($('<img>').attr('src', 'images/' + shape + '.png'));
        };
        return $('<div>').addClass('card-container').append(card.click(cardClick));
    }

    function generateAllCards() {
        var shapes = ['squiggle', 'oval', 'diamond'],
            colors = ['blue', 'green', 'red'],
            fills = ['open', 'solid', 'striped'],
            cards = [];

        for (var i = 0; i < shapes.length; i++) {
            for (var j = 0; j < fills.length; j++) {
                for (var k = 0; k < colors.length; k++) {
                    for (var l = 1; l <= 3; l++) {
                        cards.push([shapes[i], fills[j], colors[k], l].join('_'));
                    }
                };
            };
        };
        return cards;
    }

    function randomShuffle(array) {
        var index = array.length, tmp, rnd;
        while (index > 0) {
            rnd = Math.floor(Math.random() * index);
            --index;

            tmp = array[index];
            array[index] = array[rnd];
            array[rnd] = tmp;
        }
        return array;
    }

    function isSet(card1, card2, card3) {
        var arr1 = card1.split('_'),
            arr2 = card2.split('_'),
            arr3 = card3.split('_');

        return ((arr1[0] == arr2[0] && arr2[0] == arr3[0]) || (arr1[0] != arr2[0] && arr2[0] != arr3[0] && arr1[0] != arr3[0])) &&
            ((arr1[1] == arr2[1] && arr2[1] == arr3[1]) || (arr1[1] != arr2[1] && arr2[1] != arr3[1] && arr1[1] != arr3[1])) &&
            ((arr1[2] == arr2[2] && arr2[2] == arr3[2]) || (arr1[2] != arr2[2] && arr2[2] != arr3[2] && arr1[2] != arr3[2])) &&
            ((arr1[3] == arr2[3] && arr2[3] == arr3[3]) || (arr1[3] != arr2[3] && arr2[3] != arr3[3] && arr1[3] != arr3[3]));
    }

    function checkCards(cards) {
        return isSet($(cards[0]).attr('id'), $(cards[1]).attr('id'), $(cards[2]).attr('id'));
    }

    function cardClick() {
        var activeCards;

        $(this).toggleClass('active');
        activeCards = $('.card.active');
        if (activeCards.length == 3) {
            activeCards.removeClass('active');
            if (checkCards(activeCards)) {
                activeCards.parent().remove();
                if ($('.card').length < 12) {
                    addCards(deck, 3);
                }
                checkGameOver();
            }
        }
    }

    function addCards(deck, number) {
        if (deck.cursor >= deck.cards.length) {
            return false;
        }
        if (deck.cursor + number >= deck.cards.length) {
            number = deck.cards.length - deck.cursor;
        }
        for (var i = 0; i < number; i++) {
            $('.game_field').append(createCard(deck.cards[deck.cursor++]));
        };
        return true;
    }

    function checkPossible() {
        var cards = $('.card',$('.card-container'));
        for (var i = 0; i < cards.length; i++) {
            for (var j = i + 1; j < cards.length; j++) {
                for (var k = j + 1; k < cards.length; k++) {
                    if (checkCards([cards[i], cards[j], cards[k]])) {
                        return true;
                    }
                }
            }
        }
        if (addCards(deck, 3)) {
            return checkPossible();
        } else {
            return false;
        }
    }

    function checkGameOver() {
        if (!checkPossible()) {
            alert('Game over!');
        };
    }

    function newGame() {
        deck = {
            cursor: 0,
            cards: randomShuffle(generateAllCards())
        };

        addCards(deck, 12);
        checkGameOver();
    }

    newGame();
});