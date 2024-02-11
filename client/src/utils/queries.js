import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me {
        me {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;

export const SEARCH_GOOGLE_BOOKS = gql`
    query searchGoogleBooks($input: String!) {
        searchGoogleBooks(input: $input) {
            id
            authors
            description
            image
            link
            title
        }
    }
`