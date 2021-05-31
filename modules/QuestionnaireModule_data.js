/** @format */

import axios from "axios";
import { DEPLOYEDHOST } from "../routes/urlMap";


export const getProjects = (
  {
    setGeQuestions,
    setSpQuestions,
    setWrQuestions,
    setEProjects,
    setLoading,
    userInfo
  },
  history
) => {
    //trun on loading
    setLoading(true);

    let eligibleProjects = [];
    //get projects from database
    axios.get(`${DEPLOYEDHOST}/api/project`).then(
        response => {
        let userAge = getAge(userInfo.age)
        for (let i = 0; i < Object.keys(response.data).length; i++) {
            let project = response.data[i];
            //only recruiting projects are needed
            if (project.state == "Recruiting") {
            //location is home/gp
            if (userInfo.location == "home" || userInfo.location == "gp") {
                if (!project.workerNeed) {
                    //check age
                    const ageRange = project.ageGroup.split(",");
                    for (let i = 0; i < ageRange.length; i++) {
                        ageRange[i] = parseInt(ageRange[i]);
                    }
                    if (
                        (isNaN(ageRange[0]) && isNaN(ageRange[1])) ||
                        (isNaN(ageRange[0]) && userAge <= ageRange[1]) ||
                        (userAge >= ageRange[0] && isNaN(ageRange[1])) ||
                        userAge >= ageRange[0] ||
                        userAge <= ageRange[1]
                    ) {
                        //compare user's information and project requirements.
                        if (
                            (userInfo.gender == project.gender || 
                                project.gender == "Not required") &&
                            userInfo.healthy == project.needHealth &&
                            userInfo.isSmoking == project.isSmoking &&
                            userInfo.isPregnant == project.isPregnant &&
                            userInfo.isLactating == project.isLactating &&
                            userInfo.isPlanning == project.isPlanningPregnant &&
                            userInfo.english == project.needEnglish
                        ) {
                            eligibleProjects.push(project._id);
                        } else {
                        }
                    } else {
                    }
                }
            }
            //location is clinic/hospital
            if (userInfo.location == "clinic" || userInfo.location == "hospital") {
                //location match
                if (project.workerNeed) {
                //check age
                const ageRange = project.ageGroup.split(",");

                for (let i = 0; i < ageRange.length; i++) {
                    ageRange[i] = parseInt(ageRange[i]);
                }

                if (
                    (isNaN(ageRange[0]) && isNaN(ageRange[1])) ||
                    (isNaN(ageRange[0]) && userAge <= ageRange[1]) ||
                    (userAge >= ageRange[0] && isNaN(ageRange[1])) ||
                    userAge >= ageRange[0] ||
                    userAge <= ageRange[1]
                ) {
                    //filter projects based on user's selections.
                    if (
                        (userInfo.gender == project.gender || 
                            project.gender == "Not required") &&
                        userInfo.healthy == project.needHealth &&
                        userInfo.isSmoking == project.isSmoking &&
                        userInfo.isPregnant == project.isPregnant &&
                        userInfo.isLactating == project.isLactating &&
                        userInfo.isPlanning == project.isPlanningPregnant &&
                        userInfo.english == project.needEnglish
                    ) {
                        eligibleProjects.push(project._id);
                    } else {
                    }
                } else {}
                }
            }
            }
        }
            //if no eligible project, jump to the last section
            if (eligibleProjects.length == 0) {
                history.push({
                    pathname: "/projectAvailable",
                    projectIDs: "",
                    hcWorker: (userInfo.location == "home" || userInfo.location == "gp" ) ?
                        false : true
                });
            } else {
                setEProjects(eligibleProjects);
                getQuestions({
                    setLoading,
                    setGeQuestions,
                    setSpQuestions,
                    setWrQuestions,
                    eligibleProjects
                });
            }
        },
            error => {
            console.log(error);
        }
    );
};

{/* filter questions based on eligible projects */}
export function washQuestions(questions, eligibleProjects) {
  let filteredQuestions = [];

  questions.forEach(item => {
    let shouldRemove = true;
    //compare questions with inclusion projects 
    for (let index = 0; index < item.inclusionIDList.length; index++) {
      for (let index_2 = 0; index_2 < eligibleProjects.length; index_2++) {
        if (eligibleProjects[index_2] == item.inclusionIDList[index]) {
          shouldRemove = false;
          break;
        }
      }
      if (!shouldRemove) {
        break;
      }
    }
    //compare questions with exclusion projects 
    for (let index = 0; index < item.exclusionIDList.length; index++) {
      if (!shouldRemove) {
        break;
      }
      for (let index_2 = 0; index_2 < eligibleProjects.length; index_2++) {
        if (eligibleProjects[index_2] == item.exclusionIDList[index]) {
          shouldRemove = false;
          break;
        }
      }
      if (!shouldRemove) {
        break;
      }
    }
    if (!shouldRemove) {
      filteredQuestions.push(item);
    }
  });
  return filteredQuestions;
}

{/* load questions from the database */}
export const getQuestions = ({
  setLoading,
  setGeQuestions,
  setSpQuestions,
  setWrQuestions,
  eligibleProjects
}) => {
  let generalQuestions = [];
  let specificQuestions = [];
  let workerQuestions = [];
  let filter = {}; //used to store duplicated questions

  axios.get(`${DEPLOYEDHOST}/api/question`).then(
    response => {
      for (let i = 0; i < Object.keys(response.data).length; i++) {
        let tempQuestion = {};
        let question = response.data[i];
        //if the question already exists in the list
        if (filter[question.name] != null) {
          if (question.general) {
            for (let i = 0; i < generalQuestions.length; i++) {
              if (question.name == generalQuestions[i]["question"]) {
                if (question.inclusion) {
                  generalQuestions[i]["inclusionIDList"].push(question.project);
                } else {
                  generalQuestions[i]["exclusionIDList"].push(question.project);
                }
              }
            }
          } else if (!question.general) {
            for (let i = 0; i < specificQuestions.length; i++) {
              if (question.name == specificQuestions[i]["question"]) {
                if (question.inclusion) {
                  specificQuestions[i]["inclusionIDList"].push(
                    question.project
                  );
                } else {
                  specificQuestions[i]["exclusionIDList"].push(
                    question.project
                  );
                }
              }
            }
          } else if (question.worker) {
            for (let i = 0; i < workerQuestions.length; i++) {
              if (question.name == workerQuestions[i]["question"]) {
                if (question.inclusion) {
                  workerQuestions[i]["inclusionIDList"].push(question.project);
                } else {
                  workerQuestions[i]["exclusionIDList"].push(question.project);
                }
              }
            }
          }
        } else if (question.general) {
          //create a new question adding to the general list
          filter[question.name] = 1;
          tempQuestion["ID"] = question._id;
          tempQuestion["question"] = question.name;
          tempQuestion["inclusionIDList"] = [
            question.inclusion ? question.project : []
          ];
          tempQuestion["exclusionIDList"] = [
            question.inclusion ? [] : question.project
          ];
          tempQuestion["stateYes"] = false;
          tempQuestion["stateNo"] = false;
          tempQuestion["state"] = "notCompleted";
          generalQuestions.push(tempQuestion);
        } else if (!question.general && !question.worker) {
          //create a new question adding to the specific list
          filter[question.name] = 1;
          tempQuestion["ID"] = question._id;
          tempQuestion["question"] = question.name;
          tempQuestion["inclusionIDList"] = [
            question.inclusion ? question.project : []
          ];
          tempQuestion["exclusionIDList"] = [
            question.inclusion ? [] : question.project
          ];
          tempQuestion["stateYes"] = false;
          tempQuestion["stateNo"] = false;
          tempQuestion["state"] = "notCompleted";
          specificQuestions.push(tempQuestion);
        } else if (!question.general && question.worker) {
          //create a new question adding to the worker list
          filter[question.name] = 1;
          tempQuestion["ID"] = question._id;
          tempQuestion["question"] = question.name;
          tempQuestion["inclusionIDList"] = [
            question.inclusion ? question.project : []
          ];
          tempQuestion["exclusionIDList"] = [
            question.inclusion ? [] : question.project
          ];
          tempQuestion["stateYes"] = false;
          tempQuestion["stateNo"] = false;
          tempQuestion["state"] = "notCompleted";
          workerQuestions.push(tempQuestion);
        }
      }
      //remove all questions that are not in the eligibale Projects list.
      setGeQuestions(washQuestions(generalQuestions, eligibleProjects));
      setSpQuestions(washQuestions(specificQuestions, eligibleProjects));
      setWrQuestions(washQuestions(workerQuestions, eligibleProjects));
      setLoading(false);
    },
    error => {
      console.log(error);
    }
  );
};

{/* update the user's information on the database */}
export const updateUserInfo = ({ userInfo }, userID) => {
  axios
    .put(`${DEPLOYEDHOST}/api/users/${userID}`, {
      gender: userInfo["gender"],
      english: userInfo["english"],
      healthy: userInfo["healthy"],
      isPregnant: userInfo["isPregnant"],
      isSmoking: userInfo["isSmoking"],
      isLactating: userInfo["isLactating"],
      isPlanning: userInfo["isPlanning"]
    })
    .then(error => {
      console.log(error);
    });
};

{/* update the user's contact methods on the database */}
export const updateUserContact = (userID, contactMethoda, phoneNumber) => {
    axios
      .put(`${DEPLOYEDHOST}/api/users/contact/${userID}`, {
        contactMethod: contactMethoda,
        phoneNum: phoneNumber
      })
      .then(error => {
        console.log(error);
    });
};

{/* check whether the healthcare worker is registered in the system */}
export const identifyWorker = (
  { setIdentify, setMsg, setNeedLogin, setHandDevice },
  email,
  password
) => {
  axios
    .post(`${DEPLOYEDHOST}/api/auth`, {
      email: email,
      password: password
    })
    .then(
      response => {
        const role = response.data.userRole;
        if (role == "Health Care Workers") {
          setIdentify(true);
          setNeedLogin(false);
          setHandDevice(false);
        } else {
          setMsg("Sorry, you are not an healthcare worker");
          setIdentify(false);
        }
      },
      error => {
        setMsg("Sorry, you are not registered in the system");
        setIdentify(false);
      }
    );
};

{/* retrieve the user's information from the database */}
export const getUserInfo = ({setDemoInfo, setGet, setLoading, setDataErrorMsg}, userID) => {
  let userInfo = {};
  axios.get(`${DEPLOYEDHOST}/api/users/${userID}`).then(
    response => {
      userInfo["gender"] = response.data.gender;
      userInfo["healthy"] = response.data.healthy;
      userInfo["english"] = response.data.english;
      userInfo["location"] = "";
      userInfo["isPregnant"] = response.data.isPregnant;
      userInfo["isSmoking"] = response.data.isSmoking;
      userInfo["isLactating"] = response.data.isLactating;
      userInfo["isPlanning"] = response.data.isPlanning;
      userInfo["age"] = response.data.dob;
      setLoading(false);
      setGet(true);
      setDataErrorMsg(false);
      setDemoInfo(userInfo);
    },
    error => {
        setDataErrorMsg(true);
      console.log(error);
    }
  );
};

{/* convert DOB to date format and calculate the user's age */}
const getAge = dateString => {
  var regroupData = dateString.split("/");
  var newDate = regroupData[2] + "/" + regroupData[1] + "/" + regroupData[0];
  var today = new Date();
  var birthDate = new Date(newDate);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  console.log(age);
  return age;
};
