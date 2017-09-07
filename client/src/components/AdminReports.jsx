import React from 'react';
import axios from 'axios';
import Auth from '../modules/Auth'

class AdminReports extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
      };
      // this.create3HK=this.create3HK.bind(this);
    }

    // create3HK(event){
    //   event.preventDefault();
    //   axios.post('/reports/report3nk',  {
    //     responseType: 'json',
    //     headers: {
    //       'Content-type': 'application/x-www-form-urlencoded',

    //     }
    //   })
    //     .then(res => {
    //       console.log(res.data)
    //       // this.setState({
    //       //   filename:res.data.filename
    //       // })

    //     });
    // }
    //                 <button type="button" onClick={this.create3HK} className="btn btn-inverse waves-effect waves-light m-r-10" style={{paddingLeft: '5%', paddingRight: '5%'}}>3НК</button>

  render() {
    return (
      <div className="container clearfix">
        <div className="bg-title">
          <h4>Отчеты</h4>
        </div>
        <div className="my-content" >
          <div className="row">
            <div className="col-md-4 col-xs-12 col-sm-6" style={{padding: '0px 7.5px'}}>
              <img className="img-responsive subject-img" alt="user" src={require("../../../public/subject-img/default.jpg")} />
              <div className="white-box">
                <h4>Отчет 3НК!</h4>
                <div className="text-muted m-b-20"><span className="m-r-10"><i className="fa fa-clock-o"></i></span>
                  <p>Отчет бла бла бла!!!</p>
                </div>

                  <div>
                  <form method="post" action= {"/reports/report3nk/3HK" + new Date().getFullYear() + ".xlsx"}>
                    <button type="submit" className="btn btn-inverse waves-effect waves-light m-r-10" style={{paddingLeft: '5%', paddingRight: '5%'}}>3НК</button>
                  </form>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}

export default AdminReports;