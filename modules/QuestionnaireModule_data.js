/** @format */

import { useState } from "react";
import axios from "axios";
import { DEPLOYEDHOST, LOCALHOST } from "../routes/urlMap";

const userID = localStorage.getItem("userId");
let render = true;

export const getProjects = (
  {
    setGeQuestions,
    setSpQuestions,
    setWrQuestions,
    setEProjects,
    setRemovedProjects,
    setLoading,
    userInfo
  },
  userAge
) => {
    setLoading(true);
    let eligibleProjects = [];
    let removedProjects = {};

    axios.get(`${DEPLOYEDHOST}/api/project`).then(
        response => {
        for (let i = 0; i < Object.keys(response.data).length; i++) {
            let project = response.data[i];

            if (project.state == "Recruiting") {
            if (userInfo.location == "home" || userInfo.location == "gp") {
                //location match
                if (!project.workerNeed) {
                //age match
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
                    userInfo.gender == project.gender &&
                    userInfo.healthy == project.needHealth &&
                    userInfo.isSmoking == project.isSmoking &&
                    userInfo.isPregnant == project.isPregnant &&
                    userInfo.isLactating == project.isLactating &&
                    userInfo.isPlanning == project.isPlanningPregnant &&
                    userInfo.english == project.needEnglish
                    ) {
                    eligibleProjects.push(project._id);
                    } else {
                    removedProjects[project._id] = 1;
                    }
                } else {
                    removedProjects[project._id] = 1;
                }
                }
            }
            if (
                userInfo.location == "clinic" ||
                userInfo.location == "hospital"
            ) {
                //location match
                if (project.workerNeed) {
                //age match
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
                    userInfo.gender == project.gender &&
                    userInfo.healthy == project.needHealth &&
                    userInfo.isSmoking == project.isSmoking &&
                    userInfo.isPregnant == project.isPregnant &&
                    userInfo.isLactating == project.isLactating &&
                    userInfo.isPlanning == project.isPlanningPregnant &&
                    userInfo.english == project.needEnglish
                    ) {
                    eligibleProjects.push(project._id);
                    } else {
                    removedProjects[project._id] = 1;
                    }
                } else {
                    removedProjects[project._id] = 1;
                }
                }
            }
            }
        }
            setRemovedProjects(removedProjects);
            setEProjects(eligibleProjects);
            getQuestions({
            setLoading,
            setGeQuestions,
            setSpQuestions,
            setWrQuestions,
            eligibleProjects
            });
        },
            error => {
            console.log(error);
        }
    );
};

export function washQuestions(questions, eligibleProjects) {
  let filteredQuestions = [];

  questions.forEach(item => {
    let shouldRemove = true;
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
  let filter = {}; //check duplicated questions

  axios.get(`${DEPLOYEDHOST}/api/question`).then(
    response => {
      for (let i = 0; i < Object.keys(response.data).length; i++) {
        let tempQuestion = {};
        let question = response.data[i];
        //if the question already exists in the lists
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

export const updateUserInfo = ({ userInfo }) => {
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

export const getUserInfo = ({ setGet, setLoading}) => {
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
      setGet(true);
      setLoading(false);
    },
    error => {
      console.log(error);
    }
  );
  return userInfo;
};

const getUserAge = () => {
  const [age, setAge] = useState(0);
  axios.get(`${DEPLOYEDHOST}/api/users/${userID}`).then(
    response => {
      let dob = response.data.dob;
      let tempAge = getAge(dob);
      setAge(tempAge);
    },
    error => {
      console.log(error);
    }
  );
  return age;
};
export default getUserAge;

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
  return age;
};
