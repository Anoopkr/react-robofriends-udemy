import React from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBar from '../components/SearchBar';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';
import { setSearchFieldAction, requestRobotsAction } from '../actions'

const mapStateToProps = (state) => ({
    searchField: state.searchRobotsReducer.searchField,
    robots: state.requestRobotsReducer.robots,
    isPending: state.requestRobotsReducer.isPending,
    error: state.requestRobotsReducer.error
})

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchFieldAction(event.target.value)),
        onRequestRobots: () => dispatch(requestRobotsAction())
    }
}

class App extends React.Component {

    componentDidMount() {
        this.props.onRequestRobots();
    }

    render() {
        const { searchField, onSearchChange, robots, isPending } = this.props;
        const filteredRobots = robots.filter(
            (robot) => {
                return robot.name.toLowerCase().includes(searchField.toLowerCase());
            }
        )
        return isPending ?
            <h1>Loading</h1> :
            (
                <div className='tc'>
                    <h1 className='f2'>RoboFriends</h1>
                    <SearchBar searchChange={onSearchChange} />
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);