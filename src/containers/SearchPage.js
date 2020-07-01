import React from 'react';
import Card from '../components/Card';
import { Formik } from 'formik';
import * as Yup from 'yup'

export default function SearchPage() {
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
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
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
            </div>
        </div>
    )
}
