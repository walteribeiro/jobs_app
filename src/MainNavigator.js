import { StackNavigator } from 'react-navigation';
import JobList from './components/JobList';
import JobDetail from './components/JobDetail';

const MainNavigator = StackNavigator({
  Master: { screen: JobList },
  Detail: { screen: JobDetail },
}, {
  initialRouteName: 'Master',
});

export default MainNavigator;
