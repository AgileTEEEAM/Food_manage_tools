
  /* Date format change */
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
      time[1] = "January";
  } 
  else if (time[1]=="Feb")
  {
      time[1]="February";
  }
  else if (time[1]=="Mar")
  {
      time[1]="March";
  }
  else if (time[1]=="Apr")
  {
      time[1]="April";
  }
  else if (time[1]=="May")
  {
      time[1]="May";
  }
  else if (time[1]=="Jun")
  {
      time[1]="June";
  }
  else if (time[1]=="Jul")
  {
      time[1]="July";
  }
  else if (time[1]=="Aug")
  {
      time[1]="August";
  }
  else if (time[1]=="Sep")
  {
      time[1]="September";
  }
  else if (time[1]=="Oct")
  {
      time[1]="October";
  }
  else if (time[1]=="Nov")
  {
      time[1]="November";
  }
  else if (time[1]=="Dec")
  {
      time[1]="December";
  }
  return time;
  }

  module.exports = convert_existing_date;