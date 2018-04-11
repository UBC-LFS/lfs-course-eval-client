import Chart from 'chart.js'
import R from 'ramda'
import {sumCount, umiAvg} from '../../../util/util'


const drawInstructorRankingChart = (data,questionCode) => {
    const instructorSelect = document.getElementById('instructor-select')
    const groupByInstructor = R.groupBy(function (section) {
        return section.instructorName
    })(data)
    const instructors = Object.keys(groupByInstructor)
    const instructorRankingData = []
    for (let i=0;i<instructors.length;i++){
        const courses = groupByInstructor[instructors[i]]

        const instructorObj = {
            instructorName: instructors[i],
            PUID: courses[0].PUID,
            NumCoursesTaught: courses.length,
        }
        for (let j=1;j<=6;j++){
            const UMICounts = courses.map(x=>x['UMI' + j].count)
            const UMIAvg = umiAvg(sumCount(UMICounts))
            instructorObj['UMI' + j] = UMIAvg
        }
        instructorRankingData.push(instructorObj)
        }
        const sortedByUMI = instructorRankingData.sort((a, b) => b[questionCode]- a[questionCode])
        const colourArray = []
        for (let k=0;k<sortedByUMI.length;k++){
            if (sortedByUMI[k].PUID === instructorSelect.value){
                colourArray.push('#ffd700')
            }
            else {colourArray.push("#4682b4")}
        }
        const UMIData = sortedByUMI.map(x=>x[questionCode])
        const ctx = document.getElementById('instructorRankingChartCanvas').getContext('2d')
const dataNew = {
    labels: sortedByUMI.map(x=>x.instructorName),
    datasets: [
      {
        label: "UMI Average",
        backgroundColor: colourArray,
        data: UMIData
      }
    ]
  }
  const options =  {
    scales:
    {
        xAxes: [{
            display: false
        }],
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
}
    return new Chart(ctx, {
        type: 'bar',
        data: dataNew,
        options: options
    });
}

export default drawInstructorRankingChart
