import React from 'react'
import { Route } from 'react-router-dom'
import { Home } from './Home'
import { LocationCard } from './location/LocationCard'
import { AnimalProvider } from './animal/AnimalProvider'
import { AnimalList } from './animal/AnimalList'
import { CustomerProvider } from './customer/CustomerProvider'
import { CustomerList } from './customer/CustomerList'
import { EmployeeProvider } from './employee/EmployeeProvider'
import { EmployeeList } from './employee/EmployeeList'

export const ApplicationViews = (props) => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path='/'>
                <Home />
            </Route>

            {/* Render the location list when http://localhost:3000/locations */}
            <Route path='/locations'>
                <LocationCard />
            </Route>

            {/* Render the animal list when http://localhost:3000/animals */}
            <AnimalProvider>
                <Route exact path='/animals'>
                    <AnimalList />
                </Route>
            </AnimalProvider>

            {/* Render the customer list when http://localhost:3000/customers */}
            <CustomerProvider>
                <Route exact path='/customers'>
                    <CustomerList />
                </Route>
            </CustomerProvider>

            {/* Render the employee list when http://localhost:3000/employees */}
            <EmployeeProvider>
                <Route exact path='/employees'>
                    <EmployeeList />
                </Route>
            </EmployeeProvider>
        </>
    )
}