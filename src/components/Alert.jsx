import React from "react";
import { Alert } from "react-bootstrap";

export default function Alerta({msgerro, msg}) {
    
    return (
        <Alert variant="danger" >
        <Alert.Heading>{msgerro}</Alert.Heading>
        <p>
         {msg}
        </p>
      </Alert>
    );
}
