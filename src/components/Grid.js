import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
import { object } from "prop-types";

const GridComponent = styled.div`
  width: 100%;
  padding: 10px;
  background: #f9f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  font-family: "Poppins";
`;

const FlexItems = styled.div`
  width: 18%;
  height: auto;
  border-radius: 20px;
  background: white;
  padding: 25px;
  margin: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 4px 4px rgba(146, 133, 133, 0.1);
  font-size: "roboto";
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ImgComponent = styled.img`
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 4px 4px rgba(146, 133, 133, 0.1);
  @media (max-width: 1200px) {
    .responsive {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }
`;

const ButtonDelete = styled.button`
  width: 40px;
  margin-top: 10px;
  height: 40px;
  background-color: #ffc107;
  color: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 4px 4px rgba(146, 133, 133, 0.1);
`;

export default class Grid extends Component {
  // initial state
  state = {
    response: [[], Array.from({ length: 20 })],
    hasMore: true
  };
  // get data from api
  getData = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/photos");
    this.setState({ response: res.data });
    console.log(this.state);
  };
  componentDidMount(InfiniteScroll) {
    this.getData();
    // this.fetchMoreData();
  }
  fetchMoreData = () => {
    if (this.state.response.length >= 500) {
      this.setState({ hasMore: false });
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      this.setState({
        response: this.state.response.concat(Array.from({ length: 20 }))
      });
    }, 3000);
  };

  deleteEvnt = (index, e) => {
    const response = Object.assign([], this.state.response);
    response.splice(index, 1);
    this.setState({ response: response });
  };

  render() {
    const { response } = this.state;
    return (
      <div>
        <InfiniteScroll
          dataLength={this.state.response.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={
            <Loading>
              {" "}
              <h4>Loading ...</h4>{" "}
            </Loading>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <GridComponent>
            {response.length > 0 ? (
              response.map((data, index) => (
                <FlexItems key={data.id}>
                  <div>{data.id}</div>
                  <ImgComponent
                    src={data.thumbnailUrl}
                    alt={data.title}
                    className="responsive"
                  />
                  <ButtonDelete onClick={this.deleteEvnt.bind(this, index)}>
                    X
                  </ButtonDelete>
                </FlexItems>
              ))
            ) : (
              <div>
                <h2>Empty</h2>
                <Loading title="Loading" />
              </div>
            )}
          </GridComponent>
        </InfiniteScroll>
      </div>
    );
  }
}
