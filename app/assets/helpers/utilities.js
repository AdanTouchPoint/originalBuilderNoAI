export function urlEncode(text) {
    var encodedText = encodeURIComponent(text);
    return encodedText;
  }

const mailerExtracter = (mps) => {
    
    let emailsArr =[];
    for (let index = 0; index < mps.length; index++) {
        emailsArr.push(mps[index]?.email ? mps[index]?.email : mps[index]?.contact )
    }
    return emailsArr
}
const verifyInputs = async (obj,ref) => {
  function isEmpty(value) {
    return (
      value === null ||
      value === undefined ||
      (typeof value === 'string' && value.trim() === '') ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'object' && value !== null && Object.keys(value).length === 0)
    );
  }
const length = Object.keys(obj).length;
 if(length < ref.length|| !length) {
    return false
  }
for (let key in obj) {
  if (obj.hasOwnProperty(key) && isEmpty(obj[key])) {
    return false
  }
}
}
export {
  mailerExtracter, verifyInputs
}