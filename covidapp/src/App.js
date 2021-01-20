import React from 'react';
import Chart from './Chart.js'
import './App.css';
import Footer from './footer'

class App extends React.Component {
  constructor(){
    super();
    this.state={
      casesCount:0,
      isLoaded:false,
      country:'india',
      FromDate:'2020-01-01',
      ToDate:'2020-02-01',
      data:{},
      dates:[],
      count:[],
      percentage:[]
    }
    this.handleCountrySearch=this.handleCountrySearch.bind(this)
  }
  componentDidMount(){
    let temp1=[]
    let temp2=[]
    let temp3=[]
    fetch('https://api.covid19api.com/dayone/country/india/status/confirmed/live')
    .then(res=>res.json())
    .then(data=>{
      this.setState({
        isLoaded:true,
        casesCount:data[data.length-1].Cases,
        data:data
      })
    })
    .then(()=>{
      this.state.data.forEach((i,id)=>{
        temp1.push(i.Date)
        temp2.push(i.Cases)
        temp3.push(((temp2.slice(-1)[0]/this.state.casesCount)*100).toFixed(2))
      })
      
      this.setState({
        dates:temp1,
        count:temp2,
        percentage:temp3
      })
      
    })
  }
  handleCountrySearch(){
    let temp1=[]
    let temp2=[]
    let temp3=[]
    fetch(`https://api.covid19api.com/country/${this.state.country}/status/confirmed?from=${this.state.FromDate}T00:00:00Z&to=${this.state.ToDate}T00:00:00Z`)
    .then(res=>res.json())
    .then(data=>{
      this.setState({
        casesCount:data[data.length-1].Cases,
        data:data
      })
    })
    .then(()=>{
      this.state.data.forEach((i,id)=>{
        temp1.push(i.Date)
        temp2.push(i.Cases)
        temp3.push(((temp2.slice(-1)[0]/this.state.casesCount)*100).toFixed(2))
      })
      this.setState({
        dates:temp1,
        count:temp2,
        percentage:temp3
      })
    })
    
  }
  render(){
    return (
      <div className="main">
      <p className="Header">Covid vizualizer</p>
          <div className="main1">
              <input type="text" name="country"  
              onChange={(e)=>{this.setState({country:e.target.value})}}  
              placeholder="country"/>

              <input type="text" name="FromDate"  
              onChange={(e)=>{this.setState({FromDate:e.target.value})}} 
              placeholder="YYYY-DD-MM"/>

              <input type="text" name="ToDate"  
              onChange={(e)=>{this.setState({ToDate:e.target.value})}}   
              placeholder="YYYY-DD-MM"/>
              <button onClick={this.handleCountrySearch}>check</button>
          </div>
          
          <div className="main2">
              <p>country :   {this.state.country}</p>
              <p>cases count:   {this.state.casesCount}</p>
          </div>
          <div className="main3">
              <Chart XAxis={this.state.dates} YAxis={this.state.count}/>
              <div>
                <table>
                <thead>
                <tr><th>sno:</th><th>cases</th><th>date</th><th>percentage</th></tr>
                </thead>
                <tbody>
                {this.state.percentage.map((i,id)=>{
                  return (<tr><td>{id}</td><td>{this.state.count[id]}</td><td>{this.state.dates[id]}</td><td>{this.state.percentage[id]}</td></tr>)
                })}
                </tbody>
                
                </table>
              </div>
          </div>
          <Footer />
      </div>
    )
  }
}

export default App;
