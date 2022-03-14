const Recipes = ({
	title,
	imgSrc,
	cuisineTypes,
	seeIngredientsCard,
	seeIngredientsBtn,
	seeIngredientsList,
}) => {
	return (
		<div className='recipe' onClick={(e) => seeIngredientsCard(e)}>
			<h1 className='title' onClick={(e) => seeIngredientsBtn(e)}>
				{title}
			</h1>
			<img src={imgSrc} alt={title} onClick={(e) => seeIngredientsBtn(e)} />
			<div className='cuisine-type' onClick={(e) => seeIngredientsBtn(e)}>
				Cuisine:
				<div className='cuisines'>
					{cuisineTypes.map((cuisineType, id) => (
						<li key={id} onClick={(e) => seeIngredientsList(e)}>
							{cuisineType}
						</li>
					))}
				</div>
			</div>
			<button onClick={(e) => seeIngredientsBtn(e)}>See ingredients</button>
		</div>
	);
};

export default Recipes;
