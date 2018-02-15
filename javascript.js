var word;

var words = ["aback","abaft","abandoned","abashed","aberrant","abhorrent","abiding","abject","ablaze","able","abnormal","aboard","aboriginal","abortive","abounding","abrasive","abrupt","absent","absorbed","absorbing","abstracted","absurd","abundant","abusive","acceptable","accessible","accidental","accurate","acid","acidic","acoustic","acrid","actually","adamant","adaptable","addicted","adhesive","adjoining","adorable","adventurous","afraid","aggressive","agonizing","agreeable","ahead","ajar","alcoholic","alert","alike","alive","alleged","alluring","aloof","amazing","ambiguous","ambitious","amuck","amused","amusing","ancient","angry","animated","annoyed","annoying","anxious","apathetic","aquatic","aromatic","arrogant","ashamed","aspiring","assorted","astonishing","attractive","auspicious","automatic","available","average","awake","aware","awesome","awful","axiomatic","bad","barbarous","bashful","bawdy","beautiful","befitting","belligerent","beneficial","bent","berserk","best","better","bewildered","big","billowy","bitter","bizarre","black","black-and-white","bloody","blue"];

function start(){
    document.getElementById('div1').style.display = "block";
    document.getElementById('div3').style.display = "none";
}

function restart(){
    start();
    document.getElementById('div1').style.display = "none";
    document.getElementById('div2').style.display = "none";  
    document.getElementById('div3').style.display = "none";
}

function level1(){
    word = words[Math.floor(Math.random() * words.length)];
    document.getElementById('level').innerHTML = "Level 1";
    document.getElementById('div2').style.display = "block";
    guessLetter(word);
}

function level2(){
    var word1 = words[Math.floor(Math.random() * words.length)];
    word = word1 + words[Math.floor(Math.random() * words.length)];
    document.getElementById('level').innerHTML = "Level 2";
    document.getElementById('div2').style.display = "block";
    guessLetter(word);
}

function level3(){
    var word1 = words[Math.floor(Math.random() * words.length)]; 
    var word2 = word1 + words[Math.floor(Math.random() * words.length)]; 
    word = word2 + words[Math.floor(Math.random() * words.length)];
    document.getElementById('level').innerHTML = "Level 3";
    document.getElementById('div2').style.display = "block";
    guessLetter(word);
}


function guessLetter(word){
    var availableLetters = "abcdefghijklmnopqrstuvwxyz";
    var errorCount = 0;
    var lettersGuessed = lettersMatched = '';
    var numLettersMatched = 0;
    var userError = document.getElementById("error");
    var guessInput = document.getElementById("letter");
    
    userError.innerHTML = 'Number of times wrong guess ' + errorCount + '.';
    
    letters = document.getElementById("letters");
    letters.innerHTML = '<li class="current-word">Current word:</li>';
    
    var letter, i;
    for(i = 0; i < word.length; i++){
        letter = '<li class="letter letter' + word.charAt(i).toUpperCase() + '">' + word.charAt(i).toUpperCase() + '</li>';
        letters.insertAdjacentHTML('beforeend', letter);
    }
    
    document.getElementById('div2').onsubmit = function(e){
        if (e.preventDefault) e.preventDefault();
        var guess = guessInput.value;
        
        guessInput.onclick =function(){
            this.value ='';
        };
        
        if(guess){
            if(availableLetters.indexOf(guess) > -1){
                if(word.indexOf(guess) > -1){
                    var lettersToShow;
                    lettersToShow = document.querySelectorAll(".letter" + guess.toUpperCase());

                    for(var i = 0; i < lettersToShow.length; i++){
                        lettersToShow[i].classList.add("correct");
                    }
                    
                    for(var j = 0; j < word.length; j++) {
                        if (word.charAt(j) === guess) {
                            numLettersMatched += 1;
                        }
                    }

                    lettersMatched += guess;
                    
                    if(numLettersMatched === word.length){
                        gameFinish(true);
                    }
                }
                else
                {
                    lettersGuessed += guess;
                    errorCount++;
                    userError.innerHTML = 'Number of times wrong guess ' + errorCount;
                }
            }
        }
        return false;
    };

    function gameFinish(win){
        if(win){
            document.getElementById('div1').style.display = "none";
            document.getElementById('div2').style.display = "none";
            document.getElementById('div3').style.display = "block";
            document.getElementById('wrong-word').innerHTML = errorCount;
            document.getElementById('correct-word').innerHTML = word;
        } 
    }

}