# Consulta de dias e horas restritos

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **GET** na rota **/api/appointment/fulldates**
2. ✅ Retorna **200** retornando uma um objeto com uma lista de **dates** referentes a dias que estão restritos e uma lista de **dates** referente a horas que estão restritas
3. ✅ Retorna **200** com um objeto com uma lista vazia se não tiver **dates** restritas

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **500** se der erro ao tentar obter os appointments