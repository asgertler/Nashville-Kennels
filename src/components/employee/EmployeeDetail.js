import React, { useContext, useEffect, useState } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import "./Employee.css"
import { useParams, useHistory } from "react-router-dom"

export const EmployeeDetail = () => {
    const { releaseEmployee, getEmployeeById } = useContext(EmployeeContext)

    const [employee, setEmployee] = useState({})
    const [location, setLocation] = useState({})

    const { employeeId } = useParams()
    const history = useHistory()

    useEffect(() => {
        getEmployeeById(employeeId)
            .then((res) => {
                setEmployee(res)
                setLocation(res.location)
            })
    }, [])

    return (
        <section className="employee">
            <h3 className="employee__name">{employee.name}</h3>
            <div className="employee__store">Store: {location.name}</div>
            <div className="employee__address">Address: {location.address}</div>
        </section>
    )
}