import { useState, useRef } from 'react'
import axios from 'axios'
import LoadingSpinner from './components/loadingspinner'

function App() {

  // const [query, setQuery] = useState("")
  // const [search, setSearch] = useState("")
  const [recipes, setRecipes] = useState([])
  const [isloading, setIsloading] = useState(false)

  let searchInputRef = useRef();


  function handleSubmit(e) {
    e.preventDefault()
    let enteredSearch = searchInputRef.current.value;
    console.log(enteredSearch);
    if (enteredSearch == "") {
      return Swal.fire(
        'Empty?',
        'The search field is blank',
        'question'
      )
    }
    setIsloading(true)
    const requestUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${enteredSearch}&app_id=82a05efa&app_key=a0a93b2360a20da52871d66adbd5aca7`

    axios.get(requestUrl)
      .then(res => {
        setRecipes(res.data.hits)
        console.log(recipes);
        setIsloading(false)
      })
      .catch(err => {
        Swal.fire(
          'Error?',
          err.message,
          'question'
        )
      })
  }

  const renderrecipes = (
    <div className="container">
      <div className="row">
        {recipes.map(item => {
          return (
            <div className="col-md-3">
              <a target="_blank" href={item.recipe.url} className=' text-decoration-none'>
                <div className="card shadow h-auto my-3">
                  <img src={item.recipe.image} className="card-img-top" alt="" />
                  <div className="card-body">
                    <div className="card-title">{item.recipe.label}</div>
                    <h5 className="card-text">{item.recipe.mealType}</h5>
                    <h4 className="card-text">Ingredients</h4>
                    <ul>
                      {item.recipe.ingredientLines.map(ing => {
                        return (
                          <li>{ing}</li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </a>

            </div>
          )
        })}

      </div>
    </div>
  )



  return (
    <>
      <div className="container">
        <h1>Search for different food recipes</h1>
        <div className="card bg-primary">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="alert alert-danger d-none"><strong>Empty: </strong>Input field is empty</div>
              <div className="form-group">
                <input type="text" ref={searchInputRef} className='form-control' />
              </div>
              <input type="submit" disabled={isloading} className="mt-4 btn btn-success d-block mx-auto" value="search" />
            </form>
          </div>
        </div>
        {isloading ? <LoadingSpinner /> : (renderrecipes)}
      </div>
    </>
  )
}


export default App;


