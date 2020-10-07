import React, { useContext, useEffect, useState } from 'react'
import { LocationContext } from './LocationProvider'
import { LocationCard } from './LocationCard'
import './Location.css'
import { useHistory } from "react-router-dom"

export const LocationList = () => {
    const { locations, getLocations } = useContext(LocationContext)

    useEffect(() => {
        getLocations()
    }, [])

    const history = useHistory()

    return (
        <>
            <h2>Locations</h2>

            <button onClick={() => { history.push("/locations/create") }}>
                Add Location
            </button>

            <div className="locations">
                {
                    locations.map(location => {
                        const locationAnimals = (animal => {
                            return animal.locationId === location.id
                        })

                        const locationEmployees = (employee => {
                            return employee.locationId === location.id
                        })

                        return <LocationCard
                            key={location.id}
                            location={location}
                            animals={locationAnimals}
                            employees={locationEmployees}
                        />
                    })
                }
            </div>
        </>
    )
}