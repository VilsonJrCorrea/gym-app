import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Field from "./Field";

const Object = ({ list, name, index, object, onChangeListOfObjects, button }) => {
  return (
    <div style={{ paddingTop: "20px" }} className="container col-12">
      <Row>
        {list.map(item => (
          <Col key={item.path}>
            <Field item={item} name={name} object={object} index={index} onChangeListOfObjects={onChangeListOfObjects} />
            {/* {onRenderField(item, name, index, object, onChangeListOfObjects)} */}
          </Col>
        ))}
        {button ? <Col>{button}</Col> : null}
      </Row>
    </div>
  );
};

export default Object;

