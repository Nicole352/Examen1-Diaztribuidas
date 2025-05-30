const AWS = require("aws-sdk");
exports.obtenerPaciente = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const {id} = event.pathParameters;
  const result = await dynamoDB
    .get({
      TableName: "pacientes",
      Key : {
        id
      }
    })
    .promise();
const proveedores = result.Item;
  return {
    status: 200,
    body: proveedores,
  };
};
