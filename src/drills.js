require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
})

console.log('knex and driver installed correctly');


function searchByProduceName(searchTerm) {
    knexInstance
        .select('id', 'name', 'price', 'category')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
        console.log(result)
        })
    }
    searchByProduceName('pickle')
    
    function paginateProducts(pageNumber) {
        const productsPerPage = 6
        const offset = productsPerPage * (pageNumber - 1)
        knexInstance
          .select('id', 'name', 'price', 'category')
          .from('shopping_list')
          .limit(productsPerPage)
          .offset(offset)
          .then(result => {
            console.log(result)
          })
      }
      paginateProducts(2)


      function productsAddedDaysAgo(daysAgo) {
        knexInstance
          .select('id', 'name', 'price', 'date_added', 'checked', 'category')
          .from('shopping_list')
          .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days':: INTERVAL`, daysAgo)
          )
          .then(results => {
            console.log('PRODUCTS ADDED DAYS AGO')
            console.log(results)
          })
      }
      productsAddedDaysAgo(5)


      function totalCategoryCosts() {
        knexInstance
            .select('category')
            .from('shopping_list')
            .groupBy('category')
            .sum('price AS total')
            .then(result => {
                console.log(result)
            })
    }
    totalCategoryCosts()