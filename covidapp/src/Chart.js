
import {Line} from 'react-chartjs-2';
function Chart(props){
    let ChartData={
        labels:props.XAxis,
        datasets:[
            {
                label:"Cases Counts",
                data:props.YAxis,
                backgroundColor:['rgba(75,192,192,0.4)'],
                borderWidth:1
            }
        ]
    }
    return (
        <div>
               <h1>covid cases update</h1>
               <div >
                    <Line data={ChartData} options={{
                        responsive:true,
                        title:{text:"Date",display:true},
                        scales:{
                            yAxes:[
                                {
                                    ticks:{
                                        autoSkip:true,
                                        maxTicksLimit:10,
                                        beginAtZero:true
                                    },
                                    gridLines:{
                                        display:false
                                    }
                                }
                            ],
                            xAxes:[
                                {
                                    gridLines:{
                                        display:false
                                    }
                                }
                            ]
                        }
                    
                    }}/>
               </div>
        </div>
    )
}
export default Chart