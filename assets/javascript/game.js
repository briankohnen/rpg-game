// declare character objects
var characterOne = {
    name : "asknasdc",
    hp : 100,
    atkPower : 5,
    counterAtkPower : 7,
    id : "charOne"
};

var characterTwo = {
    name : "buttmong",
    hp : 120,
    atkPower : 7,
    counterAtkPower : 8,
    id : "charTwo"
};

var characterThree = {
    name : "shoosua",
    hp : 105,
    atkPower : 6,
    counterAtkPower : 10,
    id : "charThree"
};

var characterFour = {
    name : "aroei",
    hp : 110,
    atkPower : 8,
    counterAtkPower : 7,
    id : "charFour"
};

// assign global variables for .html targeting and game logic
var otherChars = $("#characters");
var characterChosen = false;
var enemyChosen = false;
var myCharacter;
var enemyFighter;
var isFighting = false;
var enemiesDefeated = 0;

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
                myCharacter = characterOne;
            } else if (myCharacterId === "charTwo") {
                myCharacter = characterTwo;
            } else if (myCharacterId === "charThree") {
                myCharacter = characterThree;
            } else if (myCharacterId === "charFour") {
                myCharacter = characterFour
            }
            console.log(myCharacter);

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
                            enemyFighter = characterFour
                        }
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
            if (myCharacter.hp > 0) {
                // if enemy's hp is above 0, hit enemy and recieve a hit from the enemy. add 5 to myCharacter.atkPower each hit
                // display the hit information on the page at lines 109-110
                if (enemyFighter.hp > 0) {
                    var hitInfo = Math.round(myCharacter.atkPower + (Math.random() * myCharacter.atkPower));
                    var counterInfo = Math.round(enemyFighter.counterAtkPower + (Math.random() * enemyFighter.counterAtkPower));
                    enemyFighter.hp = enemyFighter.hp - hitInfo;
                    myCharacter.hp = myCharacter.hp - counterInfo;
                    $("#attackInfo").text("You hit " + enemyFighter.name + " for " + hitInfo + " points");
                    $("#attackInfo").append("<br>" + enemyFighter.name + " hit you for " + counterInfo + " points");
                    myCharacter.atkPower += 5;
                    console.log("enemy hp : " + enemyFighter.hp);
                    console.log("my atkPower : " + myCharacter.atkPower);
                    console.log("my hp : " + myCharacter.hp);
                // if enemy's hp <= 0 display a win, and hide the defeated enemy, reset isFighting / enemyChosen to false    
                } else {
                    console.log("you won the battle");
                    isFighting = false;
                    enemyChosen = false;
                    $("#" + enemyFighter.id).css("display", "none");
                    $("#attackInfo").text("You won the battle, choose another enemy");
                }
            // if myCharacter.hp is <=0 display death, only option is to restart game
            } else {
                console.log("you died, restart");
                isFighting = false;
                $("#attackInfo").text("You died. Restart?");
                }
            }
            // if no enemy is chosen display Nothing to fight
        } else {
                $("#attackInfo").text("Nothing to fight here");
        }
    });
};


gameStart();
















    function gameReset () {
        // $(myCharacter).addClass("charOption");
        // myCharacter = undefined;
        // characterChosen = 0;
        // enemyChosen = 0;
        // $("body").append(otherChars);
        gameStart();

    }

    $("#resetButton").on("click", gameReset);