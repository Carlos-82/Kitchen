# Kitchen Recipe

## Descripción

Esta app permite a los usuarios crear, guardar y ediar sus propias recetas de cocina. Olvídate de las libretas!!


Link a [Figma](https://www.figma.com/file/678KPRyOMKx0M7MFAAqOeb/Untitled?node-id=0%3A1)

## User Stories

- Home: El usuario podrá ver las funcionalidades a través de un carrousel con imágenes y una breve descripción, además de poder acceder a la página de login.
- Login: El usuario podrá acceder a su cuenta a través de la página del login.
- Sign Up: El usuario podrá registrarse para poder tener acceso a la app.
- User-Profile: El usuario podrá ver las recetas que ha creado y acceder al detalle de cada una de ellas.
- New-Recipe: El usuario podrá crear sus recetas mediante un formulario que, posteriormente, será visible en su perfil.
- Edit-Recipe: El usuario podrá modificar la receta seleccionada.
- Recipe: Muestra una descripción detallada de la receta seleccionada según la información introducida por el usuario al crearla o editarla.
## Backlog
* Permitir a los usuarios compartir sus recetas.
* Permitir a los usuarios comentar y puntuar las recetas de otros usuarios
## Server Routes



| Method | Route                       | Description                                                      | Request-Body                                                                                                                                                     |
| ------ | --------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Get    | /                           | Main page. Renders to Index                                      |                                                                                                                                                                  |
| Get    | /login                      | Render login form view                                           |                                                                                                                                                                  |
| Post   | / login                     | Sends login form data to the server                              | {username, password}                                                                                                                                             |
| Get    | /SignUp                     | Render SignUp form view                                          |                                                                                                                                                                  |
| Post   | /signup                     | Sends SignUp info to the server and creates User in DB           | {username, email, password}                                                                                                                                      |
| Get    | /private/user               | Main page. Renders the user mainpage                             |                                                                                                                                                                  |
| Get    | /private/newrecipe          | Render new recipe form view                                      |
| Post   | /private/newrecipe          | Sends Recipe info to the server and creates the recipe in the DB | {namerecipe, typeofcuisine, dishtype, difftultylevel, numberofportions, preparationtime, cookingtime, ingredients, preparation, linktotheoriginalrecipe, notes, image} |
| Get    | /private/recipe/:recipeId   | Render the complete information of the recipe                    |                                                                                                                                                                  |
| Put    | /private/recipe/:recipeId/edit  | Sends edit-recipe info and update the recipe in the DB           | {namerecipe, typeofcuisine, dishtype, difftultylevel, numberofportions, preparationtime, cookingtime, ingredients, preparation, linktotheoriginalrecipe, notes, image} |
| Delete | /private/recipe/:recipeId/delete | Deletes the existing recipe from the DB                          |                                                                                                                                                                 |


Cambios después de la visita de UX/UI: Link a [Wireframes](https://wireframe.cc/zxxbiL)

Link a [Trello](https://trello.com/b/aZlFHWAZ/kitchen-recipe)

## Models

### Modelo user:

{

- userName : type String.
- email : type String.
- password: type String;
- userImage: type String,
- aboutMe: type String.
- recipesId: { type: Schema.Types.ObjectId, ref: 'Recipe' },
  }

### Modelo Recipe:

{

- userId: { type: Schema.Types.ObjectId, ref: 'User' },
- nameRecipe: type String,
- typeOfCuisine: type String,
- dishType: type String, enum :["breakfast", "main dish", "side dish", "drink", "dessert", "appetizer"],
- difftultyLevel: type String,
- numberofportions: type Number,
- preparationTime: type String,
- cookingTime: type number,
- ingredients: [String];
- preparation: type String,
- linkToTheOriginalRecipe: type String,
- notes: type String,
- recipeImage: type String,
  }
