function DisplayTime () {
  const currentTime = new Date();
  let hours = currentTime.getHours();
  hours = hours.toString().padStart(2, 0);
  let min = currentTime.getMinutes().toString().padStart(2,0);
  let sec = currentTime.getSeconds().toString().padStart(2,0); 
  let day = currentTime.getDate().toString().padStart(2,0);
  let months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  
  let month = months[currentTime.getMonth()];
  let year = currentTime.getFullYear();
  
  let suffix = "th";
  if (day % 10 === 1 && day !== 11) {
    suffix = "st";
  } else if (day % 10 === 2 && day !== 12) {
    suffix = "nd";
  } else if (day % 10 === 3 && day !== 13) {
    suffix = "rd";
  }
  
  document.getElementById("clock_container").textContent = `${hours}:${min}:${sec}`;
  document.getElementById("date_container").textContent = `${day}${suffix} ${month} ${year}`;
}

setInterval(DisplayTime, 1000);