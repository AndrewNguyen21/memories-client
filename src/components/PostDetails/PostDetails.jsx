import React, { useEffect, useState } from 'react'
import { Button, Paper, Typography, CircularProgress, Divider, Card, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory, Link } from 'react-router-dom';
import useStyles from './styles';
import { getPost, searchPosts, updatePost} from '../../actions/posts'
import CommentSection from './CommentSection';
import ChipInput from 'material-ui-chip-input';
import FileBase from 'react-file-base64';


const PostDetails = () => {
  const {post, posts, isLoading} = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [editing, setEditing] = useState(false);
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: [],
    selectedFile: '',
  });


  useEffect(() => {
    dispatch(getPost(id))
  }, [id, dispatch])

  useEffect(() => {
    if(post) {
    dispatch(searchPosts({search: 'none', tags: post?.tags.join(',')}))
    }
    if(post) {
      setPostData(post);
    }
  }, [post, dispatch])

  

  if(!post) return null;

  if(isLoading) {
    return <Paper elevation={6} className={classes.loadingPaper}>
      <CircularProgress size='7em'/>
    </Paper>
  }

  const recommendedPosts = posts.filter(({_id}) => _id !== post._id)

  const openPost = (id) => {
    history.push(`/posts/${id}`);
  }

  const toggleEdit = () => {
    setEditing(!editing);
  }

  const handleAdd = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDelete = (tagToDelete) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter((tag) => tag !== tagToDelete),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEditing(!editing);

    dispatch(
      updatePost(id, {
        ...postData,
        name: user?.result?.name,
      }),
    )

  }

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px'}} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          {!editing ? (
            <div>
          <Typography variant="h3" component="h2">{postData.title}</Typography>
          {/* <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{postData.tags.map((tag) => `#${tag} `)}</Typography> */}
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => (
            <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` #${tag} `}
            </Link>
          ))}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">{postData.message}</Typography>
          <Typography variant="h6">
            Created by:
            <Link to={`/creators/${post.name}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` ${post.name}`}
            </Link>
          </Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
            <Button style={{ marginTop: '10px'}} fullWidth variant='contained' color='primary' onClick={toggleEdit} type='submit'>
            Edit
          </Button>
        )}
          </div>
          ) : (
            <div>
            <form autoComplete='off' noValidate>
              <Typography variant='h6' style={{ textAlign: 'center'}}>
                Editing Your Memory
              </Typography>
              <TextField
          name='title'
          variant='outlined'
          label='Title'
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name='message'
          variant='outlined'
          label='Message'
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
<ChipInput
          style={{ margin: '10px 0', width: '100%' }}
          value={postData.tags}
          onAdd={handleAdd}
          onDelete={handleDelete}
          label='Tags (Without the #)'
          variant='outlined'
          newChipKeys={[' ']}
          fullWidth
        />
        <div>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
            </form>
            <Button style={{ marginTop: '10px'}} fullWidth variant='contained' color='primary' onClick={handleSubmit}>
            Save
          </Button>
          </div>
          )}
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post}/>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={postData.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      {recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant='h5'>You might also like:</Typography>
          <Divider/>
          <div className={classes.recommendedPosts}>
          {recommendedPosts.map(({ title, name, likes, selectedFile, _id}) => (
            <Card className={classes.recommendCard} raised elevation={6} onClick={() => openPost(_id)} key={_id}>
              <img src={selectedFile} alt='post' width='200px' height='150px'/>
              <div className={classes.recommendCardContent}>
              <Typography gutterBottom variant='h6'>{title}</Typography>
              <Typography gutterBottom variant='subtitle2'>{name}</Typography>
              <Typography gutterBottom variant='subtitle1'>Likes: {likes.length}</Typography>
              </div>
            </Card>
          ))}
          </div>
        </div>
      )}
    </Paper>
  )
}

export default PostDetails