import React, { Component } from 'react';
// components
import Title from "../components/admin/Title";
import Serves from "../components/admin/Serves";
import PickCategory from "../components/admin/PickCategory";
import AddIngredients from "../components/admin/AddIngredients";
import AddInstructions from "../components/admin/AddInstructions";
import AddImage from "../components/admin/AddImage";
import Submit from "../components/admin/Submit";

class Admin extends Component {

  calcNutrition = (ingredients, ingMeasures) => {

    let nutrition = {
      energy: 0,
      proteins: 0,
      calories: 0,
      salt: 0,
      saturatedFattyAcids: 0,
      monounsaturatedFattyAcids: 0,
      polyunsaturatedFattyAcids: 0
    };

    let measures = ingMeasures;

    ingredients.map((ing, i) => {
      let ingMeasure = ingMeasures[i];
      let ingAmount = ing.ViktGram * this.measureRate(ingMeasure);

      ing.Naringsvarden.Naringsvarde.map(elem => {
        nutrition.energy += (elem.Namn === "Energi (kcal)") ? elem.Varde.replace(/,/g,".") * ingAmount/100 : 0;
        nutrition.proteins += (elem.Namn === "Protein") ? elem.Varde.replace(/,/g,".") * ingAmount/100 : 0;
        nutrition.calories += (elem.Namn === "Kolhydrater") ? elem.Varde.replace(/,/g,".") * ingAmount/100 : 0;
        nutrition.salt += (elem.Namn === "Salt") ? elem.Varde.replace(/,/g,".") * ingAmount/100 : 0;
        nutrition.saturatedFattyAcids += (elem.Namn === "Summa mättade fettsyror") ? elem.Varde.replace(/,/g,".") * ingAmount/100 : 0;
        nutrition.monounsaturatedFattyAcids += (elem.Namn === "Summa enkelomättade fettsyror") ? elem.Varde.replace(/,/g,".") * ingAmount/100 : 0;
        nutrition.polyunsaturatedFattyAcids += (elem.Namn === "Summa fleromättade fettsyror") ? elem.Varde.replace(/,/g,".") * ingAmount/100 : 0;
      })
    });
    return nutrition;
  }

  measureRate = (measure) => {
    let rate = 1;
    switch(measure) {
      case "dl":
        rate = 100;
        break;
      case "kg":
        rate = 1000;
        break;
      default:
        rate = 1;
    }
    return rate;
  }

  reduceIngredients = (ingredients, ingMeasures) => {
    let reducedIngs = [];
    let measures = ingMeasures;

    ingredients.map((ing, i) => {
      let newIng = {
        name: ing.Namn,
        units: 1,
        measuringUnit: measures[i],
        unitEquivalentInGrams: ing.ViktGram
      }
      reducedIngs.push(newIng);
    });
    return reducedIngs;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let name = this.title.state.value;
    let serves = this.serves.state.value;
    let category = this.pickCategory.state.value;
    let ingredients = this.addIngredients.state.pickedIngs;
    let ingMeasures = this.addIngredients.state.measures;
    let instructions = this.addInstructions.state.steps;
    let urlToImg = this.addImage.state.value;

    let nutrition = this.calcNutrition(ingredients, ingMeasures);

    let reducedIngs = this.reduceIngredients(ingredients, ingMeasures);

    const recipe = {
      id: 0,
      name: name,
      serves: serves,
      category: category,
      instructions: instructions,
      ingredients: reducedIngs,
      nutrition: nutrition,
      urlToImg: urlToImg
    }

    this.sendRecipe(JSON.stringify(recipe));
  }

  sendRecipe = (data) => {
    fetch("/addrecipe",
    {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: data
    })
    .then(function(res){ res => res.json(); })
    .then(function(data){ data => console.log(data) })
  }

  render() {
    return (
      <div className="col-md-12">
        <div style={{marginTop:100}} className="add-review col-md-6 m-0auto">
					<h5>Add a recipe</h5>
					<form>
						<div className="row">

              <Title ref={(title) => {this.title = title;}} />

							<Serves ref={(serves) => {this.serves = serves;}} />

              <PickCategory ref={(pickCategory) => {this.pickCategory = pickCategory;}} />

              <AddIngredients ref={(addIngredients) => {this.addIngredients = addIngredients;}} />

              <AddInstructions ref={(addInstructions) => {this.addInstructions = addInstructions;}}  />

              <AddImage ref={(addImage) => {this.addImage = addImage;}} />

							<Submit onSubmit={this.handleSubmit} />

						</div>
					</form>
  			</div>
      </div>
    );
  }
}

export default Admin;
