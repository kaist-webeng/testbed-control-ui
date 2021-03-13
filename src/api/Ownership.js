import axios from 'axios';

function bindFetcher(url, callback) {
  bind(url).then(callback).catch(e => {
    throw e;
  });
  unbind(url).then().catch(e => {
    throw e;
  });
}

/*
 * async function bind({ url })
 * @param url: the endpoint url of target resource
 * @return: 0 if success, 1 if failed, -1 otherwise.
 * 
 * This function attempts to bind the resource of given url.
 * The resource should be unbound after use.
 */
async function bind(url) {
  return await axios({
    method: 'post',
    url: url.concat('/user/bind'),
    headers: { 'USER-ID': '7747' },
    timeout: 2500,
  });
}

/*
 * async function unbind({ url })
 * @param url: the endpoint url of target resource
 * @return: 0 if success, -1 otherwise.
 * 
 * This function attempts to unbind the resource of given url.
 */
async function unbind(url) {
  return await axios({
    method: 'post',
    url: url.concat('/user/unbind'),
    headers: { 'USER-ID': '7747' },
    timeout: 2500,
  });
}

export { bindFetcher, bind, unbind };