const RecipeDetails = (props) => {
	const {
		title,
		imgSrc,
		calories,
		cuisineTypes,
		num,
		ingredient,
		totalWeight,
		source,
		srcUrl,
		nutrient,
		close,
	} = props;
	return (
		<div className='recipe-details'>
			<div className='details'>
				<div className='info'>
					<h1 className='titled'>{title}</h1>
					<img className='mobile' src={imgSrc} alt={title} />
					<h3 className='cuisine-type-d'>
						Cuisine:
						<div>{cuisineTypes.map((cuisineType, id) => (
							<li key={id}>{cuisineType}</li>
						))}</div>
					</h3>
					<h3 className='calories'>Total calories: {calories} Cal</h3>
				</div>
				<img src={imgSrc} alt={title} />
				<button className='close' onClick={() => close()}>
					X
				</button>
			</div>
			<h2 className='ingredients-title'>{num} INGREDIENTS</h2>
			<p className='ingredients'>{ingredient}</p>
			<p className='total-weight'>Total weight: {totalWeight} g</p>
			<p className='instructions'>
				Find the instrutions for the recipe at{' '}
				<a href={srcUrl} target='_blank' rel='noopener noreferrer'>
					{source}
				</a>
			</p>
			<div className='nutrition-title'>
				<h1>NUTRITION</h1>
			</div>
			<table className='nutrition'>
				<tbody>{nutrient}</tbody>
			</table>
		</div>
	);
};

export default RecipeDetails;
