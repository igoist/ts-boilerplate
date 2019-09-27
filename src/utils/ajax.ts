type AjaxConfig = {
  url: string,
  callback: any
};

const ajax = async (config: AjaxConfig) => {
  const { url, callback } = config;
  const res = await new Promise((resolve: any) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.response));
      }
    };
    xhr.send();
  });

  callback(res);
};

export default ajax;
