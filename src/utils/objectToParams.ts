const objectToParams = (object) => {
    const esc = encodeURIComponent;
    const query = Object.keys(object)
      .map((k) => `${esc(k)}=${esc(object[k])}`)
      .join('&');
  
    return query;
  };
  
  export default objectToParams;
  