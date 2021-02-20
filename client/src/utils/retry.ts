/**
 * @description This utility function will retry the function passed into it 5 times, with 1 second between each attempt, either until it is successful or it fails 5 times
 * @param fn Function you expect could fail, and want to retry
 * @param retriesLeft How many times to retry (Defaults to 5 attempts)
 * @param interval Time to wait between retrying again (Defaults to 1 second [1000 milliseconds])
 */
function retry(fn: any, retriesLeft = 5, interval = 1000) {
  return new Promise<any>((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error: any) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            reject(error);
            return;
          }
          retry(fn, retriesLeft - 1, interval).then(resolve, reject);
        }, interval);
      });
  });
}

export default retry;
