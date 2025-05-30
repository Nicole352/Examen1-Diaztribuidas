const { v4 } = require("uuid");
const AWS = require("aws-sdk");
exports.agregarPaciente = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { nombre, correo, telefono, direccion} = JSON.parse(event.body);
  const id = v4();
  const items = {
    id,
    nombre,
    correo,
    telefono,
    direccion,
  };
  await dynamoDB
    .put({
      TableName: "pacientes",
      Item: items,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};
