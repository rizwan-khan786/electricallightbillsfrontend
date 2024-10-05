import axios from 'axios';

export const FETCH_POSTS_REQUEST='FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS='FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE='FETCH_POSTS_FAILURE';
const url = `https://jsonplaceholder.typicode.com/posts`;
export const fetchPostsRequest=()=>({
    type:FETCH_POSTS_REQUEST
})

export const fetchPostsSuccess=(posts)=>({
    type:FETCH_POSTS_SUCCESS,
    payload:posts
})

export const fetchPostsFailure=(error)=>({
    type:FETCH_POSTS_FAILURE,
    payload:error
})

export const fetchPosts=()=>{
return async dispatch=>{
    dispatch(fetchPostsRequest());
    try{
    const response=await axios.get(url);
    dispatch(fetchPostsSuccess(response.data));
    }catch(error){
     dispatch(fetchPostsFailure(error.message))
    }
}
}