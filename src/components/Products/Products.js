import React from 'react';
import { Grid } from '@material-ui/core';

import Product from '../Product/Product';

const products = [
  {
    id: 1,
    name: 'Shoes',
    description: 'Running shoes',
    price: '$5',
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
  },
  {
    id: 2,
    name: 'Macbook',
    description: 'Apple Macbook',
    price: '$10',
    image: 'https://images.unsplash.com/photo-1511385278-5432b00777ed?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1518&q=80',
  },
];

const Products = () => (
  <main>
    <Grid container justify="center" spacing={4}>
      {products.map(product => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
  </main>
);

export default Products;
