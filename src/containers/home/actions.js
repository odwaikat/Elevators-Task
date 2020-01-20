window.passengersDelivered = 0
window.passengersWaiting = 0
window.passengersAdded = 0

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
}
const getDifferentRandoms = (min, max, numberOfRandoms = 2) => {
    const differntRands = []
    while (differntRands.length < numberOfRandoms) {
        const rand = getRandomInt(min, max)
        if (differntRands.indexOf(rand) === -1) {
            differntRands.push(rand)
        }
    }

    return differntRands
}

export const goToFloor = (currentFloor, distinationFloor) => {
    let closestElevatorId = undefined
    let closestElevatorDistance = Number.MAX_SAFE_INTEGER
    elevators.forEach((elevator, index) => {
        if (elevator.status === 'IDEL' && (Math.abs(elevator.currentFloor - currentFloor) < closestElevatorDistance)) {
            closestElevatorDistance = Math.abs(elevator.currentFloor - currentFloor)
            closestElevatorId = index
        }
    })

    return closestElevatorId
}

const changeCurrentFloor = (elevatorIndex, reachedDistinationCallBack) => {
    const elevator = elevators[elevatorIndex]
    const interval = setInterval(() => {
        console.log('%cElevator#' + elevatorIndex + ' reached next floar', 'background: blue; color: white')
        if (elevator.distinationFloor > elevator.currentFloor) {
            elevator.currentFloor++
        } else if (elevator.distinationFloor < elevator.currentFloor) {
            elevator.currentFloor--
        }
        if (elevator.currentFloor === elevator.distinationFloor) {
            clearInterval(interval)
            reachedDistinationCallBack && reachedDistinationCallBack(elevatorIndex)
        }
    }, 2000)
}


const checkAndSelectElevator = (passenger) => {
    if (passenger.delivered) {
        return
    }
    const elevatorIndex = goToFloor(passenger.currentFloor, passenger.distinationFloor)
    if (elevatorIndex !== undefined) {
        console.log('found elevator ' + elevatorIndex + ' close to passenger ')
        elevators[elevatorIndex].status = 'MOVING'
        elevators[elevatorIndex].distinationFloor = passenger.currentFloor
        changeCurrentFloor(elevatorIndex, (elevatorIndex) => {
            elevators[elevatorIndex].distinationFloor = passenger.distinationFloor
            console.log('Elevator#' + elevatorIndex + ' has reached passenger#')
            changeCurrentFloor(elevatorIndex, (elevatorIndex) => {
                window.passengersDelivered++
                elevators[elevatorIndex].status = 'IDEL'
                window.passengersWaiting--
                console.log('%c ----------------------------------------------------------------------------------------------------------------------------------------', 'background: purple; color: white')
                console.log('%cPassenger #' + passenger.id + ' has reached distination', 'background: purple; color: white')
                console.log('Elevator#' + elevatorIndex + ' is now idel')
            })
        })
    } else {
        console.log('------------------------------------------------')
        console.log('Did not found a free elevator for passenger #' + passenger.id)
        console.log('Waiting 2 sec to re-check')
        console.log('------------------------------------------------\n\n')
        setTimeout(() => {
            checkAndSelectElevator(passenger)
        }, 2000)
    }
}


let passengers = []
const processPassengers = () => {
    console.log('%c***********************************', 'background: gray; color: yellow')
    console.log(passengers.length + ' new passengers added')
    console.log('Total added passengers: ' + window.passengersAdded)
    console.log('%c***********************************\n\n', 'background: gray; color: yellow')

    console.log('new passengers: ')
    console.table(passengers)
    let passenger
    while ((passenger = passengers.shift()) !== undefined) {
        checkAndSelectElevator(passenger)
    }
}

let addPassengersInterval
export const addPassengers = (numberOfFloors) => {
    addPassengersInterval = setInterval(() => {
        const randomPassengersToAdd = getRandomInt(0, 3)
        const randoms = getDifferentRandoms(0, numberOfFloors, 4)
        for (let index = 0; index < randomPassengersToAdd; index++) {
            passengers.push({
                currentFloor: randoms[randoms.length - 1],
                distinationFloor: randoms[index],
                id: window.passengersAdded
            })
            window.passengersAdded++
            window.passengersWaiting++
        }
        processPassengers(randomPassengersToAdd)
    }, 5000)
    setTimeout(() => {
        clearTimeout(addPassengersInterval)
        if (window.passengersWaiting > window.passengersDelivered) {
            console.log('%c Error **********************************', 'background: red; color: white')
        } else {
            console.log('%c Success --------------------------------', 'background: green; color: white')
        }
    }, 60000)
}

let elevators = []
export const initializeAppAndStartProcessing = (elevatorsArray, numberOfFloors) => {
    console.log('initializeAppAndStartProcessing')
    console.log('number of floors:' + numberOfFloors)
    console.log('number of elevator:' + elevatorsArray.length)

    elevators = elevatorsArray

    const numberOfAddedPassengers = getRandomInt(5, 10)
    for (let index = 0; index < numberOfAddedPassengers; index++) {
        const randoms = getDifferentRandoms(0, numberOfFloors)
        passengers.push({
            currentFloor: randoms[0],
            distinationFloor: randoms[1],
            id: window.passengersAdded
        })
        window.passengersAdded++
        window.passengersWaiting++
    }
    processPassengers(passengers.length)
}


