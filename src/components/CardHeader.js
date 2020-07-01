import React from 'react'

export default function CardHeader(props) {
    return (
        <div className='card-header'>
            <h2>
                {props.title}
            </h2>
        </div>
    )
}
