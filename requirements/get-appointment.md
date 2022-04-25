# Consulta de consultas pelo ID

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **GET** na rota **/api/appointment/appointment_id**
2. ✅ Validase **appointment_id** é um id valido
3. ✅ Valida se **appointment_id** corresponde a um agendamento com o id fornecido
4. ✅ Retorna **200** com os dados do **appointment** referente ao **appointment_id** fornecido

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **400** se appointment_id não for fornecido
3. ✅ Retorna erro **400** se o campo appointment_id for um id inexistente
4. ✅ Retorna erro **500** se der erro ao tentar deletar o appointment