import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components/native'

import httpRequest from '../utils/httpRequest'
import LoadingSpinner from '../components/Spinner'
import { DeviceEventEmitter, Platform, TouchableOpacity } from 'react-native'
import AppSwipeableList from '../components/AppSwipeableList'
import ChecklistItem from '../components/ChecklistItem'
import AppText from '../components/Text'
import Remainder from '../components/Remainder'
import moment from 'moment'

const Container = styled.View`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 20px;
`

const Text = styled.Text`
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  color: #575767;
  margin-bottom: 10px;
`

const Section = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-top: 30px;
  margin-bottom: 16px;
`

const TitleContainer = styled.View`
  margin-bottom: 20px;
`

const sortTaskByTime = (sortData) => sortData.sort((task_a, task_b) => {
  
  const dateOne = moment(task_a.due_at).toDate();
  const dateTwo = moment(task_b.due_at).toDate();

  return  Number(dateTwo) - Number(dateOne);
});

function Tasks({navigation, route}) {

  // STATE TO STORE TASKS
  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompleteTasks, setIncompleteTasks] = useState([]);


  const intervals = useRef([])

  // STATE FOR SHOW HIDE LOADER
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    DeviceEventEmitter.addListener("refreshTasks", (event) => { getTasks(true) })

    getTasks();

    return () => DeviceEventEmitter.removeAllListeners("refreshTasks");

  }, [])

  const getTasks = async (loadSilently = false) => 
  {

    // IF LOAD SILENTLY
    if (!loadSilently)
    {
      setLoading (true);
    }

    // SEND THE HTTP REQUEST
    const response = await httpRequest ("/tasks", "GET");

    // IF RESPONSE IS SUCCESSFULL
    if (response.code === 200)
    {
      // KEY FOR GROUP
      const key = "status";

      // GROUP TASKS BASED ON STATUS OF TASKS
      const groupedTasks = response.tasks.reduce(
        (acc, curr) => 
        {

          // IF ACCUMULATOR CONTAIN THE STATUS THEN PUSH THE CURRENT TASK WITH THE STATUS IN ACCUMULATOR
          (acc[curr[key]] = acc[curr[key]] || []).push(curr);

          // RETURN THE ACCUMULATOR
          return acc;
        }, {}
      );

      // IF WE HAVE COMPLETED TASKS
      if (groupedTasks["completed"] && groupedTasks["completed"].length > 0)
      {
        const sorted = sortTaskByTime (groupedTasks["completed"])
        setCompletedTasks (sorted)
      }

      // IF WE HAVE UNCOMPLETE TASKS
      if (groupedTasks["incomplete"] && groupedTasks["incomplete"].length > 0)
      {
        const sorted = sortTaskByTime (groupedTasks["incomplete"])

        setIncompleteTasks (sorted)
        
        for (let i = sorted.length - 1; i >= 0; i--)
        {
            const task = sorted[i];

            const timeout = setTimeout (() => DeviceEventEmitter.emit ("showRemainder", {task , display: true}), moment(task.due_at).toDate().getSeconds())
            
            intervals.current.push({[task.id]: timeout});
        }
      }
    }

    // IF LOAD SILENTLY
    if (!loadSilently)
    {
      setLoading (false);
    }
  }
  
  // FUCTION FOR UPDATING THE TASK STATUS
  const updateTask = async (task, status) => 
  {
    setLoading (true);

    // BUILD THE OBJECT
    const tempTask = {...task, status: status};

    // SEND THE HTTP REQUEST
    const response = await httpRequest (`/tasks/${task.id}`, "PUT", tempTask);

    // IF RESPONSE IS SUCCESSFULL
    if (response.code === 201)
    {
      // IF STATUS IS COMPLETED
      if (status === "completed")
      {
          removeTaskFromIncomplete (task);

          const newCompletedTasks = sortTaskByTime ([...completedTasks, task])

          intervals.current = intervals.current.map(i => {

            if (i.id === task.id)
            {
              clearInterval (i.id)
            }
            else return i;
          })

          setCompletedTasks (newCompletedTasks)
      }
      else 
      {
          removeTaskFromCompleted (task)

          const newIncompletedTasks = sortTaskByTime ([...incompleteTasks, task])

          const timeout = setTimeout (() => DeviceEventEmitter.emit ("showRemainder" , {task , display: true}), moment(task.due_at).toDate().getSeconds())
            
          intervals.current.push({[task.id]: timeout});

          setIncompleteTasks (newIncompletedTasks)
      }
    }

    setLoading (false);

  }


  // FUNCTION FOR DELETING THE TASK
  const handleDelete = async (task) => 
  {
      setLoading (true);

      // SEND THE HTTP REQUEST
      const response = await httpRequest (`/tasks/${task.id}`, "DELETE")

      // IF TASK IS SUCCESSFULLY DELETED
      if (response.code === 204)
      {
        if (task.status === "incomplete")
        {
          removeTaskFromIncomplete (task)

          intervals.current = intervals.current.map(i => {

            if (i.id === task.id)
            {
              clearInterval (i.id)
            }
            else return i;
          });
        }
        else 
        {
          removeTaskFromCompleted (task)
        }
      }

      setLoading (false)
  }

  // FUNCTION FOR HANDLING EDIT TASK
  const handleEdit = (task) => 
  {
    navigation.navigate("NewTaskScreen", {selectedTask: task, showHeader:true})
  }

  // FUNCTION FOR REMOVING THE TASK FROM INCOMPLETE STATE
  const removeTaskFromIncomplete = (task) => 
  {
    // REMOVE THE TASK FROM INCOMPLETED ARRAY 
    const filteredIncompletedTasks = incompleteTasks.filter(i => i.id !== task.id)

    // UPDATE THE TASKS
    setIncompleteTasks (filteredIncompletedTasks);
  }

  // FUNCTION FOR REMOVING THE TASK FROM INCOMPLETE STATE
  const removeTaskFromCompleted = (task) => 
  {
    // REMOVE THE TASK FROM INCOMPLETED ARRAY 
    const filteredCompletedTasks = completedTasks.filter(i => i.id !== task.id)

    // UPDATE THE TASKS
    setCompletedTasks (filteredCompletedTasks);
  }

  // IF LOADING IS TRUE
  if (loading) 
  {
    return <LoadingSpinner />
  }

  return (
    <Container>
      <TitleContainer>
        <AppText size={30}>Task</AppText>
      </TitleContainer>
      <TouchableOpacity onPress={() => navigation.navigate("NewTaskScreen", {showHeader: true})}>
          <Text>+ Add new task</Text>
      </TouchableOpacity>
      <Section>
        <Text>Incomplete</Text>
        <AppSwipeableList
          data={incompleteTasks}
          handleDelete={(task) => handleDelete(task)}
          handleEdit={(task) => handleEdit(task)}
          renderItem=
          {
            (task) => 
            <ChecklistItem
              onClick={() => updateTask(task, "completed")} 
              key={task.id} 
              checked={false} 
              dueDate={task.due_at} 
              title={task.title} 
            />
          }
        />
      </Section>
      <Section>
        <Text>Completed</Text>
        <AppSwipeableList
          data={completedTasks}
          handleDelete={(task) => handleDelete(task)}
          handleEdit={(task) => handleEdit(task)}
          checked={true}
          renderItem=
          {
            (task) => 
            <ChecklistItem 
              key={task.id} 
              checked={true} 
              onClick={() => updateTask(task, "incomplete")}
              dueDate={task.due_at} 
              title={task.title} 
            />
          }
        />
      </Section>
      
    </Container>
  )
}

export default Tasks