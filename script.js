var cityArray = [];




function getInfo(){
    

 
    getInfo1("inputCity");
    
}

function getInfo1(id){
    
    var newName = document.getElementById(id);
    

    var cityName = document.getElementById("cN");
    cityName.innerHTML = newName.value.toUpperCase();

   


    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + newName.value + "&appid=207b35de10bbdc8caf3c4e10ca8bd30b")
    .then(response => response.json())
    .then(data => {
  
    
    for(i=0; i<5;i++){
        document.getElementById("day"+ (i+1) + "Min").innerHTML="Min: " + Number((data.list[i].main.temp_min -273.15) * 9/5 +32).toFixed(1)+"°";
    }
    for(i=0; i<5;i++){
        document.getElementById("day"+ (i+1) + "Max").innerHTML="Max: " + Number((data.list[i].main.temp_max -273.15)* 9/5 +32).toFixed(1)+"°";
    }
    for(i=0; i<5;i++){//gets image from weather API
        document.getElementById("img" +(i+1)).src = " https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
    }


    for(i=0; i<1;i++){
      document.getElementById("current").innerHTML="Current Temperature: " +Number((data.list[i].main.temp -273.15)* 9/5 +32).toFixed(1)+"°";
    }

    for(i=0; i<1;i++){
        document.getElementById("wind").innerHTML="Wind: " +Number(data.list[i].wind.speed).toFixed(1)+"mph";
    }
    s1 =localStorage.getItem('mod6')

    if(s1==null){
         cityArray = []
    }

    else{
        cityArray = JSON.parse(s1);
   }
   if(cityArray.length > 4){
    var temp = cityArray.shift();
   }
   var found = false;
   for(i=0; i<cityArray.length; i++){
        if(newName.value==cityArray[i]){
            found=true;
            break;
        }

   }
   if(found==false){
    cityArray.push(newName.value);
    localStorage.setItem('mod6', JSON.stringify(cityArray));
   }
    getTable(); 
   
    })


    .catch(err =>{
    document.getElementById("cN").innerHTML="Invalid Entry";
    for(i=0; i<5;i++){
        document.getElementById("day"+ (i+1) + "Min").innerHTML="Min: ";
    }
    for(i=0; i<5;i++){
        document.getElementById("day"+ (i+1) + "Max").innerHTML="Max: ";
    }
    for(i=0; i<5;i++){//gets image from weather API
        document.getElementById("img" +(i+1)).src = " https://openweathermap.org/img/wn/";
    }


    for(i=0; i<1;i++){
      document.getElementById("current").innerHTML="Current Temperature: ";
    }

    for(i=0; i<1;i++){
        document.getElementById("wind").innerHTML="Wind: ";
    }

    
    })

}



function getTable(){
    s1 =localStorage.getItem('mod6')

    if(s1==null){
        cityArray = []
   }

   else{
       cityArray = JSON.parse(s1);
   }

  if(cityArray[4]==undefined){
    document.getElementById("one").innerHTML="";
  }
  else{
    document.getElementById("one").innerHTML=cityArray[4];
  }

  if(cityArray[3]==undefined){
    document.getElementById("two").innerHTML="";
  }
  else{
    document.getElementById("two").innerHTML=cityArray[3];
  }
    
  if(cityArray[2]==undefined){
    document.getElementById("three").innerHTML="";
  }
  else{
    document.getElementById("three").innerHTML=cityArray[2];
  }
  if(cityArray[1]==undefined){
    document.getElementById("four").innerHTML="";
  }
  else{
    document.getElementById("four").innerHTML=cityArray[1];
  }
  if(cityArray[0]==undefined){
    document.getElementById("five").innerHTML="";
  }
  else{
    document.getElementById("five").innerHTML=cityArray[0];
  }
    
}


function clearTable(){
    localStorage.removeItem("mod6");
    document.getElementById("one").innerHTML="";
    document.getElementById("two").innerHTML="";
    document.getElementById("three").innerHTML="";
    document.getElementById("four").innerHTML="";
    document.getElementById("five").innerHTML="";
}

function history(clicked_id){
 

    var x = document.getElementById(clicked_id)
    x.value=document.getElementById(clicked_id).innerHTML



    getInfo1(clicked_id);

    

}





//Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

function CheckDay(day){
    if(day + d.getDay() > 6){
        return day + d.getDay() - 7;
    }
    else{
        return day + d.getDay();
    }
}

    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
    }

