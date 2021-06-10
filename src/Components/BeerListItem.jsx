import React, { Component } from 'react';
import BeerInfo from './BeerInfo'

class BeerListItem extends Component {


    constructor(props) {
        super(props);
        this.state = {
            key: props.id,
            beer: props.beer
        }    
    }

    // Toggles Display of Modal
    // ISSUE: When you close the modal you must double click to reopen it 
    toggleModal() {
        this.setState({
            opened: !this.state.opened
        })
    }


    render() {
    
        const beer = this.state.beer

        const beerVolume = beer.volume
        const beerVolumeValue = beerVolume.value
        const beerVolumeUnit = beerVolume.unit

        // Handling Ingredients
        // -- Combined malt and hop lists together.
        const ingMalt = beer.ingredients.malt
        const ingHop = beer.ingredients.hops
        const combinedIng = ingHop.concat(ingMalt)

        // -- The number of ingredients we want to display
        const noOfIng = 3;
        
        // Create list of all ing names
        let listOfIng = combinedIng.map(i => {
            return i.name;
        })

        // Create a set of ingredients
            // Remove Duplicates (Not the best way)
        const setOfIng = new Set(listOfIng);
        
        listOfIng = [...setOfIng]; // Set back to list
        
        beer.ingStr = listOfIng.join(', ') // Store full list in seperate string

        listOfIng = listOfIng.slice(0, noOfIng); // Slice list to desired length



        return (
            <tr key={beer.id} className='bg-gray-100 border-gray-10'>
            <td onClick={this.toggleModal.bind(this)} className="clickable  px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 hover:underline">{beer.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{beer.abv}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{beerVolumeValue} {beerVolumeUnit}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{listOfIng.join(', ')}</td>
            {this.state.opened && <BeerInfo toggleModal={this.toggleModal} beer={this.state.beer}/>}
            </tr>    
        )
    }   
}

export default BeerListItem;
