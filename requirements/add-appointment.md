
# Cadastro de Consultas

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/appointment**
2. ✅ Valida dados obrigatórios **name**, **birthday** e **appointment_date**
3. ✅ Valida que o campo **birthday** e **appointment_date** é uma data válida
4. ✅ Valida se o dia do **appointment_date** não possui 20 registros no banco
5. ✅ Valida se a hora **appointment_date** não possui 2 registros no banco
6. ✅ Cria um novo **appointment** no com **status** negativo e **appointment_commentary** vazio
7. ✅ Retorna **200** com os dados do **appointment** salvos no banco

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **400** se name, birthday ou appointment_date não forem fornecidos pelo client
3. ✅ Retorna erro **400** se o campo birthday ou  appointment_date não for uma data válida
4. ✅ Retorna erro **403** se o dia do appointment_date for já estiver 20 registros no banco
5. ✅ Retorna erro **403** se a hora do  appointment_date for já estiver 2 registros no banco
6. ✅ Retorna erro **500** se der erro ao tentar criar o appointment
