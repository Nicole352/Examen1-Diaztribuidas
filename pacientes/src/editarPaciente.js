const { DynamoDB } = require('aws-sdk');
const dynamoDb = new DynamoDB.DocumentClient();
exports.editarPaciente = async (event) => {
  const { id } = event.pathParameters;
  const data = JSON.parse(event.body);
  const { nombre, correo, telefono, direccion } = data;

  if (!nombre || !correo || !telefono || !direccion) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Campos requeridos' }),
    };
  }

  const params = {
    TableName: 'pacientes',
    Key: {
      id,
    },
    UpdateExpression: 'set #nombre = :nombre, correo = :correo, telefono = :telefono, direccion = :direccion',
    ExpressionAttributeNames: {
      '#nombre': 'nombre',
    },
    ExpressionAttributeValues: {
      ':nombre': nombre,
      ':correo': correo,
      ':telefono': telefono,
      ':direccion': direccion,
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await dynamoDb.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    console.error('Error al editar el proveedor', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'No se pudo editar el proveedor' }),
    };
  }
};