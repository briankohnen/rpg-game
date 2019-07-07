var characterOne = {
    name : "asknasdc",
    hp : 100,
    atkPower : 5,
    counterAtkPower : 7
};

var characterTwo = {
    name : "buttmong",
    hp : 120,
    atkPower : 7,
    counterAtkPower : 6
};

var characterThree = {
    name : "shoosua",
    hp : 105,
    atkPower : 6,
    counterAtkPower : 4
};

var characterFour = {
    name : "aroei",
    hp : 110,
    atkPower : 8,
    counterAtkPower : 5
};

var otherChars = $("#characters");
var characterChosen = 0;
var enemyChosen = 0;
var myCharacter;

    $(".charOption").on("click", function () {
        if (characterChosen === 0) {
            myCharacter = this;
            $(myCharacter).removeClass("charOption");
            $("#myCharacter").append(this);
            $("#enemies").append(otherChars)
            characterChosen++;
            console.log(myCharacter);
            if (characterChosen === 1) {
                $(".charOption").on("click", function () {
                    if (enemyChosen === 0) {
                        $("#defenderSection").append(this);
                        enemyChosen++;
                        console.log(enemyChosen);
                    }
                })
            };
            return myCharacter;           
        }
    });