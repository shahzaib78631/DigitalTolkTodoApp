import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import DescriptionIcon from '../assets/DescriptionIcon'
import DueDateIcon from '../assets/DueDateIcon'
import SummaryIcon from '../assets/SummaryIcon'
import httpRequest from '../utils/httpRequest'
import AppButton from './Button'

// import moment from "moment"

// import TextInput from './TextInput'

const Modal = styled.View`
    display: ${props => props.display};
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
`

const ModalContainer = styled.View`
    position:fixed;
    background: white;
    width: 60%;
    height: auto;
    top:50%;
    left:50%;
    /* transform: translate(-50%,-50%); */
    position: absolute;
    height: 501px;
    background: #FFFFFF;
    box-shadow: 0px 2px 20px rgba(38, 36, 131, 0.25);
    border-radius: 8px;
    display: flex;
    flex : 1; 
    padding: 48px;
    padding-bottom: 0px;
    flex-direction: column;
`

const Title = styled.Text`
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #000000;
    margin-bottom: 10px;
`

const ButtonsContainer = styled.View`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-top: auto;
    align-self: center;
    justify-content: flex-end;
    align-items: center;
`

const FieldsContainer = styled.View`
    display: flex;
    flex: 1;
    flex-direction: column;
`

const TextInputContainer = styled.View`
    display: flex;
    flex-direction: row;
    /* padding-bottom: 3rem; */

`

const TextInput = styled.TextInput`
    border: 0;
    /* padding-inline: 1rem; */
    height: ${props => props.height ? props.height : 30}px;
    flex: 1;
    text-align: left;
    vertical-align: text-top;
    margin-inline: 16px;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #BDBDBD;

    &:focus{
        outline: none;
    }
`

const TextArea = styled.TextInput`
    border: 0;
    /* padding-inline: 1rem; */
    height: ${props => props.height ? props.height : 30}px;
    flex: 1;
    text-align: left;
    vertical-align: text-top;
    margin-inline: 16px;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #BDBDBD;
    margin-bottom: 5px;
    resize: none;
`

const Seperator = styled.View`
    width: auto;
    height: 0px;
    left: 328px;
    top: 269px;
    margin-bottom: 32px;
    border: ${props => props.error ? 1 : 0.5}px solid ${props => props.error ? "#cb3837" : "rgba(189, 189, 189, 0.8)"};
`

const Container = styled.View`
    /* display: flex;
    flex: 1; */
    margin-right: 10%;
    margin-left: 10%;
    margin-top: 20px;
`

function TaskModal({visible, setVisible, onTaskSave, selectedTask}) {

    const [summary, setSummary] = useState("")
    const [description, setDescription] = useState("")
    const [dueDate, setDueDate] = useState(new Date())

    // ERRORS
    const [errors, setErrors] = useState({summary: false, description: false, dueDate: false})

    // LOADING
    const [loading, setLoading] = useState(false);


    useEffect(() => 
    {
        // IF SELECTED TASK
        if (selectedTask)
        {
            setSummary (selectedTask.title)
            setDescription (selectedTask.description)
            setDueDate (selectedTask.due_at)
        }

    }, [selectedTask])
    

    // FUNCTION FOR SAVING THE NEW TASK
    const handleSaveTask = async () =>
    {
        // IF VALIDATION FAILES THEN DO NOT PROCEED FURTHER
        if (!validateTask ()) return 

        // START THE LOADING
        setLoading (true)
        
        // BUILD THE PAYLOAD
        const payload = 
        {
            "title": summary,
            "description": description,
            "status": "incomplete",
            "due_at": moment(dueDate).format("yyyy-MM-DD HH:mm:ss")
        }

        // SEND THE HTTP REQUEST
        const response = await httpRequest ("/tasks", "POST", payload);

        // IF RESPONSE IS SUCCESS
        if (response.code === 201)
        {
            setSummary ("");
            setDescription ("");
            onTaskSave()
        }

        // STOP THE LOADING
        setLoading (false)
    }

    // FUNCTION FOR SAVING THE NEW TASK
    const handleUpdate = async () =>
    {
        // IF VALIDATION FAILES
        if (!validateTask ()) return 

        // START THE LOADING
        setLoading (true)
        
        // BUILD THE PAYLOAD
        const payload = 
        {
            "title": summary,
            "description": description,
            "status": selectedTask.status,
            "due_at": moment(dueDate).format("yyyy-MM-DD HH:mm:ss")
        }

        // SEND THE HTTP REQUEST
        const response = await httpRequest (`/tasks/${selectedTask.id}`, "PUT", payload);

        // IF RESPONSE IS SUCCESS
        if (response.code === 201)
        {
            setSummary ("");
            setDescription ("");
            onTaskSave()
        }

        // STOP THE LOADING
        setLoading (false)
    }

    const validateTask = () => 
    {
        if (summary.trim() === "")
        {
            setErrors ((prev) => ({prev, summary: true}))
            return false;
        }
        else if (errors.summary)
        {
            setErrors ((prev) => ({prev, summary: false}))
        }

        if (description.trim() === "")
        {
            setErrors ((prev) => ({prev, description: true}))
            return false;
        }
        else if (errors.description)
        {
            setErrors ((prev) => ({prev, description: false}))
        }

        if (dueDate.trim() === "")
        {
            setErrors ((prev) => ({prev, dueDate: true}))
            return false;
        }
        else if (errors.dueDate)
        {
            setErrors ((prev) => ({prev, dueDate: false}))
        }

        return true
    }

    return (
        <Modal display={visible ? "flex" : "none"}>
            <ModalContainer>
                <Title>New Task</Title>
                <Container>
                    <FieldsContainer>
                        <TextInputContainer>
                            {/* <SummaryIcon /> */}
                            <TextArea 
                                onChange={(e) => setSummary(e.target.value)}
                                height={50}
                                value={summary}
                                placeholder={"Summary"} 
                            />
                        </TextInputContainer>
                        <Seperator error={errors.summary} />
                        <TextInputContainer>
                            {/* <DescriptionIcon /> */}
                            <TextArea
                                onChange={(e) => setDescription(e.target.value)}
                                height={70}
                                value={description}
                                placeholder={"Description"} 
                            />
                        </TextInputContainer>
                        <Seperator error={errors.description} />
                        <TextInputContainer>
                            <View style={{marginTop: 18}}>
                                {/* <DueDateIcon /> */}
                            </View>
                            <TextInput 
                                height={60}
                                type={"datetime-local"} 
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                placeholder={"Due Date"} 
                            />
                        </TextInputContainer>
                        <Seperator error={errors.dueDate} />
                    </FieldsContainer>
                </Container>
                <ButtonsContainer>
                    <AppButton 
                        title={selectedTask ? "Update" : "Save"} 
                        loading={loading}
                        loadingText={selectedTask ? "Updating..." : "Saving..."}
                        onClick={selectedTask ? handleUpdate : handleSaveTask}
                    />
                    <AppButton 
                        title={"Cancel"}
                        size={12}
                        onClick={setVisible}
                        titleColor={"black"}
                        bgColor={"white"}
                    />
                </ButtonsContainer>
            </ModalContainer>
        </Modal>
    )
}

export default TaskModal