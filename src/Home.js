import { useState, useEffect } from 'react';
import Recipes from './Recipes';
import RecipeDetails from './RecipeDetails';

function Home() {
	const [query, setQuery] = useState('');
	const [item, setItem] = useState('');
	const [recipes, setRecipes] = useState([]);
	const [clicked, setClicked] = useState(false);
	const [selected, setSelected] = useState('');
	const [open, setOpen] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');

	const recipeSearch = (e) => {
		e.preventDefault();
		setItem(query);
	};

	const getRecipes = async () => {
		try {
			const recipeFetch = await fetch(
				`http://localhost:8080/recipes?item=${item}`
			);
			const data = await recipeFetch.json();
			const search = await data.hits;
			if (search.length > 0) {
				setErrorMessage('');
				setClicked(false);
				setOpen(true);
				setRecipes(search);
			}
		} catch (err) {
			setErrorMessage(err.message);
		}
	};

	useEffect(() => {
		if (item.trim()) {
			getRecipes();
			setQuery('');
		}
	}, [item]);

	return (
		<div className='container'>
			<h1 className='recipe-app'>Recipe App</h1>
			<form className='search-form' onSubmit={recipeSearch}>
				<input
					autoFocus
					className='search-bar'
					type='text'
					placeholder='Type here...'
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button type='submit'>Search</button>
			</form>
			<h2 className='error-message'>{errorMessage}</h2>
			<div className='recipes'>
				{recipes.map((recipe, id) => (
					<div key={id}>
						{clicked && recipe.recipe.image.includes(selected) ? (
							<RecipeDetails
								key={recipe.recipe.uri}
								title={recipe.recipe.label}
								imgSrc={recipe.recipe.image}
								cuisineTypes={recipe.recipe.cuisineType}
								num={recipe.recipe.ingredientLines.length}
								calories={Math.ceil(recipe.recipe.calories)}
								ingredient={recipe.recipe.ingredientLines.map(
									(ingredient, id) => (
										<li key={id}>{ingredient}</li>
									)
								)}
								totalWeight={Math.ceil(recipe.recipe.totalWeight)}
								source={recipe.recipe.source}
								srcUrl={recipe.recipe.url}
								nutrient={Object.values(recipe.recipe.totalNutrients).map(
									(nutrient, id) => (
										<tr key={id}>
											<td>{nutrient.label}</td>
											<td>{nutrient.quantity}</td>
											<td>{nutrient.unit}</td>
										</tr>
									)
								)}
								close={() => {
									setClicked(false);
									setOpen(true);
								}}
							/>
						) : (
							open && (
								<Recipes
									key={recipe.recipe.uri}
									title={recipe.recipe.label}
									imgSrc={recipe.recipe.image}
									cuisineTypes={recipe.recipe.cuisineType}
									seeIngredientsCard={(e) => {
										setSelected(e.target.childNodes[1].src);
										setClicked(true);
										setOpen(false);
									}}
									seeIngredientsBtn={(e) => {
										setSelected(e.target.parentElement.childNodes[1].src);
										setClicked(true);
										setOpen(false);
										e.stopPropagation();
									}}
									seeIngredientsList={(e) => {
										setSelected(
											e.target.parentElement.parentElement.parentElement
												.childNodes[1].src
										);
										setClicked(true);
										setOpen(false);
										e.stopPropagation();
									}}
								/>
							)
						)}
					</div>
				))}
			</div>
		</div>
	);
}

export default Home;
