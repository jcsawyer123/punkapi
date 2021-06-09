import React from 'react'

export default function BeerListItem({beer}) {

    // console.log(beer.volume)

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
    listOfIng = listOfIng.slice(0, noOfIng); // Slice list to desired length

    return (
        <tr key={beer.id} className='bg-white'>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{beer.name}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{beer.abv}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{beerVolumeValue} {beerVolumeUnit}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{listOfIng.join(', ')}</td>
        </tr>  
    )
}
