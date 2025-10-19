import React from 'react';
import {
  Row,
  Col,
  Button,
  Container,
} from 'reactstrap';

const Jumb = () => (
  <div className={'container-fluid'}>
    <div className="jumbotron overflow-auto">
      <Container fluid>
        <h1 className="display-3">Fluid jumbotron</h1>
        <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
      </Container>
    </div>
    <Row>
      <Col xs={12} md={8}>
        <div className={"jumbotron"}>
          <h1 className="display-3">Hello, world!</h1>
          <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
          <hr className="my-2" />
          <p>It uses utility classes for typgraphy and spacing to space content out within the larger container.</p>
          <p className="lead">
            <Button color="primary">Learn More</Button>
          </p>
        </div>
      </Col>
    </Row>
  </div>
);

export default Jumb;
