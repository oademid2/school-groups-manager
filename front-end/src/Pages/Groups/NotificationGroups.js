import './Groups.css';
import './NotificationGroups.css';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from './api';
import groupReq from './receivedGroupRequests.json'




function NotificationGroups() {

  const userID=123;
  const [pendingRequests, setPendingRequests] = useState([])

  useEffect(() => {
    getReceivedGroupRequest()
  }, []);


  function getReceivedGroupRequest(){
    setPendingRequests(groupReq)
    //API
    /*api.getReceivedGroupRequest(userID).then((res)=>{
      setPendingRequests(res.data)
    })*/
  }
  function rejectReceivedGroupRequest(request){

    var copyRequest = [...pendingRequests]
    var indexToDel = copyRequest.indexOf(request);
    if (indexToDel !== -1) {
      copyRequest.splice(indexToDel, 1);
    }
    setPendingRequests(copyRequest)
    request.status = "rejected"

    //API
      /*api.rejectReceivedGroupRequest(request).then(res =>{
        console.log("request rejected.")
      })*/
  }

  function acceptReceivedGroupRequest(request){

    var copyRequest = [...pendingRequests]
    var index = copyRequest.indexOf(request);
    if (index !== -1) {
      copyRequest.splice(index, 1);
    }
    setPendingRequests(copyRequest)
    request.status = "accepted"


    /*//API CALL
    api.acceptReceivedGroupRequest(request).then(res =>{
      console.log("request accepted.")
    })*/
}


  return (

    <div className="groups-panel ">

      <div className="notifications-panel">
      <div className="notifications-panel-title">NOTIFICATIONS</div>
        <div className="notifications-grid">
        {pendingRequests.map(request=>{
            return(
              <div className="request-card">
                <div className="request-card-text">
                  <p className="request-card-course">{request.courseID} : {request.componentID}</p>
                  <p className="request-card-user">{request.userID}</p>
                </div>
                <div className="request-card-btns">
                  <button onClick={()=>{rejectReceivedGroupRequest(request)}} className="fa decline">&#xf00d;</button>
                  <button  onClick={()=>{acceptReceivedGroupRequest(request)}} className="fa accept">&#xf00c;</button>
                </div>
              </div>
              
            )
          
          })}
        </div>


      </div>
     

    </div>
  );
}

export default NotificationGroups;