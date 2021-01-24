import './style/MeetingGroups.css'
import React, { useEffect, useState } from 'react';
import { Modal, TimePicker} from 'antd';
import CustomWeeklyScheduleView from './CustomWeeklyScheduleView.js'

import moment from 'moment';
import TIME from './HELPER.js'

import meetingsJSON from './mock-data/meetings.json'

const { RangePicker } = TimePicker;

function MeetingGroups(props) {

        ///STATES
    ////////////

    //display booleans
    const [showTimePickerBool, setShowTimePickerBool] = useState(false);
    const [activeRange, setActiveRange] = useState(false);
    const [activeTime, setActiveTime] = useState(null);

    //Information states
    const [timesByDay, setTimesByDay] = useState({})

    //range of days we want to show in this view
    const RANGE_OF_DAYS = 0;
    //Dates in range...
    var timeSpan = [[0,22], [0,23]] //TODO: init to [] -- populated by useEffect
    
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

    

    useEffect(() => {

        //Get dates within range
        var now = moment()
        for(var i=0;i<RANGE_OF_DAYS;i++){
            let day = +now.format('DD');
            let month = now.month();
            timeSpan.push([month,day])
            now = now.add(1, 'days')
        }

        var timesDict = {}
        var TIMES;
        //api to get user times
        for( var i in timeSpan){
            
            TIMES = []
            var key = ""+(timeSpan[i][0]+1)+"/"+timeSpan[i][1];
            var month = timeSpan[i][0];
            var day = timeSpan[i][1];

        
            for(var j in meetingsJSON){
                
                if(meetingsJSON[j][key])TIMES.push(...meetingsJSON[j][key])
                console.log(key, meetingsJSON[j][key])
            }

           
            key = ""+month+"/"+day;
            timesDict[key] = {}
            timesDict[key].times = findFreeTime( TIMES)
            timesDict[key].month = month
            timesDict[key].day = day;


        }

        console.log(timesDict)
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

        return freeTimes
    }

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
        console.log(newRange)
        setActiveTime(newRange)
        
      };

      const selectedTime = (day, month, time) => {
        console.log(day, month, time)
        setActiveRange({
            day: day,
            month: month,
            time: time
        })

        console.log(time)
        setActiveTime([moment(time[0]+':00', 'H:mm'),moment(time[1]+':00', 'H:mm')])
        
        //[moment(activeTime[0]+':00', 'HH:mm'),moment(activeTime[1]+':00', 'HH:mm')]
        setShowTimePickerBool(true);
    };



    return (
        <div >

        <CustomWeeklyScheduleView
            timesByDay={timesByDay}
            selectedTime={selectedTime}
       >

        </CustomWeeklyScheduleView>
        {activeTime?
            <Modal 
                title="" 
                visible={showTimePickerBool} 
                onOk={meetingTimeSumbit} 
                onCancel={hideTimePicker}
                okText={"schedule"}
            >
                    <span className="group-meetings-modal-title">
                        {TIME.intToMonth(activeRange.month)} {activeRange.day}
                    </span>
                    <RangePicker  
                       // defaultValue={activeTime} 
                        value = {activeTime} 
                        user12Hours={true} 
                        showNow={false} 
                        minuteStep={30} 
                        format={'HH:mm a'} 
                        onChange={rangePickerChanged}
                        formatTime= 'g:i a'
                        validateOnBlur= {false}
                    />
            </Modal>:
            <div></div>
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
export default MeetingGroups;