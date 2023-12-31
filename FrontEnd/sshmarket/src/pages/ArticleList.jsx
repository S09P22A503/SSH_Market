import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ArticleCard from "../components/article/ArticleCard";
import Select from "react-select";
import ArticleCardList from "../components/article/organism/ArticleCardList";
import { customAxios } from "../api/customAxios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SelectBoxContainer = styled.div`
  display: flex;
`;

const SelectContainger = styled.div`
  width: 440px;
  margin: 10px 20px 30px 0px;
`;

export default function ArticleList() {
  const TradeOption = [
    { value: "NONE", label: "거래방식 무관" },
    { value: "DIRECT", label: "직거래" },
    { value: "PARCEL", label: "택배" },
  ];
  const LocationOption = [
    { value: 0, label: "지역 무관" },
    { value: 1, label: "서울" },
    { value: 2, label: "부산" },
    { value: 3, label: "대구" },
    { value: 4, label: "인천" },
    { value: 5, label: "광주" },
    { value: 6, label: "대전" },
    { value: 7, label: "울산" },
    { value: 17, label: "세종특별자치시" },
    { value: 8, label: "경기도" },
    { value: 9, label: "강원도" },
    { value: 10, label: "충청북도" },
    { value: 11, label: "충청남도" },
    { value: 12, label: "전라북도" },
    { value: 13, label: "전라남도" },
    { value: 14, label: "경상북도" },
    { value: 15, label: "경상남도" },
    { value: 16, label: "제주도" },
  ];
  const pageInfo = `&size=24&page=0`;
  const [data, setData] = useState([]);

  const url = new URL(document.URL);
  const query = url.searchParams; //?appliedCompany=%E3%85%87%E3%85%87&job=hh&careerLevel=ALL
  // console.log(query.get("appliedCompany"));

  const keyword = query.get("keyword");
  const category = query.get("category");

  const [TradeSelect, setTradeSelect] = useState(TradeOption[0]);
  const [LocationSelect, setLocationSelect] = useState(LocationOption[0]);

  const [page, setPage] = useState(0);

  function getList(page) {
    customAxios
      .get(
        `articles?${keyword ? "keyword=" + keyword : ""}&${
          category ? "category=" + category : ""
        }&locationId=${LocationSelect.value}&tradeType=${TradeSelect.value}` +
          `&size=24&page=${page ? page : 0}`
      )
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setPage(0);
    getList(0);
  }, [TradeSelect, LocationSelect]);

  const handleLocationChange = (option) => {
    setLocationSelect(option);
  };
  const handleTradeChange = (option) => {
    setTradeSelect(option);
  };

  return (
    <Container>
      <SelectBoxContainer>
        <SelectContainger>
          <Select
            defaultValue={TradeOption[0]}
            options={TradeOption}
            onChange={handleTradeChange}
            isSearchable={false}
          ></Select>
        </SelectContainger>
        <SelectContainger>
          <Select
            defaultValue={LocationOption[0]}
            options={LocationOption}
            onChange={handleLocationChange}
            isSearchable={false}
          ></Select>
        </SelectContainger>
      </SelectBoxContainer>
      <ArticleCardList
        data={data}
        page={page}
        setPage={setPage}
        handleData={getList}
      ></ArticleCardList>
    </Container>
  );
}
