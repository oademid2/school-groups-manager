import './FindGroup.css';
import React, { useState, useEffect} from 'react';
import api from './api.js'
import coursesJSON from './courses.json'
import groupsJSON from './groups.json'

var courses = [
    {courseName: "SE4455B",
    components: ["Lab1", "Lab2", "Lab3"]},

    {courseName: "SE4455A",
    components: ["Lab1", "Lab2", "Lab3"]}
]

var components = ["Lab1", "Lab2", "Lab3"]

var members = ["a", "b", "c"]

var userID = 123;

function FindGroup() {

    //Display Data Varaibles
    const[courseInfo, setCourseInfo] = useState(null);
    const[userCourses, setUserCourses] = useState([]);
    const[activeCourse, setActiveCourse] = useState(null);
    const[activeCourseMembers, setActiveCourseMembers] = useState([]);
    const[activeCourseComponents, setActiveCourseComponents] = useState([]);
    const[activeCourseGroups, setActiveCourseGroups] = useState([]);
    const[activeComponent, setActiveComponent] = useState(null);
    const[activeGroup, setActiveGroup] = useState(null);

    //Display conditionals
    const[findGroupsMode, setFindGroupsMode] = useState(0);

    //check cache for course names, automatically load course names into JSON file -- keep this stored
    //load as JSON friendly
    useEffect(() => {
        // TODO: move to groups.js set courses based on props
        setUserCourses(coursesJSON)
        console.log("courses info loaded.")

        //API CALL
        /*api.getCoursesInfo(userID).then((res)=>{
            setUserCourses(res.data)
            console.log(res.data,"courses info loaded.")
        })*/
       
    }, []);

 

  function courseSelected(course){

      resetCourse();
      setActiveCourse(course)
      setActiveCourseComponents(course.components)

  }

    function componentSelected(component){
        
        if(findGroupsMode){
            setActiveCourseMembers(["kitan", "josh", "nick", "steven","kitan", "josh", "nick", "steven","kitan", "josh", "nick", "steven","kitan", "josh", "nick", "steven"])
            setActiveComponent(component)
            return
        }
        
        var groupMemberOf = groupsJSON.find(group => (group.course == activeCourse.courseName) && (group.component == component.name))
        console.log(groupMemberOf)
        setActiveComponent(component)
        if(component.groupMemberOf)setActiveGroup(component.groupMemberOf)
        else setActiveCourseGroups(component.groups)
        console.log("members loaded.")
    }

    function sendGroupRequest(group){
        var groupID = group.groupID;
        group.status = "pending"

        setActiveGroup(group)
        setActiveCourseGroups([group])


        var userCourses_ = userCourses;
        var selectedComponent = userCourses.find(course => course.courseName === activeCourse.courseName).components.find(cmp => cmp.name = activeComponent.name);
        selectedComponent.groupMemberOf = group;
        
        setUserCourses(userCourses_)
        
        //api.sendGroupRequest(userID, groupID)
    }

    function testButton(){
        var groupMemberOf = [1,2,3].find(group => (group.courseName == activeCourse.courseName) && (group.componentID == activeComponent.name))
        console.log(groupMemberOf)
    }

    function cancelGroupRequest(group){

        var groupID = group.groupID;
        var selectedComponent = userCourses.find(course => course.courseName === activeCourse.courseName).components.
        find(cmp => cmp.name = activeComponent.name);

        selectedComponent.groupMemberOf = null;

        setActiveGroup(null)
        setActiveCourseGroups(selectedComponent.groups)
        //api.cancelGroupRequest(userID, group.groupID)
    }

    function resetCourse(){
        setActiveCourse(false)
        resetCourseComponent();
    }

    function resetCourseComponent(){
        setActiveComponent(null);
        setActiveGroup(null);
        setActiveCourseMembers([]);
        setActiveCourseGroups(null);
    }
    /*TODO:
    - options for members
    - click on members
    */
  return (
    <div className="groups-panel find-groups-panel">

        <div className="find-groups-mode-container">
            <div onClick={()=> {
                //setFindGroupsMode(true)
                //resetCourse()
                testButton()
                }} className={`find-groups-btn ${findGroupsMode? "active":""}`}>CREATE</div>
            <div onClick={()=> {
                setFindGroupsMode(false)
                resetCourse()
            }} className={`find-groups-btn ${!findGroupsMode? "active":""}`}>JOIN</div>
        </div>
        
        <div className="collapsable-groups">
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

        <div className="groups-dropdown-menu">
        <div className="groups-dropdown-menu-title">Select A Group</div>
        {
            findGroupsMode?
                <div className={`groups-dropdown-menu-items2`}>
                     {activeCourseMembers.map(member =>{
                        return(
                            <div>
                            <div className="groups-dropdown-menu-item-small" >
                            <span id={member} className="member-name">{member}</span> 
                            <button id={member} className="member-invite">invite</button> 
                                </div>  
                            </div> 
                        )
                    }) }
                </div>
            :
            <div className={`groups-dropdown-menu-items`}>
            {activeCourseGroups?
                
                activeCourseGroups.map(group =>{
                   
                    return(
                        <div>
                           <div className="groups-dropdown-menu-subtitle">
                               
                               {
                                   !activeGroup?
                                   <div>
                                        <span className="group-id">Group: {group.groupID}</span> 
                                        <button onClick={() => sendGroupRequest(group)} className="req-btn">ask to join</button>
                                   </div>
                                  :
                                  <div>
                                    <span className="group-id">Group: {group.groupID}</span> 
                                    <button onClick={() => cancelGroupRequest(group)} className="req-btn">cancel request</button>
                                </div>
                               }
                            </div>
                            {group.members.map(member =>{
                                    return(
                                        <div>
                                        <div className="groups-dropdown-menu-item-small" >{member.name} </div>  
                                        </div> 
                                    )
                                }) }
                        </div>
                    )
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

function groupsModeBtn(props){
    return(
    <div>
        {
            props.users.map(member =>{
                return(
                <div>
                    <h4><button>remove</button> {member.name}  </h4>
                </div>
                )
            })
        }
    </div>
    );

}
export default FindGroup;


/*


activeCourseMembers.map(member =>{
                    return(
                        <div>
                        <div onClick ={componentSelected}>{member} <button>request</button> </div>  
                        </div> 
                    )
                })


    */