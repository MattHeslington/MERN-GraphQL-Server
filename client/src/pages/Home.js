import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';
import { AuthContext } from '../context/auth'
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql'

function Home() {

    const { user } = useContext(AuthContext)

    const { loading, data } = useQuery(FETCH_POSTS_QUERY)
    let posts = []
    if (data && !loading) {
        posts = data.getPosts
    }

    return (
        <Grid columns={3}>
            <Grid.Row centered>
                <h2>Recent Posts</h2>
            </Grid.Row>
            <Grid.Row>
                {user &&(
                    <Grid.Column>
                        <PostForm/>
                    </Grid.Column>
                )}
                {loading ? (
                    <h3>Loading posts...</h3>
                ) : (
                    <Transition.Group>
                        {posts && posts.map((post) => (
                            <Grid.Column key={post.id} style={{marginBottom:20}}>
                                <PostCard post={post}/>
                            </Grid.Column>
                        ))}
                    </Transition.Group>
                )}
            </Grid.Row>
        </Grid>
    );
}

export default Home;