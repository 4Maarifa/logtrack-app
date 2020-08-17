import React from 'react';

import Tabs from './../../Utils/Tabs/Tabs';

import ENews from './../../../classes/enums/ENews';

import './News.scss';

const News = () => {

  const computeNews = () => {
    const news = {};

    Object.keys(ENews).forEach(key => {
      news[key] = {
        name: () => ENews[key].name,
        content: ENews[key].content
      }
    });

    return news;
  };


  return <div className="News">
    <Tabs default={Object.keys(ENews)[0]} isHorizontalLayout tabs={computeNews()} />
  </div>;
};

export default News;
