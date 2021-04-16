import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
} from 'react-native-chart-kit'
import * as React from 'react';
import {Button, View, Text, Dimensions} from 'react-native';
import styles_default from "./styles";
var chart_data = require('./chart_data.json')

class Chart extends React.Component{
    constructor(props){
        super(props);
        this.label = []
        this.dataset = []
        let temp = []
        let i;
        for (i = 1; i <= chart_data[0]["count"]; i++) {
            this.label.push(chart_data[i]["Date"])
            temp.push(chart_data[i]["Sentiment_level"])
        }
        this.dataset = [{data:temp}];
    }

    render() {
        return (
            <View>
                <Text>
                    Sentiment_level:
                </Text>
                <LineChart
                    data={{
                        labels: this.label,
                        datasets: this.dataset
                    }}
                    width={Dimensions.get('window').width} // from react-native
                    height={220}
                    chartConfig={{
                        backgroundColor: '#e26a00',
                        backgroundGradientFrom: '#fb8c00',
                        backgroundGradientTo: '#ffa726',
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </View>
        );
    }
}

export default Chart;
