import React, { Component } from 'react';
import BeerListItem from './BeerListItem';

class BeerList extends Component {

    //Component Construtor
    constructor(props) {
        super(props);
        this.state = {
            beers: [],
        }    
    }


    // Get data from the API
    componentDidMount() {
        fetch('https://api.punkapi.com/v2/beers').then((response) => {
          return response.json();
        }).then((data) => {
          console.log(data);
          this.setState({
            beers: data
          })
        })
      }
   
      render() {


        // Create Instances for each Beer being rendered
        const AllBeers = this.state.beers;
        const BeerItems = AllBeers.map(function(beer) {
            return <BeerListItem key={beer.id} beer={beer}/>
        });

        return (
            <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ABV
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Volume
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ingredients
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                        {BeerItems}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default BeerList;