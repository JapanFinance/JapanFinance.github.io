import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

const sidebars: SidebarsConfig = {
  wikiSidebar: [
    'index',
    {
      type: 'category',
      label: 'Subreddit Admin',
      items: [
        { type: 'autogenerated', dirName: 'admin'},
      ]
    },
    {
    'Quick-Start': [
      { type: 'autogenerated', dirName: 'quick-start'},
    ],
    },
    {
      'Earning Money': [
        { type: 'autogenerated', dirName: 'earning'},
      ]
    },
    {
      'Handling Money': [
        { type: 'autogenerated', dirName: 'handling'},
      ]
    },
    {
      'Spending Money': [
        { type: 'autogenerated', dirName: 'spending'},
      ]
    },
    {
      Investing: [
        { type: 'autogenerated', dirName: 'investing'},
      ]
    },
    {
      Insurance: [
        { type: 'autogenerated', dirName: 'insurance'},
      ]
    },
    {
      Tax: [
        { type: 'autogenerated', dirName: 'tax'},
      ]
    },
    {
      'Life Events': [
        { type: 'autogenerated', dirName: 'life'},
      ]
    },
    {
      'Country-Specific': [
        { type: 'autogenerated', dirName: 'countries'},
      ]
    },
    {
      Other: [
        { type: 'autogenerated', dirName: 'other'},
      ]
    },
  ],

};

export default sidebars;