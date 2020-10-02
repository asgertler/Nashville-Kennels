import React, { useState, createContext } from 'react'

export const EmployeeContext = createContext()

export const EmployeeProvider = (props) => {
    const [employees, setEmployees] = useState([])

    const getEmployees = () => {
        return fetch('http://localhost:8088/employees?_expand=location')
            .then(res => res.json())
            .then(setEmployees)
    }

    const addEmployee = location => {
        return fetch('http://localhost:8088/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(location)
        })
            .then(getEmployees)
    }

    return (
        <EmployeeContext.Provider value={{
            employees, getEmployees, addEmployee
        }}>
            {props.children}
        </EmployeeContext.Provider>
    )
}