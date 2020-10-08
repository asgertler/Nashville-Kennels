import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "./AnimalProvider"
import "./Animal.css"
import { useParams, useHistory } from "react-router-dom"

export const AnimalDetail = () => {
    const { releaseAnimal, getAnimalById } = useContext(AnimalContext)

    const [animal, setAnimal] = useState({})
    const [location, setLocation] = useState({})
    const [customer, setCustomer] = useState({})

    const { animalId } = useParams()
    const history = useHistory()

    useEffect(() => {
        getAnimalById(animalId)
            .then((res) => {
                setAnimal(res)
                setLocation(res.location)
                setCustomer(res.customer)
            })
    }, [])

    return (
        <section className="animal">
            <h3 className="animal--name">{animal.name}</h3>
            <div className="animal--breed">{animal.breed}</div>
            <div className="animal--location">Location: {location.name}</div>
            <div className="animal--owner">Customer: {customer.name}</div>

            <button onClick={
                () => {
                    releaseAnimal(animal.id)
                        .then(() => {
                            history.push("/animals")
                        })
                }}>Release Animal
            </button>
        </section>
    )
}