import React from 'react';
import { useQuery } from '@apollo/client';
import { Grid } from 'semantic-ui-react';
import gql from 'graphql-tag';

import PostCard from '../components/PostCard';

function Home() {

    const { loading, data } = useQuery(FETCH_POSTS_QUERY)
    let posts = []
    if (data && !loading) {
        posts = data.getPosts
    }

    return (
        <Grid columns={3}>
            <Grid.Row>
                <h2>Recent Posts</h2>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h3>Loading posts...</h3>
                ) : (posts && posts.map((post) => (
                        <Grid.Column key={post.id}>
                            <PostCard post={post}/>
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
    );
}

const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
            id
            body
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments{
                id
                username
                createdAt
                body
            }
        }
    }
`;

export default Home;