import Header from "../../../shared/components/Header/Header";

export default function Dashboard({loginData}) {
  return (
  <div>
    <Header title={`Welcome`} loginData={loginData?.userName} description=
    {'This is a welcoming screen for the entry of the application , you can now see the options'}/>
    <div className="fill-recipe-container my-3 mx-3 p-5 d-flex justify-content-between align-items-center">
      <div>
        <h2>Fill the <span className="text-success fw-bold">Recipes</span></h2>
        <p>you can now fill the meals easily using the table and form, 
          click here and sill it with the table
        </p>

      </div>

      <div>
        <button className="btn btn-success px-5">Fill Recipes</button>
      </div>
    </div>
  </div>);
}