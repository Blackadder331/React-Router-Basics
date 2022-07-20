import React from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom';

export default function App() {
  const posts = [
    {
      id: 1,
      title: 'my first post',
      date: '4-7-22',
      content: 'This is my first post!'
    },
    {
      id: 2,
      title: 'checking in',
      date: '4-8-22',
      content: 'wow this is good food!'
    },
    {
      id: 3,
      title: 'new car',
      date: '4-9-22',
      content: 'Look what bb bought me!'
    }
  ];

  return(
    <Container>
      <Router> 
          <div>
            <ButtonGroup>
              <Button variant="outline-secondary">
                <Link to="/">Home</Link>
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="outline-secondary">
                <Link to="/friends">Friends</Link>
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="outline-secondary">
                <Link to="/posts">Posts</Link>
              </Button>
            </ButtonGroup>
            {/* <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/friends">Friends</Link>
              </li>
              <li>
                <Link to="/posts">Posts</Link>
              </li>
            </ul> */}
            <Switch>
              <Route path="/posts">
                <Posts posts={posts} />
              </Route>
              <Route path="/friends">
                <Friends names={['Tom', 'Sara', 'Henry', 'Bobert', 'Clyde']} />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
      </Router>
    </Container>
  );
}

function Home() {
  return (
  <h2>The Social Network</h2>
  );
}

function Friends(props) {
  const { names } = props; 
  return (
    <div>
      <h2>Friends</h2>
      <ul>
        {names.map((friend, index) => (
          <li key={index}>{friend}</li>
        ))}
      </ul>
    </div>
  );
}

function Posts({ posts }) {
  const match = useRouteMatch();
  const findPostById = (id) => 
    posts.filter((post) => post.id == id)[0];
  return (
  <div>
    <h2>Posts</h2>
   
      {posts.map((post, index) => {
        return (
          <Alert key={index} variant="primary">
            <Link to={`${match.url}/${post.id}`}>
              {post.title}
            </Link>
          </Alert>
        );
      })}
   
    <Switch>
      <Route
        path={`${match.path}/:postId`}
        render={(props) => (
          <Post
            {...props}
            data={findPostById(props.match.params.postId)}
          />
        )}
      />
      <Route path={match.path}>
        <h3>Please select a post.</h3>
      </Route>
    </Switch>
  </div>
  )
}

function Post(props) {
  const { data } = props;
  return data == undefined ? <h1>404 Not Found</h1> : (
    <Card>
      <Card.Header>{data.title}</Card.Header>
      <Card.Body>
        <Card.Subtitle>{data.date}</Card.Subtitle>
        <Card.Text>{data.content}</Card.Text>
      </Card.Body>
    </Card>
  );
}