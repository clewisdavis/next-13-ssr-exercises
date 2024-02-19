'use client';
import React from 'react';

import DATA from './data';
import reducer from './reducer';
import StoreItem from './StoreItem';
import CheckoutFlow from './CheckoutFlow';
import './styles.css';

function CheckoutExercise() {
  const [items, dispatch] = React.useReducer(
    reducer,
    null
  );

  //create a new effect, to run after hydration
  React.useEffect(() => {
    // read from local storage
    // will be null | stringify version
    const savedItems = window.localStorage.getItem('cart-items');

    // initialize 'items' as an empty array, useReducer
    dispatch({
      type: 'initialize',
      items: savedItems === null ? [] : JSON.parse(savedItems),
    });
  }, []) 

  // persist any changes to the cart, run when the 'items' state changes
  React.useEffect(() => {
    // what are the conditions to trigger this?
    if (items !== null) {
      window.localStorage.setItem(
        'cart-items',
        JSON.stringify(items)
      );
    }
  }, [items])

  return (
    <>
      <h1>Neighborhood Shop</h1>

      <main>
        <div className="items">
          {DATA.map((item) => (
            <StoreItem
              key={item.id}
              item={item}
              handleAddToCart={(item) => {
                dispatch({
                  type: 'add-item',
                  item,
                });
              }}
            />
          ))}
        </div>

        <CheckoutFlow
          items={items}
          taxRate={0.15}
          handleDeleteItem={(item) =>
            dispatch({
              type: 'delete-item',
              item,
            })
          }
        />
      </main>
    </>
  );
}

export default CheckoutExercise;
