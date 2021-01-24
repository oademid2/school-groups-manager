import './style/Groups.css';
import './style/ManageGroups.css';

import React, { useState,  useEffect} from 'react';
import { Drawer, Button, Modal } from 'antd';
import MeetingGroups from './MeetingGroups'
import "antd/dist/antd.css";

import api from './api';
import groupsJSON from './mock-data/groups.json'

const userID = 123;

function ManageGroups() {
    
    ////STATES
    //////////////

    //data states
    const [userGroups, setUserGroups] = useState([])

    //display information states
    const [groupsPanel, setGroupsPanel] = useState([]);
    const [groupToSchedule, setGroupToSchedule] = useState({});

    //display boolean states
    const [showMeetingComponentBool, setShowMeetingComponentBool] = useState(false);

   
    function toggleGroupsCollapsable(panel) {
        var updatedPanel = [...groupsPanel];
        var panelToggle = updatedPanel.find(p => p.groupID ==panel.groupID && p.courseID == panel.courseID && panel.compenetID == p.compenetID )
        panelToggle.show =!panelToggle.show
        setGroupsPanel(updatedPanel)   

    }

    const closeMeetingComponent = () => {setShowMeetingComponentBool(false);};


    useEffect(() => {
        getUserGroups()
    }, []);
    
    function getUserGroups(){

        setGroupsPanel([...groupsJSON])
        //console.log(res,"user groups loaded.")

        //API
        /*api.getUserGroups(userID).then((res)=>{
            
            setGroupsPanel(res.data)
            console.log(res,"user groups loaded.")

        })*/
    }

    function removeTeamMember(member, id){
        console.log("removed ", groupsPanel)

        var copyGroupsPanel = [...groupsPanel];
        var changeGroup = copyGroupsPanel.find(group => group.id === id); 
        var indexToChange = copyGroupsPanel.indexOf(changeGroup);

      
        var memberToDel = changeGroup.members.find(mem_ => mem_.name === member); 
        var indexMemberToDel = changeGroup.members.indexOf(memberToDel);

        if (indexMemberToDel !== -1) {
            changeGroup.members.splice(indexMemberToDel, 1);
        }

        copyGroupsPanel[indexToChange] = changeGroup;

        setGroupsPanel(copyGroupsPanel)
        console.log("display has removed member.")

        //API
        /*api.removeGroupMember(123).then(res =>{
            console.log("server has removed member.")
        })*/


        
    }

    function scheduleGroup(group){
        setGroupToSchedule(group)
        setShowMeetingComponentBool(true)
    }

    function meetingTimeSent(){
        //TODO: api to send meeting request
        let secondsToGo = 1;
        closeMeetingComponent()
        const modal = Modal.success({
            title: 'Confirmed',
            content: `Your meeting request has been sent.`,
          })
          const timer = setInterval(() => {
            secondsToGo -= 1;
          }, 1000);
          setTimeout(() => {
            clearInterval(timer);
            modal.destroy();
          }, secondsToGo * 1000);
    }

  return (
    <div className="groups-panel manage-groups-panel">
      

        <p className="manage-groups-panel-title">Your Groups</p>

        <div className="manage-groups-panel-grid">
        {
            groupsPanel.map(panel =>{
                return(
                    <div className="manage-groups-panel-card">

                    <span  
                        onClick={() => toggleGroupsCollapsable(panel)} 
                        type="button" class="manage-groups-panel-card-title">
                        {panel.courseTitle+" "+panel.componentTitle} {panel.owner? "[OWNER]":""} 
                        {panel.status =="pending"? "[pending]":<button onClick={()=>scheduleGroup(panel)}> schedule</button>}
                
                    </span>

                    {true?
                    
                     //<NameListCard  group={panel} removeTeamMember={removeTeamMember} isOwner={panel.owner} users={panel.members}></NameListCard>
                        <div className={"manage-groups-panel-card-items-group " + (panel.show?"active height_auto":"")}>
                            {
                                panel.members.map(member =>{
                                    return(

                                    <div className ="manage-groups-panel-card-item">
                                        <div className="member-name"> {member.name} </div>
                                        {panel.owner && member.userID != userID? <button onClick={()=> removeTeamMember(member.name, panel.id)} className="member-remove">remove</button>:<div></div>}
                                    </div>

                                    )
                                })
                            }

                        </div>

                        :<div></div>
                     }
                    </div>
                )
        
            })
        }

        </div>

        <Drawer
            title="Available Group Times"
            placement="bottom"
            height="600"
            closable={true}
            onClose={closeMeetingComponent}
            visible={showMeetingComponentBool}
        >
            <MeetingGroups 
                onClose={meetingTimeSent} 
                group={groupToSchedule}>
            </MeetingGroups>
         </Drawer>
    </div>
  );
}


export default ManageGroups;


/*

     {
       
            test.map(item =>{
               if(test[item.id].show){
                    return(
                    <div className="content" key={item.id} >
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                     </div>
                    )}
                //else return(<div></div>)
            })
  

        }

         {(open)=>{
             if(open){
                return(
                <div className="content">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                 </div>
                )}
        }}


        [
        {
        id:0,
        show: false,
        course:"SE4455",
        component:"lab 1",
        members:[
                {name: "Kitan Ademidun"},
                {name: "Josh"},
                {name: "Nick"},
                {name: "Steven"}
            ]
        },
        {
            id:1,
            show: false,
            course:"SE4455",
            component:"lab 2",
            members:[
                    {name: "Kitan Ademidun"},
                    {name: "Josh"},
                    {name: "Nick"},
                    {name: "Steven"}
                ]
            }
    ]

*/