import React, { Component } from 'react'
import { connect } from 'react-redux';

import {
    fetchAllRoadmaps,
    fetchRoadmapByUser,
    fetchMostPopularRoadmaps,
    fetchHighestRatedRoadmaps
} from '../store/actions/roadmapActions'

import { fetchAllDisciplines } from '../store/actions/disciplineActions'

import { Row, Col } from 'antd';

import DisciplineCard from './DisciplineCard';
import DashboardRoadmapList from './DashboardRoadmapList';

const NUM_DISCIPLINES_TO_SHOW = 4;


class Dashboard extends Component {

	componentDidMount() {    
        this.props.fetchAllRoadmaps()
        this.props.fetchRoadmapByUser()
        this.props.fetchExistingDisciplines();
        this.props.fetchHighestRatedRoadmaps();
        this.props.fetchMostPopularRoadmaps();
    }
    
    render() {
        // console.log('dashboard redux', this.props)
        const { 
            roadmapsByUser,
            mostPopularRoadmaps,
            highestRatedRoadmaps,
            existingDisciplines } = this.props;
     
        const disciplines = [];
        existingDisciplines.data.forEach(elem => {
            let discipline = elem[0]
            disciplines.push(
                <Col key={discipline} className="gutter-row" span={6}>
                    <DisciplineCard 
                        discipline={discipline}
                    />
                </Col>
            )
        })
        
        
        return (
            <div className="container-fluid">
                <div>
                    <h3>Welcome back, let's continue our studies?</h3>
                </div>
                <div>
                    <DashboardRoadmapList
                        data={roadmapsByUser}
                    />
                </div>
                
                <div>
                    <h3>Disciplines</h3>
                </div>
                <Row className="dashboard-disciplines" gutter={16}>
                    {disciplines}
                </Row>
                
                <div>
                    <h3>Highest Rated</h3>
                </div>
                <div>
                    <DashboardRoadmapList
                        data={highestRatedRoadmaps}
                    />
                </div>
            
                <div>
                    <h3>Most Popular</h3>
                </div>
                <div>
                    <DashboardRoadmapList
                        data={mostPopularRoadmaps}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token !== null,
    userId: state.auth.userId,
    roadmapsByUser: state.roadmap.roadmapsByUser,
    mostPopularRoadmaps: state.roadmap.mostPopularRoadmaps,
    highestRatedRoadmaps: state.roadmap.highestRatedRoadmaps,
    existingDisciplines: state.discipline.disciplines
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        fetchAllRoadmaps: () => {
            dispatch(fetchAllRoadmaps())
        },
        fetchRoadmapByUser: () => {
            dispatch(fetchRoadmapByUser())
        },
        fetchMostPopularRoadmaps: () => {
            dispatch(fetchMostPopularRoadmaps())
        },
        fetchHighestRatedRoadmaps: () => {
            dispatch(fetchHighestRatedRoadmaps())
        },
        fetchExistingDisciplines: () => {
            dispatch(fetchAllDisciplines())
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
