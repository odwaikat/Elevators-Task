import React from 'react';

import Elevator from '../../components/elevator/container';
import {initializeAppAndStartProcessing, addPassengers} from './actions';

const Status = {
    IDEL: 'IDEL',
    MOVING: 'MOVING'
}

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            processButtonDisabled: false,
            addPassengersButtonDisabled: true,
            isInitialized: false,
            numberOfFloors: 10,
            numberOfElevators: 2,
            floorsAdded: false,
            elevators: []
        }
        this.handleNext = this.handleNext.bind(this)
        this.handleSubmitProcess = this.handleSubmitProcess.bind(this)
        this.handleSubmitAddPassengers = this.handleSubmitAddPassengers.bind(this)
        this.createElevatorInstance = this.createElevatorInstance.bind(this)
        this.handleChangeElevatorStatus = this.handleChangeElevatorStatus.bind(this)
    }

    handleNext() {
        if (this.state.numberOfFloors && this.state.numberOfFloors > 0 && this.state.numberOfElevators && this.state.numberOfElevators > 0) {
            this.setState({
                floorsAdded: true,
            })
        }
        const numberOfElevators = this.state.numberOfElevators
        const elevators = []
        for (let index = 0; index < numberOfElevators; index++) {
            elevators.push({
                currentFloor: 0,
                status: Status.IDEL
            })
        }
        this.setState({
            elevators
        })

    }
    handleSubmitProcess() {
        this.setState({
            processButtonDisabled: true,
            addPassengersButtonDisabled: false,
            isInitialized: true
        })
        const elevators = this.state.elevators
        const numberOfFloors = this.state.numberOfFloors
        initializeAppAndStartProcessing(elevators, numberOfFloors)

    }
    handleSubmitAddPassengers() {
        this.setState({
            addPassengersButtonDisabled: true
        })
        const numberOfFloors = this.state.numberOfFloors
        addPassengers(numberOfFloors)

    }
    handleChangeElevatorStatus(index, value) {
        const elevators = this.state.elevators
        elevators[index].currentFloor = value
        this.setState({
            elevators
        })
    }
    createElevatorInstance() {
        let elevators = []
        for (let index = 0; index < this.state.numberOfElevators; index++) {
            elevators.push(
                <div key={index}>
                    <Elevator index={index} disabled={this.state.processButtonDisabled} handleChangeElevatorStatus={this.handleChangeElevatorStatus}></Elevator>
                </div>
            )
        }
        return elevators
    }
    render() {

        return (
            <div>
                <div className="back btn btn-link" hidden={this.state.isInitialized || !this.state.floorsAdded} onClick={() => this.setState({floorsAdded: false, elevators: []})} >Back</div>
                <div className="initial-form" hidden={this.state.floorsAdded}>
                    <div className="form-group">
                        <label htmlFor="number-of-floors">Enter number of Floors:</label>
                        <input type="text"
                            id="number-of-floors"
                            className="form-control form-control-md"
                            onChange={(e) => this.setState({numberOfFloors: e.target.value})}
                            value={this.state.numberOfFloors} >
                        </input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="number-of-elevators">Enter number of elevators:</label>
                        <input type="text"
                            id="number-of-elevators"
                            className="form-control form-control-md"
                            onChange={(e) => this.setState({numberOfElevators: e.target.value})}
                            value={this.state.numberOfElevators} >
                        </input>
                    </div>
                    <div>
                        <button type="button" class="btn btn-primary btn-lg btn-block" onClick={this.handleNext} >
                            Next
                        </button>
                    </div>
                </div>
                <div hidden={!this.state.floorsAdded}>
                    <div>
                        <h5>Number of Floors: {this.state.numberOfFloors} </h5>
                        <h5>Number of Elevators: {this.state.numberOfElevators} </h5>
                    </div>
                    <div hidden={this.state.isInitialized} className="mt-5 mb-5">
                        <h3>Please enter each elevator initial floor form (0 - {this.state.numberOfFloors - 1})</h3>
                        {this.createElevatorInstance()}
                    </div>

                    <button type="button" class="btn btn-primary btn-lg btn-block" disabled={this.state.processButtonDisabled} onClick={this.handleSubmitProcess} >
                        Initialize and Process
                    </button>
                    <div hidden={!this.state.isInitialized} className="mt-3 mb-5">
                        <h6>
                            Initialized, Check inspector Console ...
                        </h6>
                    </div>
                </div>

                <div hidden={!this.state.floorsAdded && this.state.addPassengersButtonDisabled}>
                    <button type="button" class="btn btn-secondary btn-lg btn-block mt-3" disabled={this.state.addPassengersButtonDisabled} onClick={this.handleSubmitAddPassengers} >
                        Level 3 (Bonus) call `addPassengers()`
                    </button>
                </div>
            </div>
        );
    }
}



export default Home;