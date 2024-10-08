import axios from 'axios';

const ESAPI = axios.create({
  baseURL: `${process.env.REACT_APP_ES_API_URL}`,
  headers: {
    'kbn-xsrf': 'reporting',
    'Content-Type': 'application/json',
    Authorization: `Basic ${window.btoa(`${process.env.REACT_APP_ES_ID}:${process.env.REACT_APP_ES_PWD}`)}`, // window.btoa 사용
  },
});

export default ESAPI;
