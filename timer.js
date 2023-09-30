//reference to active time container
const activeTimerContainer = document.getElementById("dispalyCurrentTime");

// reference to set button
const setButton = document.getElementById("setTimeButton");

const removeNoContainerDiv = document.getElementById("notext");

//addevent
 setButton.addEventListener("click" , () => {
   // made button clickable
    const hours = parseInt(document.getElementById("hours").value) || 0;
    const min = parseInt(document.getElementById("minutes").value) || 0;
    const sec = parseInt(document.getElementById("seconds").value) || 0;
    
    const totalSeconds = (hours*3600) + (min*60) + sec ;
    if (totalSeconds > 0){
      removeNoContainerDiv.remove();
      createDiv(totalSeconds);
    }else {
      alert("Please enter a valid time.");
      //setting up alert here;
    }
 });

 function formatTime(seconds) {
   const h = Math.floor(seconds / 3600);
   const m = Math.floor((seconds % 3600) / 60);
   const s = seconds % 60;
   return `${h.toString().padStart(2, '0')} hr : ${m.toString().padStart(2, '0')} min : ${s.toString().padStart(2, '0')} sec`;
}


 function createDiv(totalsec){
   //maindiv
   const timerDiv = document.createElement("div");
   timerDiv.id = "timerDiv"

   const timeLeft = document.createElement("div");
   timeLeft.id ="time-left"
   timeLeft.innerText="Time Left :"

   const timer = document.createElement("div");
   timer.id= "timer"

   const deleteButton = document.createElement("button");
   deleteButton.innerText="delete";
   deleteButton.id= "deleteButton"

   function updateTimerDisplay(){
      totalsec--;
      if (totalsec <= 0){
         clearInterval(timerInterval);
         // using clearinterval method when the timer reaches zero.
         timer.innerText = "Time is up!";
        timer.id="update" 
         timeLeft.style.display="none";
         timerDiv.style.backgroundColor="rgb(240,247,87)";
         deleteButton.innerText="STOP!";
         deleteButton.style.backgroundColor="#34344A";
         deleteButton.style.color="white";
         
         playAudioAlert();
      }else{
         timer.textContent = formatTime(totalsec);
      }
   }

   deleteButton.addEventListener("click" , () => {
      timerDiv.remove();
   })
   // using timerinterval method to decrement the timer every second
   let timerInterval = setInterval(updateTimerDisplay, 1000);

   timerDiv.append(timeLeft,  timer  , deleteButton);
    
   activeTimerContainer.appendChild(timerDiv);
 }
 //plays audio when the setted timer or alarm is upto the time
 function playAudioAlert() {
   const audio = new Audio('./abc.mp3');
   audio.play();
}
