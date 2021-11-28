import React from "react";
import { Result, Button } from "antd";
import { history } from "../../App";
export default function PageError() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button
          type="primary"
          onClick={() => {
            history.goBack();
          }}
        >
          Back Home
        </Button>
      }
    />
  );
}
