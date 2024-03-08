import { memo, useReducer, useEffect } from "react";
import { Row, Col, Typography } from "antd";

import config from "../config";
import { ACTION } from "../types/types";
import Reducer, { initialState } from "../utils/useStoreReducer";

const Navbar = ({ style }: any) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(`${config.apiUrl}/user`, {
          method: "GET",
        });

        const body = await resp.json();

        if (!body) return;

        return dispatch({ type: ACTION.SET_USER, payload: body });
      } catch (error) {
        console.error("--------query user error", error);
      }
    })();
  }, []);

  return (
    <Row style={style}>
      <Col span={8}>
        <h1 style={{ margin: "20px", fontWeight: "bold" }}>
          Analytics Dashboard
        </h1>
      </Col>
      <Col
        span={8}
        offset={8}
        style={{
          display: "flex",
          paddingRight: "20px",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Typography.Paragraph strong>
          {state?.loggedInUser
            ? `Welcome, ${state.loggedInUser.firstName}!`
            : `Sign In`}
        </Typography.Paragraph>
      </Col>
    </Row>
  );
};

export default memo(Navbar);
