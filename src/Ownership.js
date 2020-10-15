import axios from 'axios';

/*
 * async function bind({ url })
 * @param url: the endpoint url of target resource
 * @return: 0 if success, 1 if failed, -1 otherwise.
 * 
 * This function attempts to bind the resource of given url.
 * The resource should be unbound after use.
 */
async function bind({ url }) {
  try {    
    const response = await axios({
      method: 'post',
      url: url.concat('/user/bind'),
      headers: { 'USER-ID': '7747' }
    });

    if (response.status === 200)
      return 0;
    else
      return 1;
  } catch (e) {
    return -1;
  }
}

/*
 * async function unbind({ url })
 * @param url: the endpoint url of target resource
 * @return: 0 if success, -1 otherwise.
 * 
 * This function attempts to unbind the resource of given url.
 */
async function unbind({ url }) {
  try {    
    const response = await axios({
      method: 'post',
      url: url.concat('/user/unbind'),
      headers: { 'USER-ID': '7747' }
    });

    if (response.status === 200)
      return 0;
    else
      return 1;
  } catch (e) {
    return -1;
  }
}

export { bind, unbind };