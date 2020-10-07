import React, { useContext, useRef, useEffect } from "react"
import { EmployeeContext } from './EmployeeProvider'
import { LocationContext } from "../location/LocationProvider"
import "./Employee.css"
import { useHistory } from "react-router-dom"

export const EmployeeForm = (props) => {
    const { addEmployee } = useContext(EmployeeContext)
    const { locations, getLocations } = useContext(LocationContext)

    const name = useRef(null)
    const location = useRef(null)

    useEffect(() => {

    })
}