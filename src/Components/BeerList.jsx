import React, { Component } from 'react';
import BeerListItem from './BeerListItem';

const PER_PAGE = 15;
class BeerList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            beers: [],
            searchQuery: '',
            searchQuantity: 0,
        }    
    }

    // Generic handler for making API Request
    makeAPIRequest(passedQueries) {
        console.log(passedQueries)
        const uri = 'https://api.punkapi.com/v2/beers'
        
        // Grab query parameters based on application state
        let stateQueries = {
            page: this.state.page,
            per_page: PER_PAGE,
            beer_name: this.state.searchQuery, 
        }

        // Merge state based parameters and those that are passed in.
        // The query paramters that are passed in take precendece.
        let queries = {...stateQueries, ...passedQueries}

        // Iterate through every paramater to form a query string.
        let queryObj = Object.keys(queries)
        let queryString = '?'
        queryObj.forEach(param => {
            let paramVal = queries[param]
            if(paramVal !== '') {
                queryString += `${param}=${paramVal}&`
            }
        })

        // Create a full url to request
        let requestStr = uri + queryString
        
        // Make Request to API
        // - Update state (beer & page)
        console.log(requestStr)
        fetch(requestStr).then((response) => {
            return response.json();
          }).then((data) => {

            // Update state to reflect changes
            this.setState({
              beers: data,
              page: queries.page,
              searchQuantity: data.length
            })
        })
    }

    // Initial data population
    componentDidMount() {
        this.makeAPIRequest()
      }

    // Get data from the API
    paginate(pageNo) {
        this.makeAPIRequest({page: pageNo})
    }
    
    // Handle Pagination Backwards
    handleEventPagePrevious(){
        if(this.state.page === 1){ 
            return
        }
        let pageNo = this.state.page - 1
        this.paginate(pageNo)
    }

    // Handle Pagination Forwards
    handleEventPageNext(){
        let pageNo = this.state.page + 1
        this.paginate(pageNo)
    }

    // Capture each update of the input field
    // Update state of searchQuery
    handleSearchChange(item) {
        let str = item.target.value
        str = str.replace(/ /g, '_')
        this.setState({
            searchQuery: str
        })
    }

    // Fullfill a request upon search
    // Pass page param 1 to start search from page 1
    handleSearchClick(){
        this.makeAPIRequest({page: 1})
    }

    render() {


        // Create Instances for each Beer being rendered
        const AllBeers = this.state.beers;
        let BeerItems

        if(AllBeers.length > 0 ) {
            BeerItems = AllBeers.map(function(beer) {
                return <BeerListItem key={beer.id} beer={beer}/>
            });
        } else {
            <tr className='bg-gray-100'>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No elements found</td>
            </tr>  
        }
 

        // Logic for pagination display
        const entriesShown = [];
        if(this.state.page < 2) {
            entriesShown[0] = [1]
        } else{
            entriesShown[0] = [((this.state.page -1) * PER_PAGE)]
        }
        entriesShown[1] = [(PER_PAGE * (this.state.page -1))+ this.state.searchQuantity]


        // Check to see if there is a page before and/or after
        let paginationBack = true
        let paginationForward = true
        
        if(this.state.page == 1) {
            paginationBack = false
        }
        if(this.state.searchQuantity < PER_PAGE) {
            paginationForward = false
        }

        return (
            <div>
            {/* Search */}
                <div className="flex justify-end border-gray-500">
                    <div className="px-2 py-1 flex items-center flex-1 justify-between sm:justify-end border-gray-200">
                        <div className="w-full sm:max-w-xs">
                            <label htmlFor="name" className="sr-only">
                                Name
                            </label>
                            <input
                                onChange = {this.handleSearchChange.bind(this)}
                                type="text"
                                name="name"
                                id="name"
                                className="shadow py-2 pl-4 bg-purple-100 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="Alpha Dog"
                            />
                        </div>
                        <button
                            id="searchSubmit"
                            type="submit"
                            onClick = {this.handleSearchClick.bind(this)}
                            className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Search
                        </button>
                    </div>
                </div>

            {/* Table Items*/}
                <div className="flex flex-col mt-4">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"> 
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-700">
                                <tr>
                                    <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                                    Name
                                    </th>
                                    <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                                    ABV
                                    </th>
                                    <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                                    Volume
                                    </th>
                                    <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
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


            {/* Footer/Pagination */}
                <nav
                    className="bg-white px-4 py-3 flex items-center justify-start border-t border-gray-200 sm:px-6" aria-label="Pagination">
                        <div className="hidden sm:block">
                            <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{entriesShown[0]}</span> upto <span className="font-medium">{entriesShown[1]}</span>
                            </p>
                        </div>
                        <div className="flex-1 flex justify-between sm:justify-end">
                            <button disabled={!paginationForward} onClick={this.handleEventPagePrevious.bind(this)} href="#"
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                            Previous
                            </button>
                            <button disabled={!paginationForward} onClick={this.handleEventPageNext.bind(this)}
                            href="#"
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                            Next
                            </button>
                        </div>
                    </nav>
                </div>

            </div>

        );
    }
}

export default BeerList;