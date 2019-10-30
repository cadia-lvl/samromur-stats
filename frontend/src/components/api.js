import cubejs from "@cubejs-client/core";

export const cubejsApi = cubejs(process.env.REACT_APP_CUBEJS_TOKEN, {
  apiUrl: process.env.REACT_APP_API_URL
});

export default cubejsApi;