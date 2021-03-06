import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import {getCategoryNames} from '../../utils/apiHelper'
import Dropdown from './Dropdown'
import style from './style'
const path = require('path')

const mac = process.platform === 'darwin'
const modifierKey = mac ? '&#8984;' : 'Ctrl + '

//todo remove this and the conditions
var remote
try{
  remote = require('electron').remote
}catch(e){
  remote = false
}

function minimize(e) {
  e.preventDefault()
  if(remote) remote.getCurrentWindow().minimize()
}
function maximize(e) {
  e.preventDefault()
  if(remote){
    var window = remote.getCurrentWindow()
    !window.isMaximized() ? window.maximize() : window.unmaximize()
  }
}
function close(e) {
  e.preventDefault()
  if(remote) remote.getCurrentWindow().close()
}

function link(path){
  return e=>{
    e.preventDefault()
    hashHistory.push(path)
  }
}

export class MainNavigation extends Component{
  componentDidMount() {
    getCategoryNames(this.setCategoryState.bind(this))
  }
  categories(){
    if(this.state !== null && this.state.categories !== undefined){
      return this.state.categories.map((category)=>{
        return <MenuItem
          key = {category.id}
          primaryText={category.name}
          onTouchTap={link('booking?category_id=' + category.id)}
        />
      })
    }
  }
  setCategoryState(categoryNames){
    this.setState({categories: categoryNames})
  }
  render(){
    // Math.random() can introduce bugs
    // same number causes menu to stay open, no rerender
    // two components with same key causses error, duplacet key
    return(
      <div style={style.navbar}>
        <div style={style.navbarLeft}>
          <a style={style.navbarItem} className='ct-nav-item' href='#'>
            <img style={style.navbarImage} src='images/logo.png' />
          </a>
          <Dropdown label="Booking" key={Math.random()}>
            <Menu desktop={true} width={256}>
              {/* <MenuItem primaryText="Index" secondaryText={modifierKey + 'I'} onTouchTap={link('index')} />
              <Divider /> */}
              <MenuItem primaryText="New Booking" secondaryText={modifierKey + 'N'} onTouchTap={link('booking')} />
              <Divider />
              {this.categories()}
            </Menu>
          </Dropdown>
          {/*}
          <Dropdown label="Dev" key={Math.random()}>
            <Menu desktop={true} width={256}>
              <MenuItem primaryText="Index" onTouchTap={link('index')} />
              <MenuItem primaryText="New Booking" onTouchTap={link('booking')} />
            </Menu>
          </Dropdown>
          {*/}
        </div>
        <div style={style.navbarRight} className="ct-nav-win-icons">
          <a href="#" onClick={(e)=>{
            e.preventDefault()
            alert('TODO: modal dialog with tabs [keybord shortcuts|TODO:think of more tabs]')
          }}>
            <img style={style.winIcon} src="images/help.png" />
          </a>
          <a href="#" onClick={minimize}>
            <img style={style.winIcon} src="images/min.png" />
          </a>
          <a href="#" onClick={maximize}>
            <img style={style.winIcon} src="images/max.png" />
          </a>
          <a href="#" onClick={close}>
            <img style={style.winIcon} src="images/close.png" />
          </a>
        </div>
      </div>
    )
  }
}
export default MainNavigation
