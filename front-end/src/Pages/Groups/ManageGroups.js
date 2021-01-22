import './Groups.css';
import './ManageGroups.css';

import React, { useState,  useEffect} from 'react';
import { Collapse } from 'antd';
import api from './api';
import groupsJSON from './groups.json'


const { Panel } = Collapse;

const userID = 123;
function ManageGroups() {
    
    //TODO: initialize as empty
    const [userGroups, setUserGroups] = useState([])

    const [groupsPanel, setGroupsPanel] = useState([]);


   
    function toggleGroupsCollapsable(panel) {
        var updatedPanel = [...groupsPanel];
        var panelToggle = updatedPanel.find(p => p.groupID ==panel.groupID && p.course == panel.course && panel.compenetID == p.compenetID )
        panelToggle.show =!panelToggle.show
        setGroupsPanel(updatedPanel)   

    }


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


  return (
    <div className="groups-panel manage-groups-panel">
      

        <p className="manage-groups-panel-title">Your Groups</p>

        <div className="manage-groups-panel-grid">
        {
            groupsPanel.map(panel =>{
                return(
                    <div>

                    <span  
                        onClick={() => toggleGroupsCollapsable(panel)} 
                        type="button" class="manage-groups-panel-card-title">
                        {panel.course+" "+panel.component} {panel.owner? "[OWNER]":""} 
                        {panel.status =="pending"? "[pending]":""}
                    </span>

                    {panel.show?
                     //<NameListCard  group={panel} removeTeamMember={removeTeamMember} isOwner={panel.owner} users={panel.members}></NameListCard>
                        <div>
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