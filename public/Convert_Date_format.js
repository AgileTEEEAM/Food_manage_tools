
  /* Date format change */
  /*The date format obtained from the database needs to be processed before it can be used. 
  In order to unify the program's use of the date, 
  I wrote a program that formats the date. */
  var convert_existing_date = function(time = null)
  {
      
      if (time == null)
      {
          var time1 = new Date();
      time = time1.toString().replace(/-/g,':').replace('T',':');
      time = time.split(' ');
      }
      else
      {
        time = String(time)
        time = time.split(' ');
      }
      
  if(time[0]=="Sun")
  {
      time[0] = "Sunday";
  }
  else if (time[0]=="Mon")
  {
      time[0] = "Monday";
  }
  else if (time[0]=="Tue")
  {
      time[0] = "Tuesday";
  }
  else if (time[0]=="Wed")
  {
      time[0] = "Wednesday";
  }
  else if (time[0]=="Thu")
  {
      time[0] = "Thursday";
  }
  else if (time[0]=="Fri")
  {
      time[0] = "Friday";
  }
  else if (time[0]=="Sat")
  {
      time[0] = "Saturday";
  }
  if(time[1]=="Jan")
  {
      //time[1] = "January";
      time[1] = "1";
  } 
  else if (time[1]=="Feb")
  {
      //time[1]="February";
      time[1]="2";
  }
  else if (time[1]=="Mar")
  {
      //time[1]="March";
      time[1]="3";
  }
  else if (time[1]=="Apr")
  {
      //time[1]="April";
      time[1]="4";
  }
  else if (time[1]=="May")
  {
      //time[1]="May";
      time[1]="5";
  }
  else if (time[1]=="Jun")
  {
      //time[1]="June";
      time[1]="6";
  }
  else if (time[1]=="Jul")
  {
      //time[1]="July";
      time[1]="7";
  }
  else if (time[1]=="Aug")
  {
    //time[1]="August";
    time[1]="8";
  }
  else if (time[1]=="Sep")
  {
    time[1]="9";
    //time[1]="September";
  }
  else if (time[1]=="Oct")
  {
      //time[1]="October";
      time[1]="10";
  }
  else if (time[1]=="Nov")
  {
      //time[1]="November";
      time[1]="11";
  }
  else if (time[1]=="Dec")
  {
     // time[1]="December";
     time[1]="12";
  }
  return time;
  }

  module.exports = convert_existing_date;