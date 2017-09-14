import React from 'react';
import axios from 'axios';
import InputElement from 'react-input-mask';
import DatePicker from 'react-bootstrap-date-picker';


class AllNotificationsModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      notes:[]
    }
  };

  componentDidMount(){
  }

  render(){
    var notes = this.props.notes
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0)',
      padding: 50,
      paddingLeft: '20%',
      overflow: 'auto',
      zIndex:99
    }

    const wraperStyle = {
      backgroundColor: 'rgba(0,0,0,0)',
      minHeight: 50,
      maxHeight:300,
      float: 'right',
      width:410
    }

    const modalStyle = {
      backgroundColor: '#f0f2f4',
      borderRadius: 5,
      width:400,
      display:'block',
      margin: 10,
      padding:20,
      color:'black'
      }

    var dateFormat = function(date){
      var fDate = new Date(date);
      var m = ((fDate.getMonth() * 1 + 1) < 10) ? ("0" + (fDate.getMonth() * 1 + 1)) : (fDate.getMonth() * 1 + 1);
      var d = ((fDate.getDate() * 1) < 10) ? ("0" + (fDate.getDate() * 1)) : (fDate.getDate() * 1);
      return m + "." + d + "." + fDate.getFullYear()
    }
    // console.log(this.state.notes, '+++++++++++++++++')
    return (
      <div style={backdropStyle} onClick={this.props.onClose}>
        <div style={wraperStyle}>
          {
            notes.map((note, index)=>
              <div style={modalStyle} key={index}>
                <span>{dateFormat(note.date)} </span>
                <span>{note.text} </span>
                <span>{note.from}</span><br/>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default AllNotificationsModal;