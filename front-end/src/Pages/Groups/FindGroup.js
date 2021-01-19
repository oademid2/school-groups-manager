import './FindGroup.css';
import React, { useState, useEffect} from 'react';
import api from './api.js'

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
        // Your code here
        api.getCourses(userID).then((res)=>{
            setUserCourses(res.data)
            console.log("user courses loaded.")
        })
    }, []);

 

  function courseSelected(e){

      //reset other collapsables
      resetCourse();

      //get course that was selected
      var courseName = e.target.getAttribute('id');
      var activeCoursesComponents_ = userCourses.find(course => course.courseName === courseName).components;
     
      //set this as selected course
      setActiveCourse(courseName)
      setActiveCourseComponents(activeCoursesComponents_)

  }

    function componentSelected(e){

        //get selected component
        var componentName = e.target.getAttribute('id');
        console.log(componentName)
        
        console.log(activeComponent)
        if(findGroupsMode){
            setActiveCourseMembers(["kitan", "josh", "nick", "steven","kitan", "josh", "nick", "steven","kitan", "josh", "nick", "steven","kitan", "josh", "nick", "steven"])
            setActiveComponent(componentName)
            return
        }
        
        setActiveComponent(componentName)
        api.getOpenGroups(activeCourse, componentName).then((res) =>{

            if(res.data.hasGroup)setActiveGroup(res.data.groups[0])
            setActiveCourseGroups(res.data.groups)
            console.log(res.data,"members loaded.")
        })
    }

    function sendGroupRequest(group){
        var groupID = group.groupID;
        setActiveCourseGroups([group])
        setActiveGroup(group)
        api.sendGroupRequest(userID, groupID).then((res)=>{
            setActiveGroup(group)
        })
    }

    function cancelGroupRequest(group){
        var groupID = group.groupID;
        setActiveGroup(null)
        api.cancelGroupRequest(userID, groupID).then((res)=>{
            setActiveGroup(null)
            api.getOpenGroups(activeCourse, "Lab5").then((res) =>{

                if(res.data.hasGroup)setActiveGroup(res.data.groups[0])
                setActiveCourseGroups(res.data.groups)
                setActiveComponent(activeComponent)
                console.log(res.data,"members loaded.")
            })

        })
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
                setFindGroupsMode(true)
                resetCourse()
                }} className={`find-groups-btn ${findGroupsMode? "active":""}`}>CREATE</div>
            <div onClick={()=> {
                setFindGroupsMode(false)
                resetCourse()
            }} className={`find-groups-btn ${!findGroupsMode? "active":""}`}>JOIN</div>
        </div>
        
        <div className="collapsable-groups">
        <div className="groups-dropdown-menu">
        <div onClick={resetCourse} className="groups-dropdown-menu-title">{activeCourse? activeCourse: "Select A Course"}</div>
            <div className="">
                {!activeCourse?
                    userCourses.map(course =>{
                        return(
                            <div className="groups-dropdown-menu-item" onClick ={courseSelected} id={course.courseName}>{course.courseName} </div>
                        )
                    }):<div></div>
                }
            </div>
        </div>

        <div className="groups-dropdown-menu">
        <div onClick={resetCourseComponent} className="groups-dropdown-menu-title">{activeComponent? activeComponent : "Select A Course"}</div>
        <div className={`groups-dropdown-menu-items`}>
                
            {(activeCourse && !activeComponent)?
                activeCourseComponents.map(component=>{
                    return(
                        <div className="groups-dropdown-menu-item" id={component} onClick ={componentSelected}>{component} </div>
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
                                        <div className="groups-dropdown-menu-item-small" >{member.Name} </div>  
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