import React, { useContext, useRef, useEffect } from "react"
import { LocationContext } from "../location/LocationProvider"
import { AnimalContext } from "./AnimalProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import "./Animal.css"
import { useHistory } from "react-router-dom"

export const AnimalForm = (props) => {
    const { addAnimal } = useContext(AnimalContext)
    const { locations, getLocations } = useContext(LocationContext)
    const { customers, getCustomers } = useContext(CustomerContext)

    // no more document.querySelector() from here on out, fam
    const name = useRef(null)
    const breed = useRef(null)
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
                breed: breed.current.value,
                locationId,
                customerId
            })
                .then(() => history.push("/animals"))
        }
    }

    const history = useHistory()

    return (
        <form className="animalForm">
            <h2 className="animalform--title">New Animals</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="animalName">Animal name:</label>
                    <input type="text" id="animalName" ref={name} required autoFocus className="form-control" placeholder="Animal name" />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="animalBreed">Animal breed:</label>
                    <input type="text" id="animalBreed" ref={breed} required autoFocus className="form-control" placeholder="Animal breed" />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Assign to location: </label>
                    <select defaultValue="" name="location" ref={location} id="animalLocation" className="form-control" >
                        <option value="0">Select a location</option>
                        {locations.map(l => (
                            <option key={l.id} value={l.id}>
                                {l.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="customer">Customer: </label>
                    <select defaultValue="" name="customer" ref={customer} id="customerAnimal" className="form-control" >
                        <option value="0">Select a customer</option>
                        {customers.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    constructNewAnimal()
                }}
                className="btn btn-primary">
                Save Animal
            </button>
        </form>
    )
}