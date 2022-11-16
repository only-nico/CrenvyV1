//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container,InputGroup,FormControl,Button,Row,Card} from 'react-bootstrap';
import {useState,useEffect} from 'react';

const CLIENT_ID="b01669ce06464e06ad1afe9c395c7c15";
const CLIENT_SECRET="c7e50afc03dc417ca2181cf3d81664ff";
function App() {
  const [searchInput,setSearchInput] =useState("");
  const[accessToken,setAccessToken]=useState("");

  useEffect(()=>{
    //se usa para inicializar solo una vez la api
    var authParameters={
      method:'POST',
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id='+CLIENT_ID+'&client_secret='+CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token',authParameters)
      .then(result=>result.json())
      .then(data=>setAccessToken(data.access_token))
  },[])
//search
  async function search(){
    console.log("search for "+searchInput); 
    
    var artistParameters={
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+accessToken
      }
    }
    var artistID =await fetch('https://api.spotify.com/v1/search?q='+searchInput+'&type=track%2Cartist',artistParameters)
    .then(response=> response.json())
    .then(data=>{return data.artists.items[0].id && data.tracks})
    
    console.log(artistID.items)
    /*var tracks = await fetch('https://api.spotify.com/v1/artist/'+ artistID.href +'/trucks'+artistID.items)
    .then(response=>response.json())
    .then(data=>{
      console.log(data);
    })
    */
  }
  



  return (
    <div className="App">
    <Container>
      <InputGroup className ="mb-3" size ="lg">
      <FormControl
        placeholder= "Search by artist or song"
        type="input"
        onKeyPress={event => {
          if(event.key ==="Enter"){
            search();
          }
        }}
        onChange={event=>setSearchInput(event.target.value)}
        />
        <Button onClick={search}>
          Crenviar
        </Button>

      </InputGroup>
    </Container>
    <Container>
      <Row className="mx-2 row row-cols-4">

      
      <Card>
      <Card.Img src="#"/>
      <Card.Body>
        <Card.Title> Album Name Here</Card.Title>
      </Card.Body>

      </Card>
      
      </Row>
    </Container>
      
    </div>
  );
}

export default App;
