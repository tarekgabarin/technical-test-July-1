import React from 'react';
import Card from '../components/Card';


export default function SearchPage() {
    return (
        <div className='container'>
            <div className="flex-column space-between">
                <div>
                    <h1>Search Restraurants</h1>
                </div>

                <Card>
                
                    <form>
                        <div className="card-body">

                        <div className="form-group">
                        <label className="form-label" htmlFor="searchCity">City</label>
                        <input className="form-input" type="text" id="searchCity" placeholder="Toronto" />
                        </div>

                        <div className="form-group">
                        <label className="form-label" htmlFor="searchName">Name</label>
                        <input className="form-input" type="text" id="searchName" placeholder="Bob's Burgers" />
                        </div>

                        <div className="form-group">
                        <label className="form-label" htmlFor="searchAddress">Address</label>
                        <input className="form-input" type="text" id="searchAddress" placeholder="123 street" />
                        </div>

                        <div className="form-group">

                            

                        <button className='is-button is-full-width is-button-primary'>
                            Search
                        </button>

                        </div>

                        </div>
                        
                    </form>
                </Card>

            </div>
        </div>
    )
}
