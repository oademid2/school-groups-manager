import request from 'axios';

class api{
    
    static _url = "https://fadb048d-8ef8-4cdf-ba46-8fb8e7d4bc49.mock.pstmn.io"//https://f6801771-ee07-4701-80a9-98df8d3dd13a.mock.pstmn.io";

    static getCourses = (userID) => {

        const apiCompletionPromise = request({
            method: 'get',
            url: this._url + '/get/courses?userID='+userID,
        })

        return apiCompletionPromise;
    }

    static getOpenGroups = (courseID, componentID) => {

        console.log(componentID)
        const apiCompletionPromise = request({
            method: 'get',
            url: this._url + '/get/opengroups?courseID='+'123'+'&componentID='+componentID,
        })

        return apiCompletionPromise;
    }


    static getCourseMembers = (courseName) => {

        const apiCompletionPromise = request({
            method: 'get',
            url: this._url + '/get/coursemembers?courseID='+'123',
        })

        return apiCompletionPromise;
    }

    static sendGroupRequest = (userID, groupID) => {

        groupID = 123;
        const apiCompletionPromise = request({
            method: 'post',
            url: this._url + '/post/grouprequest?userID='+userID+'&groupID='+ groupID,
        })

        return apiCompletionPromise;
    }

    static cancelGroupRequest = (userID, groupID) => {

        groupID = 123;
        const apiCompletionPromise = request({
            method: 'delete',
            url: this._url + '/delete/grouprequest?userID='+userID+'&groupID='+ groupID,
        })

        return apiCompletionPromise;
    }



}

export default api;


/*
get open groups
get course members

*/