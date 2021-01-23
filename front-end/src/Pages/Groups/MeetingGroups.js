import './MeetingGroups.css'
import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { Modal, Button } from 'antd';
import { DatePicker, TimePicker, Select, Space } from 'antd';
import TIME from './HELPER.js'

const { RangePicker } = TimePicker;



function MeetingGroups(props) {

    const [timesByDay, setTimesByDay] = useState({})
    
    var TIMES = [
        {
            "month": 1,
            "day": 22,
            "year": 2021,
            "start": 10,
            "end": 12
        },
        {
            "month": 1,
            "day": 22,
            "year": 2021,
            "start": 13,
            "end": 16
        },
        {
            "month": 1,
            "day": 22,
            "year": 2021,
            "start": 11,
            "end": 15
        },
        {
            "month": 1,
            "day": 22,
            "year": 2021,
            "start": 18,
            "end": 20
        }
    ]

    var timesDict = {
        "1/22":{
        "month":1,
        "day":22,
        "times": TIMES
        },
        "1/23":{
            "month":1,
            "day":22,
            "times": TIMES
        }
    }

    var timeSpan = [[1,22], [1,23]]



    useEffect(() => {
        //api to get user times

        for( var i in timeSpan){
            var key = ""+timeSpan[i][0]+"/"+timeSpan[i][1];
            console.log(key)
            timesDict[key].times = findFreeTime( timesDict[key].times)
        }

        setTimesByDay(timesDict)
        
        //sortTimesByDay
        
     }, []);


    function findFreeTime(memberTimes){


        //for member in group
        //find add time for day/month
        
        var isBusy = [];
        var busyTimes = []
        for(var i=0;i<48;i+=1){
            isBusy.push(false)
        }

        for(var i=0;i<memberTimes.length;i++){
            var memberTime = memberTimes[i]
            for(var block=memberTime.start;block<memberTime.end;block+=0.5){
                if(!isBusy[block*2]){
                    isBusy[block*2] = block
                    busyTimes.push(block)
                }
            }
        }

        console.log(busyTimes)

        var start = 0;
        var end = busyTimes.shift();
        var freeTimes = []
        freeTimes.push([start, end])

        start = end;

        while (busyTimes.length >= 1){
            var comp = busyTimes.shift()
            if( (comp - start) == 0.5){
                start = comp;
            }else{
                
                start += 0.5;
                end = comp;
                freeTimes.push([start,end])
                start = comp
            }
        }

        if(start > end)freeTimes.push([start+0.5,24])
        console.log(busyTimes)
        console.log(freeTimes)

        return freeTimes
    }

    ///STATES
    ////////////

    //display booleans
    const [showTimePickerBool, setShowTimePickerBool] = useState(false);

    const [activeRange, setActiveRange] = useState(false);
    const [activeTime, setActiveTime] = useState(null);



      //onClick/Event type functions...

      const meetingTimeSumbit = () => {
        //TODO: sumbit active time
        setShowTimePickerBool(false);
        props.onClose();
      };
    
      const hideTimePicker = () => {
        setShowTimePickerBool(false);
      };

      const rangePickerChanged = newRange => {
        setActiveTime(newRange)
      };

      const selectedTime = (day, month, time) => {
        console.log(day, month, time)
        setActiveRange({
            day: day,
            month: month,
            time: time
        })
        setShowTimePickerBool(true);
    };



  /*  function getTimesByDayDict(userTimes){
        var SpanOfDates = [["01/22",1,22],["01/23",1,23]]
        var timesInDay_ = {};
        //for each day in span of dates
        for(var i = 0; i<SpanOfDates.length;i++){
           timesInDay_[SpanOfDates[i][0]] = userTimes_.find(obj => obj.month==SpanOfDates[i][1] && obj.day==SpanOfDates[i][2])
        }

        return timesInDay_
        //find the times each user has 
        //
    }*/

    return (
        <div >

        {
            Object.values(timesByDay).map(day =>{
                return(
                    <div>
                    <h1>{TIME.intToMonth(day.month)+' '+day.day}</h1>
                    <DayTimes selectedTime ={selectedTime} month={day.month} day={day.day} dayTimes={day.times}></DayTimes>
                    </div>
                )
            })
            
        }   
        {activeRange?
            <Modal title="Basic Modal" visible={showTimePickerBool} onOk={meetingTimeSumbit} onCancel={hideTimePicker}>
                Select a time on: {TIME.intToMonth(activeRange.month)} {activeRange.day} <br></br>
                <RangePicker  defaultValue={[moment(''+activeRange.time[0], 'HH:mm'),moment(''+activeRange.time[1], 'HH:mm')]} use12Hours={true} showNow={false} minuteStep={30} format={'HH:mm'} onChange={rangePickerChanged} />
            </Modal>:<div></div>
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
    console.log(props.time)
    return(
        <div>
            <div onClick={()=> props.selectedTime(props.day, props.month,props.time)} className="TimeBlock">
                <p>{TIME.floatToTime(props.time[0]) + " - "  + TIME.floatToTime(props.time[1])}</p>
            </div>

        </div>

    )
}
export default MeetingGroups;