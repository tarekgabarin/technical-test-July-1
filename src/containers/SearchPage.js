import React, {useState} from 'react';
import Card from '../components/Card';
import { Formik } from 'formik';
import * as Yup from 'yup'
import {getRestaurants} from '../utils/api/restaurantsApi';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

function RestrauntCardImage(props) {
    return (
      <LazyLoadImage
        effect="blur"
        src={props.imageUrl}
        style={{
          objectFit: 'cover',
          height: '16.875em',
          width: '100%',
        }}
      />
    )
  }


export default function SearchPage() {

    const [state, setState] = useState({
        listOfRestaurants: [],
        hasSearched: false,
        totalEntries: 0,
        perPage: 0,
        currentPage: 1,
    });

    const getSearchResults = (city, name, address) => {

        getRestaurants(city, name, address).then(response => {

            setState(prevState => ({
                ...prevState,
                listOfRestaurants: response.data.restaurants,
                totalEntries: response.data.total_entries,
                perPage: response.data.per_page,
                currentPage: response.data.current_page,
                hasSearched: true
            }))

        })

    }


    return (
        <div className='container'>
            <div className="flex-column space-between">
                <div>
                    <h1>Search Restraurants</h1>
                </div>

                <Card>
                    <Formik
                        initialValues={{ searchCityText: '', searchNameText: '', searchAddressText: '' }}
                        validateSchema={Yup.object().shape({
                            searchCityText: Yup.string()
                                .required('Field required'),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                        
                                getSearchResults(values.searchCityText, values.searchNameText, values.searchAddressText);
                                setSubmitting(false)


                            }, 400);
                        }}
                    >

                        {({
                            values,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                           /* isSubmitting, */
                            /* and other goodies */
                        }) => (
                                <form onSubmit={handleSubmit}>

                                    <div className="card-body">

                                    <div className="form-group">
                                                <label className="form-label" htmlFor="searchCity">City</label>
                                                <input className="form-input" onChange={handleChange}
                                                    onBlur={handleBlur} name={'searchCityText'}   type="text" value={values.searchCityText}  id="searchCity" placeholder="Toronto" />
                                    </div>

                                        

                                        <div className="form-group">
                                            <label className="form-label" htmlFor="searchName">Name</label>
                                            <input className="form-input" onChange={handleChange}
                                                onBlur={handleBlur} name={'searchNameText'} value={values.searchNameText} type="text" id="searchName" placeholder="Bob's Burgers" />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label" htmlFor="searchAddress">Address</label>
                                            <input className="form-input" onChange={handleChange}
                                                onBlur={handleBlur} name={'searchAddressText'} value={values.searchAddressText} type="text" id="searchAddress" placeholder="123 street" />
                                        </div>

                                        <div className="form-group">

                                            {(values.searchCityText.trim() !== "") ? (
                                            <button className='is-button is-full-width is-button-primary'>
                                                Search
                                             </button>
                                            ) : (
                                            <button className='is-button is-full-width is-button-primary' disabled>
                                                Search
                                             </button>
                                            )}

                                            

                                        </div>

                                    </div>
                                </form>
                            )}
                    </Formik>
                </Card>
                <div className='flex-wrap space-around restraunt-row flex-row'>
                    {state.listOfRestaurants.map(item => {
                        return (
                            <div className={'card restraunt-margins  col is-sm-12 is-md-3 is-lg-3'} key={item.id}>
                                <div className="flex-column">
                                    <div className='restraunt-title'>
                                        {item.name}
                                    </div>
                                    <RestrauntCardImage imageUrl={item.image_url}  />
                                    <div  className='restraunt-text-padding'>
                                        {item.address}
                                    </div>
                                    <div  className='restraunt-text-padding'>
                                        Price: {item.price}
                                    </div>
                                    <div  className='restraunt-text-padding restraunt-bottom-padding'>
                                        Phone: {item.phone}
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    {(state.hasSearched && state.listOfRestaurants.length === 0) && (
                        <h1>No Results Found</h1>
                    )}

                </div>
            </div>
        </div>
    )
}
