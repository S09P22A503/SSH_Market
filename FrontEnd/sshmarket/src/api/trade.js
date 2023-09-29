import instance from "./instance";
import processApiResponse from "../utils/api";

const getTradeList = async ({ responseFunc, data }) => {
  const { memberId, status } = data;

  try {
    const response = await instance.get(`/trades/${memberId}?status=${status}`);
    console.log(response);
    processApiResponse({ responseFunc, response });
    return response;
  } catch (e) {
    return e.response;
  }
};

export { getTradeList };