import React from 'react';

class Elevator extends React.Component {
    constructor() {
        super();
        this.state = {
            currentFloor: 0,
            distinationFloor: 0
        }
        this.handleOnChangeInput = this.handleOnChangeInput.bind(this)
    }
    handleOnChangeInput(e) {
        this.setState({
            currentFloor: e.target.value
        })
        const value = parseInt(e.target.value || '-1')
        if (value !== -1 && value !== 'NaN') {
            const index = this.props.index
            this.props.handleChangeElevatorStatus(index, value)
        }
    }
    render() {
        const {index, disabled} = this.props
        return (
            <div className="elevator form-group">
                <label htmlFor={`elevator-container-${index}`}>Enter elevator #{index} current floor:</label>
                <input type="text"
                    id={`elevator-container-${index}`}
                    className="form-control form-control-md"
                    disabled={disabled}
                    onChange={this.handleOnChangeInput}
                    value={this.state.currentFloor} >
                </input>
            </div>
        )
    }
}

export default Elevator;