import './style/FindGroup.css';
import React, { useState, useEffect} from 'react';
import api from './api.js'

import GroupsDropDownPanel from './components/GroupsDropDownPanel.js'

var userID = 123;

function FindGroup(props) {

    //Display Data Varaibles
    const[userCourses, setUserCourses] = useState([]);
    const[activeCourse, setActiveCourse] = useState(null);
    const[activeCourseComponents, setActiveCourseComponents] = useState([]);
    const[activeCourseGroups, setActiveCourseGroups] = useState([]);
    const[activeComponent, setActiveComponent] = useState(null);
    const[activeGroup, setActiveGroup] = useState(null);
    const[groupsList, setGroupsList] = useState(null)

    //Display conditionals
    const[findGroupsMode, setFindGroupsMode] = useState(0);

    //load as JSON friendly
    useEffect(() => {
        // TODO: move to groups.js set courses based on props
        setUserCourses(props.coursesJSON)
        setGroupsList(props.groupsJSON)
        console.log("courses info loaded.")

        //API CALL
        /*api.getCoursesInfo(userID).then((res)=>{
            setUserCourses(res.data)
            console.log(res.data,"courses info loaded.")
        })*/
        /*api.getUserGroups(userID).then((res)=>{
            
            setGroupsList(res.data)
            console.log(res,"user groups loaded.")

        })*/
        return function cleanup(){
            console.log("unmount")
        }
       
    }, []);

 

  function courseSelected(course){

      resetCourse();
      setActiveCourse(course)
      setActiveCourseComponents(course.components)

  }

    function componentSelected(component){
        
        var groupMemberOf = groupsList.find(group => (group.courseID == activeCourse.id) && (group.componentID == component.id))
        console.log("ACG: ", activeCourseGroups, groupMemberOf)
        setActiveComponent(component)
        if(groupMemberOf){
            setActiveGroup(groupMemberOf)
            setActiveCourseGroups([groupMemberOf])
        }else setActiveCourseGroups(component.groups)
        console.log("ACG: ", activeCourseGroups)

    }

    function resetCourse(){
        setActiveCourse(false)
        resetCourseComponent();
    }

    function resetCourseComponent(){
        setActiveComponent(null);
        setActiveGroup(null);
        setActiveCourseGroups(null);
    }
    function createNewGroup(){
        var groupsList_ = groupsList
        var newgroup = {
            "groupID":"123",
            "courseID":"SE4455",
            "componentID":"L1",
            "courseTitle":"SE4455B",
            "componentTitle":"Lab1",
            "status":"accepted",
            "members":[
                {
                    "userID": userID,
                    "name": "user.name",
                }
            ]
    }
        groupsList_.push(newgroup)
        setGroupsList(groupsList_)
        setActiveGroup(newgroup)        
        //api.createNewGroup(userID)
    }

  return (
    <div className="groups-panel find-groups-panel">

        <div className="find-groups-mode-container">
            <div onClick={()=> {
                setFindGroupsMode(true)
                resetCourse()
                //testButton()
                }} className={`find-groups-btn ${findGroupsMode? " active":""}`}>CREATE</div>
            <div onClick={()=> {
                setFindGroupsMode(false)
                resetCourse()
            }} className={`find-groups-btn ${!findGroupsMode? " active":""}`}>JOIN</div>
        </div>
        
        <div className="collapsable-groups">

 
       <DropdownPanel 
            showPanel={!activeCourse}
            activeData={activeCourse} 
            panelsData={userCourses} 
            togglePanel={resetCourse}
            panelClicked={courseSelected}
            defaultTitle={"Select A Course"}
            activeTitle ={activeCourse? activeCourse.title:null}
            userCourses={userCourses}
            setUserCourses={setUserCourses}
            ID = "id"
            panelTitle="title"
            //customPanel={CustomPanel({text: "heyyyyy"})}
           >
        </DropdownPanel>
        <DropdownPanel 
            showPanel={(activeCourse && !activeComponent)}
            activeData={activeComponent} 
            panelsData={activeCourseComponents} 
            togglePanel={resetCourseComponent}
            panelClicked={componentSelected}
            defaultTitle={"Select A Component"}
            activeTitle ={activeComponent? activeComponent.title:null}
            ID = "title"
            panelTitle="title">
        </DropdownPanel>

  
    

        <div className="groups-dropdown-menu">
        <div  className={"groups-dropdown-menu-title "+(!activeComponent?"inactive":"")}>{activeGroup? "already in group":"Select A Group"}</div>
        {
            activeComponent && findGroupsMode?
                <div className={`groups-dropdown-menu-items2 ` + (activeComponent?" menu-group-transition":"")}>
                    
                         {activeGroup?
                            <GroupsDropDownPanel 
                                group={activeGroup}
                                activeGroup={activeGroup}
                                setActiveGroup={setActiveGroup}
                                groupsList={groupsList}
                                setGroupsList={setGroupsList}
                                onRemove={
                                    function(){
                                        setActiveCourseGroups(activeComponent.groups)
                                        console.log("sub")
                                    }
                                }>
                            </GroupsDropDownPanel>:
                            <div className="groups-dropdown-menu-subtitle">
                                <span className="group-id">No Group Yet.</span> 
                                <button onClick={createNewGroup}className="req-btn">Create Group</button>
                            </div>
                        }                    
                </div>
            :
            <div className={`groups-dropdown-menu-items` + (activeComponent?" menu-group-transition":"")}>
            {activeCourseGroups?
                
                activeCourseGroups.map(group =>{
                   
                    return(
                        <GroupsDropDownPanel 
                        group={group}
                        activeGroup={activeGroup}
                        setActiveGroup={setActiveGroup}
                        groupsList={groupsList}
                        setGroupsList={setGroupsList}
                        onRequest={
                            function(){
                                setActiveCourseGroups([group])
                                //props.groupsJSON = groupsJSON;
                            }

                        }
                        onRemove={
                            function(){
                                setActiveCourseGroups(activeComponent.groups)
                                console.log("sub")
                            }
                        }>
                    </GroupsDropDownPanel>)
                })
               :<div></div>   
            }
        </div>
        }
        </div>
        </div>


    </div>
  );
}





function DropdownPanel(props){
    return(
        <div className={"groups-dropdown-menu"}>
        <div onClick={props.togglePanel} className={"groups-dropdown-menu-title "+(!props.showPanel && !props.activeData?"inactive":"")}>{props.activeData? props.activeTitle: props.defaultTitle}</div>
            <div className={"groups-dropdown-menu-items-group "+(!props.showPanel?"":"menu-transition")}>
                {true?
                    props.panelsData.map(panel =>{
                        return(
                            <div>
                            {!props.customPanel?
                               
                               <div 
                                className="groups-dropdown-menu-item" 
                                onClick ={()=>props.panelClicked(panel)} 
                                id={panel[props.ID]}>
                                    {panel[props.panelTitle]} 
                                </div>
                            
                                :

                                <div>
                                    {props.customPanel}
                                </div>
                            }
                            </div>
                        )
                    }):<div></div>
                }
            </div>
        </div>

    );

}
export default FindGroup;


/*

   <div className="groups-dropdown-menu">
        <div onClick={resetCourse} className="groups-dropdown-menu-title">{activeCourse? activeCourse.courseName: "Select A Course"}</div>
            <div className="">
                {!activeCourse?
                    userCourses.map(course =>{
                        return(
                            <div className="groups-dropdown-menu-item" onClick ={()=>courseSelected(course)} id={course.courseName}>{course.courseName} </div>
                        )
                    }):<div></div>
                }
            </div>
        </div>

            <div className="groups-dropdown-menu">
        <div onClick={resetCourseComponent} className="groups-dropdown-menu-title">{activeComponent? activeComponent.name : "Select A Course"}</div>
        <div className={`groups-dropdown-menu-items`}>
                
            {(activeCourse && !activeComponent)?
                activeCourseComponents.map(component=>{
                    return(
                        <div className="groups-dropdown-menu-item" id={component.name} onClick ={()=>componentSelected(component)}>{component.name} </div>
                    )
                }):<div></div>
            }
        </div>
        </div>

                

        var userCourses_ = userCourses;
        var selectedComponent = userCourses_.find(course => course.courseName === activeCourse.courseName).components.find(cmp => cmp.name = activeComponent.name);
        selectedComponent.groups.push(group)
        setUserCourses(userCourses_)
        console.log(userCourses_)
      

*/