import React, { useContext, useRef, useEffect } from "react"
import { LocationContext } from "../location/LocationProvider"
import { AnimalContext } from "../animal/AnimalProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import "./Animal.css"
import { UseHistory } from "react-router-dom"

export const AnimalForm = (props) => {
    const { addAnimal } = useContext(AnimalContext)
    const { locations, getLocations } = useContext(LocationContext)
    const { customers, getCustomers } = useContext(CustomerContext)

    // no more document.querySelector() from here on out, fam
    const name = useRef(null)
    const location = useRef(null)
    const customer = useRef(null)

    // get animal & location state on initilization
    useEffect(() => {
        getCustomers().then(getLocations)
    }, [])

    const constructNewAnimal = () => {
        // current.value is what we use in React
        const locationId = parseInt(location.current.value)
        const customerId = parseInt(customer.current.value)

        if (locationId === 0 || customerId === 0) {
            window.alert("Please fill out the form")
        } else {
            addAnimal({
                name: name.current.value,
                locationId,
                customerId
            })
                .then(() => history.push("/animals"))
        }
    }
}