import React, { Component } from 'react';


class BeerList extends Component {

    //Component Construtor
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        }    
    }

    // Executes when the component is "mounted"
    componentDidMount() {
        this.fetchAPIData();
    }

    // Get data from the API
    fetchAPIData() {
        // TODO: Add Axios Query
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default BeerList;