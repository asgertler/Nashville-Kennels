import React, { useContext, useEffect } from 'react'
import { AnimalContext } from './AnimalProvider'
import { AnimalCard } from './AnimalCard'
import './Animal.css'

export const AnimalList = () => {
    // this state changes when 'getAnimals() is invoked below
    const { animals, getAnimals } = useContext(AnimalContext)

    // useEffect - reach out to the world for something
    useEffect(() => {
        getAnimals()
    }, [])

    return (
        <div className='animals'>
            {
                animals.map(animal => {
                    return <AnimalCard key={animal.id} location={animal.location.name} animal={animal} />
                })
            }
        </div>
    )
}