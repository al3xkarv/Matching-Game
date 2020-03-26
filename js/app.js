let cardArray = [];
for (let index = 0; index < 16; index++) {
    cardArray[index] = document.createElement("LI");
    cardArray[index].className = "card";
}

//initializing an array with desired items
cardArray[0].innerHTML = '<i class="fa fa-diamond"></i> ';
cardArray[1].innerHTML = '<i class="fa fa-diamond"></i> ';
cardArray[2].innerHTML = '<i class="fa fa-paper-plane"></i>';
cardArray[3].innerHTML = '<i class="fa fa-paper-plane"></i>';
cardArray[4].innerHTML = '<i class="fa fa-leaf"></i>';
cardArray[5].innerHTML = '<i class="fa fa-leaf"></i>';
cardArray[6].innerHTML = '<i class="fa fa-bicycle"></i>';
cardArray[7].innerHTML = '<i class="fa fa-bicycle"></i>';
cardArray[8].innerHTML = '<i class="fa fa-bomb"></i>';
cardArray[9].innerHTML = '<i class="fa fa-bomb"></i>';
cardArray[10].innerHTML = '<i class="fa fa-cube"></i>';
cardArray[11].innerHTML = '<i class="fa fa-cube"></i>';
cardArray[12].innerHTML = '<i class="fa fa-bolt"></i>';
cardArray[13].innerHTML = '<i class="fa fa-bolt"></i>';
cardArray[14].innerHTML = '<i class="fa fa-anchor"></i>';
cardArray[15].innerHTML = '<i class="fa fa-anchor"></i>';



cardArray = shuffle(cardArray);

//putting shuffled items on page
for (index = 0; index < cardArray.length; index++) {
    document.getElementById("deck").appendChild(cardArray[index]);
    
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex].innerHTML;
        array[currentIndex].innerHTML = array[randomIndex].innerHTML;
        array[randomIndex].innerHTML = temporaryValue;
    }

    return array;
}


let allCards = document.querySelectorAll('.card');
let openCards = [];
let matchedCards = 0;
let totalMoves = 0;
let timeStarted = false;

let clickBusy = false;
let lastFlipped = null;
let restart = document.querySelector('.restart');
restart.addEventListener('click', function () {
    stopTime();
    reset();
});


allCards.forEach(function(card){
    card.addEventListener('click', function(){
        if (clickBusy){return};
        if (lastFlipped === card){return};
        lastFlipped = card;
        displayCard(card);
        if (!timeStarted){
            startTime();
            timeStarted = true;
        }
        if (openCards.length === 2 ){
            clickBusy = true;
            removeStar();
            if (openCards[0].innerHTML == openCards[1].innerHTML){
                matched();
            }
            else{
                notMatched();
            }
        }
        // clickBusy = false;
    })
});

//if cards are matched color is changed and there is check for end conditions
function matched(){
    openCards[0].classList.add('match');
    openCards[1].classList.add('match');
    matchedCards = matchedCards + 2;
    openCards = [];
    if (checkEnd() === true){
        // stopTime();
        gameOver();
        reset();
    }
    clickBusy = false;
}

function notMatched(){
    setTimeout(function(){
        openCards[0].classList.remove('open', 'show');
        openCards[1].classList.remove('open', 'show');
        openCards = [];
        clickBusy = false;
    }, 1000);
}

function displayCard(card){
    openCards.push(card);
    card.classList.add('open', 'show');
}


function removeStar(){
    totalMoves++;
    document.querySelector(".moves").innerHTML = totalMoves;
    let stars = document.getElementById("stars");
    if (totalMoves === 26){
        // let stars = document.getElementById("stars");
        stars.removeChild(stars.lastChild);
        numStars--;
        return;
        }
    if (totalMoves === 21){
            // let stars = document.getElementById("stars");
            stars.removeChild(stars.lastChild);
            numStars--;
            return;
    }
    if (totalMoves === 17){
        // let stars = document.getElementById("stars");
        stars.removeChild(stars.lastChild);
        numStars--;
        return;
    }
    if (totalMoves === 14){
        // let stars = document.getElementById("stars");
        stars.removeChild(stars.lastChild);
        numStars--;
        return;
    }
    if (totalMoves === 11){
        // let stars = document.getElementById("stars");
        stars.removeChild(stars.lastChild);
        numStars--;
        return;
    } 
    if (totalMoves === 9){
        console.log(stars.lastChild);
        stars.removeChild(stars.lastChild);
        stars.removeChild(stars.lastChild);
        numStars--;
        return;
    }
        
    }
    
    function checkEnd(){
        console.log(matchedCards);
        if (matchedCards === 16) {
            return true;            
        }
        else{
            return false;
        }
    }

    let numStars = 6;
    
    function reset(){
        // gameOver();
        // stopTime();
        stopTime();
        minutes = 0;
        seconds = 0; 
        timer = 0;
        timeStarted = false;
        document.getElementById("time").innerHTML = '00:00';
        cardArray.forEach(function(card){
            card.classList.remove('match', 'open', 'show'); 
        })
        cardArray = shuffle(cardArray);
        let temp ;//= document.createElement("LI");
        let myNode = document.getElementById("stars");
        while (myNode.firstChild) {
                myNode.removeChild(myNode.lastChild);
            }
            
        // temp.innerHTML = '<i class="fa fa-star"></i> ';
        for (let index = 0; index < (6); index++) {
            temp = document.createElement("LI");
            temp.innerHTML = '<i class="fa fa-star"></i> ';
            // temp.innerHTML = '<li><i class="fa fa-star"></i></li>';
            myNode.appendChild(temp);                    
        }

        // for (let index = 0; index < (6 - numStars); index++) {
        //     temp = document.createElement("LI");
        //     temp.innerHTML = '<i class="fa fa-star"></i> ';
        //     // temp.innerHTML = '<li><i class="fa fa-star"></i></li>';
        //     myNode.appendChild(temp);                    
        // }



            // myNode.textContent = '';
        totalMoves = 0;
        document.querySelector(".moves").innerHTML = totalMoves;
        numStars = 6;
        matchedCards = 0;
        openCards = [];
        lastFlipped = null;
        }
        
        let minutes = 0;
        let seconds = 0;
        let timer = 0;
        
        function startTime(){
            timer = setInterval(function(){
                seconds++;
                if (seconds === 60){
                    minutes++;
                    seconds = 0;
                }
                document.getElementById("time").innerHTML = formatTime(); 
            },1000);
        }

        function stopTime(){
            clearInterval(timer);
        }

        function formatTime(){

            let sec = seconds > 9 ? String(seconds) : '0' + String(seconds);
            
            let min = minutes > 9 ? String(minutes) : '0' + String(minutes);
            return min + ':' + sec;
        }
        // Get the modal
        const modal = document.getElementById("myModal");

        // Get the <span> element that closes the modal
        const close = document.getElementsByClassName("close")[0];
        
        function gameOver( ) {
            // stopTime();
            if (totalMoves === 8) {
                document.querySelector(".modal-body").innerHTML = ' Wow, that was crazy!! You perfect scored it in '+ formatTime() + ' !!';
                
            }
            else{
                document.querySelector(".modal-body").innerHTML = ' You completed the game in '+ totalMoves + ' moves and time '+formatTime()+ '!!';
            }
            modal.style.display = "block";
            // When the user clicks on <span> (x), close the modal
            close.onclick = function() {
                modal.style.display = "none";
            }
            
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                modal.style.display = "none";
                }
            }
        }