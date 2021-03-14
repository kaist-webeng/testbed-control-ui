import axios from 'axios';


/*
 * function checkBound(url)
 * @param url: the endpoint url of target resource
 * @return: true if bound, false otherwise.
 * 
 * This function checks if the target resource is bound by
 * the control UI.
 */
function checkBound(url) {
  axios({
    method: 'get',
    url: url.concat('/user'),
    timeout: 2000,
  }).then(r => {
    const info = r.data;

    if (info.bound && info.userId === "7747")
      return true;
    else
      return false;
  });
}

/*
 * function bind(url)
 * @param url: the endpoint url of target resource
 * @return: an AxiosResponse object
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
 * function unbind(url)
 * @param url: the endpoint url of target resource
 * @return: an AxiosResponse object
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

export { checkBound, bind, unbind };