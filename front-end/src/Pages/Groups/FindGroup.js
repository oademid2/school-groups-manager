import './FindGroup.css';
import React, { useState, useEffect} from 'react';
import api from './api.js'
import coursesJSON from './courses.json'
import groupsJSON from './groups.json'



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
    const[groupsList, setGroupsList] = useState(null)
    const[partOfGroup, setPartOfGroup] = useState(null)

    //Display conditionals
    const[findGroupsMode, setFindGroupsMode] = useState(0);

    //check cache for course names, automatically load course names into JSON file -- keep this stored
    //load as JSON friendly
    useEffect(() => {
        // TODO: move to groups.js set courses based on props
        setUserCourses(coursesJSON)
        setGroupsList(groupsJSON)
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
       
    }, []);

 

  function courseSelected(course){

      resetCourse();
      setActiveCourse(course)
      setActiveCourseComponents(course.components)

  }

    function componentSelected(component){
        
        var groupMemberOf = groupsList.find(group => (group.course == activeCourse.courseName) && (group.component == component.name))

       /* if(findGroupsMode){
            //setActiveCourseMembers(["kitan", "josh", "nick", "steven","kitan", "josh", "nick", "steven","kitan", "josh", "nick", "steven","kitan", "josh", "nick", "steven"])
            if(groupMemberOf)setPartOfGroup(groupMemberOf)
            return
        }*/
        
       
        setActiveComponent(component)
        if(groupMemberOf){
            setActiveGroup(groupMemberOf)
            setActiveCourseGroups([groupMemberOf])
        }else setActiveCourseGroups(component.groups)
        console.log("members loaded.")
    }

    function sendGroupRequest(group){

        var groupsList_ = groupsList

        group.status = "pending"
        groupsList_.push(group)

        setActiveGroup(group)
        setActiveCourseGroups([group])
        setGroupsList(groupsList_)

        

        /*var userCourses_ = userCourses;
        var selectedComponent = userCourses_.find(course => course.courseName === activeCourse.courseName).components.find(cmp => cmp.name = activeComponent.name);
        selectedComponent.groups.push(group)
        setUserCourses(userCourses_)
        console.log(userCourses_)*/
        
        /*api.sendGroupRequest(userID, groupID).then(res =>{
            setUserCourses(res.data)
        })*/
    }

    function testButton(){
       
    }

    function cancelGroupRequest(group){

        var groupsList_ = groupsList;
        var selectedGroup = groupsList_.find(grp => grp.groupID == group.groupID)

        var groupIndex = groupsList_.indexOf(selectedGroup)
        if (groupIndex !== -1) {
            groupsList_.splice(groupIndex, 1);
        }


        setActiveGroup(null)
        setActiveCourseGroups(activeComponent.groups)
        setGroupsList(groupsList_)
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
    function createNewGroup(){
        var groupsList_ = groupsList
        var newgroup= {
            "id":0,
            "owner": true,
            "course":"SE4455B",
            "component":"Lab4",
            "groupID":"123",
            "courseID":"123",
            "componentID":"123",
            "status":"accepted",
            "members":[
                {
                    "userID": userID,
                    "name": "user.name",
                    "picture_url": "example.com"
                }
            ]
    }
        groupsList_.push(newgroup)
        setGroupsList(groupsList_)
        setActiveGroup(newgroup)        
        //api.createNewGroup(userID)
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
                //testButton()
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
        <div className="groups-dropdown-menu-title">{activeGroup? "already in group":"Select A Group"}</div>
        {
            activeComponent && findGroupsMode?
                <div className={`groups-dropdown-menu-items2`}>
                    
                         {activeGroup?
                            <div>

                             <div className="groups-dropdown-menu-subtitle">
                             <span className="group-id">Group: {activeGroup.groupID}</span> 
                           <button className="req-btn">{activeGroup.status == "pending"? "pending":"member"}</button>
                            </div>
                          
                          
                           {activeGroup.members.map(member =>{
                                    return(
                                        <div>
                                        <div className="groups-dropdown-menu-item-small" >{member.name} </div>  
                                        </div> 
                                    )
                            }) }
                         </div>:
                        <div className="groups-dropdown-menu-subtitle">
                           <span className="group-id">No Group Yet.</span> 
                           <button onClick={createNewGroup}className="req-btn">Create Group</button>
                       </div>
                         
                        
                        }
                          
           
                    
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
                                    {group.status == "pending"?
                                    <button onClick={() => cancelGroupRequest(group)} className="req-btn">cancel request</button>:
                                    <button  className="req-btn">member</button>
                                    
                                    }
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