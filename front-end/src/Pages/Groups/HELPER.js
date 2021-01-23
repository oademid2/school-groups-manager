
class TIME {

 static  floatToTime = (float) => {
        if(float == 24){
            return "12 AM"
        }else if(float > 0  && float <12){
            return float+" AM"
        }else if ( float < 13 && float >= 12){
            return float+" PM"
        }else if(float >= 0 && float < 1){
         return float + " AM"
         }else{
            return float%12 + "PM"
        }
}

static intToMonth= (int) => {
    switch(int){
        case 1:
            return "January"
        case 2:
            return "February"
        case 3:
            return "March"
        case 4:
            return "April"
        case 5:
            return "May"
        case 6:
            return "June"
        case 7:
            return "July"
        case 8:
            return "August"
        case 9:
            return "September"
        case 10:
            return "October"
        case 11:
            return "November"
        case 12:
            return "December"

    }
}


};

export default TIME;

