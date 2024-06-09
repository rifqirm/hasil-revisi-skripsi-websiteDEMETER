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

export const GetProductListOwner = gql`
query MyQuery {
    ProductOwner {
    category2
    name2
    id2
    image2
    price2
    freshness2
    description2
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

export const InsertProductOwner = gql`
  mutation MyMutation($object: ProductOwner_insert_input!) {
    insert_ProductOwner_one(object: $object) {
      id2
      name2
      description2
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

export const GetSearchProductListOwner = gql`
query SearchProducts($nameowner: String, $limit1: Int!) {
  ProductOwner(where: {name2: {_ilike: $nameowner}}, limit: $limit1) {
    category2
    name2
    id2
    image2
    price2
    freshness2
    description2
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

export const UpdateProductOwner = gql`
mutation MyMutation($id2: String!, $object: ProductOwner_set_input!) {
  update_ProductOwner_by_pk(pk_columns: {id2: $id2}, _set: $object) {
    id2
    name2
    price2
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

export const HapusProductOwner = gql`
    mutation MyQuery($id2: String = "") {
    delete_ProductOwner_by_pk(id2: $id2) {
        id2
    }
    }
`;



