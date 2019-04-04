import React from "react";
import Sidebar from "react-sidebar";
import {ListGroup, Button} from "react-bootstrap";
import './css/law.css';

class Law extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  render() {
    return (
      <Sidebar docked={false} pullRight={true}
        sidebar={
        <div>
            <b>Les lois d'Asimov</b>
            <div className="lawStyle">
                <ListGroup className= "listGroup" variant="flush " >
                    <ListGroup.Item style={{backgroundColor: 'transparent'}}>
                        <h6>Loi 1</h6> 
                        Un robot ne peut blesser un être humain ni, par son inaction, permettre qu'un humain soit blessé.
                    </ListGroup.Item>
                    <ListGroup.Item style={{backgroundColor: 'transparent'}}>
                        <h6>Loi 2</h6>
                        Un robot doit obéir aux ordres donnés par les êtres humains, sauf si de tels ordres sont en contradiction avec la Première Loi.
                    </ListGroup.Item>
                    <ListGroup.Item style={{backgroundColor: 'transparent'}}>
                        <h6>Loi 3</h6>
                        Un robot doit protéger sa propre existence aussi longtemps qu'une telle protection n'est pas en contradiction avec la Première et/ou la Deuxième Loi.
                    </ListGroup.Item>
                </ListGroup>
            </div>
        </div>}
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { color: 'white', background: 'rgb(0, 0, 0, 0.65)', width: '35em', position: 'fixed'}}}>
        <Button size="sm" style={{ margin: '10px' }} onClick={() => this.onSetSidebarOpen(true)}>Voir les lois</Button>
      </Sidebar>
    );
  }
}

export default Law;