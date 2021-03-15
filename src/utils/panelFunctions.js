import axios from 'axios';

import { checkBound, bind } from '../api/bindApi';

/*
 * function reducer(state, action)
 * @param state: the prev state of an object
 * @param action: an action object to be dispatched
 * 
 * This function is the reducer for refreshing property data
 * in the ControlPanel component.
 */
function reducer (state, action) {
  switch (action.type) {
    case 'SET_NEED_REFRESH':
      return {
        ...state,
        needRefresh: true,
      };
    case 'UNSET_NEED_REFRESH':
      return {
        ...state,
        needRefresh: false,
      };
    case 'SET_DATA':
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          data: action.data
        }
      };
    default:
      return state;
  }
}

/*
 * async function fetchValues (key, endpoint)
 * @param url: the url of a resource to bind
 * @param endpoint: the endpoint url of a property of the resource
 * 
 * This function retrieves the current data of a single
 * property with given `endpoint`.
 */
async function fetchValues (url, endpoint) {
  if (!checkBound(url))
    await bind(url);
    
  const response = await axios({
    method: 'get',
    url: endpoint,
    headers: { 'USER-ID': '7747' },
  });

  return response.data;
}

/*
 * async function fetchAll (url, props, dispatch, addToast)
 * @param url: the url of a resource to bind
 * @param props: all the properties information in a WoT format
 * @param dispatch: a React.DispatchWithoutAction function from reducer
 * @param addToast: a AddToast function from useToasts hook 
 * 
 * This function retrieves all data of each property in given props object
 * and dispatches the data using dispatch() function.
 * If error occurred, the error will be raised through an addToast()
 * notification.
 */
async function fetchAll (url, props, dispatch, addToast) {
  const fetchResult = await Promise.all(
    Object.keys(props).map(key => {
      // if key is needRefresh then just throw an empty Promise
      if (key === 'needRefresh')
        return new Promise((resolve) => {
          resolve();
        });
      
      const endpoint = props[key].forms[0].href;
      return fetchValues(url, endpoint).then(data => dispatch({
        type: 'SET_DATA',
        key,
        data,
      }), error => addToast(
        JSON.stringify(error.message), 
        { appearance: 'error', autoDismiss: true }
      ));
    })
  );
  return fetchResult;
}

export { reducer, fetchValues, fetchAll };
