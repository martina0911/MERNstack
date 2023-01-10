import React, { useEffect } from 'react';
import './Posts.css';
import { useDispatch, useSelector} from 'react-redux';
import Post from '../Post/Post';
import { getTimelinePosts } from '../../../Action/PostAction';
import { useParams } from 'react-router-dom';

const Posts=()=>{
    const dispatch = useDispatch();
    const {user}= useSelector((state)=>state.authReducer.authData);
    let {posts}=useSelector((state)=>state.postReducer);
    const params = useParams();


    //get every post on timeline
    useEffect(()=>{
        dispatch(getTimelinePosts(user._id))
    },[]);

    if(!posts) return "No Posts"
    if(params.id) posts=posts.filter((post)=>post.userId===params.id)

    return(
        <div className="Posts">
            {posts.map((post,id)=>{
                return <Post data={post} key={id}/>;
            })}
        </div>
    )
}
export default Posts;