
# Consulta de consultas

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **GET** na rota **/api/appointment**
2. ✅ Faz uma requisição retornando uma lista de **appointments** ordenados por ordem descendente de data
3. ✅ Retorna **200** com um array com os dados dos **appointment** atualizados
4. ✅ Retorna **200** com ym array vazio caso não exista nenhum **appointment**

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **500** se der erro ao tentar obter os appointments