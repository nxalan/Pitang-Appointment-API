# Edição de Consultas

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/appointment/appointment_id**
2. ✅ Valida o dado obrigatório **appointment_id**
3. ✅ Valida se **appointment_id** corresponse a um agendamento com o id fornecido
4. ✅ Valida se fornecido, **appointment_date** e **birthday** é uma data válida
5. ✅ Valida se fornecido, o dia do **appointment_date** não possui 20 registros no banco
6. ✅ Valida se fornecido, a hora do **appointment_date** não possui 2 registros no banco
7. ✅  Atualiza um **appointment** referente ao **appointment_id**
8. ✅ Retorna **200** com os dados do **appointment** atualizados

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **400** se appointment_id não for fornecido
3. ✅ Retorna erro **400** se o campo birthday ou  appointment_date não for uma data válida
4. ✅ Retorna erro **400** se o campo appointment_id for um id inexistente
5. ✅ Retorna erro **403** se o dia do appointment_date for já estiver 20 registros no banco
6. ✅ Retorna erro **403** se a hora do  appointment_date for já estiver 2 registros no banco
7. ✅ Retorna erro **500** se der erro ao tentar atualizar o appointment
