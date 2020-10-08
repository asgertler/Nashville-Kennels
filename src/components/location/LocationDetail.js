import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import "./Location.css"
import { useParams, useHistory } from "react-router-dom"

export const LocationDetail = () => {
    const { releaseLocation, getLocationById } = useContext(LocationContext)

    const [location, setLocation] = useState({})
    const [animals, setAnimals] = useState([])
    const [employees, setEmployees] = useState([])

    const { locationId } = useParams()
    const history = useHistory()

    useEffect(() => {
        getLocationById(locationId)
            .then((res) => {
                setLocation(res)
                setAnimals(res.animals)
                setEmployees(res.employees)
            })
    }, [])

    return (
        <section className="location">
            <h3 className="location--name">{location.name}</h3>
            <div className="location--address">{location.address}</div>

            <div className="location--animals">
                <h4>Animals:</h4>

                <p>
                    {
                        animals.map(animal => animal.name).join(", ")
                    }
                </p>
            </div>

            <div className="location--employees">
                <h4>Employees</h4>

                <p>
                    {
                        employees.map(employee => employee.name).join(", ")
                    }
                </p>
            </div>
        </section>
    )
}