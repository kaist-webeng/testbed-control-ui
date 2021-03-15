import axios from 'axios';

import { checkBound, bind } from '../api/bindApi';

/*
 * async function submitAction (url, inputs, endpoint)
 * @param url: the url of a resource to bind
 * @param inputs: the object which stores a user's input information
 * @param endpoint: the endpoint url of an action of the resource
 * 
 * This function retrieves the current data of a single
 * property with given `endpoint`.
 */
async function submitAction (url, inputs, endpoint) {
  if (!checkBound(url))
      await bind(url);

  let form = new FormData();

  for (let key in inputs) {
    form.append(key, inputs[key]);
  }

  const response = await axios({
    method: 'post',
    url: endpoint,
    headers: { 'USER-ID': '7747' },
    data: form
  });

  return response;
}

export { submitAction };
