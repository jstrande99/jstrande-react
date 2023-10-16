import './RecipeModal.css'
const RecipeModal = ({ recipe, closeModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>{recipe.name}</h2>
        <img src={recipe.image} alt={recipe.name} width="200" height="150" />
        <p><u>Ingredients:</u></p>
        {recipe.ingredients.map((ingredient, index) => <p key={index}>{ingredient}<br /></p>)}
        <div className='horizontalLine'></div>
        {recipe.instructions.map((instruction, index) => (
          <p key={index}><b><u>{index + 1}.</u></b><br />{instruction}</p>
        ))}
      </div>
    </div>
  );
};

export default RecipeModal;
