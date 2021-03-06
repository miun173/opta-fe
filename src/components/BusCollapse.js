import React, { Component } from "react"

import { Route, withRouter } from "react-router-dom"

import { 
  List,
  ListItem, 
  ListItemText,
  Collapse,
  Typography
} from "@material-ui/core"

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { Theme } from "../utils/colors"

class BussCollapse extends Component {
  state = {
    open: false
  }

  _listItemHandler = (busId) => {
    this.setState({open: !this.state.open})
    const currentURL = this.props.match.url
    this.props.history.replace(`${currentURL}/${busId}`);
  }

  render() {
    const {id, start_loc, end_loc, detail, match} = this.props 
    const {open} = this.state

    return (
      <>
        <ListItem style={{backgroundColor: Theme.white}} onClick={() => this._listItemHandler(id)} button>
          <ListItemText style={{color: Theme.logo, backgroundColor: Theme.white}} primary={`${start_loc} - ${end_loc}`} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
  
        <Route path={`${match.url}/${id}`}
          render={props => (
            <Collapse in={open} timeout="auto" unmountOnExit>

              <BusRoutesDetail detail={detail} open={open} {...props} />
            </Collapse>
          )}
        />
      </>
    )
  }
}

const BusRoutesDetail = ({detail, open}) => (
  <List component="div" style={{backgroundColor: Theme.white}} disablePadding>
    {
      detail && detail.map((d, i) => (
        <ListItem key={d.id}>
          <Typography>{d.queue}. &nbsp;</Typography>
          <Typography>{d.location_name}</Typography>
        </ListItem>        
      ))
    }
  </List>
)

export default withRouter(BussCollapse)