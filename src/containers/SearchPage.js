import React, {useState} from 'react';
import Card from '../components/Card';
import { Formik } from 'formik';
import * as Yup from 'yup'
import {getRestaurants} from '../utils/api/restaurantsApi';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import ReactPaginate from 'react-paginate'
import _ from 'lodash'
import { CSSTransition } from 'react-transition-group'
import { usePrevious } from '../utils/customHooks'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { useDispatch} from 'react-redux'
import {setRestaurantsAsync} from '../state/slices/restarauntsSlice'

function RestrauntCardsRow(props) {

    const prevProps = usePrevious(props)

    const inBoolean =
    prevProps !== undefined
      ? _.isEqual(prevProps.currentPage, props.currentPage) === false
      : true

    return (

        <CSSTransition
            appear
            in={inBoolean}
            timeout={{
                appear: 500,
                enter: 300,
                exit: 500,
            }}
            classNames="fade"
        >
            <div className='flex-wrap space-evenly restraunt-row flex-row'>
                {props.listOfRestaurants.map(item => {
                    return (
                        <div className={'card restraunt-margins  col is-sm-12 is-md-3 is-lg-3'} key={item.id}>
                            <div className="flex-column">

                                {item.name.length > 19 ? (
                                <div className='restraunt-title-long'>
                                    {item.name}
                                </div>
                                ) : (
                                <div className='restraunt-title-short'>
                                    {item.name}
                                </div>
                                )}

                                <RestrauntCardImage imageUrl={item.image_url} />
                                <div className='restraunt-text-padding'>
                                    {item.address}
                                </div>
                                <div className='restraunt-text-padding'>
                                    {props.tiersObj[item.price]}
                                </div>
                                <div className='restraunt-text-padding restraunt-bottom-padding'>
                                Phone: {item.phone}
                                </div>
                            </div>
                        </div>
                    )
                })}



            </div>

        </CSSTransition>
    )

}


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

    const dispatch = useDispatch()

    const [state, setState] = useState({
        listOfRestaurants: [],
        hasSearched: false,
        totalEntries: 0,
        totalPages: 0,
        perPage: 0,
        currentPage: 1,
        tiersObj: {
            1: 'Low-Tier',
            2: 'Mid-Tier',
            3: 'High-Tier',
            4: 'Snazzy'
        },
    });

    const getSearchResults = (city, name, address) => {

        getRestaurants(city, name, address).then(response => {

            const totalPages = Math.ceil(response.data.total_entries / response.data.per_page)

            dispatch(setRestaurantsAsync(response.data.restaurants));

            setState(prevState => ({
                ...prevState,
                listOfRestaurants: response.data.restaurants,
                city,
                name,
                address,
                totalEntries: response.data.total_entries,
                perPage: response.data.per_page,
                currentPage: response.data.current_page,
                totalPages,
                hasSearched: true
            }))

        })

    }

    function handlePageClick(data) {
        if (data.selected === 0 && state.hasSearched) {
          const firstIndex = data.selected + 1

          getRestaurants(state.city, state.name, state.address).then(response => {

            setState((prevState) => ({
                ...prevState,
                currentPage: firstIndex,
                listOfRestaurants: response.data.restaurants,
              }))
          })

          
        } else if (data.selected !== 0 && state.hasSearched) {
          const selectedIndex = data.selected + 1

          getRestaurants(state.city, state.name, state.address, selectedIndex).then(response => {

            setState((prevState) => ({
                ...prevState,
                currentPage: selectedIndex,
                listOfRestaurants: response.data.restaurants,
              }))
          })
        }
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
                <RestrauntCardsRow tiersObj={state.tiersObj} currentPage={state.currentPage} listOfRestaurants={state.listOfRestaurants} />

                {(state.hasSearched && state.listOfRestaurants.length === 0) && (

                        <div className='flex-row justify-center'>
                        <h1>No Results Found</h1>
                        </div>

                        
                    )}

                    {(state.listOfRestaurants.length !== 0) && (
                        <div className='flex-row justify-center'>
                             <ReactPaginate
                        initialPage={0}
                        pageCount={state.totalPages}
                        pageRangeDisplayed={10}
                        marginPagesDisplayed={10}
                        containerClassName={'pagination'}
                        forcePage={state.currentPage - 1}
                        activeClassName={'active'}
                        onPageChange={handlePageClick}
                      />

                        </div>
                       
                    )}
            </div>
        </div>
    )
}
