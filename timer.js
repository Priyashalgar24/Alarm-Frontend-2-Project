//refrance active time container
const activeTimerContainer = document.getElementById("dispalyCurrentTime");

// refrance set button
const setButton = document.getElementById("setTimeButton");

const removeNoContainerDiv = document.getElementById("notext");

//addevent
 setButton.addEventListener("click" , () => {
    const hours = parseInt(document.getElementById("hours").value) || 0;
    const min = parseInt(document.getElementById("minutes").value) || 0;
    const sec = parseInt(document.getElementById("Secound").value) || 0;
    
    const totalSecound = (hours*3600) + (min*60) + sec ;
    if (totalSecound > 0){
      removeNoContainerDiv.remove();
      createDiv(totalSecound);
    }else {
      alert("Please enter a valid time.");
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

   let timerInterval = setInterval(updateTimerDisplay, 1000);

   timerDiv.append(timeLeft,  timer  , deleteButton);
    
   activeTimerContainer.appendChild(timerDiv);
 }

 function playAudioAlert() {
   const audio = new Audio('./abc.mp3');
   audio.play();
}
