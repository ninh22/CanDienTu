/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Dimensions} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import VerticalBarGraph from '@chartiful/react-native-vertical-bar-graph';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

class TongQuanThongKeUser extends Component {
  render() {
    return (
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={null}>
          <View style={styles.body}>
            <View style={styles.header}>
              <View style={styles.viewuser}>
                <View style={styles.viewimguser}>
                  <Image
                    source={require('../Images/imguser.jpg')}
                    style={styles.imguser}
                  />
                </View>
                <View style={styles.viewthongtin}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 17,
                      marginBottom: 10,
                    }}>
                    Nguyễn Văn A
                  </Text>
                  <Text style={{fontSize: 13}}>0346508758</Text>
                </View>
              </View>
              <View style={styles.viewtongsodon}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 17,
                      marginBottom: 10,
                    }}>
                    Hôm nay
                  </Text>
                  <Text style={{fontWeight: 'bold', fontSize: 17}}>60</Text>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 17,
                      marginBottom: 10,
                    }}>
                    Tổng xe
                  </Text>
                  <Text style={{fontWeight: 'bold', fontSize: 17}}>50</Text>
                </View>
              </View>
            </View>
            <View style={styles.viewbodytongquan}>
              <View style={styles.viewlichsucan}>
                <Image
                  source={require('../Images/checklist.png')}
                  style={{height: 30, width: 30}}
                />
                <Text
                  style={{fontWeight: 'bold', fontSize: 15, marginLeft: 10}}>
                  Lịch sử đơn
                </Text>
                <Image
                  source={require('../Images/next.png')}
                  style={{height: 15, width: 15}}
                />
              </View>
              <View style={styles.viewluachon}>
                <Image
                  source={require('../Images/checklist.png')}
                  style={{height: 30, width: 30}}
                />
                <Text
                  style={{fontWeight: 'bold', fontSize: 15, marginLeft: 10}}>
                  Lịch sử đơn
                </Text>
                <Image
                  source={require('../Images/next.png')}
                  style={{height: 15, width: 15}}
                />
              </View>
            </View>
            <View style={styles.titlechart}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  justifyContent: 'center',
                }}>
                Biểu đồ
              </Text>
            </View>
            <View style={styles.viewbieudo}>
              <View
                style={{
                  height: 40,
                  alignItems: 'flex-end',
                  padding: 3,
                  marginBottom: 10,
                }}>
                <View style={styles.textchonngay}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 15,
                      justifyContent: 'center',
                    }}>
                    Hôm nay
                  </Text>
                </View>
              </View>

              <LineChart
                data={{
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                  ],
                  datasets: [
                    {
                      data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                      ],
                    },
                  ],
                }}
                width={Dimensions.get('window').width - 20} // from react-native
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: '#e26a00',
                  backgroundGradientFrom: '#fb8c00',
                  backgroundGradientTo: '#ffa726',
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#ffa726',
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>
            <View style={styles.viewbieudo}>
              <View
                style={{
                  height: 40,
                  alignItems: 'flex-end',
                  padding: 3,
                  marginBottom: 10,
                }}>
                <View style={styles.textchonngay}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 15,
                      justifyContent: 'center',
                    }}>
                    Hôm nay
                  </Text>
                </View>
              </View>

              <VerticalBarGraph
                data={[20, 45, 28, 80, 99, 43, 50]}
                labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']}
                width={Dimensions.get('window').width - 30}
                height={200}
                barRadius={5}
                barWidthPercentage={0.65}
                barColor="#e26a00"
                baseConfig={{
                  hasXAxisBackgroundLines: false,
                  xAxisLabelStyle: {
                    position: 'left',
                    prefix: '$',
                  },
                }}
                style={{
                  marginBottom: 30,
                  padding: 10,
                  paddingTop: 20,
                  borderRadius: 20,
                  backgroundColor: '#dff4d7',
                  width: Dimensions.get('window').width - 20,
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: '#ECECEC',
    padding: 5,
  },
  header: {
    backgroundColor: '#ECECEC',
    height: 180,
    borderRadius: 5,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  viewuser: {
    height: 74,
    flexDirection: 'row',
    marginBottom: 10,
  },
  viewimguser: {
    height: 74,
    width: 74,
    backgroundColor: 'white',
    borderRadius: 37,
    borderWidth: 1,
    borderColor: '#DCDCDC',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  imguser: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  viewthongtin: {
    height: 70,
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#DCDCDC',
    justifyContent: 'center',
  },
  viewtongsodon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  viewbodytongquan: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  viewlichsucan: {
    backgroundColor: '#ECECEC',
    height: 70,
    borderRadius: 5,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  viewluachon: {
    backgroundColor: '#ECECEC',
    height: 70,
    borderRadius: 5,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  titlechart: {
    backgroundColor: '#ECECEC',
    height: 40,
    borderRadius: 3,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
    justifyContent: 'center',
  },
  viewbieudo: {
    backgroundColor: '#ECECEC',

    borderRadius: 5,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  textchonngay: {
    borderRadius: 5,
    height: 40,
    borderWidth: 1,
    width: 120,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#DCDCDC',
  },
});
export default TongQuanThongKeUser;
