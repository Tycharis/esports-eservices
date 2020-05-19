import React, {useEffect, useState} from "react";
import {Button, Card, Table} from "react-bootstrap";

import {deleteCompletedQual, getCompletedQualForUser} from '../../services/qualification-service';

function QualificationCard(props) {
  const [qual, setQual] = useState({
    id: props.qualId,
    code: "",
    name: "",
    level: 0,
    approvedTime: 0,
    updatedAt: 0,
    MemberId: props.escid
  });

  useEffect(() => {
    getCompletedQualForUser(props.escid, props.qual, (err, qual) => {
      if (qual) {
        console.log(qual);
        setQual(qual);
      }
    });
  }, [props.escid, props.qualId]);

  const translateLevel = () => {
    switch (qual.level) {
      case 0:
        return (
            <td className="text-danger">UNQUALIFIED</td>
        );
      case 1:
        return (
            <td className="text-warning">TRAINEE</td>
        );
      case 2:
        return (
            <td className="text-success">QUALIFIED</td>
        );
      default:
        return (
            <td className="text-info">BAD DATA</td>
        );
    }
  };

  const handleRemoveQual = () => {
    deleteCompletedQual(props.user.id, qual.id, (message, qualDidDelete) => {
      if (qualDidDelete) {
        setQual(prevState => ({
          ...prevState,
          level: 0
        }));
      }
    });
  };

  return (
    <Card>
      <Card.Header as="h6" className="bg-secondary text-white text-center">{`${props.qual.code} - ${props.qual.name}`}</Card.Header>
      <Card.Body>
        <Table size="sm">
          <thead>
            <tr>
              <td>Status</td>
              <td>Completed</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              {translateLevel()}
              <td>{props.qual.updatedAt}</td>
              <td>
                <Button variant="link" onClick={() => handleRemoveQual()}>Remove</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default QualificationCard;