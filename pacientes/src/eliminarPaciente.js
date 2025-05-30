const AWS = require("aws-sdk");
exports.eliminarPaciente = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const {id} = event.pathParameters;
  const result = await dynamoDB
    .delete({
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
