import React from 'react'
import { Route } from 'react-router-dom'
import { Home } from './Home'
import { LocationProvider } from './location/LocationProvider'
import { LocationList } from './location/LocationList'
import { LocationForm } from "./location/LocationForm"
import { AnimalProvider } from './animal/AnimalProvider'
import { AnimalList } from './animal/AnimalList'
import { AnimalForm } from './animal/AnimalForm'
import { AnimalDetail } from "./animal/AnimalDetail"
import { CustomerProvider } from './customer/CustomerProvider'
import { CustomerList } from './customer/CustomerList'
import { EmployeeProvider } from './employee/EmployeeProvider'
import { EmployeeList } from './employee/EmployeeList'
import { EmployeeForm } from "./employee/EmployeeForm"
import { EmployeeDetail } from "./employee/EmployeeDetail"

export const ApplicationViews = (props) => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path='/'>
                <Home />
            </Route>

            {/* Render the location list when http://localhost:3000/locations */}
            <LocationProvider>
                <Route exact path='/locations'>
                    <LocationList />
                </Route>
            </LocationProvider>

            <LocationProvider>
                <Route exact path="/locations/create">
                    <LocationForm />
                </Route>
            </LocationProvider>

            {/* Render the animal list when http://localhost:3000/animals */}
            <AnimalProvider>
                <Route exact path='/animals'>
                    <AnimalList />
                </Route>
            </AnimalProvider>

            <AnimalProvider>
                <CustomerProvider>
                    <LocationProvider>
                        <Route exact path="/animals/create">
                            <AnimalForm />
                        </Route>
                    </LocationProvider>
                </CustomerProvider>
            </AnimalProvider>

            <AnimalProvider>
                <Route exact path="/animals/detail/:animalId(\d+)">
                    <AnimalDetail />
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

            <EmployeeProvider>
                <LocationProvider>
                    <Route exact path="/employees/create">
                        <EmployeeForm />
                    </Route>
                </LocationProvider>
            </EmployeeProvider>

            <EmployeeProvider>
                <Route exact path="/employees/detail/:employeeId(\d+)">
                    <EmployeeDetail />
                </Route>
            </EmployeeProvider>
        </>
    )
}