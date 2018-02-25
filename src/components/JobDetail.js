import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { P, Strong } from 'nachos-ui';
import { colors } from '../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderColor: colors.darkTransparent,
    borderWidth: 1,
    padding: 20,
    borderRadius: 3,
    shadowColor: colors.inactive,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    marginTop: 20,
    marginHorizontal: 20,
  },
  requirementsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  requirement: {
    marginTop: 5,
    backgroundColor: colors.dark,
    fontSize: 11,
    color: colors.light,
    marginRight: 5,
    padding: 5,
    borderRadius: 3,
  },
});

class JobDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.job.description}`,
  });

  render() {
    const { params } = this.props.navigation.state;
    const job = params ? params.job : null;
    return (
      <View style={styles.container}>
        <P><Strong>Company:</Strong> {job.company}</P>
        <P><Strong>Location:</Strong> {job.country} - {job.city}</P>
        <P><Strong>Salary USD:</Strong> {job.salary}</P>

        <P><Strong>Requirements:</Strong></P>
        { job.requirements.map(obj => <Text style={styles.requirement} key={job.requirements.indexOf(obj)}>{obj}</Text>)}
      </View>
    );
  }
}

export default JobDetail;

