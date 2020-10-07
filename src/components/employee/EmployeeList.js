import React, { useContext, useEffect } from 'react'
import { EmployeeContext } from './EmployeeProvider'
import { EmployeeCard } from './EmployeeCard'
import './Employee.css'
import { useHistory } from "react-router-dom"

export const EmployeeList = () => {
    const { employees, getEmployees } = useContext(EmployeeContext)

    useEffect(() => {
        getEmployees()
    }, [])

    const history = useHistory()

    return (
        <>
            <h2>Employees</h2>

            <button onClick={() => { history.push("/employees/create") }}>
                Add Employee
            </button>

            <div className="employees">
                {
                    employees.map(employee => {
                        return <EmployeeCard key={employee.id} location={employee.location.name} employee={employee} />
                    })
                }
            </div>
        </>
    )
}