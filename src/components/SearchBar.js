import React from 'react';

const searchbar = ({searchChange}) => {
    return (
        <div className='pa2'>
            <input
                className='pa3 ba b--green bg-lightest-blue'
                type='search'
                placeholder='seach robots'
                onChange={searchChange}
            />
        </div>
    );
}

export default searchbar;