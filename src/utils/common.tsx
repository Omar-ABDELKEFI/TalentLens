export const removeHtml = (htlmText: string) => {
  let temp = htlmText.replace(/<[^>]+>/g, '');
  temp = temp.replace('&nbsp;', ' ');

  return temp;

};
