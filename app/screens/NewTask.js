import React, { useEffect, useState } from 'react'
import { DeviceEventEmitter, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components/native'
import DescriptionIcon from '../assets/DescriptionIcon'
import DueDateIcon from '../assets/DueDateIcon'
import SummaryIcon from '../assets/SummaryIcon'
import httpRequest from '../utils/httpRequest'
import AppButton from '../components/Button'
import Header from '../components/Header'

import DateTimePicker from '@react-native-community/datetimepicker';

import moment from "moment"

const Container = styled.View`
    display: flex;
    padding: 10px;
    flex-direction: column;
    flex: 1;
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
`

const Title = styled.Text`
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 24px;
    color: #000000;
    margin-bottom: 10px;
    text-align: center;
`

const Seperator = styled.View`
    width: auto;
    height: 0px;
    margin-bottom: 32px;
    border: ${props => props.error ? 1 : 0.5}px solid ${props => props.error ? "#cb3837" : "rgba(189, 189, 189, 0.8)"};
`

function NewTask({navigation, route}) {

    const [selectedTask] = useState (route.params?.selectedTask)

    const [summary, setSummary] = useState("")
    const [description, setDescription] = useState("")
    const [dueDate, setDueDate] = useState(new Date())

    const [show, setShow] = useState(false);

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
            setDueDate ( moment (selectedTask.due_at).toDate())
        }

    }, [selectedTask, route.params])
    

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
            
            DeviceEventEmitter.emit("refreshTasks")
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
            
            DeviceEventEmitter.emit('refreshTasks');
            navigation.goBack()
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

        return true
    }


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDueDate(currentDate);
  };

    return (
        <Container>
            <Header showBack={route.params?.showHeader} title={"New Task"} />
            <Container>
                <FieldsContainer>
                    <TextInputContainer>
                        <View style={{marginTop: 5}}>
                            <SummaryIcon />
                        </View>
                        <TextInput 
                            onChangeText={(text) => setSummary(text)}
                            value={summary}
                            placeholder={"Summary"} 
                            multiline={true}
                            placeholderTextColor={"#BDBDBD"}
                            style={[style.textArea, {height: 50}]} 
                        />
                    </TextInputContainer>
                    <Seperator error={errors.summary} />
                    <TextInputContainer>
                        <View style={{marginTop: 5}}>
                            <DescriptionIcon />
                        </View>
                        <TextInput
                            onChangeText={(text) => setDescription(text)}
                            value={description}
                            placeholder={"Description"}
                            multiline={true}
                            placeholderTextColor={"#BDBDBD"}
                            style={[style.textArea, {height: 150}]} 
                        />
                    </TextInputContainer>
                    <Seperator error={errors.description} />
                        <TouchableOpacity onPress={() => setShow(true)}>
                            <TextInputContainer>
                                <View style={{marginTop: 18}}>
                                    <DueDateIcon />
                                </View>
                                    <TextInput
                                        height={60}
                                        value={dueDate.toDateString()}
                                        editable={false}
                                        onPressIn={() => setShow(true)}
                                        placeholder={"Due Date"} 
                                        style={[style.textInput, {height: 60}]}
                                    />
                            </TextInputContainer>
                        </TouchableOpacity>
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
            </ButtonsContainer>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={dueDate}
                    mode={"datetime"}
                    dateFormat={"yyyy-MM-DD h:mm:ss"}
                    is24Hour={true}
                    onChange={onChange}
                />
            )}
        </Container>
    )
}

const style = StyleSheet.create({
    textInput: 
    {
        border: 0,
        /* padding-inline: 1rem; */
        height: 30,
        flex: 1,
        textAlign: "left",
        marginLeft: 15,
        fontWeight: "500",
        fontSize: 16,
        lineHeight: 19,
        color: "#BDBDBD",
    },
    textArea:
    {
        border: 0,
        /* padding-inline: 1rem; */
        height: 30,
        flex: 1,
        textAlign: "left",
        fontWeight: "500",
        fontSize: 16,
        marginBottom: 5,
        marginLeft: 15,
        textAlignVertical: 'top'
    }
})

export default NewTask