import React, { Component } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { Button, Input, P } from "nachos-ui";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";
import api from '../services/api';
import { colors } from '../styles';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loading: {
    marginTop: 20,
  },
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
  jobTitle: {
    color: colors.primary,
    fontSize: 18,
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
  btn: {
    marginTop: 15,
    height: 25,
    borderRadius: 3,
  },
  defaultMargin: {
    marginTop: -10,
    marginBottom: -5,
    padding: 0,
  },
});

class JobList extends Component {
  state = {
    loading: false,
    refreshing: false,
    query: '',
    jobs: [
      {
        id: "1",
        description: "Developer",
        company: "Projetus IT",
        country: "Brazil",
        city: "Juiz de Fora",
        salary: 1800.00,
        requirements: [
          "Java", "Goovy", "Adobe Flex"
        ]
      },
      {
        id: "2",
        description: "Full Stack Developer",
        company: "OnDev Solutions",
        country: "Brazil",
        city: "Juiz de Fora",
        salary: 3800.00,
        requirements: [
          "PHP", "Laravel", "React"
        ]
      },
      {
        id: "3",
        description: "Software Engineer",
        company: "IBM",
        country: "Brazil",
        city: "Juiz de Fora",
        salary: 8500.00,
        requirements: [
          "UML", "5 Years of Experience"
        ]
      },
      {
        id: "4",
        description: "Java Developer",
        company: "Wallet Hub",
        country: "Brazil",
        city: "Juiz de Fora",
        salary: 5800.00,
        requirements: [
          "PHP", "Java", "Mysql"
        ]
      },
      {
        id: "5",
        description: "Web Design",
        company: "Digital River",
        country: "Brazil",
        city: "Juiz de Fora",
        salary: 3500.00,
        requirements: [
          "Photoshop", "Corel Draw"
        ]
      }
    ],
  };

  componentWillMount() {
    this.setState({ loading: true });
    this.loadJobs().then(() => {
      this.setState({ loading: false });
    });
  }

  loadJobs = async () => { // Use async request to API here
    this.setState({ refreshing: true });
    this.setState({ refreshing: false });
  }

  renderList = () => (
    this.state.jobs.length
      ? this.renderJobs()
      : <Text style={styles.empty}>Nenhum repositório encontrado</Text>
  );

  renderJobs = () => {
    const { jobs, query } = this.state;
    let showingJobs;
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      showingJobs = jobs.filter(job => match.test(job.description));
    } else {
      showingJobs = jobs;
    }

    showingJobs.sort(sortBy("description"));

    return (
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.loadJobs}
          />
        }
        data={showingJobs}
        keyExtractor={job => job.id}
        renderItem={({ item }) => (
          <View style={styles.container}>
          <View>
            <Text style={styles.jobTitle}>{item.description}</Text>
          </View>
          <View>
            <P style={styles.defaultMargin}>{item.company}</P>
            <P style={styles.defaultMargin}>{item.country} - {item.city}</P>
            <P style={styles.defaultMargin} align="right">$ {item.salary}</P>
          </View>
          <View style={styles.requirementsContainer}>
            { item.requirements.map(obj => <Text style={styles.requirement} key={item.requirements.indexOf(obj)}>{obj}</Text>)}
          </View>
          <View>
            <Button style={styles.btn} kind="squared" onPress={() => this.showDetail(item)}>View Job</Button>
          </View>
        </View>
        )}
      />
    )
  };

  showDetail = (job) => {
    this.props.navigation.navigate('Detail', { job });
  }

  updateQuery = query => {
    this.setState({ query: query.trim() });
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={{ marginTop: 5, padding: 10 }}>
          <Input style={{ borderRadius: 3 }} placeholder='Search...' value={this.state.query} onChangeText={value => this.updateQuery(value)} />
        </View>
        { this.state.loading
          ? <ActivityIndicator size="small" color="#999" style={styles.loading} />
          : this.renderList()
        }
      </View>
    );
  }
}

JobList.navigationOptions = {
  title: 'My Jobs App'
};

export default JobList;
