
function GroupsDropDownPanel(props){

    function sendGroupRequest(group){

        

        var groupsList_ = props.groupsList
        group.status = "pending"
        props.groupsList.push(group)

        props.setActiveGroup(group)
        props.setGroupsList(groupsList_)
        props.onRequest();

        /*var userCourses_ = props.userCourses;
        var selectedComponent = userCourses_.find(course => course.title === activeCourse.title).components.find(cmp => cmp.title = activeComponent.title);
        selectedComponent.groups.push(group)
        setUserCourses(userCourses_)*/

        console.log("post: ",groupsList_)
        
        /*api.sendGroupRequest(userID, groupID).then(res =>{
            setUserCourses(res.data)
        })*/
    }


    function cancelGroupRequest(group){

        var groupsList_ = props.groupsList;
        var selectedGroup = groupsList_.find(grp => (grp.groupID == group.groupID && grp.courseID==group.courseID && grp.componentID==group.componentID))

        var groupIndex = groupsList_.indexOf(selectedGroup)
        if (groupIndex !== -1) {
            groupsList_.splice(groupIndex, 1);
        }

        props.setActiveGroup(null)
        props.setGroupsList(groupsList_)
        props.onRemove()
        //api.cancelGroupRequest(userID, group.groupID)
    }

    return(
     
        <div>

                <div className="groups-dropdown-menu-subtitle">
                    <span className="group-id">Group {props.activeGroup &&(props.group.status == "pending")? "(pending)":""}</span>
                    {props.activeGroup &&(props.group.status == "pending")?
                        <button onClick={()=>cancelGroupRequest(props.group)} className="req-btn">cancel</button>
                        :null
                    }
                    {!props.activeGroup? 
                        <button 
                            onClick={()=>sendGroupRequest(props.group)} 
                            className="req-btn">ask to join</button>:
                        null
                    }
                </div>

                    {props.group.members.map(member =>{
                        return(
                            <div>
                                <div className="groups-dropdown-menu-item-small" >{member.name} </div>  
                            </div> 
                        )
                    })}

        </div>
                
               
    )
}


export default GroupsDropDownPanel;