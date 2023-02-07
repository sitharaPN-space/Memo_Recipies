import React, {useState, useEffect} from "react";
import useStyles from './styles';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Paper} from '@material-ui/core';
import { createPost, updatePost } from "../../actions/posts";


const Form = ({currentId, setCurrentId}) => {
    const Classes = useStyles();
    const [postData, setPostData] = useState({
         title:'', message:'', tags:'', selectedFile:''
    });
    const dispatch = useDispatch();
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentId === 0) {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        } else {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name}));
        }
        clear();
    };

    const clear = () => {
        setCurrentId(null);   
         setPostData({ title:'', message:'', tags:'', selectedFile:''})
    };

    if(!user?.result?.name) {
        return (
            <Paper className={Classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other's memories
                </Typography>
            </Paper>
        ) 
    }

    return (
        <Paper className={Classes.paper}>
            <form autoComplete="off" noValidate className={`${Classes.root} ${Classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value })} />
            <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value })} />
            <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value.split(',') })} />
            <div className={Classes.fileInput}>
                <FileBase
                    type="file"
                    multiple={false}
                    onDone={({base64}) => setPostData({ ...postData, selectedFile:base64})}
                />
            </div>
         
            <Button className={Classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

            </form>
        </Paper>
    );
}

export default Form;