import './Groups.css';

import React, { useState,  useEffect} from 'react';
import { Collapse } from 'antd';


const { Panel } = Collapse;








function ManageGroups() {
    
    //TODO: initialize as empty
    const [groupsPanel, setGroupsPanel] = useState([
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
    ]);


   
    function toggleGroupsCollapsable(i) {
        var updatedPanel = [...groupsPanel];
        updatedPanel[i].show = !updatedPanel[i].show;
        setGroupsPanel(updatedPanel)   
    }


  return (
    <div className="groups-panel">
      

        <p>Your Groups</p>

        {
            groupsPanel.map(panel =>{
                return(
                    <div>

                    <span  onClick={() => toggleGroupsCollapsable(panel.id)} type="button" class="collapsible">
                        {panel.course+" "+panel.component}
                    </span>

                    {panel.show? <NameListCard users={panel.members}></NameListCard>:<div></div>}
                    </div>
                )
        
            })
        }

    </div>
  );
}

function NameListCard(props){
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

*/