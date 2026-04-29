import axios from "axios";

export async function translateToPT(text) {
  try {
    const url =
      "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=" +
      encodeURIComponent(text);

    const res = await axios.get(url);

    return res.data[0].map(item => item[0]).join("");
  } catch (err) {
    return text;
  }
}