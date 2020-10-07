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
        getLocations()
    }, [])

    const constructNewEmployee = () => {
        const locationId = parseInt(location.current.value)

        if (locationId === 0) {
            window.alert("Please fill out the form")
        } else {
            addEmployee({
                name: name.current.value,
                locationId
            })
                .then(() => history.push("/employees"))
        }
    }

    const history = useHistory()

    return (
        <form className="employeeForm">
            <h2 className="employeeform--title">New Employee</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="employeeName">Employee name:</label>
                    <input type="text" id="employeeName" ref={name} required autoFocus className="form-control" placeholder="Employee name" />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Assign to location:</label>
                    <select defaultValue="" name="location" ref={location} id="employeeLocation" className="form-control">
                        <option value="0">Select a location</option>
                        {locations.map(l => (
                            <option key={l.id} value={l.id}>
                                {l.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewEmployee()
                }}
                className="btn btn-primary">
                Save Employee
                </button>
        </form>
    )
}