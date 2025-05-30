const AWS = require("aws-sdk");
exports.obtenerPacientes = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const result = await dynamoDB
    .scan({
      TableName: "pacientes"
    })
    .promise();
const proveedores = result.Items;
  return {
    status: 200,
    body: proveedores,
  };
};
