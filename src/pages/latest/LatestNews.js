import React, { Component } from 'react';
import { isArray } from 'lodash';
import { Row, Col } from 'react-bootstrap';

import axios from '../../_config/axios';
import { randomNewsBanner } from '../../_helper/random-image';
import News from './news';
import LatestNewsSlider from './latest-news-slider';
import { LatestNewsSliderSimmer } from '../../simmer-loader';

class LatestNews extends Component {
    constructor() {
        super();
        this.state = {
            news: [],
            page: 0,
            isLoadMore: true,
            isLoading: false
        }

    }
    componentDidMount() {
        this.getLatestNews();
    }
    getLatestNews = (page = 0) => {
        this.setState({
            isLoading: true
        })
        // const payload = new FormData();
        // payload.append('page', page);
        axios.post('StageGoalyApi/latestNewsSM').then(res => {
            if (res.data && res.data.success && res.data.success == 1) {
                if (res.data.news && isArray(res.data.news)) {


                    this.setState({
                        news: res.data.news,
                        isLoading: false
                    })
                }
            }
            if (res.data.success == 0) {
                this.setState({
                    isLoading: false,
                    isLoadMore: false
                })
            }
        })
            .catch(err => console.log(err));
    }
    render() {
        const { news } = this.state;
        return (

            <React.Fragment>
                <div>
                    <div>
                        {!Boolean(news.length) && <LatestNewsSliderSimmer />}
                        {Boolean(news.length) && <LatestNewsSlider news={news.slice(0, 3)} />}
                    </div>
                </div>
                <News
                    news={news}
                    isLoadMore={this.state.isLoadMore}
                    loading={this.state.isLoading}
                // loadMore={this.state.loadMore}
                />
            </React.Fragment>
        );
    }
}
export default LatestNews;







