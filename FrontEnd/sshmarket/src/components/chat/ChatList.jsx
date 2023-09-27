/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { useState } from "react";
import { ReactComponent as Search } from "../../assets/icons/search.svg";
import { ReactComponent as Profile } from "../../assets/icons/profile.svg";
import Dropdown from "./Dropdown";

function ChatList() {
    const states = [
        { id: 1, label: "전체대화"},
        { id: 2, label: "거래완료"},
        { id: 3, label: "거래중"},
    ];
    const [selectedState, setSelectedState] = useState({ id: 0, label: ""});
    return (
        <TradeContainer>
            <TradeStateContainer>
                <TradeStateBox>
                    <Dropdown
                        width="160px"
                        data={states}
                        shape="negative"
                        selectedOption={selectedState}
                        placeholder="전체대화"
                        onChange={setSelectedState}
                    />
                    <TradeSearchBox>
                        <TradeSearchWrapper>대화방 검색</TradeSearchWrapper>
                        <SearchIconWrapper>
                            <Search />
                        </SearchIconWrapper>
                    </TradeSearchBox>
                </TradeStateBox>
            </TradeStateContainer>
            <TradeListContainer>
                <TradeListBox>
                    <ProfileImageWrapper>
                        <Profile />
                    </ProfileImageWrapper>
                    <ProfileWrapper>
                        <ProfileNameWrapper>김농부</ProfileNameWrapper>
                        <LastMessageWrapper>어떠세요?</LastMessageWrapper>
                    </ProfileWrapper>
                    <DateWrapper>8월 31일</DateWrapper>
                </TradeListBox>
                <TradeListBox>
                    <ProfileImageWrapper>
                        <Profile />
                    </ProfileImageWrapper>
                    <ProfileWrapper>
                        <ProfileNameWrapper>김농부</ProfileNameWrapper>
                        <LastMessageWrapper>어떠세요?</LastMessageWrapper>
                    </ProfileWrapper>
                    <DateWrapper>8월 31일</DateWrapper>
                </TradeListBox>
                <TradeListBox>
                    <ProfileImageWrapper>
                        <Profile />
                    </ProfileImageWrapper>
                    <ProfileWrapper>
                        <ProfileNameWrapper>김농부</ProfileNameWrapper>
                        <LastMessageWrapper>어떠세요?</LastMessageWrapper>
                    </ProfileWrapper>
                    <DateWrapper>8월 31일</DateWrapper>
                </TradeListBox>
                <TradeListBox>
                    <ProfileImageWrapper>
                        <Profile />
                    </ProfileImageWrapper>
                    <ProfileWrapper>
                        <ProfileNameWrapper>김농부</ProfileNameWrapper>
                        <LastMessageWrapper>어떠세요?</LastMessageWrapper>
                    </ProfileWrapper>
                    <DateWrapper>8월 31일</DateWrapper>
                </TradeListBox>
                <TradeListBox>
                    <ProfileImageWrapper>
                        <Profile />
                    </ProfileImageWrapper>
                    <ProfileWrapper>
                        <ProfileNameWrapper>김농부</ProfileNameWrapper>
                        <LastMessageWrapper>어떠세요?</LastMessageWrapper>
                    </ProfileWrapper>
                    <DateWrapper>8월 31일</DateWrapper>
                </TradeListBox>
                <TradeListBox>
                    <ProfileImageWrapper>
                        <Profile />
                    </ProfileImageWrapper>
                    <ProfileWrapper>
                        <ProfileNameWrapper>김농부</ProfileNameWrapper>
                        <LastMessageWrapper>어떠세요?</LastMessageWrapper>
                    </ProfileWrapper>
                    <DateWrapper>8월 31일</DateWrapper>
                </TradeListBox>
            </TradeListContainer>
        </TradeContainer>
    );
}

const TradeContainer = styled.div`
`;

const TradeStateContainer = styled.div`
    display: flex;
    width: 350px;
    height: 132px;
    padding: 16px 8px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    background: #eee3f1;
    border: 0.1px solid #eee3f1;
`;

const TradeListContainer = styled.div`
    width: 350px;
    max-height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 16px 8px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 0.1px solid rgba(0, 0, 0, 0.1);
`;

const TradeStateBox = styled.div`
    display: flex;
    width: 340px;
    height: 44px;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    flex-shrink: 0;
    flex-wrap: wrap;
    background: #eee3f1;
`;

const TradeSearchBox = styled.div`
    display: flex;
    width: 340px;
    height: 44px;
    justify-content: center;
    align-items: center;
    gap: 200px;
    flex-shrink: 0;
    background: #fff;
`;

const TradeSearchWrapper = styled.div`
    color: rgba(0, 0, 0, 0.4);
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const SearchIconWrapper = styled.div`
    cursor: pointer;
`;

const TradeListBox = styled.div`
    cursor: pointer;
    display: flex;
    width: 360px;
    padding: 15px 0px;
    justify-content: center;
    align-items: flex-end;
    gap: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    background: #fff;
`;

const ProfileImageWrapper = styled.div`
    width: 36px;
    height: 36px;
    margin-bottom: 3px;
    margin-left: -20px;
`;

const ProfileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10px;
    width: 200px;
    height: 43px;
`;

const ProfileNameWrapper = styled.div`
    color: #000;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 26px;
`;

const LastMessageWrapper = styled.div`
    color: #000;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
`;

const DateWrapper = styled.div`
    color: #000;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
`;

export default ChatList;