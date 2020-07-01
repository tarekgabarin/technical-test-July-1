import React from 'react';
import Card from '../components/Card';
import CardHeader from '../components/CardHeader';

export default function SearchPage() {
    return (
        <div className='container'>
            <div className="flex-column space-between">
                <div>
                    <h1>Open Table</h1>
                </div>

                <Card>

                    <CardHeader title={'Search Restaurants'} />
                </Card>

            </div>
        </div>
    )
}
