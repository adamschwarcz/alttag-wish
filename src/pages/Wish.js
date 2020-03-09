import React from 'react'
import WishList from '../components/Wish/WishList';
import WishForm from '../components/Wish/WishForm';

function Wish() {

    return (
    <div className="Wish">
        <div className="center">
            <WishForm />
            <WishList />
        </div>
    </div>
    )
}

export default Wish