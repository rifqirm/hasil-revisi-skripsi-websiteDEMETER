import { gql } from "@apollo/client"


export const GetProductList = gql`
query MyQuery {
    Product {
    category
    name
    id
    image
    price
    freshness
    description
    }
}`;

export const InsertProduct = gql`
  mutation MyMutation($object: Product_insert_input!) {
    insert_Product_one(object: $object) {
      id
      name
      description
    }
  }
`;

export const GetSearchProductList = gql`
query SearchProducts($name: String, $limit: Int!) {
  Product(
    where: {name: {_ilike: $name}}
    limit: $limit
    ) {
    category
    name
    id
    image
    price
    freshness
    description
  }
}`;


export const UpdateProduct = gql`
mutation MyMutation($id: String!, $object: Product_set_input!) {
    update_Product_by_pk(pk_columns: {id: $id}, 
    _set: $object) {
        id
        name
        price
    }
    }
`;

export const HapusProduct = gql`
    mutation MyQuery($id: String!) {
    delete_Product_by_pk(id: $id) {
        id
    }
    }
`;



