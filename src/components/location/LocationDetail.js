import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import "./Location.css"
import { useParams, useHistory } from "react-router-dom"
import { AnimalList } from "../animal/AnimalList"

export const LocationDetail = () => {
    const { releaseLocation, getLocationById } = useContext(LocationContext)

    const [location, setLocation] = useState({})
    const [animal, setAnimal] = useState({})
    const [employee, setEmployee] = useState({})

    const { locationId } = useParams()
    const history = useHistory()

    useEffect(() => {
        getLocationById(locationId)
            .then((res) => {
                setLocation(res)
                setAnimal(res.animal)
                setEmployee(res.employee)
            })
    }, [])

    return (
        <section className="location">
            <h3 className="location--name">{location.name}</h3>
            <div className="location--animals">Animals: {animal.name}</div>
        </section>
    )
}