import http from 'k6/http';
import { sleep, check } from 'k6';
const basePath = 'http://localhost:9000';


export const options = {

  vus: 1,

  duration: '30s',

};

export default function () {

  http.put(`${basePath}/helpful/?question_id=37323`);

  const get1 = http.get(`${basePath}/qa/questions/?product_id=37323`);;
  const get2 = {
    method: 'GET',
    url: `${basePath}/questions/?product_id=37323`,
  };
  const get3 = {
    method: 'GET',
    url: `${basePath}/questions/?product_id=37323`,
  };
  const put1 = {
    method: 'PUT',
    url: `${basePath}/helpful/?question_id=642097`,
  };

  const responses = http.batch([get1, put1]);
  //const responses = http.batch([get1, get2, get3, put1]);

  console.log('res responses[0]', responses[0])
  //check(responses[0], {});
  // check(responses[1], {
  //   'get2 product status was 200': (res) => res.status === 200,
  // });
  // check(responses[2], {
  //   'get3 product status was 200': (res) => res.status === 200,
  // });
  // check(responses[1], {
  //   'put1 product status was 200': (res) => res.status === 200,
  // });
  console.log('res responses[]', responses[1])


  sleep(1);

}