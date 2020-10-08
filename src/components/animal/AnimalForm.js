import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../location/LocationProvider"
import { AnimalContext } from "../animal/AnimalProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import "./Animal.css"
import { useHistory, useParams } from 'react-router-dom'

export const AnimalForm = () => {
    const { addAnimal, getAnimalById, updateAnimal } = useContext(AnimalContext)
    const { locations, getLocations } = useContext(LocationContext)
    const { customers, getCustomers } = useContext(CustomerContext)

    // for edit, hold on to state of animal in this view
    const [animal, setAnimal] = useState({})
    // wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    const { animalId } = useParams();
    const history = useHistory();

    // when field changes, update state. This causes a re-render and updates the view
    // Controlled component
    const handleControlledInputChange = (event) => {
        // when changing a state object or array, 
        // always create a copy make changes, and then set state
        const newAnimal = { ...animal }
        // animal is an object with properties
        // set the property to the new value
        newAnimal[event.target.name] = event.target.value
        // update state
        setAnimal(newAnimal)
    }

    // get customers and locations
    // if animalId is in the URL, getAnimalById
    useEffect(() => {
        getCustomers().then(getLocations).then(() => {
            if (animalId) {
                getAnimalById(animalId)
                    .then(animal => {
                        setAnimal(animal)
                        setIsLoading(false)
                    })
            } else {
                setIsLoading(false)
            }
        })
    }, [])

    const constructAnimalObject = () => {
        if (parseInt(animal.locationId) === 0) {
            window.alert("Please select a location")
        } else if (parseInt(animal.customerId) === 0) {
            window.alert("Please select a customer")
        } else {
            // disable the button - no extra clicks
            setIsLoading(true);
            if (animalId) {
                // PUT - update
                updateAnimal({
                    id: animal.id,
                    name: animal.name,
                    breed: animal.breed,
                    locationId: parseInt(animal.locationId),
                    customerId: parseInt(animal.customerId)
                })
                    .then(() => history.push(`/animals/detail/${animal.id}`))
            } else {
                // POST - add
                addAnimal({
                    name: animal.name,
                    breed: animal.breed,
                    locationId: parseInt(animal.locationId),
                    customerId: parseInt(animal.customerId)
                })
                    .then(() => history.push("/animals"))
            }
        }
    }

    return (
        <form className="animalForm">
            <h2 className="animalForm__title">New Animal</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="animalName">Animal name: </label>
                    <input type="text" id="animalName" name="name" required autoFocus className="form-control"
                        placeholder="Animal name"
                        onChange={handleControlledInputChange}
                        defaultValue={animal.name} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="animalBreed">Animal breed: </label>
                    <input type="text" id="animalBreed" name="breed" required className="form-control"
                        placeholder="Animal breed"
                        onChange={handleControlledInputChange}
                        defaultValue={animal.breed} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Assign to location: </label>
                    <select value={animal.locationId} name="locationId" id="animalLocation" className="form-control" onChange={handleControlledInputChange}>
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
                    <select value={animal.customerId} name="customerId" id="customerAnimal" className="form-control" onChange={handleControlledInputChange}>
                        <option value="0">Select a customer</option>
                        {customers.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <button type="submit" className="btn btn-primary"
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault() // prevent browser from submitting the form
                    constructAnimalObject()
                }}>
                {animalId ? <>Save Animal</> : <>Add Animal</>}</button>
        </form>
    )
}