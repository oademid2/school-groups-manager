import './style/MeetingGroups.css'
import React, { useEffect, useState } from 'react';
import TIME from './HELPER.js'


function CustomWeeklyScheduleView(props) {




    useEffect(() => {


        //sortTimesByDay
        
     }, []);

    ///STATES
    ////////////



    return (
        <div >

        {
            Object.values(props.timesByDay).map(day =>{
                return(
                    <div>
                    <h1>{TIME.intToMonth(day.month)+' '+day.day}</h1>
                    <DayTimes selectedTime ={props.selectedTime} month={day.month} day={day.day} dayTimes={day.times}></DayTimes>
                    </div>
                )
            })
            
        }   
        </div>
    );
}


function DayTimes(props){
  
    return(
        <div>
            {   
                props.dayTimes.map(time =>{
                    return(
                        <TimeBlock  {...props} time={time}>
                        </TimeBlock>
                    )

                })
            }
            
        </div>
    )
}

function TimeBlock(props){
    return(
        <div>
            <div 
                onClick={()=> props.selectedTime(props.day, props.month,props.time)} 
                className="TimeBlock"
            >
                <p>{TIME.floatToTime(props.time[0]) + " - "  + TIME.floatToTime(props.time[1])}</p>
            </div>

        </div>

    )
}
export default CustomWeeklyScheduleView;