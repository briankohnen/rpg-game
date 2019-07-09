$(document).ready(function () {

// declare character objects
var characterOne = {
    name : "Harry Potter",
    hp : 100,
    atkPower : 7,
    counterAtkPower : 7,
    id : "charOne"
};

var characterTwo = {
    name : "Severus Snape",
    hp : 120,
    atkPower : 4,
    counterAtkPower : 8,
    id : "charTwo"
};

var characterThree = {
    name : "Voldemort",
    hp : 105,
    atkPower : 5,
    counterAtkPower : 9,
    id : "charThree"
};

var characterFour = {
    name : "Albus Dumbledore",
    hp : 110,
    atkPower : 6,
    counterAtkPower : 6,
    id : "charFour"
};

// assign global variables for .html targeting and game logic
var otherChars = $("#characters");
var characterChosen = false;
var enemyChosen = false;
var myCharacterObject;
var myCharacter;
var enemyFighter;
var isFighting = false;
var enemiesDefeated = 0;
var baseAtkPower;
$("#resetButton").css("opacity", 0);
$("#charOneHp").text(characterOne.hp);
$("#charTwoHp").text(characterTwo.hp);
$("#charThreeHp").text(characterThree.hp);
$("#charFourHp").text(characterFour.hp);

// game function
function gameStart() {

// function occurring on click of character images on screen
    $(".charOption").on("click", function () {
        // if no character has been assigned, the first clicked image becomes myCharacter
        if (characterChosen === false) {
            myCharacter = this;
            // removeClass of charOption so myCharacter cannot be selected as an enemy later in game
            $(myCharacter).removeClass("charOption");
            // move myCharacter and enemies to correct sections on screen and set characterChosen to true
            $("#myCharacter").append(this);
            $("#enemies").append(otherChars);
            characterChosen = true;
            // use .attr to extract id data of selected character image, and assign character 1, 2, 3, or 4
            var myCharacterId = $(myCharacter).attr("id");
            if (myCharacterId === "charOne") {
                myCharacterObject = characterOne;
                $("#charOneHp").text(myCharacterObject.hp);
            } else if (myCharacterId === "charTwo") {
                myCharacterObject = characterTwo;
                $("#charTwoHp").text(myCharacterObject.hp);
            } else if (myCharacterId === "charThree") {
                myCharacterObject = characterThree;
                $("#charThreeHp").text(myCharacterObject.hp);
            } else if (myCharacterId === "charFour") {
                myCharacterObject = characterFour
                $("#charFourHp").text(myCharacterObject.hp);
            }
            console.log(myCharacterObject);

            // after character is chosen, user can click enemy images to fight them
            if (characterChosen === true) {
                $(".charOption").on("click", function () {
                    // if no enemy is chosen, select clicked enemy and move to fight section on screen, set isFighting to true
                    if (enemyChosen === false) {
                        enemyFighter = this;
                        $("#defenderSection").append(this);
                        enemyChosen = true;
                        isFighting = true;
                        $("#attackInfo").text("");
                        // similar method of using .attr on line 57 but to assign correct enemy character here
                        var enemyId = $(enemyFighter).attr("id");
                        if (enemyId === "charOne") {
                            enemyFighter = characterOne;
                        } else if (enemyId === "charTwo") {
                            enemyFighter = characterTwo;
                        } else if (enemyId === "charThree") {
                            enemyFighter = characterThree;
                        } else if (enemyId === "charFour") {
                            enemyFighter = characterFour;
                        }
                        baseAtkPower = myCharacterObject.atkPower;
                        console.log(enemyFighter);
                    }
                })
            };         
        }
    });

// functions occurring on click of attackButton
    $("#attackButton").on("click", function () {
        if (enemyChosen === true) {
        if (isFighting === true) {
            if (myCharacterObject.hp > 0) {
                // if enemy's hp is above 0, hit enemy and recieve a hit from the enemy. add 5 to myCharacter.atkPower each hit
                // display the hit information on the page at lines 109-110
                if (enemyFighter.hp > 0) {
                    var hitInfo = Math.round(myCharacterObject.atkPower + (Math.random() * myCharacterObject.atkPower));
                    var counterInfo = Math.round(enemyFighter.counterAtkPower + (Math.random() * enemyFighter.counterAtkPower));
                    enemyFighter.hp = enemyFighter.hp - hitInfo;
                    myCharacterObject.hp = myCharacterObject.hp - counterInfo;
                    $("#attackInfo").text("You hit " + enemyFighter.name + " for " + hitInfo + " points");
                    $("#attackInfo").append("<br>" + enemyFighter.name + " hit you for " + counterInfo + " points");
                    myCharacterObject.atkPower += baseAtkPower;
                    console.log("enemy hp : " + enemyFighter.hp);
                    if (enemyFighter.id === "charOne") {
                        $("#charOneHp").text(enemyFighter.hp);
                    } else if (enemyFighter.id === "charTwo") {
                        $("#charTwoHp").text(enemyFighter.hp);
                    } else if (enemyFighter.id === "charThree") {
                        $("#charThreeHp").text(enemyFighter.hp);
                    } else if (enemyFighter.id === "charFour") {
                        $("#charFourHp").text(enemyFighter.hp);
                    }
                    console.log("my atkPower : " + myCharacterObject.atkPower);
                    console.log("my hp : " + myCharacterObject.hp);
                    if (myCharacterObject.id === "charOne") {
                        $("#charOneHp").text(myCharacterObject.hp);
                    } else if (myCharacterObject.id === "charTwo") {
                        $("#charTwoHp").text(myCharacterObject.hp);
                    } else if (myCharacterObject.id === "charThree") {
                        $("#charThreeHp").text(myCharacterObject.hp);
                    } else if (myCharacterObject.id === "charFour") {
                        $("#charFourHp").text(myCharacterObject.hp);
                    }
                // if enemy's hp <= 0 display a win, and hide the defeated enemy, reset isFighting / enemyChosen to false    
                } else {
                    console.log("you won the battle");
                    isFighting = false;
                    enemyChosen = false;
                    enemiesDefeated++;
                    $("#" + enemyFighter.id).css("display", "none");
                    $("#attackInfo").text("You won the battle, choose another enemy");
                }
            // if myCharacter.hp is <=0 display death, only option is to restart game
            } else {
                console.log("you died, restart");
                isFighting = false;
                $("#attackInfo").text("You died. Restart?");
                $("#resetButton").css("opacity", 100);
                }
            }
            // if no enemy is chosen display Nothing to fight, if all enemies defeated game over
        } else {
                $("#attackInfo").text("Nothing to fight here");
        } if (enemiesDefeated === 3) {
            $("#attackInfo").text("You defeated all the enemies! Play again?");
            $("#resetButton").css("opacity", 100);
        }
    });
};

gameStart();

// reload page on click of reset button
$("#resetButton").on("click", function () {
    location.reload();
});
});
















    // function gameReset () {
    //     $("#attackInfo").text("");
    //     $(myCharacter).addClass("charOption");
    //     myCharacter = 0;
    //     myCharacterObject = 0;
    //     var resetChars = $(".charOption");
    //     otherChars = $("#characters");
    //     $("#characters").append(resetChars);
    //     $("#top").append(otherChars);
    //     characterChosen = 0;
    //     enemyChosen = 0;
    //     characterChosen = false;
    //     enemyChosen = false;
    //     myCharacter = undefined;
    //     enemyFighter = undefined;
    //     isFighting = false;
    //     enemiesDefeated = 0;
    //     $("#charOne").css("display", "block");
    //     $("#charTwo").css("display", "block");
    //     $("#charThree").css("display", "block");
    //     $("#charFour").css("display", "block");
    //     gameStart();
    // }